//
//  Constants.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 1. 24..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import Foundation


// MARK: LoginManager Constants

extension UserManager {
    
    struct Constants {
        // Your Client ID
        static let clientId = ""
        
        // Your Client Secret
        static let clientSecret = ""
        
        // Your Client Redirect URI
        static let redirectURI = ""
    }

}


// MARK: PublicAPIManage Constants

extension PublicAPIManager {
    
    struct Constants {
        // API Request Names
        static let realtimeUsageRequest = "realtimeUsage"
        static let meteringUsageRequest = "meteringUsage"
        static let periodicUsageRequest = "periodicUsage"
        static let forecastUsageRequest = "forecastUsage"
        static let deviceInfoRequest    = "deviceInfo"
    }

}
