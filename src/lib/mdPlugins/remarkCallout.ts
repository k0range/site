import { visit } from "unist-util-visit"
import { toHast } from "mdast-util-to-hast"
import { Root } from 'mdast'

export function remarkCallout() {
  return function (tree: Root) {
    visit(tree, function (node) {
      if (node.type === 'containerDirective' && (node.name === 'callout' || node.name === 'thought' || node.name === 'info' || node.name === 'caution' || node.name === 'danger')) {
        node.data = {
          hName: 'Callout',
          hProperties: {
            type: node.name === 'callout' ? (node.attributes.type || 'simple') : node.name,
            title: node.attributes.title
          },
        }
      }
    })
  }
}