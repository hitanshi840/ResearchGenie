import { useEffect, useRef } from "react";
import mermaid from "mermaid";

type Props = {
  chart: string;
};

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
});

export default function MermaidDiagram({
  chart,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const render = async () => {
      if (!ref.current) return;

      try {
        const id =
          "mermaid-" +
          Math.random().toString(36).slice(2);

        const { svg } =
          await mermaid.render(id, chart);

        ref.current.innerHTML = svg;
      } catch {
        ref.current.innerHTML =
          "<p class='text-red-400'>Invalid Mermaid diagram</p>";
      }
    };

    render();
  }, [chart]);

  return (
    <div
      className="overflow-x-auto rounded-xl bg-slate-950 p-4"
      ref={ref}
    />
  );
}