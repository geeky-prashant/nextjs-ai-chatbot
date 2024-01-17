import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { XCircle } from 'lucide-react';

interface AIChatBoxProps {
  open: boolean,
  onClose: () => void,
}

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat();

  return (
    <div
      className={cn('bottom-0 right-0 md:right-36 z-10 w-full max-w-[500px] p-1', open ? "fixed" : "hidden")}
    >
      <button onClick={onClose} className='mb-1 ms-auto block'>
        <XCircle size={30} />
      </button>
    </div>
  )
}

export default AIChatBox