import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { Bot, Send, Trash, XCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Message } from 'ai';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface AIChatBoxProps {
  open: boolean,
  onClose: () => void,
}

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user"

  return (
    <div
      className={cn('bottom-0 right-0 md:right-2 md:bottom-2 z-10 h-full md:h-auto w-full max-w-[500px] p-1', open ? "fixed" : "hidden")}
    >
      <div className='flex h-full md:h-[600px] flex-col rounded bg-background border shadow-xl'>
        <button onClick={onClose} className='mb-1 ms-auto block p-3'>
          <XCircle size={30} />
        </button>
        <div className='h-full p-3 overflow-y-auto' ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {
            isLoading && lastMessageIsUser && (
              <ChatMessage
                message={{
                  role: "assistant",
                  content: "Thinking..."
                }}
              />
            )
          }
          {
            error && (
              <ChatMessage
                message={{
                  role: "assistant",
                  content: "Something went wrong."
                }}
              />
            )
          }
          {
            !error && messages.length === 0 && (
              <div className='h-full flex items-center justify-center gap-3'>
                <Bot />
                Ask anything related to your notes!
              </div>
            )
          }
        </div>
        <form onSubmit={handleSubmit} className='m-3 flex gap-2'>
          <Button
            variant='outline'
            size='icon'
            className='shrink-0'
            type='button'
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder='Message'
            ref={inputRef}
          />
          <Button type='submit' className='bg-gradient-to-r from-[#0F9E7B] to-[#1a745d]'>
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AIChatBox

function ChatMessage({ message: { role, content } }: { message: Pick<Message, "role" | "content"> }) {
  const { user } = useUser()

  const isAiMessage = role === "assistant"

  return (
    <div className={cn('mb-3 flex items-center', isAiMessage ? "me-5 justify-start" : "ms-5 justify-end")}>
      {isAiMessage && <Bot className='mr-2 shrink-0' />}
      <p className={cn(
        "whitespace-pre-line rounded-md border px-3 py-2", isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
      )}>
        {content}
      </p>
      {
        !isAiMessage && user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="User Image"
            width={80}
            height={80}
            className='ml-2 rounded-full w-8 h-8 object-cover'
          />
        )
      }
    </div>
  )
}