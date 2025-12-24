package com.parking.smart_parking_system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.parking.smart_parking_system.entity.Car;
import com.parking.smart_parking_system.entity.ParkingLot;
import com.parking.smart_parking_system.entity.ParkingSpace;
import com.parking.smart_parking_system.entity.Reservation;
import java.time.LocalDateTime;

/**
 * A "flattened" DTO that contains all relevant reservation info
 * for the frontend in a single, simple object.
 */
public record ReservationResponseDTO(
        Integer id,
        String status,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime startTime,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime endTime,

        // --- UPDATED FIELDS ---
        String licensePlate,  // Added from Car
        String spotCode,        // Pulled up from ParkingSpace
        String parkingLotName   // Pulled up from ParkingSpace's ParkingLot
) {
    /**
     * A static factory method to convert a Reservation entity into a ReservationResponseDTO.
     *
     * @param reservation The Reservation entity from the database.
     * @return A new ReservationResponseDTO containing frontend-friendly data.
     */
    public static ReservationResponseDTO fromEntity(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        // Get all the nested entities
        ParkingSpace space = reservation.getParkingSpace();
        Car car = reservation.getCar();

        // --- Handle potential nulls safely ---
        String spotCode = null;
        String parkingLotName = null;

        if (space != null) {
            spotCode = space.getSpotCode();
            ParkingLot lot = space.getParkingLot();
            if (lot != null) {
                parkingLotName = lot.getName();
                System.out.println("✅ DTO: parkingLotName = " + parkingLotName + ", spotCode = " + spotCode);
            } else {
                System.out.println("❌ DTO: ParkingLot is NULL for space " + spotCode);
            }
        } else {
            System.out.println("❌ DTO: ParkingSpace is NULL");
        }

        String licensePlate = (car != null) ? car.getLicensePlate() : null;

        System.out.println("📋 DTO Created: id=" + reservation.getId() + 
                ", startTime=" + reservation.getStartTime() + 
                ", endTime=" + reservation.getEndTime() +
                ", parkingLotName=" + parkingLotName +
                ", spotCode=" + spotCode);

        // --- Return the new "flat" DTO ---
        ReservationResponseDTO dto = new ReservationResponseDTO(
                reservation.getId(),
                reservation.getStatus(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                licensePlate,
                spotCode,
                parkingLotName
        );
        
        System.out.println("✅ DTO Returned: startTime=" + dto.startTime() + ", endTime=" + dto.endTime());
        
        return dto;
    }
}
