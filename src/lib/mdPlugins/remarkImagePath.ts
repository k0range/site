// Based on https://github.com/pondorasti/remark-img-links

import { visit } from "unist-util-visit"

export function remarkImagePath(options: {
  absolutePath: string
}) {
  function visitor(node) {
    const relativeUrl = node.url.replace(/^\//, "")

    if (!node.url.startsWith("http")) {
      node.url = options.absolutePath + relativeUrl
    }
  }

  return (tree) => {
    visit(tree, "image", visitor)
  }
}
