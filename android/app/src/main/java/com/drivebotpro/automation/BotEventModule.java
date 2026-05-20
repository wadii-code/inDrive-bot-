package com.drivebotpro.automation;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

/**
 * Bridges native bot events to React Native's event emitter.
 * JS side: new NativeEventEmitter(NativeModules.DriveBotEngine).addListener('BotEvent', ...)
 */
public class BotEventModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    public BotEventModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() { return "DriveBotEngine"; }

    public static void emit(String type, String message) {
        if (reactContext == null) return;
        WritableMap payload = Arguments.createMap();
        payload.putString("type", type);
        payload.putString("message", message);
        payload.putDouble("timestamp", System.currentTimeMillis());
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("BotEvent", payload);
    }

    @ReactMethod
    public void addListener(String eventName) { /* required for RN event emitter */ }

    @ReactMethod
    public void removeListeners(Integer count) { /* required for RN event emitter */ }

    @ReactMethod
    public void startService(String packageName) {
        // Handled by AccessibilityService — this triggers overlay and starts the engine
    }

    @ReactMethod
    public void stopService() { /* stop handled by AccessibilityService */ }
}
