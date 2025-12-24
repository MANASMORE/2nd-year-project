package com.parking.smart_parking_system.service;

import com.parking.smart_parking_system.dto.CarDTO;
import com.parking.smart_parking_system.entity.Car;
import com.parking.smart_parking_system.entity.User;
import com.parking.smart_parking_system.exception.ResourceNotFoundException;
import com.parking.smart_parking_system.repository.CarRepository;
import com.parking.smart_parking_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public CarService(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    public void addCar(CarDTO carDto, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Car car = new Car();
        car.setMake(carDto.getMake());
        car.setModel(carDto.getModel());
        car.setLicensePlate(carDto.getLicensePlate());
        car.setUser(user);
        carRepository.save(car);
    }

    public List<CarDTO> getCarsByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Car> cars = carRepository.findByUser(user);
        return cars.stream()
                .map(car -> new CarDTO(car.getId(), car.getMake(), car.getModel(), car.getLicensePlate()))
                .collect(Collectors.toList());
    }
}
