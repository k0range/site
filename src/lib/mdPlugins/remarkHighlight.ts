import { visit } from "unist-util-visit"
import { toHast } from "mdast-util-to-hast"
import { Root } from 'mdast'

export function remarkHighlight() {
  return function (tree: Root) {
    visit(tree, function (node: any) {
      if (node.type === 'textDirective' && node.name === 'hl') {
        node.data = {
          hName: 'Highlight',
          hProperties: { ...node.attributes },
          hChildren: node.children.map((child: any) => toHast(child))
        }
      }
    })
  }
}