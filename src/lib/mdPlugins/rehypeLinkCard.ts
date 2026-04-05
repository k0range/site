import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

export function rehypeLinkCard() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (!parent || index == null) return;

      // 対象は段落
      if (node.tagName !== "p") return;

      // 段落の中の a 要素を抽出
      const aElements = node.children.filter(
        (child): child is Element => child.type === "element" && child.tagName === "a"
      );

      // a が1つだけでない場合はスキップ
      if (aElements.length !== 1) return;

      const aNode = aElements[0];
      const href = aNode.properties?.href;
      if (typeof href !== "string") return;

      // a のテキストが href と同じか確認
      const text = aNode.children
        .filter((c): c is Text => c.type === "text")
        .map(c => c.value)
        .join("");

      if (text !== href) return;

      // 段落を figure に置き換え
      const figureNode: Element = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          {
            type: "element",
            tagName: "LinkCard",
            properties: { url: href },
            children: [],
          },
        ],
      };

      parent.children[index] = figureNode;
    });
  };
}
