#!/bin/bash
set -e

# This script creates Mac app icons from an SVG file
# Uses either rsvg-convert (preferred) or Inkscape as fallback

# Configuration
ICON_NAME="AppIcon"
SVG_SOURCE="/Users/david/Desktop/schedulesspx/src/mac-app/assets/logo.svg"
OUTPUT_DIR="$(pwd)"

# Check if source exists
if [ ! -f "${SVG_SOURCE}" ]; then
    echo "Error: Source SVG file not found at ${SVG_SOURCE}"
    exit 1
fi

# Create the iconset directory
ICONSET="${OUTPUT_DIR}/${ICON_NAME}.iconset"
mkdir -p "${ICONSET}"

# Function to convert SVG to PNG
convert_svg() {
    local size=$1
    local output=$2
    
    # Try rsvg-convert first (from librsvg)
    if command -v rsvg-convert &> /dev/null; then
        echo "Using rsvg-convert for conversion..."
        rsvg-convert -w ${size} -h ${size} "${SVG_SOURCE}" -o "${output}"
        return 0
    fi
    
    # Try Inkscape as fallback
    if command -v inkscape &> /dev/null; then
        echo "Using Inkscape for conversion..."
        inkscape "${SVG_SOURCE}" --export-width=${size} --export-height=${size} --export-filename="${output}"
        return 0
    fi
    
    # If neither tool is available, provide instructions
    echo "Error: Neither rsvg-convert nor Inkscape is installed."
    echo "Please install one of these tools:"
    echo "  - librsvg: brew install librsvg"
    echo "  - Inkscape: brew install inkscape"
    return 1
}

# Generate the various sized icons
for SIZE in 16 32 64 128 256 512 1024; do
    echo "Creating ${SIZE}x${SIZE} icon..."
    convert_svg ${SIZE} "${ICONSET}/icon_${SIZE}x${SIZE}.png" || exit 1
    
    # Create retina versions (@2x) for sizes up to 512
    if [ $SIZE -le 512 ]; then
        echo "Creating ${SIZE}x${SIZE}@2x icon..."
        convert_svg $((SIZE*2)) "${ICONSET}/icon_${SIZE}x${SIZE}@2x.png" || exit 1
    fi
done

# Create the icns file
echo "Generating .icns file..."
iconutil -c icns "${ICONSET}" -o "${OUTPUT_DIR}/${ICON_NAME}.icns"

# Clean up
rm -rf "${ICONSET}"
echo "Icon created successfully at ${OUTPUT_DIR}/${ICON_NAME}.icns"
