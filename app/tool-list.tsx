const toolLogos: Record<string, string> = {
  Figma: '/tool-logos/figma.webp',
  Notion: '/tool-logos/notion.webp',
  Blender: '/tool-logos/blender.webp',
  Photoshop: '/tool-logos/photoshop.webp',
  Illustrator: '/tool-logos/illustrator.webp',
  Miro: '/tool-logos/miro.webp',
  'Claude Code': '/tool-logos/claude-code.webp',
  TouchDesigner: '/tool-logos/touchdesigner.webp',
  'p5.js': '/tool-logos/p5js.webp',
  ChatGPT: '/tool-logos/chatgpt.webp',
  'Visual Studio Code': '/tool-logos/vscode.webp',
  STUDIO: '/tool-logos/studio.webp',
};

export function ToolList({ tools }: { tools: string[] }) {
  return (
    <span className="v2-tool-list">
      {tools.map((tool) => {
        const logo = toolLogos[tool];
        return logo ? (
          <span className="v2-tool-logo" key={tool} title={tool}>
            <img src={logo} alt={`${tool} ロゴ`} />
          </span>
        ) : (
          <span className="v2-tool-text" key={tool}>{tool}</span>
        );
      })}
    </span>
  );
}
