"""
Quick start script for WebPify API.
Run this file to start the FastAPI server with production-ready settings.
"""
import uvicorn

if __name__ == "__main__":
    print("Starting WebPify API...")
    print("Server will be available at http://localhost:8000")
    print("API Documentation at http://localhost:8000/docs")
    print("\nPress CTRL+C to stop the server\n")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
