import Link from 'next/link';

const PIXEL_LETTERS: Record<string, string[]> = {
  a: ['00000', '00000', '01110', '00001', '01111', '10001', '01111'],
  n: ['00000', '00000', '11110', '10001', '10001', '10001', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  s: ['00000', '00000', '01111', '10000', '01110', '00001', '11110'],
  h: ['10000', '10000', '11110', '10001', '10001', '10001', '10001'],
  m: ['00000', '00000', '11010', '10101', '10101', '10101', '10101'],
  '|': ['00100', '00100', '00100', '00100', '00100', '00100', '00100'],
  o: ['00000', '00000', '01110', '10001', '10001', '10001', '01110'],
  r: ['00000', '00000', '10110', '11001', '10000', '10000', '10000'],
  t: ['00100', '00100', '11111', '00100', '00100', '00101', '00010'],
  f: ['00110', '01001', '01000', '11100', '01000', '01000', '01000'],
  l: ['01100', '00100', '00100', '00100', '00100', '00101', '00010'],
  i: ['00100', '00000', '01100', '00100', '00100', '00101', '00010'],
};

function KnitPixelWordmark() {
  const letters = [...'annin | Aino Kishimoto'];
  return (
    <span className="v2-knit-wordmark" aria-hidden="true">
      {letters.map((letter, letterIndex) => (
        <span className={letter === ' ' ? 'v2-knit-space' : 'v2-knit-letter'} key={`${letter}-${letterIndex}`}>
          {PIXEL_LETTERS[letter]?.flatMap((row, rowIndex) =>
            [...row].map((cell, columnIndex) => (
              <i className={cell === '1' ? 'is-knit' : ''} key={`${rowIndex}-${columnIndex}`} />
            )),
          )}
        </span>
      ))}
    </span>
  );
}

export function V2Header({ reserveSpace = false }: { reserveSpace?: boolean }) {
  return (
    <>
      <header className="v2-shared-header" id="top">
        <Link href="/v2" aria-label="annin | Aino Kishimoto">
          <KnitPixelWordmark />
        </Link>
      </header>
      {reserveSpace ? <div className="v2-shared-header-space" aria-hidden="true" /> : null}
    </>
  );
}
