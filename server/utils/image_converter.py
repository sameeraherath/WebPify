"""
Image conversion utilities for WebPify API.
Handles conversion of various image formats to WebP format using Pillow.
"""
from io import BytesIO
from PIL import Image
from typing import Tuple
import zipfile


ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.tif', '.gif', '.webp'}
SUPPORTED_FORMATS = {'PNG', 'JPEG', 'JPG', 'BMP', 'TIFF', 'GIF', 'WEBP'}


def is_valid_image_format(filename: str) -> bool:
    """
    Check if the file extension is in the allowed list.
    
    Args:
        filename: The name of the file
        
    Returns:
        bool: True if the extension is allowed
    """
    return any(filename.lower().endswith(ext) for ext in ALLOWED_EXTENSIONS)


def convert_to_webp(
    image_bytes: bytes,
    quality: int = 85,
    filename: str = "image.webp"
) -> Tuple[bytes, str]:
    """
    Convert an image to WebP format in memory.
    
    Args:
        image_bytes: Raw bytes of the input image
        quality: Compression quality (1-100, default: 85)
        filename: Original filename for proper extension handling
        
    Returns:
        Tuple of (webp_bytes, output_filename)
        
    Raises:
        ValueError: If image is corrupted or format is not supported
        OSError: If image cannot be opened
    """
    # Validate quality parameter
    quality = max(1, min(100, quality))
    
    try:
        # Open image from bytes
        image = Image.open(BytesIO(image_bytes))
        
        # Convert RGBA for transparency support
        if image.mode in ('RGBA', 'LA'):
            pass  # Keep as-is for transparency
        elif image.mode == 'P':
            image = image.convert('RGBA')
        elif image.mode not in ('RGB', 'RGBA'):
            image = image.convert('RGB')
        
        # Convert to WebP in memory
        output_buffer = BytesIO()
        
        # Use lossless for PNG with transparency, lossy otherwise
        save_args = {
            'format': 'WEBP',
            'quality': quality,
        }
        
        # For images with alpha channel, consider lossless
        if image.mode in ('RGBA', 'LA') and quality >= 90:
            save_args['lossless'] = True
            
        image.save(output_buffer, **save_args)
        webp_bytes = output_buffer.getvalue()
        
        # Generate output filename
        output_filename = filename.rsplit('.', 1)[0] + '.webp'
        
        return webp_bytes, output_filename
        
    except Exception as e:
        raise ValueError(f"Error converting image: {str(e)}")


def create_zip_from_images(
    images_data: list,
    filenames: list
) -> bytes:
    """
    Create a ZIP archive from multiple image bytes.
    
    Args:
        images_data: List of image bytes
        filenames: List of corresponding filenames
        
    Returns:
        bytes: ZIP file as bytes
    """
    zip_buffer = BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for image_bytes, filename in zip(images_data, filenames):
            zip_file.writestr(filename, image_bytes)
    
    return zip_buffer.getvalue()


def get_image_info(image_bytes: bytes) -> dict:
    """
    Get information about an image (size, format, dimensions).
    
    Args:
        image_bytes: Raw bytes of the image
        
    Returns:
        dict: Image information including format, size, dimensions
    """
    try:
        image = Image.open(BytesIO(image_bytes))
        return {
            'format': image.format,
            'size': len(image_bytes),
            'dimensions': image.size,
            'mode': image.mode
        }
    except Exception as e:
        raise ValueError(f"Error reading image info: {str(e)}")
