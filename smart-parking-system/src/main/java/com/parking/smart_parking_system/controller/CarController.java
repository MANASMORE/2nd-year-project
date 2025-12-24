package com.parking.smart_parking_system.controller;

import com.parking.smart_parking_system.dto.CarDTO;
import com.parking.smart_parking_system.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*", maxAge = 3600) // For development purposes
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping
    public ResponseEntity<?> addCar(@RequestBody CarDTO carDto, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        carService.addCar(carDto, username);
        return ResponseEntity.ok("Car added successfully");
    }

    @GetMapping
    public ResponseEntity<List<CarDTO>> getUserCars(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<CarDTO> carDTOs = carService.getCarsByUsername(username);
        return ResponseEntity.ok(carDTOs);
    }
}

