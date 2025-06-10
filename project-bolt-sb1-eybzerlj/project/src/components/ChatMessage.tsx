import React from 'react';
import { MessageCircle, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  // Function to convert markdown-like syntax to HTML
  const formatMessage = (content: string) => {
    // Convert bold text (**text**)
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points
    formattedContent = formattedContent.replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>');
    if (formattedContent.includes('<li>')) {
      formattedContent = '<ul class="list-disc pl-5 space-y-1">' + formattedContent + '</ul>';
    }
    
    // Convert line breaks to <br>
    formattedContent = formattedContent.replace(/\n\n/g, '<br><br>');
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    
    return formattedContent;
  };
  
  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100' : 'bg-green-100'
      }`}>
        {isBot ? <MessageCircle className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4 text-green-600" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isBot ? 'bg-gray-100' : 'bg-blue-500 text-white'
      }`}>
        <div 
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
        />
      </div>
    </div>
  );
}