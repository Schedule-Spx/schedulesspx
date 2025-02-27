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
