package net.pbl.parking_backend.Repository;

import net.pbl.parking_backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}