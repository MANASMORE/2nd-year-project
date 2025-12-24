package net.pbl.parking_backend.dto;

import net.pbl.parking_backend.Entity.Role;
import net.pbl.parking_backend.Entity.User;

public class UserResponse {

    private String username;
    private String email;
    private String phone_number;
    private Role role;

    // --- Getters and Setters ---
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone_number() { return phone_number; }
    public void setPhone_number(String phone_number) { this.phone_number = phone_number; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    // --- Manual Builder ---
    public static UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }

    public static class UserResponseBuilder {
        private String username;
        private String email;
        private String phone_number;
        private Role role;

        public UserResponseBuilder username(String username) { this.username = username; return this; }
        public UserResponseBuilder email(String email) { this.email = email; return this; }
        public UserResponseBuilder phone_number(String phone_number) { this.phone_number = phone_number; return this; }
        public UserResponseBuilder role(Role role) { this.role = role; return this; }

        public UserResponse build() {
            UserResponse response = new UserResponse();
            response.setUsername(this.username);
            response.setEmail(this.email);
            response.setPhone_number(this.phone_number);
            response.setRole(this.role);
            return response;
        }
    }
}