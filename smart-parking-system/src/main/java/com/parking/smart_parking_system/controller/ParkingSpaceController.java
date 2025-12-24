package com.parking.smart_parking_system.controller;

// Import the new DTO and Service
import com.parking.smart_parking_system.dto.ParkingSpaceDTO;
import com.parking.smart_parking_system.service.ParkingSpaceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/parking-spaces")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ParkingSpaceController {

    // --- CHANGE 1: Inject the Service instead of the Repository ---
    private final ParkingSpaceService parkingSpaceService;

    public ParkingSpaceController(ParkingSpaceService parkingSpaceService) {
        this.parkingSpaceService = parkingSpaceService;
    }

    // --- CHANGE 2: Update the method to use the service and return the DTO ---
    @GetMapping("/lot/{lotName}")
    public ResponseEntity<List<ParkingSpaceDTO>> getSpacesByLotName(@PathVariable String lotName) {
        // Call the service method to get the list of DTOs
        List<ParkingSpaceDTO> spaces = parkingSpaceService.getSpacesByLotName(lotName);

        // Return the DTO list in the response
        return ResponseEntity.ok(spaces);
    }
}