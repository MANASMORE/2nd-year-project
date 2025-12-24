package com.parking.smart_parking_system.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "parking_lot")
public class ParkingLot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(name = "total_spaces")
    private Integer totalSpaces;

    @Column(name = "available_spaces")
    private Integer availableSpaces;

    @OneToMany(mappedBy = "parkingLot", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ParkingSpace> parkingSpaces;

    // --- Getters and Setters ---

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

    public Integer getTotalSpaces() {
        return totalSpaces;
    }

    public void setTotalSpaces(Integer totalSpaces) {
        this.totalSpaces = totalSpaces;
    }

    public Integer getAvailableSpaces() {
        return availableSpaces;
    }

    public void setAvailableSpaces(Integer availableSpaces) {
        this.availableSpaces = availableSpaces;
    }

    public List<ParkingSpace> getParkingSpaces() {
        return parkingSpaces;
    }

    public void setParkingSpaces(List<ParkingSpace> parkingSpaces) {
        this.parkingSpaces = parkingSpaces;
    }

    /**
     * Calculate available spaces dynamically from parking spaces
     * This ensures the count is always accurate
     */
    public int calculateAvailableSpaces() {
        if (parkingSpaces == null || parkingSpaces.isEmpty()) {
            System.out.println("⚠️ ParkingSpaces list is null or empty for lot: " + this.name);
            return totalSpaces != null ? totalSpaces : 0;
        }
        
        long availableCount = parkingSpaces.stream()
                .filter(ParkingSpace::isAvailable)
                .count();
        
        System.out.println("🅿️ Lot: " + this.name + ", Total: " + parkingSpaces.size() + 
                          ", Available: " + availableCount + 
                          ", Details: " + parkingSpaces.stream()
                          .map(ps -> ps.getSpotCode() + "=" + ps.isAvailable())
                          .collect(java.util.stream.Collectors.joining(", ")));
        
        return (int) availableCount;
    }

    /**
     * Sync available spaces count with actual available parking spaces
     * Call this if the database is out of sync
     */
    public void syncAvailableSpaces() {
        int calculatedAvailable = calculateAvailableSpaces();
        if (this.availableSpaces != calculatedAvailable) {
            System.out.println("🔄 Syncing available spaces for " + this.name + 
                              ": " + this.availableSpaces + " -> " + calculatedAvailable);
            this.availableSpaces = calculatedAvailable;
        }
    }
}
