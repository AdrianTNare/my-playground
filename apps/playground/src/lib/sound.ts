// A short synthesized "tick" for navigation clicks: no audio files, ~32ms.
// Square wave sweeping 3200→1800Hz through a bandpass (2400→1400Hz).

const MIN_GAP_MS = 45;

let context: AudioContext | null = null;
let lastPlayed = 0;

const getContext = (): AudioContext | null => {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const playTick = () => {
  if (document.hidden || prefersReducedMotion()) return;

  const now = performance.now();
  if (now - lastPlayed < MIN_GAP_MS) return;
  lastPlayed = now;

  const ctx = getContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(3200, t);
  osc.frequency.exponentialRampToValueAtTime(1800, t + 0.032);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(2400, t);
  filter.frequency.exponentialRampToValueAtTime(1400, t + 0.032);

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.16, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.032);

  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.035);
};
