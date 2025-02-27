#!/bin/bash
set -e

OUTPUT="${1:-dmg_background.png}"
WIDTH=600
HEIGHT=400

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick not found. Install with 'brew install imagemagick'"
    exit 1
fi

# Create a black to dark blue gradient background with no text
convert -size ${WIDTH}x${HEIGHT} \
    gradient:black-midnightblue \
    "${OUTPUT}"

echo "DMG background created at: ${OUTPUT}"
