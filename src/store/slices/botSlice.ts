import { BotState, BOT_STATES } from '../../utils/constants';

export interface BotSlice {
  botState: BotState;
  isRunning: boolean;
  setBotState: (state: BotState) => void;
  startBot: () => void;
  stopBot: () => void;
}

export const createBotSlice = (set: any): BotSlice => ({
  botState: BOT_STATES.IDLE,
  isRunning: false,

  setBotState: (state: BotState) =>
    set({ botState: state }),

  startBot: () =>
    set({ isRunning: true, botState: BOT_STATES.IDLE }),

  stopBot: () =>
    set({ isRunning: false, botState: BOT_STATES.IDLE }),
});
