package com.parking.smart_parking_system.controller;

import com.parking.smart_parking_system.dto.ReservationRequestDTO;
import com.parking.smart_parking_system.dto.ReservationResponseDTO;
import com.parking.smart_parking_system.entity.Reservation;
import com.parking.smart_parking_system.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReservationController {

    private static final Logger log = LoggerFactory.getLogger(ReservationController.class);
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReservationResponseDTO> createReservation(@RequestBody ReservationRequestDTO reservationRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        log.info("📨 Received reservation request from user: {}", username);
        log.info("📍 Request DTO: carId={}, parkingLotName={}, spotCode={}, startTime={}, durationHours={}", 
            reservationRequestDTO.getCarId(),
            reservationRequestDTO.getParkingLotName(),
            reservationRequestDTO.getSpotCode(),
            reservationRequestDTO.getStartTime(),
            reservationRequestDTO.getDurationHours());

        Reservation newReservation = reservationService.createReservation(reservationRequestDTO, username);
        ReservationResponseDTO responseDTO = ReservationResponseDTO.fromEntity(newReservation);

        log.info("✅ Reservation created successfully - ID: {}, startTime: {}, endTime: {}", 
            responseDTO.id(), responseDTO.startTime(), responseDTO.endTime());

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ReservationResponseDTO>> getReservations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        List<ReservationResponseDTO> reservations = reservationService.getReservationsByUsername(username);

        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/{reservationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReservationResponseDTO> updateReservation(
            @PathVariable Integer reservationId,
            @RequestBody ReservationRequestDTO updateDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Reservation updatedReservation = reservationService.updateReservation(reservationId, updateDTO, username);
        ReservationResponseDTO responseDTO = ReservationResponseDTO.fromEntity(updatedReservation);

        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{reservationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> cancelReservation(@PathVariable Integer reservationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        reservationService.cancelReservation(reservationId, username);

        return ResponseEntity.noContent().build();
    }
}
