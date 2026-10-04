import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { COLUMN_GAP, ROW_GAP, WOVEN_WIDTH, WOVEN_HEIGHT, wovenRevealClip, wovenRevealOutline } from '../app/v2/woven-reveal.ts';

function contains(points, x, y) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i], [xj, yj] = points[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

assert.equal(wovenRevealClip(0, 0, 0), 'inset(50%)');
let samples = 0;
for (const x of [0, 83, 205, 390, 660, 780]) {
  for (const y of [0, 57, 260, 471, 520]) {
    for (const radius of [62.4, 110, 230, 520, 1200]) {
      const outline = wovenRevealOutline(x, y, radius);
      assert.ok(outline.length > 2);
      assert.equal(new Set(outline.map(p => p.join(','))).size, outline.length, 'contour is a single closed loop');
      // All segments must be one V half or a vertical side, not chords across cells.
      outline.forEach(([px, py], i) => {
        const [nx, ny] = outline[(i + 1) % outline.length];
        const dx = Math.abs(nx - px), dy = Math.abs(ny - py);
        assert.ok((dx < 1e-8 && Math.abs(dy - ROW_GAP) < 1e-8)
          || (Math.abs(dx - COLUMN_GAP / 2) < 1e-8 && Math.abs(dy - ROW_GAP * .16) < 1e-8));
      });
      for (let row = 0; row * ROW_GAP < WOVEN_HEIGHT; row++) {
        for (let col = 0; col * COLUMN_GAP < WOVEN_WIDTH; col++) {
          const px = col * COLUMN_GAP, py = row * ROW_GAP;
          assert.equal(contains(outline, px, py), Math.hypot(px - x, py - y) <= radius, `cell ${col},${row} at ${x},${y},${radius}`);
        }
      }
      samples++;
    }
  }
}
const started = performance.now();
for (let i = 0; i < 1000; i++) wovenRevealClip(i % 780, i % 520, 62 + i % 500);
console.log(`Passed ${samples} reveal contours; 1000 outline updates took ${(performance.now() - started).toFixed(1)}ms (Node, not a browser/Intel benchmark).`);
