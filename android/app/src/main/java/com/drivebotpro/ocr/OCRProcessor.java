package com.drivebotpro.ocr;

import android.graphics.Bitmap;

import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import com.drivebotpro.rules.RideOffer;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Fallback OCR-based ride offer parser when Accessibility nodes are unavailable.
 * Uses Google ML Kit Text Recognition on a screen region bitmap.
 */
public class OCRProcessor {

    private final TextRecognizer recognizer;

    // Patterns to extract: "85 MAD", "2.1 km", "4.8"
    private static final Pattern PRICE_PATTERN    = Pattern.compile("(\\d+(?:\\.\\d+)?)\\s*MAD");
    private static final Pattern DISTANCE_PATTERN = Pattern.compile("(\\d+(?:\\.\\d+)?)\\s*km");
    private static final Pattern RATING_PATTERN   = Pattern.compile("[★*](\\d+(?:\\.\\d+)?)");

    public OCRProcessor() {
        recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
    }

    public void processScreenshot(Bitmap bitmap, OCRCallback callback) {
        InputImage image = InputImage.fromBitmap(bitmap, 0);
        recognizer.process(image)
            .addOnSuccessListener(result -> callback.onResult(parseOffer(result)))
            .addOnFailureListener(e -> callback.onError(e));
    }

    private RideOffer parseOffer(Text result) {
        String fullText = result.getText();
        double price = extractDouble(PRICE_PATTERN, fullText);
        double distance = extractDouble(DISTANCE_PATTERN, fullText);
        double rating = extractDouble(RATING_PATTERN, fullText);

        if (price <= 0 || distance <= 0) return null;

        RideOffer offer = new RideOffer();
        offer.price = price;
        offer.distanceKm = distance;
        offer.clientRating = rating;
        offer.source = RideOffer.Source.OCR;
        return offer;
    }

    private double extractDouble(Pattern pattern, String text) {
        Matcher m = pattern.matcher(text);
        return m.find() ? Double.parseDouble(m.group(1)) : 0;
    }

    public interface OCRCallback {
        void onResult(RideOffer offer);
        void onError(Exception e);
    }
}
