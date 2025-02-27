#!/bin/bash
set -e

# Configuration
APP_NAME="ScheduleSPX"
APP_BUNDLE="${APP_NAME}.app"
DMG_NAME="${APP_NAME}_Installer.dmg"
BUILD_DIR="./build"
OUTPUT_DIR="./dist"
RESOURCES_DIR="./Resources"
ICON_PATH="${RESOURCES_DIR}/AppIcon.icns"
SVG_SOURCE="./assets/logo.svg"
INFO_PLIST_SOURCE="./Sources/ScheduleSPX/Info.plist"

# Create necessary directories
mkdir -p "${BUILD_DIR}"
mkdir -p "${OUTPUT_DIR}"
mkdir -p "${RESOURCES_DIR}"
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

# Create DMG
echo "Creating DMG installer..."
hdiutil create -volname "${APP_NAME}" -srcfolder "${BUILD_DIR}/${APP_BUNDLE}" -ov -format UDZO "${OUTPUT_DIR}/${DMG_NAME}"

echo "Build complete! DMG available at ${OUTPUT_DIR}/${DMG_NAME}"
