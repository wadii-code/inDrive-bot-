package com.drivebotpro.rules;

import android.graphics.Rect;

public class RideOffer {

    public enum Source { ACCESSIBILITY, OCR }

    public double price;
    public double distanceKm;
    public double clientRating;
    public Rect   acceptNodeBounds;
    public Source source = Source.ACCESSIBILITY;

    public double profitPerKm() {
        return distanceKm > 0 ? price / distanceKm : 0;
    }

    @Override
    public String toString() {
        return String.format("RideOffer{price=%.0f MAD, dist=%.1f km, rating=%.1f, src=%s}",
                price, distanceKm, clientRating, source);
    }
}
