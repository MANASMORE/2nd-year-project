package com.parking.smart_parking_system.repository;

import com.parking.smart_parking_system.entity.Car;
import com.parking.smart_parking_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByUser(User user);
}
