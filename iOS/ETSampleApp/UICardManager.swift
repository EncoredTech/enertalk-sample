//
//  UICardManager.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 18..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import Foundation
import ETUICardKit

class UICardManager: NSObject {
    
    struct Singleton {
        static var sharedInstance: ETUICardManager?
    }
    
    class func setSharedInstance(accessToken: String) {
        Singleton.sharedInstance = ETUICardManager(accessToken: accessToken)
    }
    
    class func sharedInstance() -> ETUICardManager? {
        return Singleton.sharedInstance
    }
    
}