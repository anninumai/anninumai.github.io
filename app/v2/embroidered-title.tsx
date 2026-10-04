type EmbroideredTitleProps = {
  children: string;
};

export function EmbroideredTitle({ children }: EmbroideredTitleProps) {
  return <h2 className="v2-embroidered-title">{children}</h2>;
}
