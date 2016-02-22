//
//  PublicAPITableViewController.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 11..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit

class PublicAPITableViewController: UITableViewController {

    // MARK: Properties
    let userManager = UserManager.sharedInstance()
    var publicAPIs = [PublicAPI]()
    
    
    // MARK: Initializers
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load Public API List
        loadPublicAPIs()
        
        // Configure TableView Row Height
        configureTableView()
    }
    
    
    // MARK: Methods
    func loadPublicAPIs() {
        let realtimeUsageAPI = PublicAPI(name: "realtimeUsage", description: "Request device usage of current time")
        let meteringUsageAPI = PublicAPI(name: "meteringUsage", description: "Request usage of month between metering day and current time")
        //let periodicUsageAPI = PublicAPI(name: "periodicUsage", description: "request (quaterhourly, hourly, daily, monthly) electricity usage of a device in a period")
        let forecastUsageAPI = PublicAPI(name: "forecastUsage", description: "Request electricity usage forecast")
        let deviceInfoAPI = PublicAPI(name: "deviceInfo", description: "Request information of a device")
        
        publicAPIs += [realtimeUsageAPI, meteringUsageAPI, forecastUsageAPI, deviceInfoAPI]
    }
    
    func configureTableView() {
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.estimatedRowHeight = 120.0
    }
    
    
    // MARK: UITableViewDataSource
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return publicAPIs.count
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cellIdentifier = "PublicAPITableViewCell"
        let cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as! PublicAPITableViewCell
        let publicAPI = publicAPIs[indexPath.row]
        
        cell.nameLabel.text = publicAPI.name
        cell.descriptionLabel.text = publicAPI.description
        
        return cell
    }
    
    
    // MARK: Navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "ShowDetail" {
            let publicAPIPrepareViewController = segue.destinationViewController as! PublicAPIPrepareViewController
            
            if let selectedPublicAPICell = sender as? PublicAPITableViewCell {
                let indexPath = tableView.indexPathForCell(selectedPublicAPICell)!
                let selectedPublicAPI = publicAPIs[indexPath.row]
                publicAPIPrepareViewController.publicAPI = selectedPublicAPI
            }
            
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
