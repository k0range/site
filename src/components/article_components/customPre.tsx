'use client';

import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa6';

export default function CustomPre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <pre ref={preRef} {...props} className='relative group'>
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className='absolute right-4 cursor-pointer opacity-0 group-hover:opacity-30 duration-200'
      >
        {isCopied ?
          <FaCheck className="text-md" color="#fdf6ee"/>  
        : 
          <FaCopy className="text-md" color="#fdf6ee"/>  
        }
      </button>
      {children}
    </pre>
  );
}