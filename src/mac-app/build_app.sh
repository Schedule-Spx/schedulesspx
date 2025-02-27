#!/bin/bash
set -e

# Configuration
APP_NAME="ScheduleSPX"
APP_BUNDLE="${APP_NAME}.app"
DMG_NAME="${APP_NAME}_Installer.dmg"
TMP_DMG_NAME="${APP_NAME}_tmp.dmg"
BUILD_DIR="./build"
OUTPUT_DIR="./dist"
RESOURCES_DIR="./Resources"
DMG_DIR="./dmg_contents"
ICON_PATH="${RESOURCES_DIR}/AppIcon.icns"
SVG_SOURCE="./assets/logo.svg"
INFO_PLIST_SOURCE="./Sources/ScheduleSPX/Info.plist"
BACKGROUND_IMG="${RESOURCES_DIR}/dmg_background.png"

# Create necessary directories
mkdir -p "${BUILD_DIR}"
mkdir -p "${OUTPUT_DIR}"
mkdir -p "${RESOURCES_DIR}"
mkdir -p "${DMG_DIR}"
mkdir -p "./Sources/ScheduleSPX/Resources"

# Ensure Info.plist exists
if [ ! -f "${INFO_PLIST_SOURCE}" ]; then
    echo "Creating Info.plist..."
    cat > "${INFO_PLIST_SOURCE}" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleIdentifier</key>
    <string>com.yourname.ScheduleSPX</string>
    <key>CFBundleName</key>
    <string>ScheduleSPX</string>
    <key>CFBundleDisplayName</key>
    <string>ScheduleSPX</string>
    <key>CFBundleExecutable</key>
    <string>ScheduleSPX</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
    <key>LSUIElement</key>
    <true/>
    <key>NSPrincipalClass</key>
    <string>NSApplication</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

    # Also copy to Resources directory for Swift Package Manager
    cp "${INFO_PLIST_SOURCE}" "./Sources/ScheduleSPX/Resources/"
fi

# Check if we need to generate an icon
if [ ! -f "${ICON_PATH}" ] && [ -f "${SVG_SOURCE}" ]; then
    echo "Generating icon from SVG..."
    cd "${RESOURCES_DIR}"
    ./create_icon.sh
    cd ..
fi

# Create a DMG background image if it doesn't exist
if [ ! -f "${BACKGROUND_IMG}" ]; then
    echo "Creating DMG background image..."
    if command -v convert &> /dev/null; then
        # Run the script to generate the gradient background
        "${RESOURCES_DIR}/create_dmg_background.sh" "${BACKGROUND_IMG}"
    else
        echo "ImageMagick not found. Installing with Homebrew for custom DMG background."
        brew install imagemagick
        "${RESOURCES_DIR}/create_dmg_background.sh" "${BACKGROUND_IMG}"
    fi
fi

# Clean any previous build artifacts
rm -rf .build
echo "Building Swift package..."
swift build -c release --product ScheduleSPX

# Create the app bundle structure
echo "Creating app bundle structure..."
mkdir -p "${BUILD_DIR}/${APP_BUNDLE}/Contents/MacOS"
mkdir -p "${BUILD_DIR}/${APP_BUNDLE}/Contents/Resources"

# Copy the executable
echo "Copying executable..."
cp ./.build/release/ScheduleSPX "${BUILD_DIR}/${APP_BUNDLE}/Contents/MacOS/"

# Copy the Info.plist
echo "Copying Info.plist..."
cp "${INFO_PLIST_SOURCE}" "${BUILD_DIR}/${APP_BUNDLE}/Contents/"

# Copy the icon if it exists
if [ -f "${ICON_PATH}" ]; then
    echo "Copying app icon..."
    cp "${ICON_PATH}" "${BUILD_DIR}/${APP_BUNDLE}/Contents/Resources/AppIcon.icns"
fi

# Create a simple DMG with Applications folder link
echo "Creating simple DMG installer..."
mkdir -p "${DMG_DIR}"
cp -R "${BUILD_DIR}/${APP_BUNDLE}" "${DMG_DIR}/"
ln -s /Applications "${DMG_DIR}/Applications"

# Add README file with instructions
echo "Adding installation instructions..."
cat > "${DMG_DIR}/README.txt" << EOF
# ScheduleSPX Installation Instructions

If you see a message that "ScheduleSPX.app is damaged and can't be opened", this is due to macOS security features for apps without a developer signature.

To fix this:

1. After installing the app to your Applications folder, open Terminal
2. Copy and paste this command:
   xattr -d com.apple.quarantine /Applications/ScheduleSPX.app
3. Press Return

Alternatively:
- Right-click on ScheduleSPX.app
- Select "Open"
- Click "Open" when the warning appears
EOF

# Create the DMG directly
hdiutil create -volname "${APP_NAME}" -srcfolder "${DMG_DIR}" -ov -format UDZO "${OUTPUT_DIR}/${DMG_NAME}"

echo "Build complete! DMG available at ${OUTPUT_DIR}/${DMG_NAME}"
