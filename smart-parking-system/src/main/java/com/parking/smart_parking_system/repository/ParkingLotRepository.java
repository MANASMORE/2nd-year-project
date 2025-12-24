package com.parking.smart_parking_system.repository;

import com.parking.smart_parking_system.entity.ParkingLot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

public interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<ParkingLot> findByName(String name);
    List<ParkingLot> findByLocationContainingIgnoreCase(String location);
}
