import Foundation

// Define the ScheduleResponse model
struct ScheduleResponse: Decodable {
    let monday: [String]?
    let tuesday: [String]?
    let wednesday: [String]?
    let thursday: [String]?
    let friday: [String]?
    let saturday: [String]?
    let sunday: [String]?
    
    // Define coding keys to handle potential API response variations
    enum CodingKeys: String, CodingKey {
        case monday, tuesday, wednesday, thursday, friday, saturday, sunday
        case Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        // Try both lowercase and uppercase keys (API might be inconsistent)
        monday = try container.decodeIfPresent([String].self, forKey: .monday) ?? 
                container.decodeIfPresent([String].self, forKey: .Monday)
        
        tuesday = try container.decodeIfPresent([String].self, forKey: .tuesday) ?? 
                 container.decodeIfPresent([String].self, forKey: .Tuesday)
        
        wednesday = try container.decodeIfPresent([String].self, forKey: .wednesday) ?? 
                   container.decodeIfPresent([String].self, forKey: .Wednesday)
        
        thursday = try container.decodeIfPresent([String].self, forKey: .thursday) ?? 
                  container.decodeIfPresent([String].self, forKey: .Thursday)
        
        friday = try container.decodeIfPresent([String].self, forKey: .friday) ?? 
                container.decodeIfPresent([String].self, forKey: .Friday)
        
        saturday = try container.decodeIfPresent([String].self, forKey: .saturday) ?? 
                  container.decodeIfPresent([String].self, forKey: .Saturday)
        
        sunday = try container.decodeIfPresent([String].self, forKey: .sunday) ?? 
                container.decodeIfPresent([String].self, forKey: .Sunday)
    }
}

// Define the Period model
struct Period {
    let name: String
    let start: String
    let end: String
}

// Alternate response model in case the API returns a different structure
struct AlternateScheduleResponse: Decodable {
    let data: ScheduleData
    
    struct ScheduleData: Decodable {
        let monday: [String]?
        let tuesday: [String]?
        let wednesday: [String]?
        let thursday: [String]?
        let friday: [String]?
        let saturday: [String]?
        let sunday: [String]?
    }
}
