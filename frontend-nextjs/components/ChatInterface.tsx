// Main chat interface component
import { useEffect, useRef, useState } from 'react';
import { ChatState, Message } from '../types/chat';
import { sendChatMessage } from '../utils/api';
import ChatInput from './ChatInput';
import styles from './ChatInterface.module.css';
import MessageList from './MessageList';
//export the ChatInterface component
export default function ChatInterface() {

  // manage the state of the messages
  // one component can have multiple states
  const [messages, setMessages] = useState<Message[]>([]);
  
  // manage the state of the chat
  const [status, setStatus] = useState<ChatState>('idle');
  
  // ref: to scroll to the bottom of the messages
  //ref will not be re-rendered when the component re-renders instead of the state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // handle the sending of the message
  const handleSendMessage = async (content: string) => {
    // 1. create the user message
    const userMessage: Message = {
      id: Date.now().toString(),  //generate a unique id for the message
      content,
      role: 'user',
      createdAt: new Date()
    };

    // 2. add the message to the messages list
    //update by function instead of directly assigning a new value
    //const old = [1, 2, 3];
    //const new = [...old, 4];  // [1, 2, 3, 4]
    setMessages((prev) => [...prev, userMessage]);

    // 3. set the loading state
    setStatus('loading');

    try {
    // 4. call the backend API (use mock data for now)
    // TODO: later will be replaced with the real API call
      const response = await sendChatMessage(content);

      // 5. create the assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        createdAt: new Date()
      };

      // 6. add the assistant message to the messages list
      setMessages((prev) => [...prev, assistantMessage]);
      
      // 7. restore the idle state
      setStatus('idle');
    } catch (error) {
      console.error('failed to send message:', error);
      setStatus('error');
      
      // show the error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'sorry, failed to send the message. please try again later.',
        role: 'assistant',
        createdAt: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      // 3 seconds later, restore the idle state
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Effect: when the messages update, scroll to the bottom
  //workflow:
  //1. messages change
  //2.component re-renders
  //3.useEffect is called
  //4.scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatInterface}>
      {/* header */}
      <div className={styles.header}>
        <h2>💳 Smart Payment Assistant</h2>
        <div className={styles.statusIndicator}>
          {status === 'loading' && <span className={styles.loading}>AI is thinking...</span>}
          {status === 'error' && <span className={styles.error}>connection error</span>}
          {status === 'idle' && <span className={styles.idle}>online</span>}
        </div>
      </div>

      {/* messages list */}
      <MessageList messages={messages} />
      
      {/* scroll anchor */}
      <div ref={messagesEndRef} />

      {/* input box */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={status === 'loading'}
      />
    </div>
  );
}