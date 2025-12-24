package net.pbl.parking_backend.Controller;

import jakarta.validation.Valid;
import net.pbl.parking_backend.Entity.User;
import net.pbl.parking_backend.dto.RegisterRequest;
import net.pbl.parking_backend.dto.UserResponse;
import net.pbl.parking_backend.Mapper.UserMapper;
import net.pbl.parking_backend.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;

    // Manual constructor for dependency injection
    public AuthController(AuthenticationService authenticationService, UserMapper userMapper) {
        this.authenticationService = authenticationService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        User savedUser = authenticationService.register(request);
        return ResponseEntity.ok(userMapper.userToUserResponse(savedUser));
    }
}