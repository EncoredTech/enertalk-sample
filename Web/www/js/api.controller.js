/// <summary> 
/// Controller for Enertalk API tab
/// </summary>  
controllerModule .controller('ApiController', function($scope, $http, $ionicPopup, TokenFactory) 
{
    var deviceId;
    
    $scope.apiList =
    [
        {name: 'realtimeUsage', description: 'Request device usage of current time'},
        {name: 'meteringUsage', description: 'Request usage of month between metering day and current time'},
        {name: 'forecastUsage', description: 'Request electricity usage forecast'},
        {name: 'deviceInfo', description: 'Request information of a device'}
    ];

    /**
     * Handle API result for given apiName
     * @param {String} apiName api name to be accessed
     */ 
    $scope.handleApiRequest = function(apiName) 
    { 
        // Get device id before sending API request
        retrieveDeviceId(function()
        {
            sendApiRequest(apiName, showApiResult);
        });
    }
    
    /**
     * Show API request result to user
     * @param {String} apiName API name to be displayed
     * @param {String} apiResult API result to be displayed
     */
    function showApiResult(apiName, apiResult)
    {
        console.log("showApiResult");
        
        if (!apiResult)
        {
            // Stop processing if failed to get the result from API request
            return;
        }
        
        var resultString = '';
        for (var param in apiResult)
        {
            resultString += param + ' ' + apiResult[param] + '<br />';
        }
        
        // Show result
        var alertPopup = 
        {
            title: apiName,
            template: resultString
        };
        
        $ionicPopup.alert(alertPopup);
    }
 
    /**
     * Send API request with given device id and invoke callback method with response data
     * @param {String} apiName api name to be invoked
     * @callback {showApiResult} cb callback method to be invoked upon completion
     */
    var sendApiRequest = function(apiName, cb)
    {
        if (!deviceId)
        {
            console.error("[sendApiRequest] Device ID is not available");
            return;
        }
        
        var apiUrl = "https://api.encoredtech.com:8082/1.2/devices/" + deviceId;
        
        // Append api name to the url for APIs other than deviceInfo
        if (apiName !== 'deviceInfo')
        {
            apiUrl += '/' + apiName;
        }
            
        // Get access token from built query
        var httpConfig =
        {
            method: "GET",
            url: apiUrl,
            headers: TokenFactory.data.header,
        };

        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                console.log("[apiRequestResult] success");
                
                cb(apiName, response.data)
            }, function errorCallback(response)
            {
                console.error("[apiRequestResult] fail: " +
                    response.status + ' ' + response.message);
            });
    }
    
    /**
     * Retrieve device ID
     * @callback {sendApiRequest} cb callback method to be invoked upon getting device id
     */
    var retrieveDeviceId = function(cb)
    {
        // Use existing device id if available 
        if (deviceId)
        {
            cb();
            return;
        }
        
        var deviceUuidUrl = "https://enertalk-auth.encoredtech.com/uuid";
        
        // Get access token from built query
        var httpConfig =
        {
            method: "GET",
            url: deviceUuidUrl,
            headers: TokenFactory.data.header
        };

        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                deviceId = response.data.uuid;                
                console.log("[retrieveDeviceId] success: " + deviceId);

                cb();
            }, function errorCallback(response)
            {
                console.log("[retrieveDeviceId] fail: " +
                    response.status + ' ' + response.message);
                
                cb();
            });
    }
})