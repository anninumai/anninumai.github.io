// Match the stitch lattice in scripts/render-knit-assets.mjs. Only the outline
// of the selected rows is traced; no image sampling or canvas drawing at runtime.
export const WOVEN_WIDTH = 780;
export const WOVEN_HEIGHT = 520;
export const COLUMN_GAP = WOVEN_WIDTH * 8.75 * .72 / (1882 * .39);
export const ROW_GAP = WOVEN_WIDTH * 12.25 * .72 / (1882 * .39);

type Point = [number, number];
type Span = { left: number; right: number };

export function wovenRevealOutline(x: number, y: number, radius: number): Point[] {
  if (radius <= 0) return [];
  const rows = Math.ceil(WOVEN_HEIGHT / ROW_GAP);
  const columns = Math.ceil(WOVEN_WIDTH / COLUMN_GAP);
  const spans: (Span | undefined)[] = [];
  for (let row = 0; row < rows; row++) {
    const distance = Math.abs(row * ROW_GAP - y);
    if (distance > radius) continue;
    const halfWidth = Math.sqrt(radius * radius - distance * distance);
    const left = Math.max(0, Math.ceil((x - halfWidth) / COLUMN_GAP));
    const right = Math.min(columns - 1, Math.floor((x + halfWidth) / COLUMN_GAP));
    if (left <= right) spans[row] = { left, right };
  }

  // Integer half-columns / fiftieth-rows keep adjoining V-shaped cells exact.
  // Clockwise exposed edges form one closed contour, with no interior edges.
  const edges = new Map<string, { from: Point; to: Point }>();
  const key = ([px, py]: Point) => `${px},${py}`;
  const edge = (from: Point, to: Point) => edges.set(key(from), { from, to });
  const exposed = (span: Span, neighbor: Span | undefined, draw: (column: number) => void) => {
    for (let col = span.left; col <= Math.min(span.right, (neighbor?.left ?? Infinity) - 1); col++) draw(col);
    if (neighbor) for (let col = Math.max(span.left, neighbor.right + 1); col <= span.right; col++) draw(col);
  };
  spans.forEach((span, row) => {
    if (!span) return;
    const cy = row * 50;
    exposed(span, spans[row - 1], col => {
      edge([col * 2 - 1, cy - 25], [col * 2, cy - 17]);
      edge([col * 2, cy - 17], [col * 2 + 1, cy - 25]);
    });
    exposed(span, spans[row + 1], col => {
      edge([col * 2 + 1, cy + 25], [col * 2, cy + 33]);
      edge([col * 2, cy + 33], [col * 2 - 1, cy + 25]);
    });
    edge([span.right * 2 + 1, cy - 25], [span.right * 2 + 1, cy + 25]);
    edge([span.left * 2 - 1, cy + 25], [span.left * 2 - 1, cy - 25]);
  });

  const first = edges.values().next().value;
  if (!first) return [];
  const points: Point[] = [];
  let current = first;
  do {
    points.push([current.from[0] * COLUMN_GAP / 2, current.from[1] * ROW_GAP / 50]);
    const next = edges.get(key(current.to));
    if (!next) break;
    current = next;
  } while (current !== first && points.length <= edges.size);
  return points;
}

export function wovenRevealClip(x: number, y: number, radius: number) {
  const outline = wovenRevealOutline(x, y, radius);
  if (!outline.length) return 'inset(50%)';
  return `polygon(${outline.map(([px, py]) => `${(px / WOVEN_WIDTH * 100).toFixed(3)}% ${(py / WOVEN_HEIGHT * 100).toFixed(3)}%`).join(',')})`;
}
