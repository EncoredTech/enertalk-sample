//
//  UICardRenderViewController.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 19..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit
import ETUICardKit

class UICardRenderViewController: UIViewController {
    
    // MARK: Properties
    //var cardWebView: WKWebView!
    let cardManager = UICardManager.sharedInstance()!
    var card: ETUICard?
    
    @IBOutlet weak var renderCardButton: UIButton!
    @IBOutlet weak var cardContainerView: UIView!
    
    
    // MARK: Life Cycles
    override func viewDidDisappear(animated: Bool) {
        self.cardManager.clear()
    }
    
    // MARK: Actions
    @IBAction func renderCard(sender: UIButton) {
        
        guard let card = card else {
            print("card does not exists")
            return
        }
        
        renderCardButton.enabled = false
        
        cardManager.render(cardContainerView, cards: [card]) { (success, result) -> Void in
            
            guard success else {
                if let error = result as? String {
                    print(error)
                } else {
                    print("unknown error")
                }
                
                self.renderCardButton.enabled = true
                
                return
            }
            
            print("card rendered successfully")
            
        }
    }
}

