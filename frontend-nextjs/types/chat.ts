//why use typeScript instead of JavaScript?
//typeScript give specific properties to the variables

//define the type of the message
//export the interface to be used in other files
//define interface to message
export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: Date;
}

//define the type of the chat state
export type ChatState = 'idle' | 'loading' | 'error';

