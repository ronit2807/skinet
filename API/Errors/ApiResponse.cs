using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse()
        {
        }

        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageCode(StatusCode);
        }

        public int StatusCode { get; set; }
        
        public string Message { get; set; }
        
         private string GetDefaultMessageCode(int statusCode)
        {
            return statusCode switch {
                400 => "A bad request",
                401 => "You are not authorized",
                404 => "Resource not found",
                500 => "Internal server error",
                _ => null
            };
        }

        
    }
}