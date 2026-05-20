package com.drivebotpro.services;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;

import com.drivebotpro.automation.RideAutomationEngine;
import com.drivebotpro.rules.RideOffer;
import com.drivebotpro.utils.NodeUtils;

public class DriveAccessibilityService extends AccessibilityService {

    private RideAutomationEngine engine;

    @Override
    public void onServiceConnected() {
        AccessibilityServiceInfo info = getServiceInfo();
        info.eventTypes = AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
                        | AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED;
        info.packageNames = new String[]{"com.rideshare.driver.app"};
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
        info.notificationTimeout = 100;
        setServiceInfo(info);

        engine = new RideAutomationEngine(this);
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if (engine == null || !engine.isRunning()) return;

        AccessibilityNodeInfo root = getRootInActiveWindow();
        if (root == null) return;

        try {
            RideOffer offer = NodeUtils.parseRideOffer(root);
            if (offer != null) {
                engine.evaluate(offer);
            }
        } finally {
            root.recycle();
        }
    }

    @Override
    public void onInterrupt() {
        if (engine != null) engine.pause();
    }

    @Override
    public void onDestroy() {
        if (engine != null) engine.stop();
        super.onDestroy();
    }
}
