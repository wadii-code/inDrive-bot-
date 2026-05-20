package com.drivebotpro.overlay;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;

public class FloatingOverlayService extends Service {

    private WindowManager windowManager;
    private View overlayView;
    private WindowManager.LayoutParams params;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);

        overlayView = LayoutInflater.from(this).inflate(
                com.drivebotpro.R.layout.floating_overlay, null);

        params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.END;
        params.x = 16;
        params.y = 120;

        windowManager.addView(overlayView, params);
        setupDrag();

        return START_STICKY;
    }

    public void updateStatus(String state) {
        if (overlayView == null) return;
        TextView tv = overlayView.findViewById(com.drivebotpro.R.id.overlay_status);
        if (tv != null) tv.setText(state);
    }

    private void setupDrag() {
        overlayView.setOnTouchListener(new View.OnTouchListener() {
            float initX, initY, initTouchX, initTouchY;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        initX = params.x;
                        initY = params.y;
                        initTouchX = event.getRawX();
                        initTouchY = event.getRawY();
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        params.x = (int)(initX + (initTouchX - event.getRawX()));
                        params.y = (int)(initY + (event.getRawY() - initTouchY));
                        windowManager.updateViewLayout(overlayView, params);
                        return true;
                }
                return false;
            }
        });
    }

    @Override
    public void onDestroy() {
        if (overlayView != null) windowManager.removeView(overlayView);
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) { return null; }
}
