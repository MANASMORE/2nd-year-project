package com.parking.smart_parking_system.config;

import com.parking.smart_parking_system.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct; // <-- 1. IMPORT THIS
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey; // <-- 2. IMPORT THIS
import java.security.Key;
import java.util.Base64; // We are no longer using this for decoding, but it's good to keep
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    // --- WE NO LONGER READ THE SECRET FROM THE PROPERTIES FILE ---
    // @Value("${app.jwtSecret}")
    // private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    // --- THIS IS THE FIX ---
    // 1. Create a Key field that will hold our in-memory key.
    private Key signingKey;

    /**
     * This method runs *once* when the server starts.
     * It generates a new, secure, random key and stores it.
     * Every time the server restarts, a *different* key will be generated,
     * automatically invalidating all old tokens.
     */
    @PostConstruct
    public void init() {
        // 2. Generate a new, cryptographically secure key for HS256.
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        this.signingKey = key;

        // Optional: You can log this in DEV, but remove it in production.
        // String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
        // logger.info("Generated new in-memory JWT signing key: {}", base64Key);
    }

    private Key getSigningKey() {
        // 3. Return the key we generated on startup.
        return this.signingKey;
    }
    // --- END OF FIX ---


    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            logger.info("🔐 Validating JWT token...");
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            logger.info("✅ JWT token is valid");
            return true;
        } catch (SignatureException e) { // <-- This will now catch old tokens
            logger.error("❌ Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("❌ Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("❌ JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("❌ JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("❌ JWT claims string is empty: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("❌ JWT validation error: {}", e.getMessage(), e);
        }
        return false;
    }
}