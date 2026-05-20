package com.drivebotpro.automation;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.GestureDescription;
import android.graphics.Path;
import android.graphics.Rect;
import android.view.accessibility.AccessibilityNodeInfo;

import com.drivebotpro.rules.FilterRules;
import com.drivebotpro.rules.RideOffer;
import com.drivebotpro.utils.DelayUtils;
import com.drivebotpro.utils.NodeUtils;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public class RideAutomationEngine {

    private final AccessibilityService service;
    private final ExecutorService executor;
    private final AtomicBoolean running = new AtomicBoolean(false);
    private final AtomicBoolean processing = new AtomicBoolean(false);

    private FilterRules filterRules = FilterRules.defaults();

    public RideAutomationEngine(AccessibilityService service) {
        this.service = service;
        this.executor = Executors.newSingleThreadExecutor();
    }

    public void start() { running.set(true); }
    public void pause() { running.set(false); }
    public void stop()  { running.set(false); executor.shutdownNow(); }
    public boolean isRunning() { return running.get(); }

    public void setFilterRules(FilterRules rules) { this.filterRules = rules; }

    public void evaluate(final RideOffer offer) {
        if (!running.get() || processing.getAndSet(true)) return;

        executor.execute(() -> {
            try {
                emitEvent("DETECT", String.format(
                        "Ride detected: %.0f MAD | %.1f km | ★%.1f",
                        offer.price, offer.distanceKm, offer.clientRating));

                if (filterRules.passes(offer)) {
                    emitEvent("EVAL", String.format("Criteria met. Profit: %.1f MAD/km",
                            offer.price / offer.distanceKm));
                    DelayUtils.humanDelay();
                    tapAccept(offer.acceptNodeBounds);
                    emitEvent("SUCCESS", "Ride accepted.");
                } else {
                    emitEvent("SKIP", "Criteria failed. Ignoring offer.");
                }
            } finally {
                processing.set(false);
            }
        });
    }

    private void tapAccept(Rect bounds) {
        if (bounds == null) return;
        float x = bounds.exactCenterX();
        float y = bounds.exactCenterY();

        Path path = new Path();
        path.moveTo(x, y);

        GestureDescription.StrokeDescription stroke =
                new GestureDescription.StrokeDescription(path, 0, 50);

        GestureDescription gesture = new GestureDescription.Builder()
                .addStroke(stroke)
                .build();

        service.dispatchGesture(gesture, null, null);
    }

    private void emitEvent(String type, String message) {
        // Broadcast to React Native via BotEventModule
        BotEventModule.emit(type, message);
    }
}
