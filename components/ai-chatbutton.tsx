"use client"

import { useState } from 'react';
import AIChatBox from './ai-chatbox';
import { Button } from './ui/button';
import { Bot } from 'lucide-react';

const AIChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)} className="absolute right-10 bottom-10">
        <Bot size={20} className='mr-2' />
        AI Chat
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  )
}

export default AIChatButton