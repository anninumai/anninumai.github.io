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

export type GestureState = { frame: number; story: number; closedSinceOpen: boolean };
export const initialGestureState: GestureState = { frame: 0, story: 0, closedSinceOpen: false };

export function advanceGesture(state: GestureState, frame: number, storyCount: number): GestureState {
  if (state.frame === frame) return state;
  const reopened = state.closedSinceOpen && gestureShowsProfile(frame);
  return {
    frame,
    story: reopened ? (state.story + 1) % storyCount : state.story,
    // Photo 5 arms one change; photo 4 alone never does. Consume it only when
    // the hands open far enough for the text to reappear (photos 1–3).
    closedSinceOpen: reopened ? false : frame === 4 || state.closedSinceOpen,
  };
}
