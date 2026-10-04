const toolLogos: Record<string, string> = {
  Figma: '/tool-logos/figma.svg',
  Notion: '/tool-logos/notion.svg',
  Blender: '/tool-logos/blender.svg',
  Photoshop: '/tool-logos/photoshop.svg',
  Illustrator: '/tool-logos/illustrator.svg',
  Miro: '/tool-logos/miro.svg',
  'Claude Code': '/tool-logos/claude-code.svg',
  TouchDesigner: '/tool-logos/touchdesigner.jpeg',
  'p5.js': '/tool-logos/p5js.png',
  ChatGPT: '/tool-logos/chatgpt.svg',
  'Visual Studio Code': '/tool-logos/vscode.svg',
  STUDIO: '/tool-logos/studio.jpeg',
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
