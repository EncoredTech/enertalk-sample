//
//  ViewController.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 1. 23..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {

    // MARK: Properties
    
    let userManager = UserManager.sharedInstance()
    let publicAPIManager = PublicAPIManager.sharedInstance()

    
    // MARK: Life cycles
    
    override func viewDidAppear(animated: Bool) {
        if let token = userManager.getAccessToken() {
            print("access token before login: \(token)")
            
            // TODO: If has not expired access token, go to main
            initializePublicAPIManager(token)
            initializeUICardManager(token)
            
            goToMain()
        }
    }

    
    // MARK: Methods

    func login() {
        userManager.login(self) { (success: Bool, result: [String: AnyObject]?) in
            
            guard success else {
                
                if let error = result where ((error["reason"] as? String) != nil) {
                    print("Login failed with error \(error["reason"]!)")
                } else {
                    print("Login failed with unknown error")
                }
                
                return
                
            }
            
            if let token = self.userManager.getAccessToken() {
                print("access token after login: \(token)")
                self.initializePublicAPIManager(token)
                self.initializeUICardManager(token)
            }
            
            dispatch_async(dispatch_get_main_queue(), {
                self.goToMain()
            })

        }
    }
    
    func initializePublicAPIManager(accessToken: String) {
        PublicAPIManager.setSharedInstance(accessToken)
    }
    
    func initializeUICardManager(accessToken: String) {
        UICardManager.setSharedInstance(accessToken)
    }
    
    func goToMain() {
        
        let controller = self.storyboard!.instantiateViewControllerWithIdentifier("MainTabBarController") as!
        UITabBarController
        
        self.presentViewController(controller, animated: true, completion: nil)
        
    }
    
    
    // MARK: Actions
    
    @IBAction func loginButtonTouched(sender: UIButton) {
        login()
    }

}

