package com.parking.smart_parking_system.dto;

import com.parking.smart_parking_system.entity.ParkingSpace;

public record ParkingSpaceDTO(
        Integer id,
        String spotCode,
        boolean isAvailable
) {
    public static ParkingSpaceDTO fromEntity(ParkingSpace space) {
        if (space == null) {
            return null;
        }
        return new ParkingSpaceDTO(
                space.getId(),
                space.getSpotCode(),
                space.isAvailable()
        );
    }
}
