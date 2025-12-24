package com.parking.smart_parking_system.service;

import com.parking.smart_parking_system.dto.ParkingSpaceDTO;
import com.parking.smart_parking_system.entity.ParkingSpace;
import com.parking.smart_parking_system.repository.ParkingSpaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParkingSpaceService {

    @Autowired
    private ParkingSpaceRepository parkingSpaceRepository;

    /**
     * Fetches all parking spaces for a specific parking lot by its name.
     * @param lotName The name of the parking lot.
     * @return A list of DTOs representing the available parking spaces.
     */
    public List<ParkingSpaceDTO> getSpacesByLotName(String lotName) {
        // Use the new repository method to get the list of entities
        List<ParkingSpace> spaces = parkingSpaceRepository.findByParkingLotName(lotName);

        // Convert the list of entities into a list of DTOs for the frontend
        return spaces.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Helper method to convert a ParkingSpace entity to a ParkingSpaceDTO.
     */
    private ParkingSpaceDTO convertToDto(ParkingSpace space) {
        return new ParkingSpaceDTO(
                space.getId(),
                space.getSpotCode(),
                space.isAvailable() // Assumes your entity has an isAvailable() method
        );
    }
}