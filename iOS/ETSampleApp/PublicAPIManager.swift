//
//  PublicAPIManager.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 16..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import Foundation
import ETPublicAPIKit

class PublicAPIManager: NSObject {
    
    struct Singleton {
        static var sharedInstance: ETPublicAPIManager?
    }
    
    class func setSharedInstance(accessToken: String) {
        Singleton.sharedInstance = ETPublicAPIManager(accessToken: accessToken)
    }
    
    class func sharedInstance() -> ETPublicAPIManager? {
        return Singleton.sharedInstance
    }
}