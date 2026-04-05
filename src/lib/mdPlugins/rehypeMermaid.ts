import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "pre" &&
        node.children?.[0]?.tagName === "code" &&
        node.children[0].properties?.className?.includes("language-mermaid")
      ) {
        const code = node.children[0].children[0].value;

        node.tagName = "Mermaid";
        node.properties = { code };
        node.children = [];
      }
    });
  };
}
