//
//  UICardCollectionViewCell.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 19..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit
import ETUICardKit

class UICardCollectionViewCell: UICollectionViewCell {
    
    // MARK: Properties
    @IBOutlet weak var cardImageView: UIImageView!
    
    var card: AnyObject? {
        didSet {
            if let card = card as? ETUICard {
                if let thumbnailURL = card.thumbnailURL {
                    NSURLSession.sharedSession().dataTaskWithURL(thumbnailURL, completionHandler: { (data, response, error) -> Void in
                        
                        guard
                            let httpURLResponse = response as? NSHTTPURLResponse where httpURLResponse.statusCode == 200,
                            let mimeType = response?.MIMEType where mimeType.hasPrefix("image"),
                            let data = data where error == nil,
                            let image = UIImage(data: data)
                            else {
                                return
                        }
                        
                        dispatch_async(dispatch_get_main_queue()) { () -> Void in
                            self.cardImageView.image = image
                        }
                        
                    }).resume()
                }
                
            }
        }
    }
    
}
