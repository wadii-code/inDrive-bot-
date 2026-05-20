import { NativeModules, NativeEventEmitter } from 'react-native';

const { DriveBotEngine } = NativeModules;
const emitter = DriveBotEngine ? new NativeEventEmitter(DriveBotEngine) : null;

export type BotEvent =
  | { type: 'RIDE_DETECTED'; price: number; dist: number; rating: number }
  | { type: 'RIDE_ACCEPTED'; profit: number }
  | { type: 'RIDE_REJECTED'; reason: string }
  | { type: 'SERVICE_ERROR'; message: string };

export const BotService = {
  start(packageName: string): void {
    DriveBotEngine?.startService?.(packageName);
  },

  stop(): void {
    DriveBotEngine?.stopService?.();
  },

  onEvent(handler: (event: BotEvent) => void) {
    if (!emitter) return { remove: () => {} };
    return emitter.addListener('BotEvent', handler);
  },

  isServiceRunning(): Promise<boolean> {
    return DriveBotEngine?.isRunning?.() ?? Promise.resolve(false);
  },
};
