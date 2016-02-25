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
    @IBOutlet weak var cardNameLabel: UILabel!
    
    let defaultStorage = NSUserDefaults.standardUserDefaults()
    
    var card: AnyObject? {
        didSet {
            
            guard let card = card as? ETUICard, let thumbnailURL = card.thumbnailURL else {
                return
            }
            
            cardNameLabel.text = card.name
            
            if let imageData = defaultStorage.objectForKey(thumbnailURL.absoluteString) as? NSData {
                dispatch_async(dispatch_get_main_queue()) { () -> Void in
                    self.cardImageView.image = UIImage(data: imageData)
                }
            } else {
                
                NSURLSession.sharedSession().dataTaskWithURL(thumbnailURL, completionHandler: { (data, response, error) -> Void in
                    
                    guard
                        let httpURLResponse = response as? NSHTTPURLResponse where httpURLResponse.statusCode == 200,
                        let mimeType = response?.MIMEType where mimeType.hasPrefix("image"),
                        let data = data where error == nil,
                        let image = UIImage(data: data)
                        else {
                            return
                    }
                    
                    self.defaultStorage.setObject(data, forKey: thumbnailURL.absoluteString)
                    
                    dispatch_async(dispatch_get_main_queue()) { () -> Void in
                        self.cardImageView.image = image
                    }
                    
                }).resume()
                
            }

        }
    }
    
}
