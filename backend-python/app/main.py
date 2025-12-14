# FastAPI application entry point
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import time

from app.models.schemas import ChatRequest, ChatResponse, ErrorResponse, Message

#create a FastAPI app
# this is for generating the openapi documentation
app = FastAPI(
    title="Smart Payment Assistant",
    description="A chatbot for querying payment information",
    version="1.0.0"
)

#add CORS middleware
#CORS: Cross-Origin Resource Sharing
#use for frontend-nextjs to access the backend-python
app.add_middleware(
    CORSMiddleware,
    #allow all origins
    #only allow the requests from the frontend-nextjs
    allow_origins=["*"],
    #allow the credentials
    #allow if send the cookies
    #set to True if you want to send the cookies
    allow_credentials=True,
    #allow all methods
    #only allow the requests from the frontend-nextjs
    #["*"] means all methods for HTTP requests(GET, POST, PUT, DELETE, etc.)
    allow_methods=["*"],
    #allow all headers
    #only allow the requests from the frontend-nextjs
    #["*"] means all headers for HTTP requests(Content-Type, Authorization, etc.)
    allow_headers=["*"]
)

#define a route for the root path
@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Smart Payment Assistant is running!",
        "timestamp": datetime.now().isoformat()
        }

#chat api endpoint
#workflow:
#1.Python object(chatresponse) -> fastapi automatically convert to JSON
#2.json string -> http response body
#3.frontend-nextjs will receive the json string and parse it to a JavaScript object
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        #1.get the user message from the request
        user_message = request.messages
        
        #2.situmate the thinking process
        time.sleep(1)
        
        #3.generate the response
        ai_response = generate_response(user_message)
        
        #4.create the response
        response_message = Message(
                id=str(int(time.time()) * 1000),
                content=ai_response,
                role="assistant",
                createdAt=datetime.now()
        )
        
        #5.return the response
        return ChatResponse(
            message=response_message,
            status="success"
        )
    except Exception as e:
        #6.return the error response
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )
        
#a simple function to generate the response
def generate_response(user_message: str) -> str:
    #simulate the response from the assistant
    #later on it will replace with the actual LLM response
    message_lower = user_message.lower()
    
    if any(keyword in message_lower for keyword in ['transaction', 'payment', '交易', '支付']):
        return "您好！我可以帮您查询交易记录和支付信息。请问您想查询哪个时间段的交易？"
    elif any(keyword in message_lower for keyword in ['balance', '余额', '账户']):
        return "您的当前余额是 ¥12,345.67。如需详细信息，请告诉我具体的账户名称。"
    elif any(keyword in message_lower for keyword in ['help', 'hello', 'hi', '帮助', '你好']):
        return "您好！我是智能支付助手，可以帮您：\n1. 查询交易记录\n2. 查看账户余额\n3. 分析消费趋势\n4. 提供支付建议\n\n请问有什么可以帮您？"
    else:
        return f"收到您的消息：「{user_message}」\n\n我是智能支付助手，可以帮您处理支付相关的问题。请尝试询问交易记录、账户余额等信息。"
    
#runing reminder
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)