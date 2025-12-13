//useState: to manage the state of the component
//FormEvent: to handle the form submission
//KeyboardEvent: to handle the keyboard events
import { FormEvent, KeyboardEvent, useState } from 'react';
import styles from './ChatInput.module.css';

//define the interface for the ChatInput component
interface ChatInputProps {
    //onSendMessage: a function that will be called when the user sends a message
    onSendMessage: (message: string) => void;
    //isLoading: a boolean that will be used to determine if the component is loading
    isLoading: boolean;
}

//export the ChatInput component
export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    //useState to manage the state of the input
    //workflow for useState:
    //1.userinput -> setInput('abc')
    //2.React updates the value of input
    //3.component re-renders with the new value of input
    //4.the new value is shown in the input field
    //input: the current value of the input field
    //setInput: a function that will be used to update the value of the input field
    const [input, setInput] = useState('');

    //handle the form submission
    const handleSubmit = (e: FormEvent) => {
        //prevent the default behavior of the form submission
        //because the form submission will reload the page
        //url will become ?input=abc
        //we don't want this to happen
        e.preventDefault();

        //trim the input to remove any whitespace
        const trimmedInput = input.trim();
        //if the input is empty or the component is loading, return
        if (!trimmedInput || isLoading) return;

        //call the onSendMessage function to send the message to the server
        onSendMessage(input);
        //clear the input field
        setInput('');
    }

    //handle the keyboard events
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        //if the user presses the enter key and the input is not empty, call the handleSubmit function
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
        //shift + enter: add a new line
    }

    return (
        <form className={styles.chatInput} onSubmit={handleSubmit}>
            <textarea
                className={styles.input}
                //controlled component by React
                value={input}
                //e: the event object
                //e.target: the target element that triggered the event
                //e.target.value: the value of the target element
                //setInput: a function that will be used to update the value of the input field
                //workflow:
                //1.user types in the input field
                //2.the event object is passed to the onChange function
                //3.the value of the input field is updated in the state
                //4.the component re-renders with the new value of the input field
                //5.the new value is shown in the textarea
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="input your message..."
                rows={1}
                disabled={isLoading}
            />
            <button
                type="submit"
                className={styles.sendButton}
                disabled={!input.trim() || isLoading}
            >
                {isLoading ? 'sending' : 'finish sending'}
            </button>
        </form>
    );
}