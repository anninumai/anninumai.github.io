import Link from 'next/link';

const PIXEL_LETTERS: Record<string, string[]> = {
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  o: ['00000', '00000', '01110', '10001', '10001', '10001', '01110'],
  r: ['00000', '00000', '10110', '11001', '10000', '10000', '10000'],
  t: ['00100', '00100', '11111', '00100', '00100', '00101', '00010'],
  f: ['00110', '01001', '01000', '11100', '01000', '01000', '01000'],
  l: ['01100', '00100', '00100', '00100', '00100', '00101', '00010'],
  i: ['00100', '00000', '01100', '00100', '00100', '00101', '00010'],
};

function KnitPixelWordmark() {
  const letters = [...'Portfolio'];
  return (
    <span className="v2-knit-wordmark" aria-hidden="true">
      {letters.map((letter, letterIndex) => (
        <span className="v2-knit-letter" key={`${letter}-${letterIndex}`}>
          {PIXEL_LETTERS[letter].flatMap((row, rowIndex) =>
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
        <Link href="/v2" aria-label="Portfolio">
          <KnitPixelWordmark />
        </Link>
      </header>
      {reserveSpace ? <div className="v2-shared-header-space" aria-hidden="true" /> : null}
    </>
  );
}
