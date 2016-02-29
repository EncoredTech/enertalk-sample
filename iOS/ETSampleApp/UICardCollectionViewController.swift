//
//  UICardViewController.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 14..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit
import ETUICardKit

class UICardCollectionViewController: UICollectionViewController {

    // MARK: Properties
    let userManager = UserManager.sharedInstance()
    let cardManager = UICardManager.sharedInstance()!
    
    var cards = [ETUICard]()
    
    
    // MARK: Initializers
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set column width
        let width = CGRectGetWidth(collectionView!.frame) / 2
        let layout = collectionViewLayout as! UICollectionViewFlowLayout
        layout.itemSize = CGSize(width: width, height: width)
        layout.minimumInteritemSpacing = 0
        layout.minimumLineSpacing = 0
        
        // Load Public API List
        loadUICards()
    }
    
    
    // MARK: Methods
    func loadUICards() {
        cardManager.getCardList() { (success, result) -> Void in
            
            guard success else {
                
                if let error = result where ((error["reason"] as? String) != nil) {
                    print("API request failed with error \(error["reason"]!)")
                } else {
                    print("API request failed with unknown error")
                }
                
                return
                
            }
            
            if let cards = result as? [ETUICard] {
                self.cards = cards
                
                dispatch_async(dispatch_get_main_queue()) { () -> Void in
                    self.collectionView?.reloadData()
                }
            }
            
        }
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "ShowDetail", let card = sender as? ETUICard {
            if let cardRenderViewController = segue.destinationViewController as? UICardRenderViewController {
                cardRenderViewController.card = card
            }
        }
    }
    
    
    // MARK: UICollectionViewDataSource
    override func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        return 1
    }
    
    override func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.cards.count
    }
    
    override func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let reuseIdentifier = "UICardCollectionViewCell"
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier(reuseIdentifier, forIndexPath: indexPath) as! UICardCollectionViewCell
        
        cell.card = cards[indexPath.row]
        
        return cell
    }
    
    // MARK: UICollectionViewDelegate
    
    override func collectionView(collectionView: UICollectionView, didSelectItemAtIndexPath indexPath: NSIndexPath) {
        let card = cards[indexPath.row]
        
        dispatch_async(dispatch_get_main_queue()) { [unowned self] in
            self.performSegueWithIdentifier("ShowDetail", sender: card)
        }
        
    }
    
    // MARK: Action
    @IBAction func logoutButtonTouched(sender: UIBarButtonItem) {
        userManager.logout() { () -> Void in
            
            let controller = self.storyboard!.instantiateViewControllerWithIdentifier("LoginViewController")
            
            self.presentViewController(controller, animated: true, completion: nil)
            
        }
    }
    
}
