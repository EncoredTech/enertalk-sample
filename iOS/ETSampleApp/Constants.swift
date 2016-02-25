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
        static let clientId = "eW9uZ2RhbXNoQGVuY29yZWR0ZWNoLmNvbV9FbmVyVGFsa0hPTUVTdGFydGVyS2l0"
        
        // Your Client Secret
        static let clientSecret = "ic1ow4gn5145wy9as4f67az9iy8w74mw7ub0695"
        
        // Your Client Redirect URI
        static let redirectURI = "https://enertalk-home-starterkit.com/callback"
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
