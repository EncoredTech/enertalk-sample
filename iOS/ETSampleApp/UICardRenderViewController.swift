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
    
    @IBOutlet weak var displayUnitSelector: UISegmentedControl!
    @IBOutlet weak var languageSelector: UISegmentedControl!
    
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
            
            self.renderCardButton.enabled = true
            
            guard success else {
                if let error = result as? String {
                    print(error)
                } else {
                    print("unknown error")
                }
                
                return
            }
            
            print("card rendered successfully")
            
        }
    }
    
    
    @IBAction func displayUnitChanged(sender: UISegmentedControl) {
        
        let displayUnitLabels = ["watt", "bill"]
        let selectedIndex = sender.selectedSegmentIndex
        let selectedDisplayUnitLabel = displayUnitLabels[selectedIndex]
        
        self.card?.parameters?["displayUnit"] = selectedDisplayUnitLabel
    }
    
    
    @IBAction func languageChanged(sender: UISegmentedControl) {
        
        let languageLabels = ["ko", "en", "ja"]
        let selectedIndex = sender.selectedSegmentIndex
        let selectedLanguageLabel = languageLabels[selectedIndex]
        
        self.card?.parameters?["lang"] = selectedLanguageLabel
    }
}

