package com.parking.smart_parking_system.dto;

/**
 * Data Transfer Object for exposing Parking Lot details to the client.
 * This decouples the API contract from the JPA entity model.
 */
public class ParkingLotResponseDTO {
    private Integer id;
    private String name;
    private String location;
    private int totalSpaces;
    private int availableSpaces;

    // Constructors
    public ParkingLotResponseDTO() {}

    // Updated constructor signature
    public ParkingLotResponseDTO(Integer id, String name, String location, int totalSpaces, int availableSpaces) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.totalSpaces = totalSpaces;
        this.availableSpaces = availableSpaces;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getTotalSpaces() {
        return totalSpaces;
    }

    public void setTotalSpaces(int totalSpaces) {
        this.totalSpaces = totalSpaces;
    }

    public int getAvailableSpaces() {
        return availableSpaces;
    }

    public void setAvailableSpaces(int availableSpaces) {
        this.availableSpaces = availableSpaces;
    }
}
