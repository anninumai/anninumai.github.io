export const gestureFrames = Array.from(
  { length: 5 },
  (_, index) => `/assets/about-v2/portrait-${String(index + 1).padStart(2, '0')}.webp`,
);

// Across the viewport: 1 → 2 → 3 → 4 → 5 → 4 → 3 → 2 → 1.
export function gestureFrameAt(position: number) {
  const clamped = Math.max(0, Math.min(1, position));
  return Math.round((1 - Math.abs(clamped * 2 - 1)) * (gestureFrames.length - 1));
}

export function gestureOpenness(frame: number) {
  return gestureFrames.length - 1 - frame;
}

export function gestureShowsProfile(frame: number) {
  return frame < 3;
}
