package net.pbl.parking_backend.service;

import net.pbl.parking_backend.dto.RegisterRequest;
import net.pbl.parking_backend.Entity.Role;
import net.pbl.parking_backend.Entity.User;
import net.pbl.parking_backend.Mapper.UserMapper;
import net.pbl.parking_backend.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    // Manual constructor for dependency injection
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public User register(RegisterRequest request) {
        if (userRepository.existsById(request.getUsername())) {
            throw new IllegalStateException("Username is already taken");
        }
        User user = userMapper.registerRequestToUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_USER);

        return userRepository.save(user);
    }
}