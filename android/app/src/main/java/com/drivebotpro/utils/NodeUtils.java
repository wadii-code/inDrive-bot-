package com.drivebotpro.utils;

import android.graphics.Rect;
import android.view.accessibility.AccessibilityNodeInfo;

import com.drivebotpro.rules.RideOffer;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NodeUtils {

    private static final Pattern PRICE_PATTERN    = Pattern.compile("(\\d+(?:\\.\\d+)?)\\s*MAD");
    private static final Pattern DISTANCE_PATTERN = Pattern.compile("(\\d+(?:\\.\\d+)?)\\s*km");
    private static final Pattern RATING_PATTERN   = Pattern.compile("[★*](\\d+(?:\\.\\d+)?)");

    public static RideOffer parseRideOffer(AccessibilityNodeInfo root) {
        String fullText = extractAllText(root);
        if (fullText == null || fullText.isEmpty()) return null;

        double price = extractDouble(PRICE_PATTERN, fullText);
        double dist  = extractDouble(DISTANCE_PATTERN, fullText);
        if (price <= 0 || dist <= 0) return null;

        RideOffer offer = new RideOffer();
        offer.price = price;
        offer.distanceKm = dist;
        offer.clientRating = extractDouble(RATING_PATTERN, fullText);
        offer.acceptNodeBounds = findAcceptButtonBounds(root);
        return offer;
    }

    private static String extractAllText(AccessibilityNodeInfo node) {
        if (node == null) return "";
        StringBuilder sb = new StringBuilder();
        if (node.getText() != null) sb.append(node.getText()).append(" ");
        if (node.getContentDescription() != null) sb.append(node.getContentDescription()).append(" ");
        for (int i = 0; i < node.getChildCount(); i++) {
            sb.append(extractAllText(node.getChild(i)));
        }
        return sb.toString();
    }

    private static Rect findAcceptButtonBounds(AccessibilityNodeInfo root) {
        return findNodeByText(root, new String[]{"Accept", "قبول", "Accepter"});
    }

    private static Rect findNodeByText(AccessibilityNodeInfo node, String[] keywords) {
        if (node == null) return null;
        if (node.getText() != null) {
            String text = node.getText().toString();
            for (String kw : keywords) {
                if (text.equalsIgnoreCase(kw) && node.isClickable()) {
                    Rect bounds = new Rect();
                    node.getBoundsInScreen(bounds);
                    return bounds;
                }
            }
        }
        for (int i = 0; i < node.getChildCount(); i++) {
            Rect result = findNodeByText(node.getChild(i), keywords);
            if (result != null) return result;
        }
        return null;
    }

    private static double extractDouble(Pattern p, String text) {
        Matcher m = p.matcher(text);
        return m.find() ? Double.parseDouble(m.group(1)) : 0;
    }
}
