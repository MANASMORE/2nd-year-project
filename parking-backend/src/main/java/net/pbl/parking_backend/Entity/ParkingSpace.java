package net.pbl.parking_backend.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PARKING_SPACE")
public class ParkingSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "space_id")
    private Integer spaceId;

    @Column(name = "is_occupied")
    private boolean isOccupied;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lot_id", referencedColumnName = "lot_id", nullable = false)
    private ParkingLot parkingLot;

    // No-argument constructor
    public ParkingSpace() {
    }

    // All-argument constructor
    public ParkingSpace(Integer spaceId, boolean isOccupied, LocalDateTime timestamp, ParkingLot parkingLot) {
        this.spaceId = spaceId;
        this.isOccupied = isOccupied;
        this.timestamp = timestamp;
        this.parkingLot = parkingLot;
    }

    // Getters and Setters
    public Integer getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(Integer spaceId) {
        this.spaceId = spaceId;
    }

    public boolean isOccupied() {
        return isOccupied;
    }

    public void setOccupied(boolean occupied) {
        isOccupied = occupied;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public ParkingLot getParkingLot() {
        return parkingLot;
    }

    public void setParkingLot(ParkingLot parkingLot) {
        this.parkingLot = parkingLot;
    }
}