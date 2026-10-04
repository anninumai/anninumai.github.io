// Pre-rendered yarn: no canvas, image sampling, or perpetual JS render loop.
export function KnitBackground() {
  return (
    <div className="v2-knit-background" aria-hidden="true">
      <div className="v2-knit-photo" />
      <div className="v2-knit-field" />
    </div>
  );
}
