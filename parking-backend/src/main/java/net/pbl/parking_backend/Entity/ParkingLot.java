package net.pbl.parking_backend.Entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "PARKING_LOT")
public class ParkingLot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lot_id")
    private Integer lotId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "capacity")
    private Integer capacity;

    @OneToMany(mappedBy = "parkingLot", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ParkingSpace> parkingSpaces;

    // No-argument constructor
    public ParkingLot() {
    }

    // All-argument constructor
    public ParkingLot(Integer lotId, String name, String address, Integer capacity, Set<ParkingSpace> parkingSpaces) {
        this.lotId = lotId;
        this.name = name;
        this.address = address;
        this.capacity = capacity;
        this.parkingSpaces = parkingSpaces;
    }

    // Getters and Setters
    public Integer getLotId() {
        return lotId;
    }

    public void setLotId(Integer lotId) {
        this.lotId = lotId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Set<ParkingSpace> getParkingSpaces() {
        return parkingSpaces;
    }

    public void setParkingSpaces(Set<ParkingSpace> parkingSpaces) {
        this.parkingSpaces = parkingSpaces;
    }
}