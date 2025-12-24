package com.parking.smart_parking_system.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private final ReservationService reservationService;

    public ScheduledTasks(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @Scheduled(fixedRate = 60000)
    public void reportCurrentTime() {
        log.info("Running scheduled job: Cleaning up expired reservations...");
        reservationService.cleanupExpiredReservations();
    }
}
