import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceGesture, initialGestureState, gestureFrameAt, gestureFrames, gestureOpenness, gestureShowsProfile } from '../app/v2/about/gesture-sequence.ts';
import { aboutStories } from '../app/v2/about/about-stories.ts';

await test('five photographs run open to closed to open across the viewport', () => {
  assert.equal(gestureFrames.length, 5);
  assert.deepEqual(Array.from({ length: 9 }, (_, i) => gestureFrameAt(i / 8) + 1), [1, 2, 3, 4, 5, 4, 3, 2, 1]);
});

await test('left and right are symmetric, with clamped edges', () => {
  for (let i = 0; i <= 100; i++) assert.equal(gestureFrameAt(i / 100), gestureFrameAt(1 - i / 100));
  assert.equal(gestureFrameAt(-1), 0);
  assert.equal(gestureFrameAt(2), 0);
  assert.equal(gestureFrameAt(.5), 4);
});

await test('profile width narrows as the hands close', () => {
  assert.deepEqual(gestureFrames.map((_, i) => gestureOpenness(i)), [4, 3, 2, 1, 0]);
});

await test('profile is hidden for photos four and five, on both sides of the center', () => {
  assert.deepEqual(Array.from({ length: 9 }, (_, i) => gestureShowsProfile(gestureFrameAt(i / 8))), [true, true, true, false, false, false, true, true, true]);
});

const playFrames = (frames, initial = initialGestureState) => frames.reduce((state, frame) => advanceGesture(state, frame - 1, aboutStories.length), initial);

await test('starts open with the first story, and advances only on reopening after photo 5', () => {
  assert.deepEqual(initialGestureState, { frame: 0, story: 0, closedSinceOpen: false });
  assert.equal(aboutStories[initialGestureState.story].id, 'introduction');
  const closed = playFrames([1, 2, 3, 4, 5]);
  assert.equal(closed.story, 0);
  assert.equal(closed.closedSinceOpen, true);
  const reopened = playFrames([4, 3, 2, 1], closed);
  assert.equal(reopened.story, 1);
  assert.equal(reopened.closedSinceOpen, false);
});

await test('partial closures and jitter do not cycle the text', () => {
  assert.equal(playFrames([1, 2, 3, 4, 3, 4, 3, 2, 1]).story, 0);
  assert.equal(playFrames([1, 4, 5, 4, 5, 5, 4, 5, 4]).story, 0);
  assert.equal(playFrames([1, 5, 4, 5, 4, 3, 4, 3, 2, 1]).story, 1);
});

await test('same-side and opposite-side openings count once, and six stories wrap to the introduction', () => {
  const across = Array.from({ length: 9 }, (_, i) => gestureFrameAt(i / 8) + 1);
  assert.equal(playFrames(across).story, 1);
  let state = initialGestureState;
  const visited = [state.story];
  for (let i = 0; i < aboutStories.length; i++) {
    state = playFrames([5, 3, 1], state);
    visited.push(state.story);
  }
  assert.deepEqual(visited, [0, 1, 2, 3, 4, 5, 0]);
});
