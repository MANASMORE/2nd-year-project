package com.parking.smart_parking_system.config;

import com.parking.smart_parking_system.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99) // Give it high priority
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private JwtTokenProvider jwtTokenProvider; // Inject your token provider

    @Autowired
    private UserDetailsServiceImpl userDetailsService; // Inject your user service

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Topic for broadcasting messages from server to clients
        config.enableSimpleBroker("/topic");
        // Prefix for messages sent from clients to the server
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // The endpoint clients will connect to
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    /**
     * This is the new, crucial method for security.
     * It configures an interceptor to read the token from the STOMP "CONNECT" frame.
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                // Look for the "CONNECT" command
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {

                    // Get the "Authorization" header from the STOMP headers
                    String authHeader = accessor.getFirstNativeHeader("Authorization");

                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        String jwt = authHeader.substring(7); // Extract the token

                        // Validate the token
                        if (jwtTokenProvider.validateJwtToken(jwt)) {
                            // Get username from token
                            String username = jwtTokenProvider.getUserNameFromJwtToken(jwt);
                            // Load user details
                            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                            // Create an authentication object
                            UsernamePasswordAuthenticationToken authentication =
                                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                            // This is the most important line:
                            // It sets the authenticated user for this WebSocket session
                            accessor.setUser(authentication);
                        }
                    }
                }
                return message;
            }
        });
    }
}