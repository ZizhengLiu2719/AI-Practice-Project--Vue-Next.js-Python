//API tool functions - package all backend API calls

//basic URL from backend api
//environment variable
//in next.jsm the NEXT_PUBLIC_ prefix is used to make the variable public and accessible from the client side

const API_BASE_URL = 'http://localhost:8000';

//parameters type of chat request
interface ChatRequestParams {
    message: string;
}

//the message type from the backend
interface ApiMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
}

//the response type from the backend
interface ApiResponse {
    message: ApiMessage;
    status: 'success' | 'error';
}

/**
 * 发送聊天消息到后端
 * 
 * @param message - 用户输入的消息
 * @returns Promise<string> - AI 的回复内容
 * @throws Error - 请求失败时抛出错误
 */

export async function sendChatMessage(message: string): Promise<string> {
    try {
        //workflow:
        //1.javascrip object {message: "hello"} -> JSON.stringify()
        //2.JSON string -> HTTP post
        //3.backend will receive the JSON string and parse it to a Python object
      //Fetch API: a modern way to make HTTP requests in JavaScript
      //it is a embedded API in the browser
      //return promise and supports async/await
      //replace the XMLHttpRequest or other legacy APIs
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        //HTTP method: POST
        //POST is a HTTP method to send data to the server
        method: 'POST',
        //HTTP headers
        headers: {
          'Content-Type': 'application/json',
        },
        //HTTP body: the data to send to the server
        //has to be a string
        //JSON.stringify: convert the JavaScript object to a JSON string
        body: JSON.stringify({ message }),  
      });
      //capture the error in 3 levels:
      //1.internet error(fetch failed)
      //2.HTTP error(status code is not 200)
      //3.business error(status is error)
      // 2. 检查 HTTP 状态码
      if (!response.ok) {
        // HTTP 错误（4xx, 5xx）
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
  
      // 3. 解析响应 JSON
      const data: ApiResponse = await response.json();
  
      // 4. 检查业务状态
      if (data.status === 'error') {
        throw new Error('服务器返回错误状态');
      }
  
      // 5. 返回 AI 回复内容
      return data.message.content;
  
    } catch (error) {
      // 统一错误处理
      if (error instanceof Error) {
        console.error('API 调用失败:', error.message);
        throw error;
      }
      throw new Error('未知错误');
    }
  }
  
  /**
   * 健康检查 - 测试后端是否在线
   * 
   * @returns Promise<boolean> - 后端是否正常
   */
  export async function healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      return response.ok;
    } catch {
      return false;
    }
  }