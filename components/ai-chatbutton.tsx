"use client"

import { useState } from 'react';
import AIChatBox from './ai-chatbox';
import { Button } from './ui/button';
import { Bot } from 'lucide-react';

const AIChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)} className="absolute right-4 bottom-6 md:right-10 md:bottom-10 cursor-pointer w-14 h-14 rounded-full bg-gradient-to-r from-[#0F9E7B] to-[#1a745d]">
        <Bot size={25} className='animate-pulse' />
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  )
}

export default AIChatButton