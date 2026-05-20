package com.drivebotpro.rules;

import java.util.Calendar;

public class FilterRules {

    public double minPrice      = 60;
    public double maxDistKm     = 4.0;
    public double minRating     = 4.5;
    public double minProfitPerKm = 10.0;
    public boolean nightModeEnabled = false;
    public boolean peakModeEnabled  = true;

    public static FilterRules defaults() { return new FilterRules(); }

    public boolean passes(RideOffer offer) {
        if (offer.price < minPrice) return false;
        if (offer.distanceKm > effectiveMaxDist()) return false;
        if (offer.clientRating < minRating) return false;
        if (offer.profitPerKm() < minProfitPerKm) return false;
        if (nightModeEnabled && !isNightHours()) {
            // night mode is on but it's not night — apply stricter price
            if (offer.price < minPrice * 1.3) return false;
        }
        return true;
    }

    private double effectiveMaxDist() {
        return (peakModeEnabled && isPeakHour()) ? maxDistKm * 1.5 : maxDistKm;
    }

    private boolean isNightHours() {
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        return hour >= 20 || hour < 5;
    }

    private boolean isPeakHour() {
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        return (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    }
}
