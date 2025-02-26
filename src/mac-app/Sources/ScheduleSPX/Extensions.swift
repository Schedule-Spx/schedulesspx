import Foundation

extension Collection {
    var nilIfEmpty: Self? {
        return isEmpty ? nil : self
    }
}

extension DateFormatter {
    convenience init(withFormat format: String) {
        self.init()
        self.dateFormat = format
    }
}
