import assert from 'node:assert/strict';
import { test } from 'node:test';
import { gestureFrameAt, gestureFrames, gestureOpenness, gestureShowsProfile } from '../app/v2/about/gesture-sequence.ts';

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
