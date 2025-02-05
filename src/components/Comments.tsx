import React, { useEffect, useRef, memo } from 'react'
import Comment from './Comment'

interface CommentsProps {
  comments: string[];
}

const Comments: React.FC<CommentsProps> = memo(({ comments }) => {
 
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = (): void => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className='bg-gray-900 p-6 h-[40vh] md:h-[60vh] overflow-y-auto '>
      <ul className='flex flex-col gap-4 '>
        {
          comments.map((comment: string, index: number) => (
            <Comment key={index} comment={comment} />
          ))
        }
        <div ref={bottomRef} />
      </ul>
    </div>
  )
});

export default Comments;

