/**
 * @import {} from 'mdast-util-directive'
 */

import { visit } from "unist-util-visit"
import { Root } from 'mdast'

export function remarkXEmbed() {
  return function (tree: Root) {
    visit(tree, function (node) {
      if (node.type === 'leafDirective' && node.name === 'x-embed') {
        const url = node.attributes?.url
        if (!url) return

        // url: http(s)://x.com/username/status/tweetId みたいな感じを想定
        const statusId = url.split('/').slice(-1)[0]
        if (!statusId) return

        node.data = {
          hName: 'figure',
          hChildren: [
            {
              type: 'element',
              tagName: 'Tweet', // React コンポーネント名
              properties: { id: statusId },
              children: [],
            },
          ],
        }
      }
    })
  }
}