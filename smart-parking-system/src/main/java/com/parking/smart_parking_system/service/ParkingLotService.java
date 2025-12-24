package com.parking.smart_parking_system.service;

import com.parking.smart_parking_system.entity.ParkingLot;
import com.parking.smart_parking_system.repository.ParkingLotRepository;
import com.parking.smart_parking_system.dto.ParkingLotResponseDTO; // New Import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors; // New Import

@Service
public class ParkingLotService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;

    /**
     * Helper method to map ParkingLot Entity to DTO.
     * It uses the entity's method to dynamically calculate available spaces.
     */
    private ParkingLotResponseDTO convertToDto(ParkingLot parkingLot) {
        // Sync the available spaces to ensure accuracy
        parkingLot.syncAvailableSpaces();
        
        // Calculate available spaces dynamically from parking spaces
        // This ensures accuracy even if the database value is out of sync
        int totalSpaces = parkingLot.getTotalSpaces();
        int availableSpaces = parkingLot.calculateAvailableSpaces();

        return new ParkingLotResponseDTO(
                parkingLot.getId(),
                parkingLot.getName(),
                parkingLot.getLocation(),
                totalSpaces,
                availableSpaces
        );
    }

    /**
     * Fetches all parking lots from the database and maps them to DTOs.
     * @return A list of ParkingLotResponseDTO objects.
     */
    public List<ParkingLotResponseDTO> getAllParkingLots() { // Changed return type
        List<ParkingLot> parkingLots = parkingLotRepository.findAll();

        return parkingLots.stream()
                .map(this::convertToDto) // Map each entity to its DTO
                .collect(Collectors.toList());
    }
}
