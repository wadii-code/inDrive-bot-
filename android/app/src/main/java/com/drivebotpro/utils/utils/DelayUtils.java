package com.drivebotpro.utils;

import java.util.Random;

public class DelayUtils {

    private static final Random RANDOM = new Random();
    private static final int MIN_HUMAN_DELAY_MS = 600;
    private static final int MAX_HUMAN_DELAY_MS = 1200;

    public static void humanDelay() {
        int delay = MIN_HUMAN_DELAY_MS + RANDOM.nextInt(MAX_HUMAN_DELAY_MS - MIN_HUMAN_DELAY_MS);
        sleep(delay);
    }

    public static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static int randomBetween(int min, int max) {
        return min + RANDOM.nextInt(max - min);
    }
}
