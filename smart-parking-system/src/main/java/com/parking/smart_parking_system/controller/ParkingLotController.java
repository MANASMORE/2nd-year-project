package com.parking.smart_parking_system.controller;

import com.parking.smart_parking_system.service.ParkingLotService;
import com.parking.smart_parking_system.dto.ParkingLotResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parking-lots")
@CrossOrigin(origins = "*", maxAge = 3600) // Enable CORS for all origins
public class ParkingLotController {

    @Autowired
    private ParkingLotService parkingLotService;

    @GetMapping
    // @PreAuthorize was removed here to assist with debugging connectivity issues
    public ResponseEntity<List<ParkingLotResponseDTO>> getAllParkingLots() {
        List<ParkingLotResponseDTO> parkingLots = parkingLotService.getAllParkingLots();
        return ResponseEntity.ok(parkingLots);
    }
}
