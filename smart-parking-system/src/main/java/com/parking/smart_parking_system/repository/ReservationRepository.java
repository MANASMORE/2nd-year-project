package com.parking.smart_parking_system.repository;

import com.parking.smart_parking_system.entity.Reservation;
import com.parking.smart_parking_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    List<Reservation> findAllByEndTimeBefore(LocalDateTime timestamp);
    List<Reservation> findByUser_Username(String username);
    List<Reservation> findByStatusAndEndTimeBefore(String status, LocalDateTime currentTime);
}