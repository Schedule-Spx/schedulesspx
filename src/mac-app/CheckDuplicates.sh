#!/bin/bash
set -e

echo "Checking for duplicate declarations in Swift files..."

# Check for duplicate enum declarations
echo "Checking for SeparatorStyle declarations:"
grep -n "enum SeparatorStyle" ./Sources/ScheduleSPX/*.swift

echo "Checking for DisplayMode declarations:"
grep -n "enum DisplayMode" ./Sources/ScheduleSPX/*.swift

echo "Checking for AppDelegate declarations:"
grep -n "class AppDelegate" ./Sources/ScheduleSPX/*.swift

echo "Done checking for duplicates."
