import { FaChevronRight } from "react-icons/fa6";

import * as nip19 from 'nostr-tools/nip19'
import { SimplePool } from 'nostr-tools/pool'

export default async function NostrZapView({ zapToId, relayUrls }: { zapToId: string, relayUrls: string }) {
  const zapToHex = nip19.decode(zapToId);

  const pool = new SimplePool()

  const zapEvents = (await pool.querySync(
    relayUrls.split(','),
    {
      kinds: [9735],
      "#p": [""],
      "limit": 6
    },
  ))

  const zapperPubkeys: string[] = zapEvents.map((zapEvent) => {
    const descTag = zapEvent.tags.find((tag: any[]) => tag[0] === 'description');
    if (!descTag) return null;

    const description = JSON.parse(descTag[1])

    return description["pubkey"]
  })

  const zapperProfiles = (await pool.querySync(
    relayUrls.split(','),
    {
      kinds: [0],
      authors: zapperPubkeys
    },
  ))

  const zapperPictures: string[] = [...new Set(zapperProfiles.map((zapEvent) => {
    console.log("zapEvent.content", zapEvent)
    const content = JSON.parse(zapEvent.content)

    if (content.picture) {
      return content.picture
    } else {
      return null
    }
  }))].slice(0, 3)

  return (
    <button 
      className="cursor-pointer underline underline-offset-2 decoration-[#FDF6EE60] hover:decoration-[#FDF6EE90] duration-200 group opacity-70 text-xs ml-3.5"
    >
      { zapperPictures.map(z => (
        <img src={z} />
      )) }
    </button>
  )
}