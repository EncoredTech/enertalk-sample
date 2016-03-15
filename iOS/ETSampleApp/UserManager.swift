//
//  LoginManager.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 1. 24..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import Foundation
import ETUserKit

class UserManager: NSObject {
    
    struct Singleton {
        static var sharedInstance = ETUserManager(clientId: Constants.clientId, clientSecret: Constants.clientSecret, redirectURI: Constants.redirectURI)
    }
    
    class func sharedInstance() -> ETUserManager {
        guard let instance = Singleton.sharedInstance else {
            fatalError("clientId, clientSecret, redirectURI must be required. You can make apps at http://developer.encoredtech.com/")
        }
        return instance
    }
}
