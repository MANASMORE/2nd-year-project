package com.parking.smart_parking_system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles service-level exceptions, such as a parking spot being unavailable.
     * This prevents the exception from bubbling up to the Spring Security
     * filter, which would incorrectly return a 401 Unauthorized.
     *
     * @param ex The IllegalStateException that was thrown.
     * @return A ResponseEntity with the error message and an HTTP 409 Conflict status.
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalStateException(IllegalStateException ex) {
        // Log the error for debugging (optional)
        System.err.println("Handling service exception: " + ex.getMessage());

        // Return a 409 Conflict status. This tells the client
        // "Your request is valid, but it conflicts with the current
        // state of the resource (e.g., the spot is already taken)."
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}