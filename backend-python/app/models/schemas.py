# Pydantic models for request/response schemas
#why use pydantic?
#data validation: check the data type and format
#data parsing: python object to json and vice versa
#automatic documentation: generate documentation from the schema
from pydantic import BaseModel, Field
#function of literal: limit the range of the value
from typing import Literal
from datetime import datetime

#message schema corresponds to the message object in the frontend-nextjs/types/chat.ts
class Message(BaseModel):
    #message data modal
    id: str
    content: str
    role: Literal['user', 'assistant']
    createdAt: datetime = Field(default_factory=datetime.now)
    
    class Config:
        #function of json_encoders:
        #encode the datetime object to a string in ISO format
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        
#chat request modal
class ChatRequest(BaseModel):
    #chat request from client
    messages: str = Field(..., min_length=1, max_length=1000)
    #... means the message is required and must be a string between 1 and 1000 characters
    
    class Config:
        schema_extra = {
            "example": {
                "messages": "search for my transacation records"
            }
        }
        
#chat response modal
class ChatResponse(BaseModel):
    #chat response to client
    message: Message
    #message: the message object that is returned to the client
    status: Literal['success', 'error'] = 'success'
    
    #function of schema_extra:
    #provide example data for the schema
    #FastAPI will use this example data to generate the documentation
    class Config:
        schema_extra = {
            "example": {
                "message": {
                    "id": "123",
                    "content": "Here are your transaction records",
                    "role": "assistant",
                    "createdAt": "2025-01-01T00:00:00Z"
                },
                "status": "success"
            }
        }
        
#error response modal
class ErrorResponse(BaseModel):
    #error response to client
    message: str
    #message: the error message that is returned to the client
    status: Literal['error'] = 'error'
    
