//
//  PublicAPIResponseViewController.swift
//  ETSampleApp
//
//  Created by yongdamsh on 2016. 2. 18..
//  Copyright © 2016년 Encored Technologies, Inc. All rights reserved.
//

import UIKit

class PublicAPIResponseViewController: UIViewController, UITableViewDataSource {

    // MARK: Properties
    var response: AnyObject?
    
    @IBOutlet weak var responseTableView: UITableView!
    
    
    // MARK: Life Cycles
    override func viewDidLoad() {
        super.viewDidLoad()
        
        responseTableView.dataSource = self
        
    }
    
    
    // MARK: UITableViewDataSources
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if let rowCount = self.response?.count {
            return rowCount
        } else {
            return 0
        }
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cellIdentifier = "PublicAPIResponseViewCell"
        let cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath)
        
        
        if let data = self.response as? [String: AnyObject] {
            let index = data.startIndex.advancedBy(indexPath.row)
            cell.textLabel!.text = data.keys[index]
            cell.detailTextLabel!.text = String(data.values[index])
        }
        
        return cell
    }
    
    
    // MARK: Actions
    @IBAction func done(sender: UIBarButtonItem) {
        self.dismissViewControllerAnimated(true, completion: nil)
    }
    
    
}
