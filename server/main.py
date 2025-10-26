"""
WebPify FastAPI Backend
Converts images to WebP format with efficient in-memory processing.
"""
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import io
from utils.image_converter import (
    convert_to_webp,
    create_zip_from_images,
    is_valid_image_format,
    get_image_info
)

# Pydantic models for API documentation
class HealthResponse(BaseModel):
    status: str
    service: str
    version: str

    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "service": "WebPify API",
                "version": "1.0.0"
            }
        }

class APIResponse(BaseModel):
    service: str
    version: str
    description: str
    endpoints: dict

    class Config:
        json_schema_extra = {
            "example": {
                "service": "WebPify API",
                "version": "1.0.0",
                "description": "Convert images to WebP format",
                "endpoints": {
                    "/api/convert": "POST - Convert images to WebP",
                    "/api/health": "GET - Health check",
                    "/docs": "GET - Interactive API documentation (Swagger UI)",
                    "/redoc": "GET - Alternative API documentation"
                }
            }
        }

# Initialize FastAPI app
app = FastAPI(
    title="WebPify API",
    description="""
    ## 🌐 WebPify - Image to WebP Converter API
    
    A modern, efficient REST API for converting images to WebP format with high-quality compression.
    
    ### Features
    
    * 📦 **Batch Processing** - Convert multiple images at once
    * 🎨 **Quality Control** - Adjustable compression (1-100)
    * 🖼️ **Multiple Formats** - Support for PNG, JPEG, BMP, TIFF, GIF, WebP
    * 💾 **In-Memory Processing** - No temporary files
    * 🔒 **Transparency Support** - Preserves alpha channels
    
    ### Supported Formats
    
    * PNG (.png)
    * JPEG (.jpg, .jpeg)
    * BMP (.bmp)
    * TIFF (.tiff, .tif)
    * GIF (.gif)
    * WebP (.webp)
    
    ### Usage Examples
    
    **Single File:**
    ```bash
    curl -X POST "http://localhost:8000/api/convert?quality=90" \
      -F "files=@image.png" \
      --output converted.webp
    ```
    
    **Multiple Files:**
    ```bash
    curl -X POST "http://localhost:8000/api/convert?quality=85" \
      -F "files=@image1.png" \
      -F "files=@image2.jpg" \
      --output converted.zip
    ```
    """,
    version="1.0.0",
    contact={
        "name": "WebPify",
        "url": "https://github.com/webpify",
    },
    license_info={
        "name": "MIT",
    },
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=APIResponse, tags=["Info"])
async def root():
    """
    Root endpoint with API information.
    
    Returns basic information about the API including available endpoints.
    """
    return {
        "service": "WebPify API",
        "version": "1.0.0",
        "description": "Convert images to WebP format",
        "endpoints": {
            "/api/convert": "POST - Convert images to WebP",
            "/api/health": "GET - Health check",
            "/docs": "GET - Interactive API documentation (Swagger UI)",
            "/redoc": "GET - Alternative API documentation"
        }
    }


@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring.
    
    Use this endpoint to verify that the API is running and responding correctly.
    Returns the current status and version information.
    """
    return {
        "status": "healthy",
        "service": "WebPify API",
        "version": "1.0.0"
    }


@app.post(
    "/api/convert",
    tags=["Conversion"],
    summary="Convert images to WebP format",
    response_description="WebP image or ZIP archive",
    responses={
        200: {
            "description": "Successful conversion",
            "content": {
                "image/webp": {"schema": {"type": "string", "format": "binary"}},
                "application/zip": {"schema": {"type": "string", "format": "binary"}}
            }
        },
        400: {"description": "Invalid file format or missing files"},
        500: {"description": "Server error during conversion"}
    }
)
async def convert_images(
    files: List[UploadFile] = File(
        ..., 
        description="Image files to convert (PNG, JPG, JPEG, BMP, TIFF, GIF, WebP)"
    ),
    quality: Optional[int] = Form(
        default=85, 
        ge=1, 
        le=100, 
        description="WebP compression quality (1-100, default: 85). Higher values provide better quality but larger file sizes."
    )
):
    """
    Convert one or more images to WebP format with configurable quality.
    
    **How it works:**
    - Upload one or more image files
    - Specify compression quality (1-100)
    - Get converted WebP images
    
    **Response format:**
    - **Single file**: Returns the converted WebP file directly
    - **Multiple files**: Returns a ZIP archive containing all converted images
    
    **Supported formats:**
    - PNG (.png)
    - JPEG (.jpg, .jpeg)
    - BMP (.bmp)
    - TIFF (.tiff, .tif)
    - GIF (.gif)
    - WebP (.webp)
    
    **Quality settings:**
    - **1-70**: High compression, smaller file size (suitable for thumbnails)
    - **71-85**: Balanced quality and size (recommended for most use cases)
    - **86-100**: High quality, larger file size (suitable for high-resolution images)
    
    **Examples:**
    
    *Python:*
    ```python
    import requests
    
    # Single file
    with open('image.png', 'rb') as f:
        response = requests.post(
            'http://localhost:8000/api/convert',
            files={'files': f},
            params={'quality': 85}
        )
    
    # Multiple files
    with open('image1.png', 'rb') as f1, open('image2.jpg', 'rb') as f2:
        response = requests.post(
            'http://localhost:8000/api/convert',
            files=[('files', f1), ('files', f2)],
            params={'quality': 90}
        )
    ```
    
    *JavaScript:*
    ```javascript
    const formData = new FormData();
    formData.append('files', fileInput.files[0]);
    
    const response = await fetch('http://localhost:8000/api/convert?quality=85', {
        method: 'POST',
        body: formData
    });
    ```
    """
    if not files or len(files) == 0:
        raise HTTPException(status_code=400, detail="No files provided")
    
    # Validate all files before processing
    for file in files:
        if not is_valid_image_format(file.filename):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file format: {file.filename}. Allowed formats: PNG, JPG, JPEG, BMP, TIFF, GIF, WEBP"
            )
    
    try:
        converted_images = []
        filenames = []
        
        # Process each file
        for file in files:
            # Read file content
            image_bytes = await file.read()
            
            # Convert to WebP
            webp_bytes, output_filename = convert_to_webp(
                image_bytes,
                quality=quality,
                filename=file.filename
            )
            
            converted_images.append(webp_bytes)
            filenames.append(output_filename)
        
        # Return ZIP for multiple files, single file for one
        if len(converted_images) == 1:
            # Return single WebP file
            return StreamingResponse(
                io.BytesIO(converted_images[0]),
                media_type="image/webp",
                headers={"Content-Disposition": f'attachment; filename="{filenames[0]}"'}
            )
        else:
            # Return ZIP archive
            zip_data = create_zip_from_images(converted_images, filenames)
            return StreamingResponse(
                io.BytesIO(zip_data),
                media_type="application/zip",
                headers={"Content-Disposition": 'attachment; filename="WebPify_converted_images.zip"'}
            )
            
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error during conversion: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
