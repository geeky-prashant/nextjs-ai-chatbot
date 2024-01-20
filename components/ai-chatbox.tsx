import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { Send, XCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Message } from 'ai';

interface AIChatBoxProps {
  open: boolean,
  onClose: () => void,
}

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat();

  return (
    <div
      className={cn('bottom-0 right-0 md:right-2 md:bottom-2 z-10 h-full md:h-auto w-full max-w-[500px] p-1', open ? "fixed" : "hidden")}
    >
      <div className='flex h-full md:h-[600px] flex-col rounded bg-background border shadow-xl'>
        <button onClick={onClose} className='mb-1 ms-auto block p-3'>
          <XCircle size={30} />
        </button>
        <div className='h-full p-3'>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className='m-3 flex gap-2'>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder='Message'
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

function ChatMessage({ message: { role, content } }: { message: Message }) {
  return (
    <div className='mb-3'>
      <div>{role}</div>
      <div>{content}</div>
    </div>
  )
}