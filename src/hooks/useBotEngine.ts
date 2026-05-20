import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store';
import { BOT_STATES } from '../utils/constants';
import { sleep, randomBetween, randomInt, isNightHours } from '../utils/formatters';
import { DELAY_CONFIG } from '../utils/constants';

export const useBotEngine = () => {
  const {
    botState,
    isRunning,
    filters,
    setBotState,
    addLog,
    incrementAccepted,
    incrementRejected,
    onboardingDone,
  } = useAppStore();

  const cycleRef = useRef(false);

  const runCycle = useCallback(async () => {
    if (cycleRef.current) return;
    cycleRef.current = true;

    try {
      setBotState(BOT_STATES.SCANNING);
      addLog('SCAN', 'Initializing Accessibility Service...');
      await sleep(DELAY_CONFIG.initDelay + randomBetween(0, 1000));

      addLog('DETECT', 'Parsing UI tree: Found 24 nodes');
      await sleep(DELAY_CONFIG.nodeParseDelay);

      if (Math.random() > 0.7) {
        addLog('OCR', 'Fallback OCR triggered on text region');
        await sleep(DELAY_CONFIG.ocrFallbackDelay);
      }

      const price = randomInt(70, 120);
      const dist = parseFloat(randomBetween(0.5, 5).toFixed(1));
      const rating = parseFloat(randomBetween(4.2, 5.0).toFixed(1));
      const profit = parseFloat((price / dist).toFixed(1));

      addLog('DETECT', `Ride offer: ${price} MAD | ${dist} km | ★${rating}`);
      setBotState(BOT_STATES.EVALUATING);
      await sleep(1000);

      const passesFilters =
        price >= filters.minPrice &&
        dist <= filters.maxDist &&
        rating >= filters.minRating &&
        profit >= filters.minProf;

      const passesNight = !filters.nightMode || isNightHours();

      if (passesFilters && passesNight) {
        addLog('EVAL', `Criteria met. Profit: ${profit} MAD/km`);
        setBotState(BOT_STATES.ACCEPTED);
        const humanDelay = randomBetween(DELAY_CONFIG.minHumanDelay, DELAY_CONFIG.maxHumanDelay);
        addLog('ACTION', `Simulating tap on ACCEPT button (delay: ${(humanDelay / 1000).toFixed(1)}s)`);
        await sleep(humanDelay);
        addLog('SUCCESS', 'Ride accepted successfully. Returning to idle.');
        incrementAccepted(profit);
      } else {
        addLog('EVAL', 'Criteria failed. Auto-rejecting.');
        setBotState(BOT_STATES.REJECTED);
        await sleep(1200);
        addLog('SKIP', 'Ignored offer. Scanning for next...');
        incrementRejected();
      }
    } finally {
      setBotState(BOT_STATES.IDLE);
      cycleRef.current = false;
    }
  }, [filters, setBotState, addLog, incrementAccepted, incrementRejected]);

  useEffect(() => {
    if (!isRunning || !onboardingDone) return;

    const interval = setInterval(() => {
      if (botState === BOT_STATES.IDLE && !cycleRef.current) {
        runCycle();
      }
    }, DELAY_CONFIG.scanInterval);

    return () => clearInterval(interval);
  }, [isRunning, onboardingDone, botState, runCycle]);

  return { botState, isRunning };
};
