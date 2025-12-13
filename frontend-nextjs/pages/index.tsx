// Main page - Chat interface entry point
//workflow:
//1. Next.js launches the server -> read pages/index.tsx
//2. user visits the page -> Next.js routes to the index.tsx file
//3. execute the Home() function -> return JSX
//4. JSX is compiled to React.createElement()
//5. React renders the JSX to the DOM -> user sees the page

import React from 'react';

//every file has to have a default export
//note: you can use any name you want for import:
//import myComponent from './index';
export default function Home() {
    //JSX: JavaScript XML
    //will be compiled to React.createElement()
    return(
        <div className='container'>
            <h1>Smart Payment Assistant</h1>
            <p>This is a chat interface for the Smart Payment Assistant.</p>
        </div>
    )
}