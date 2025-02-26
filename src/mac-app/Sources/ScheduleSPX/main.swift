import Cocoa
import Foundation

// Add a new enum for separator styles
enum SeparatorStyle: Int {
    case none = 0
    case bars = 1
    case brackets = 2
    case arrows = 3
    case dots = 4
    
    var prefix: String {
        switch self {
        case .none: return ""
        case .bars: return "| "
        case .brackets: return "[ "
        case .arrows: return "→ "
        case .dots: return "• "
        }
    }
    
    var suffix: String {
        switch self {
        case .none: return ""
        case .bars: return " |"
        case .brackets: return " ]"
        case .arrows: return " ←"
        case .dots: return " •"
        }
    }
}

// Enum for display options
enum DisplayMode: Int {
    case currentPeriod = 0
    case countdownEnd = 1
    case countdownDay = 2
    case dateAndTime = 3
    case percentageLeft = 4
    case periodEndTime = 5
}

class AppDelegate: NSObject, NSApplicationDelegate {
    var statusItem: NSStatusItem?
    var timer: Timer?
    var periods: [Period] = []
    var lastRefreshDate: Date?
    var activeDisplayModes: Set<DisplayMode> = [.countdownEnd] // Changed default to countdown
    var currentDisplayIndex: Int = 0
    var separatorStyle: SeparatorStyle = .bars // Default to bars
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        // Create the status item
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        statusItem?.button?.title = "ScheduleSPX Loading..."
        
        // Initialize the app directly without authentication
        initializeApp()
    }
    
    func initializeApp() {
        // Add menu items
        updateMenu()
        
        // Initial fetch
        fetchSchedule()
        
        // Set up timer to check every second if we need to update the display
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            self?.checkForUpdates()
        }
    }
    
    func updateMenu() {
        let menu = NSMenu()
        menu.addItem(NSMenuItem(title: "Refresh Schedule", action: #selector(refreshSchedule), keyEquivalent: "r"))
        menu.addItem(NSMenuItem.separator())
        
        // Add display mode options
        menu.addItem(withTitle: "Display Options:", action: nil, keyEquivalent: "")
        
        let currentPeriodItem = NSMenuItem(title: "Current Period", action: #selector(toggleDisplayMode), keyEquivalent: "1")
        currentPeriodItem.tag = DisplayMode.currentPeriod.rawValue
        currentPeriodItem.state = activeDisplayModes.contains(.currentPeriod) ? .on : .off
        menu.addItem(currentPeriodItem)
        
        let countdownEndItem = NSMenuItem(title: "Countdown Until End of Period", action: #selector(toggleDisplayMode), keyEquivalent: "2")
        countdownEndItem.tag = DisplayMode.countdownEnd.rawValue
        countdownEndItem.state = activeDisplayModes.contains(.countdownEnd) ? .on : .off
        menu.addItem(countdownEndItem)
        
        let countdownDayItem = NSMenuItem(title: "Countdown Until End of Day", action: #selector(toggleDisplayMode), keyEquivalent: "3")
        countdownDayItem.tag = DisplayMode.countdownDay.rawValue
        countdownDayItem.state = activeDisplayModes.contains(.countdownDay) ? .on : .off
        menu.addItem(countdownDayItem)
        
        let dateTimeItem = NSMenuItem(title: "Date and Time", action: #selector(toggleDisplayMode), keyEquivalent: "4")
        dateTimeItem.tag = DisplayMode.dateAndTime.rawValue
        dateTimeItem.state = activeDisplayModes.contains(.dateAndTime) ? .on : .off
        menu.addItem(dateTimeItem)
        
        let percentageItem = NSMenuItem(title: "Percentage Left in Period", action: #selector(toggleDisplayMode), keyEquivalent: "5")
        percentageItem.tag = DisplayMode.percentageLeft.rawValue
        percentageItem.state = activeDisplayModes.contains(.percentageLeft) ? .on : .off
        menu.addItem(percentageItem)
        
        let endTimeItem = NSMenuItem(title: "Period End/Start Time", action: #selector(toggleDisplayMode), keyEquivalent: "6")
        endTimeItem.tag = DisplayMode.periodEndTime.rawValue
        endTimeItem.state = activeDisplayModes.contains(.periodEndTime) ? .on : .off
        menu.addItem(endTimeItem)
        
        // Add separator style submenu
        menu.addItem(NSMenuItem.separator())
        menu.addItem(withTitle: "Separator Style:", action: nil, keyEquivalent: "")
        
        let separatorMenu = NSMenu()
        
        let noneItem = NSMenuItem(title: "None", action: #selector(setSeparatorStyle), keyEquivalent: "")
        noneItem.tag = SeparatorStyle.none.rawValue
        noneItem.state = separatorStyle == .none ? .on : .off
        separatorMenu.addItem(noneItem)
        
        let barsItem = NSMenuItem(title: "Bars (| Text |)", action: #selector(setSeparatorStyle), keyEquivalent: "")
        barsItem.tag = SeparatorStyle.bars.rawValue
        barsItem.state = separatorStyle == .bars ? .on : .off
        separatorMenu.addItem(barsItem)
        
        let bracketsItem = NSMenuItem(title: "Brackets ([ Text ])", action: #selector(setSeparatorStyle), keyEquivalent: "")
        bracketsItem.tag = SeparatorStyle.brackets.rawValue
        bracketsItem.state = separatorStyle == .brackets ? .on : .off
        separatorMenu.addItem(bracketsItem)
        
        let arrowsItem = NSMenuItem(title: "Arrows (→ Text ←)", action: #selector(setSeparatorStyle), keyEquivalent: "")
        arrowsItem.tag = SeparatorStyle.arrows.rawValue
        arrowsItem.state = separatorStyle == .arrows ? .on : .off
        separatorMenu.addItem(arrowsItem)
        
        let dotsItem = NSMenuItem(title: "Dots (• Text •)", action: #selector(setSeparatorStyle), keyEquivalent: "")
        dotsItem.tag = SeparatorStyle.dots.rawValue
        dotsItem.state = separatorStyle == .dots ? .on : .off
        separatorMenu.addItem(dotsItem)
        
        let separatorStyleItem = NSMenuItem(title: "Separator Style", action: nil, keyEquivalent: "")
        separatorStyleItem.submenu = separatorMenu
        menu.addItem(separatorStyleItem)
        
        menu.addItem(NSMenuItem.separator())
        
        // Display user info
        menu.addItem(withTitle: "ScheduleSPX User", action: nil, keyEquivalent: "")
        
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Quit", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q"))
        
        statusItem?.menu = menu
    }
    
    @objc func setSeparatorStyle(_ sender: NSMenuItem) {
        if let style = SeparatorStyle(rawValue: sender.tag) {
            separatorStyle = style
            updateMenu()
            updateDisplay()
        }
    }
    
    @objc func toggleDisplayMode(_ sender: NSMenuItem) {
        if let mode = DisplayMode(rawValue: sender.tag) {
            if activeDisplayModes.contains(mode) {
                activeDisplayModes.remove(mode)
                if activeDisplayModes.isEmpty {
                    activeDisplayModes.insert(.currentPeriod) // Always keep at least one mode active
                }
            } else {
                activeDisplayModes.insert(mode)
            }
            currentDisplayIndex = 0 // Reset the display index when modes change
            updateMenu()
            updateDisplay()
        }
    }
    
    func checkForUpdates() {
        // Update the display regardless of schedule refresh
        updateDisplay()
        
        // Cycle through active display modes every 3 seconds
        let now = Date()
        let calendar = Calendar.current
        let currentTimeComponents = calendar.dateComponents([.second], from: now)
        
        if currentTimeComponents.second! % 3 == 0 {
            cycleDisplayMode()
        }
        
        // Check if we need to refresh the schedule (daily)
        if let lastRefresh = lastRefreshDate {
            // Check if it's a new day compared to our last refresh
            let lastDay = calendar.component(.day, from: lastRefresh)
            let currentDay = calendar.component(.day, from: now)
            
            if lastDay != currentDay {
                fetchSchedule()
            }
        }
    }
    
    func cycleDisplayMode() {
        let modes = Array(activeDisplayModes)
        if !modes.isEmpty {
            currentDisplayIndex = (currentDisplayIndex + 1) % modes.count
        }
    }
    
    @objc func refreshSchedule() {
        statusItem?.button?.title = "Refreshing..."
        fetchSchedule()
    }
    
    func fetchSchedule() {
        let url = URL(string: "https://schedule-api.devs4u.workers.dev/api/schedule")!
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        
        let task = URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
            if let error = error {
                self?.updateStatusWithError("Error: \(error.localizedDescription)")
                return
            }
            
            if let httpResponse = response as? HTTPURLResponse {
                if httpResponse.statusCode != 200 {
                    self?.updateStatusWithError("API Error: HTTP \(httpResponse.statusCode)")
                    return
                }
            }
            
            guard let data = data else {
                self?.updateStatusWithError("Error: No data received")
                return
            }
            
            do {
                // Parse the schedule response
                let scheduleResponse = try JSONDecoder().decode(ScheduleResponse.self, from: data)
                
                // Process today's schedule
                let todayPeriods = self?.getPeriodsForToday(scheduleResponse) ?? []
                
                DispatchQueue.main.async {
                    self?.periods = todayPeriods
                    self?.lastRefreshDate = Date()
                    self?.updateDisplay()
                }
            } catch {
                self?.updateStatusWithError("Error parsing JSON: \(error.localizedDescription)")
                
                // Attempt to parse as a different format - replace with boolean test
                do {
                    // Just check if it's valid JSON without storing the result
                    _ = try JSONSerialization.jsonObject(with: data)
                    // Silent logging if needed
                } catch {
                    // Silent failure
                }
            }
        }
        
        task.resume()
    }
    
    func getPeriodsForToday(_ scheduleResponse: ScheduleResponse) -> [Period] {
        let today = Calendar.current.component(.weekday, from: Date())
        let todaySchedule: [String]?
        
        // Map weekday to the appropriate day in our schedule
        switch today {
        case 1: todaySchedule = scheduleResponse.sunday
        case 2: todaySchedule = scheduleResponse.monday
        case 3: todaySchedule = scheduleResponse.tuesday
        case 4: todaySchedule = scheduleResponse.wednesday
        case 5: todaySchedule = scheduleResponse.thursday
        case 6: todaySchedule = scheduleResponse.friday
        case 7: todaySchedule = scheduleResponse.saturday
        default: todaySchedule = nil
        }
        
        // Parse the period strings into structured data
        var periods: [Period] = []
        
        for periodString in todaySchedule ?? [] {
            if let period = parseStringToPeriod(periodString) {
                periods.append(period)
            }
        }
        
        return periods
    }
    
    func parseStringToPeriod(_ periodString: String) -> Period? {
        // Format examples: "1 - 8:00 AM-8:49 AM", "HR - 9:40 AM-9:58 AM"
        let components = periodString.components(separatedBy: " - ")
        
        guard components.count == 2 else {
            return nil
        }
        
        let timeComponents = components[1].components(separatedBy: "-").filter { !$0.isEmpty }
        guard let timeRangeComponents = timeComponents.nilIfEmpty, timeRangeComponents.count == 2 else {
            return nil
        }
        
        return Period(name: components[0], start: timeRangeComponents[0], end: timeRangeComponents[1])
    }
    
    func updateDisplay() {
        if periods.isEmpty {
            statusItem?.button?.title = "\(separatorStyle.prefix)No Schedule Today\(separatorStyle.suffix)"
            return
        }
        
        let now = Date()
        let calendar = Calendar.current
        let currentTimeComponents = calendar.dateComponents([.hour, .minute, .second], from: now)
        
        guard let currentHour = currentTimeComponents.hour,
              let currentMinute = currentTimeComponents.minute,
              let currentSecond = currentTimeComponents.second else {
            updateStatusWithError("Time error")
            return
        }
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "h:mm a"
        
        let currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond
        
        // Find current period
        for (index, period) in periods.enumerated() {
            guard let startTime = dateFormatter.date(from: period.start),
                  let endTime = dateFormatter.date(from: period.end) else {
                continue
            }
            
            let startComponents = calendar.dateComponents([.hour, .minute], from: startTime)
            let endComponents = calendar.dateComponents([.hour, .minute], from: endTime)
            
            let startTimeInSeconds = (startComponents.hour ?? 0) * 3600 + (startComponents.minute ?? 0) * 60
            let endTimeInSeconds = (endComponents.hour ?? 0) * 3600 + (endComponents.minute ?? 0) * 60
            
            if currentTimeInSeconds >= startTimeInSeconds && currentTimeInSeconds <= endTimeInSeconds {
                // In a period - display based on mode
                formatDisplay(
                    period: period,
                    periodIndex: index,
                    isInPeriod: true,
                    currentTimeInSeconds: currentTimeInSeconds,
                    startTimeInSeconds: startTimeInSeconds,
                    endTimeInSeconds: endTimeInSeconds
                )
                return
            }
        }
        
        // Not in a period - display next period or end of day
        if let nextPeriod = findNextPeriod(currentTimeInSeconds: currentTimeInSeconds),
           let nextIndex = periods.firstIndex(where: { $0.name == nextPeriod.name }) {
            
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "h:mm a"
            
            guard let startTime = dateFormatter.date(from: nextPeriod.start),
                  let endTime = dateFormatter.date(from: nextPeriod.end) else {
                statusItem?.button?.title = "Next: \(nextPeriod.name)"
                return
            }
            
            let startComponents = calendar.dateComponents([.hour, .minute], from: startTime)
            let endComponents = calendar.dateComponents([.hour, .minute], from: endTime)
            
            let startTimeInSeconds = (startComponents.hour ?? 0) * 3600 + (startComponents.minute ?? 0) * 60
            let endTimeInSeconds = (endComponents.hour ?? 0) * 3600 + (endComponents.minute ?? 0) * 60
            
            formatDisplay(
                period: nextPeriod,
                periodIndex: nextIndex,
                isInPeriod: false,
                currentTimeInSeconds: currentTimeInSeconds,
                startTimeInSeconds: startTimeInSeconds,
                endTimeInSeconds: endTimeInSeconds
            )
        } else {
            statusItem?.button?.title = "No Class Now"
        }
    }
    
    func formatDisplay(period: Period, periodIndex: Int, isInPeriod: Bool, currentTimeInSeconds: Int, startTimeInSeconds: Int, endTimeInSeconds: Int) {
        let periodName = getPeriodOrdinal(period.name)
        var displayText = ""
        
        // Get the current mode to display
        let modes = Array(activeDisplayModes)
        let currentMode = modes[currentDisplayIndex]
        
        switch currentMode {
        case .currentPeriod:
            if isInPeriod {
                displayText = "\(periodName) Period"
            } else {
                displayText = "Next: \(periodName) Period"
            }
            
        case .countdownEnd:
            if isInPeriod {
                let secondsLeft = endTimeInSeconds - currentTimeInSeconds
                let minutesLeft = secondsLeft / 60
                let secondsLeftDisplay = secondsLeft % 60
                displayText = "\(minutesLeft)m \(secondsLeftDisplay)s left in \(periodName)"
            } else {
                let secondsUntilNext = startTimeInSeconds - currentTimeInSeconds
                let minutesUntilNext = secondsUntilNext / 60
                let secondsDisplay = secondsUntilNext % 60
                displayText = "\(minutesUntilNext)m \(secondsDisplay)s until \(periodName)"
            }
            
        case .countdownDay:
            // Find end time of last period
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "h:mm a"
            
            if let lastPeriod = periods.last, let lastEndTime = dateFormatter.date(from: lastPeriod.end) {
                let lastEndComponents = Calendar.current.dateComponents([.hour, .minute], from: lastEndTime)
                let lastEndTimeInSeconds = (lastEndComponents.hour ?? 0) * 3600 + (lastEndComponents.minute ?? 0) * 60
                
                if currentTimeInSeconds < lastEndTimeInSeconds {
                    let secondsLeft = lastEndTimeInSeconds - currentTimeInSeconds
                    let minutesLeft = secondsLeft / 60
                    let secondsLeftDisplay = secondsLeft % 60
                    displayText = "\(minutesLeft)m \(secondsLeftDisplay)s left Today"
                } else {
                    displayText = "School Day Completed"
                }
            } else {
                displayText = "No End Time Available"
            }
            
        case .dateAndTime:
            let formatter = DateFormatter()
            formatter.dateFormat = "MMM d, h:mm:ss a"
            displayText = formatter.string(from: Date())
            
        case .percentageLeft:
            if isInPeriod {
                let totalDuration = endTimeInSeconds - startTimeInSeconds
                let elapsed = currentTimeInSeconds - startTimeInSeconds
                let percentage = Int((Double(elapsed) / Double(totalDuration)) * 100)
                displayText = "\(periodName) Period: \(percentage)% complete"
            } else {
                displayText = "Next: \(periodName) Period"
            }
            
        case .periodEndTime:
            let formatter = DateFormatter()
            formatter.dateFormat = "h:mm a"
            
            if isInPeriod {
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "h:mm a"
                let endTime = formatter.string(from: dateFormatter.date(from: period.end)!)
                displayText = "\(periodName) Period ends at \(endTime)"
            } else {
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "h:mm a"
                let startTime = formatter.string(from: dateFormatter.date(from: period.start)!)
                displayText = "\(periodName) Period starts at \(startTime)"
            }
        }
        
        // Apply the separator style to the display text
        statusItem?.button?.title = "\(separatorStyle.prefix)\(displayText)\(separatorStyle.suffix)"
    }
    
    func getPeriodOrdinal(_ periodName: String) -> String {
        // Convert period name to ordinal if it's a number
        if let periodNum = Int(periodName) {
            let suffix: String
            switch periodNum {
            case 1: suffix = "st"
            case 2: suffix = "nd"
            case 3: suffix = "rd"
            default: suffix = "th"
            }
            return "\(periodNum)\(suffix)"
        }
        return periodName
    }
    
    func findNextPeriod(currentTimeInSeconds: Int) -> Period? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "h:mm a"
        let calendar = Calendar.current
        
        var nextPeriod: Period?
        var minStartTimeInSeconds = Int.max
        
        for period in periods {
            guard let startTime = dateFormatter.date(from: period.start) else {
                continue
            }
            
            let startComponents = calendar.dateComponents([.hour, .minute], from: startTime)
            let startTimeInSeconds = (startComponents.hour ?? 0) * 3600 + (startComponents.minute ?? 0) * 60
            
            if startTimeInSeconds > currentTimeInSeconds && startTimeInSeconds < minStartTimeInSeconds {
                minStartTimeInSeconds = startTimeInSeconds
                nextPeriod = period
            }
        }
        
        return nextPeriod
    }
    
    func updateStatusWithError(_ message: String) {
        DispatchQueue.main.async {
            self.statusItem?.button?.title = "\(self.separatorStyle.prefix)Schedule Error\(self.separatorStyle.suffix)"
            // Error silently handled
        }
    }
}

// Set up app delegate
let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.accessory)
app.run()
