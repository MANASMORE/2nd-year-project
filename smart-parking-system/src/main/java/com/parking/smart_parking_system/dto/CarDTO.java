package com.parking.smart_parking_system.dto;

import com.parking.smart_parking_system.entity.Car;
import jakarta.persistence.criteria.CriteriaBuilder;

public class CarDTO {
    private Integer id;
    private String make;
    private String model;
    private String licensePlate;

    // Constructors
    public CarDTO() {
    }

    public CarDTO(Integer id, String make, String model, String licensePlate) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.licensePlate = licensePlate;
    }

    // This is a convenient factory method to create a DTO from an entity
    public static CarDTO fromEntity(Car car) {
        return new CarDTO(
                car.getId(),
                car.getMake(),
                car.getModel(),
                car.getLicensePlate()
        );
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }
}

