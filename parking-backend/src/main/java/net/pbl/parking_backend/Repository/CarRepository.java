package net.pbl.parking_backend.Repository;

import net.pbl.parking_backend.Entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {
}
