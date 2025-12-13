// Message list display component
import { Message } from '../types/chat';
import styles from './MessageList.module.css';

//define the props for the MessageList component
//Props: the properties passed to the component
//paraent component pass to child component
interface MessageListProps {
    //a message array as interface
    //this array will store the type of data we define in chat.ts
    messages: Message[];
}

//export the MessageList component
export default function MessageList({ messages }: MessageListProps) {
    return (
        //2 situations: no messages or some messages
        //grammar: {condition ? true : false}
        //in JSX, we use {} to write JavaScript code
        <div className={styles.messageList}>
            {messages.length === 0 ?(
                //if no messages, show this message
                <div className={styles.emptyState}>
                    <p>Hi! I am your Smart Payment Assistant.</p>
                    <p>I can help you with your payment questions.</p>
                    <p>Please ask me anything about your payments.</p>
                </div>
            ):(
                //if some messages, show this message
                //use map to iterate over the messages array
                messages.map((message) => (
                    //key: a unique identifier for the message
                    //dynamic class name: ${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}
                    <div key={message.id} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                        <div className={styles.messageContent}>
                            <div className={styles.messageRole}>{message.role === 'user' ? 'You' : 'Assistant'}</div>
                            <div className={styles.messageText}>{message.content}</div>
                            <div className={styles.messageTime}>
                                {message.createdAt
                                    ? new Date(message.createdAt).toLocaleTimeString('zh-CN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })
                                    : ''}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
