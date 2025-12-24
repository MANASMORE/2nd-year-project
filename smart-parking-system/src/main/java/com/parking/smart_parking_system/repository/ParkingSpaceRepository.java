package com.parking.smart_parking_system.repository;

import com.parking.smart_parking_system.entity.ParkingLot;
import com.parking.smart_parking_system.entity.ParkingSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// --- ADD THIS IMPORT ---
import org.springframework.data.jpa.repository.Lock;
import jakarta.persistence.LockModeType;
// --- END OF IMPORT ---

import java.util.List;
import java.util.Optional;

@Repository
public interface ParkingSpaceRepository extends JpaRepository<ParkingSpace, Integer> {

    // --- ADD THE @Lock ANNOTATION HERE ---
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<ParkingSpace> findByParkingLotAndSpotCode(ParkingLot parkingLot, String spotCode);
    // --- END OF FIX ---

    List<ParkingSpace> findByParkingLotName(String lotName);
}