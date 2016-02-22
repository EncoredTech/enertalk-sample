//
//  PublicAPI.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 14..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit

class PublicAPI {
    
    // MARK: Properties
    let name: String
    let description: String
    
    init(name: String, description: String?) {
        self.name = name
        if let desc = description {
            self.description = desc
        } else {
            self.description = "EnerTalk Public API"
        }
    }
}