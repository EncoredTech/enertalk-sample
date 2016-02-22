//
//  PublicAPIPrepareViewController.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 16..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit

class PublicAPIPrepareViewController: UIViewController {

    // MARK: Properties
    let publicAPIManager = PublicAPIManager.sharedInstance()!
    
    var publicAPI: PublicAPI?
    var response: AnyObject?
    
    @IBOutlet weak var sendRequestButton: UIButton!
    
    
    // MARK: Initializers
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let apiName = publicAPI?.name {
            navigationItem.title = apiName
        }
        
        //displayReqiredParameterView()
        
    }
    
    
    // MARK: Methods
    // TODO: split parameter setting view
//    func displayReqiredParameterView() {
//        
//    }
    
    func responseHandler(success: Bool, result: AnyObject?) -> Void {
        
        sendRequestButton.enabled = true
        
        guard success else {
            
            if let error = result where ((error["reason"] as? String) != nil) {
                print("API request failed with error \(error["reason"]!)")
            } else {
                print("API request failed with unknown error")
            }
            
            return
            
        }
        
        
        let publicAPIResponseViewController = storyboard?.instantiateViewControllerWithIdentifier("PublicAPIResponseViewController") as! PublicAPIResponseViewController
        
        publicAPIResponseViewController.response = result
        
        dispatch_async(dispatch_get_main_queue(), {
            self.presentViewController(publicAPIResponseViewController, animated: true, completion: nil)
        })

    }
    
    
    
    // MARK: Actions
    @IBAction func sendRequestButtonTouched(sender: UIButton) {
        
        sendRequestButton.enabled = false
        
        if let apiName = publicAPI?.name {
            switch (apiName) {
            case PublicAPIManager.Constants.realtimeUsageRequest:
                publicAPIManager.realtimeUsage(responseHandler)
            case PublicAPIManager.Constants.meteringUsageRequest:
                publicAPIManager.meteringUsage(responseHandler)
            case PublicAPIManager.Constants.periodicUsageRequest:
                publicAPIManager.periodicUsage(responseHandler)
            case PublicAPIManager.Constants.forecastUsageRequest:
                publicAPIManager.forecastUsage(responseHandler)
            case PublicAPIManager.Constants.deviceInfoRequest:
                publicAPIManager.deviceInfo(responseHandler)
            default:
                print("API name does not matched")
            }
        }
        
    }
}
