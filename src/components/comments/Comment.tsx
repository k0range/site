import { FaReply } from "react-icons/fa6";

export function Comment(props: {
  authorName?: string;
  isOwner?: boolean;
  dateTime?: Date;
  content?: string;
  replies?: {
    authorName?: string;
    isOwner?: boolean;
    dateTime?: Date;
    content?: string;
  }[]
}) {
  return (
    <div className='rounded-2xl overflow-hidden text-[#333]'>
      <div className="px-6 py-5 bg-[#fdf6ee]" >
        <div className='flex gap-4 items-center'>
          <img src={"https://korange.work/assets/icon.png"} className='w-9 h-9 rounded-full' />
          <div className='text-sm mt-0.5'>
            <div>{props.authorName}</div>
            <div className='text-xs mt-0.25 opacity-60'>{props.dateTime?.toLocaleDateString() + ' ' + props.dateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
        <p className='text-[0.95em] mt-3.5 whitespace-pre-wrap'>
          {props.content}
        </p>
        {(!props.replies || props.replies.length < 0) && <button className="text-sm opacity-40 hover:opacity-50 flex items-center mt-3.5 cursor-pointer duration-200 font-semibold">
          <FaReply className="w-4 h-4 mr-2 -mt-0.75" />
          返信
        </button>}
      </div>
      {props.replies && props.replies.length > 0 && <div className="bg-[#f0e9e2] px-6 py-5 relative flex flex-col space-y-5">
        <div className='w-[3px] rounded-afull absolute left-9.75 top-0 bottom-4 bg-black/8'></div>
        {props.replies.map((reply, index) => (
          <div key={index} className='flex gap-4 relative z-10'>
            <div className=''>
              <img src={"https://korange.work/assets/user.png"} className='w-8 min-w-8 h-8 rounded-full outline-8 -mt-0.5 outline-[#f0e9e2]' />
            </div>
            <div>
              <div className='text-sm flex gap-2 items-center'>
                <div>{reply.authorName}</div>
                <div className='text-xs mt-0.25 opacity-60'>{props.dateTime?.toLocaleDateString() + ' ' + props.dateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <p className='text-[0.9em] mt-1 whitespace-pre-wrap'>
                {reply.content}
              </p>
            </div>
          </div>
        ))}
        <button className='bg-[#fdf6ee] border-black/13 border rounded-full z-20 relative text-sm py-1.5 mr-auto px-4 outline-6 outline-[#f0e9e2] text-[#333333ee] cursor-pointer'>返信を追加</button>
      </div>}
    </div>
  )
}
