export const formatTime = (timestamp: number): string =>
  new Date(timestamp).toLocaleTimeString('en-US', { hour12: false });

export const formatCurrency = (amount: number, currency = 'MAD'): string =>
  `${amount.toFixed(1)} ${currency}`;

export const formatDistance = (km: number): string =>
  `${km.toFixed(1)} km`;

export const formatRating = (rating: number): string =>
  `★ ${rating.toFixed(1)}`;

export const formatProfit = (profit: number): string =>
  `${profit.toFixed(1)} MAD/km`;

export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const randomInt = (min: number, max: number): number =>
  Math.floor(randomBetween(min, max + 1));

export const isNightHours = (): boolean => {
  const hour = new Date().getHours();
  return hour >= 20 || hour < 5;
};
