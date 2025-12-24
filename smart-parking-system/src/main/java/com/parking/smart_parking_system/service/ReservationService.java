package com.parking.smart_parking_system.service;

import com.parking.smart_parking_system.dto.ParkingLotResponseDTO;
import com.parking.smart_parking_system.dto.ParkingSpaceDTO;
import com.parking.smart_parking_system.dto.ReservationRequestDTO;
import com.parking.smart_parking_system.dto.ReservationResponseDTO;
import com.parking.smart_parking_system.entity.*;
import com.parking.smart_parking_system.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private static final Logger log = LoggerFactory.getLogger(ReservationService.class);

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final ParkingSpaceRepository parkingSpaceRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, UserRepository userRepository,
                              CarRepository carRepository, ParkingLotRepository parkingLotRepository,
                              ParkingSpaceRepository parkingSpaceRepository, SimpMessagingTemplate messagingTemplate) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.parkingLotRepository = parkingLotRepository;
        this.parkingSpaceRepository = parkingSpaceRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Transactional // This is critical for the deadlock fix and rollbacks
    public Reservation createReservation(ReservationRequestDTO reservationRequestDTO, String username) {

        // 1. Find User and Car (no locks needed yet)
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        Car car = carRepository.findById(reservationRequestDTO.getCarId())
                .orElseThrow(() -> new EntityNotFoundException("Car not found: " + reservationRequestDTO.getCarId()));
        if (!car.getUser().equals(user)) {
            throw new IllegalStateException("Car does not belong to the authenticated user.");
        }

        // --- THIS IS THE DEADLOCK FIX ---
        // We lock in a consistent order: Parent (Lot) first, then Child (Space)

        // 2. Find and PESSIMISTIC_WRITE_LOCK the ParkingLot
        ParkingLot parkingLot = parkingLotRepository.findByName(reservationRequestDTO.getParkingLotName())
                .orElseThrow(() -> new EntityNotFoundException("Parking Lot not found: " + reservationRequestDTO.getParkingLotName()));

        log.info("🅿️ ParkingLot before update - Name: {}, Available: {}/{}", 
            parkingLot.getName(), parkingLot.getAvailableSpaces(), parkingLot.getTotalSpaces());

        // 3. Find and PESSIMISTIC_WRITE_LOCK the ParkingSpace
        ParkingSpace parkingSpace = parkingSpaceRepository.findByParkingLotAndSpotCode(parkingLot, reservationRequestDTO.getSpotCode())
                .orElseThrow(() -> new EntityNotFoundException("Parking Space not found: " + reservationRequestDTO.getSpotCode()));

        // --- END OF DEADLOCK FIX ---

        // 4. Check availability
        if (!parkingSpace.isAvailable()) {
            throw new IllegalStateException("Parking space " + parkingSpace.getSpotCode() + " is not available.");
        }

        // 5. Update the entities (in memory)
        parkingSpace.setIsAvailable(false);
        int newAvailableSpaces = parkingLot.getAvailableSpaces() - 1;
        parkingLot.setAvailableSpaces(newAvailableSpaces);
        log.info("🅿️ ParkingLot after update - Name: {}, Available: {}/{}", 
            parkingLot.getName(), newAvailableSpaces, parkingLot.getTotalSpaces());

        // 6. Create the reservation
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setCar(car);
        reservation.setParkingSpace(parkingSpace);
        reservation.setStatus("LIVE");

        ZonedDateTime startTime = reservationRequestDTO.getStartTime();
        long durationInMinutes = (long) (reservationRequestDTO.getDurationHours() * 60);
        ZonedDateTime endTime = startTime.plusMinutes(durationInMinutes);

        log.info("⏰ Setting reservation times - startTime: {}, endTime: {}", startTime, endTime);
        reservation.setStartTime(startTime.toLocalDateTime());
        reservation.setEndTime(endTime.toLocalDateTime());
        log.info("✅ Reservation times set - startTime: {}, endTime: {}", reservation.getStartTime(), reservation.getEndTime());

        // 7. Save the new reservation
        //    (Hibernate will also save the changes to parkingSpace and parkingLot at this point)
        Reservation savedReservation = reservationRepository.save(reservation);
        log.info("💾 Reservation saved - ID: {}, startTime: {}, endTime: {}", savedReservation.getId(), savedReservation.getStartTime(), savedReservation.getEndTime());

        // 8. Broadcast the update
        try {
            String spotTopic = "/topic/spots/" + parkingLot.getName();
            ParkingSpaceDTO updatedSpotDTO = new ParkingSpaceDTO(parkingSpace.getId(), parkingSpace.getSpotCode(), false);
            messagingTemplate.convertAndSend(spotTopic, updatedSpotDTO);

            // You can also broadcast the lot update
            String lotTopic = "/topic/lots";
            ParkingLotResponseDTO updatedLotDTO = new ParkingLotResponseDTO(parkingLot.getId(), parkingLot.getName(), parkingLot.getLocation(), parkingLot.getTotalSpaces(), parkingLot.getAvailableSpaces());
            messagingTemplate.convertAndSend(lotTopic, updatedLotDTO);

        } catch (Exception e) {
            log.warn("Failed to send WebSocket update for reservation {}. DB was saved.", savedReservation.getId(), e);
        }

        return savedReservation;
    }

    @Transactional
    public void cleanupExpiredReservations() {
        LocalDateTime now = LocalDateTime.now();
        List<Reservation> expiredReservations = reservationRepository.findByStatusAndEndTimeBefore("LIVE", now);

        for (Reservation reservation : expiredReservations) {
            reservation.setStatus("EXPIRED");
            // No need to save here, @Transactional will handle it

            ParkingSpace space = reservation.getParkingSpace();
            if (space != null) {
                space.setIsAvailable(true);
                ParkingLot parkingLot = space.getParkingLot();
                parkingLot.setAvailableSpaces(parkingLot.getAvailableSpaces() + 1);

                // Broadcast the updates
                try {
                    String spotTopic = "/topic/spots/" + parkingLot.getName();
                    ParkingSpaceDTO updatedSpotDTO = new ParkingSpaceDTO(space.getId(), space.getSpotCode(), true);
                    messagingTemplate.convertAndSend(spotTopic, updatedSpotDTO);

                    String lotTopic = "/topic/lots";
                    ParkingLotResponseDTO updatedLotDTO = new ParkingLotResponseDTO(parkingLot.getId(), parkingLot.getName(), parkingLot.getLocation(), parkingLot.getTotalSpaces(), parkingLot.getAvailableSpaces());
                    messagingTemplate.convertAndSend(lotTopic, updatedLotDTO);
                } catch (Exception e) {
                    log.warn("Failed to send WebSocket update for expired reservation {}. Cleanup was saved.", reservation.getId(), e);
                }
            }
        }
        // All changes will be saved when the transaction commits
    }

    public List<ReservationResponseDTO> getReservationsByUsername(String username) {
        List<Reservation> reservations = reservationRepository.findByUser_Username(username);
        return reservations.stream()
                .map(ReservationResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public Reservation updateReservation(Integer reservationId, ReservationRequestDTO updateDTO, String username) {
        Reservation reservation = reservationRepository.findById((long) reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found: " + reservationId));

        if (!reservation.getUser().getUsername().equals(username)) {
            throw new IllegalStateException("User is not authorized to update this reservation.");
        }

        if (updateDTO.getStartTime() != null) {
            reservation.setStartTime(updateDTO.getStartTime().toLocalDateTime());
        }
        if (updateDTO.getDurationHours() != null && updateDTO.getStartTime() != null) {
            long durationInMinutes = (long) (updateDTO.getDurationHours() * 60);
            ZonedDateTime endTime = updateDTO.getStartTime().plusMinutes(durationInMinutes);
            reservation.setEndTime(endTime.toLocalDateTime());
        }

        Reservation updatedReservation = reservationRepository.save(reservation);
        return updatedReservation;
    }

    @Transactional
    public void cancelReservation(Integer reservationId, String username) {
        Reservation reservation = reservationRepository.findById((long) reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found: " + reservationId));

        if (!reservation.getUser().getUsername().equals(username)) {
            throw new IllegalStateException("User is not authorized to cancel this reservation.");
        }

        reservation.setStatus("CANCELLED");

        ParkingSpace space = reservation.getParkingSpace();
        space.setIsAvailable(true);
        ParkingLot lot = space.getParkingLot();
        lot.setAvailableSpaces(lot.getAvailableSpaces() + 1);

        reservationRepository.save(reservation);
    }
}

