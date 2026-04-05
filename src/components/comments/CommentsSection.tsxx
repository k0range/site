"use server"

import { prisma } from "@/lib/prisma";
import { Comment } from "./Comment";
import CommentForm from "./CommentForm";
import Link from "next/link";
import jwt from "jsonwebtoken";

export default async function CommentsSection(props: {
  placeType: "post" | "page";
  placeLocale?: string;
  placeSlug: string;
  visitorToken?: string;
}) {
  let visitorId: string | null = null;
  if (props.visitorToken) {
    const visitor = jwt.verify(props.visitorToken, process.env.JWT_SECRET!, {
      issuer: "https://korange.work",
      audience: "visitor",
    })
    visitorId = visitor.sub as string;
  }

  const comments = await prisma.comment.findMany({
    where: {
      place: `${props.placeType}/${props.placeLocale ?? 'en'}/${props.placeSlug}`,
      OR: [
        { showPublicly: true },
        { visitorId: visitorId }
      ]
    },
    orderBy: {
      createdAt: "asc"
    }
  })
  
  const [replyComment, normalComment]: [typeof comments, typeof comments] = comments.reduce(
    (acc, item) => {
      if (item.hasOwnProperty('replyTo') && item.replyTo) {
        acc[0].push(item);
      } else {
        acc[1].push(item);
      }
      return acc;
    },
    [[], []]
  );

  const commentsWithReplies = normalComment.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).map(parent => ({
    ...parent,
    replies: replyComment
      .filter(child => child.replyTo === parent.id)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }));

  return (
    <>
      {commentsWithReplies.length > 0 && <div className="page_transition" id="comments">
        <h2 className='text-center text-xl mb-8 mt-12'>この記事へのコメント</h2>
        <div className='mb-10 lg:mx-8 mx-4'> 
          { commentsWithReplies.map(comment => (
            <Comment
              key={comment.id}
              authorName={comment.name}
              isOwner={comment.isOwner}
              dateTime={comment.createdAt}
              content={comment.content}
              replies={comment.replies?.map(reply => ({
                authorName: reply.name,
                isOwner: reply.isOwner,
                dateTime: reply.createdAt,
                content: reply.content,
              }))}
            />
          )) }
        </div>
      </div>}
      
      <div className="page_transition js-only">
        <h2 className='text-center text-xl mb-6 mt-8'>コメントを書く</h2>
        <div className='mb-32 mx-6 lg:mx-8'>
          <CommentForm
            placeType={props.placeType}
            placeSlug={props.placeSlug}
            placeLocale={props.placeLocale}
          />
        </div>
      </div>
    </>
  )
}