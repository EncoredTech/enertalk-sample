/* Controllers for the app */
angular.module('app.controllers', [])

/// <summary> 
/// Controller for Enertalk API tab
/// </summary>  
.controller('ApiCtrl', function($scope, $http, $ionicPopup) 
{
    $scope.apiList =
    [
        {name: 'realtimeUsage', description: 'Request device usage of current time'},
        {name: 'meteringUsage', description: 'Request usage of month between metering day and current time'},
        {name: 'forecastUsage', description: 'Request electricity usage forecast'},
        {name: 'deviceInfo', description: 'Request information of a device'}
    ];

    /// Show API result for given apiName 
    $scope.showApiResult = function(apiName) 
    {
        console.log('showApiResult() invoked')
        
        // Get device id
        retrieveDeviceId(function(deviceIdResult)
        {
            console.log('deviceId ' + deviceIdResult);
            
            // Send API request with retrieved device id
            sendApiRequest(apiName, deviceIdResult, function(apiResult) 
            {
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
            });
        });
    }
    
    /// Send API request with given device id and invoke callback with response data
    var sendApiRequest = function(apiName, deviceId, callback)
    {
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
            headers: getHeader()
        };

        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                console.log("[apiRequestResult] success");
                console.log(response);
                
                callback(response.data)
            }, function errorCallback(response)
            {
                console.log("[apiRequestResult] fail");
                
                callback(response.status + ' ' + response.message)
            });
    }
    
    /// Get device id
    var retrieveDeviceId = function(callback)
    {
        var deviceUuidUrl = "https://enertalk-auth.encoredtech.com/uuid";
        
        // Get access token from built query
        var httpConfig =
        {
            method: "GET",
            url: deviceUuidUrl,
            headers: getHeader()
        };

        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                console.log("[retrieveDeviceId] success");
                console.log(response.data.uuid);
                
                callback(response.data.uuid);
            }, function errorCallback(response)
            {
                console.log("[retrieveDeviceId] fail");
                
                callback(response.status + ' ' + response.message)
            });
    }
})

/// <summary> 
/// Controller for Enertalk Card tab
/// </summary>   
.controller('CardCtrl', function($scope, $http, $ionicModal)
{
    $scope.cardList;
    $scope.modalData = 
    {
        cardId: 0,
        cardName: ''
    }
    
    // Load modal view for card control
    $ionicModal.fromTemplateUrl('templates/modal-cardView.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalCtrl = modal;
    });
    
    /// Open card view modal
    $scope.openModal = function(selectedCardId, selectedCardName)
    {
        $scope.modalData = 
        {
            cardId: selectedCardId,
            cardName: selectedCardName
        };
        
        $scope.modalCtrl.show();
    };

    /// Handle on modal destroyed event to clean it up
    $scope.$on('$destroy', function() {
        $scope.modalCtrl.remove();
    });
    
    /// Handle on ionic view loaded event
    $scope.$on('$ionicView.loaded', function()
    {
        console.log('[ionicview loaded invoked]');
        
        // Load card list
        loadCardList(function()
        {
            console.log('loadCardList completed');
        });
    });
    
    /// Handle on modal shown event
    $scope.$on('modal.shown', function()
    {
        console.log("[modal.shown] event fired")
        
        renderCard();
    });
    
    /// Render card for selected card
    var renderCard = function()
    {   
        console.log("[renderCard] " + $scope.modalData.cardId);
        
        var target = document.querySelector('#my-card');
        var cardParam = 
        [{
            id: $scope.modalData.cardId
        }];
        

        var UI = new Encored.UI({
            env: 'production',
            category: 'home',
            iframe: false,
            version: 2
        });

        UI.renderCard({
            cards: cardParam,
            accessToken: accessToken,
            target: target
        });
    }
    
    /// Load all card list
    var loadCardList = function(callback)
    {
        console.log('[loadCardList method invoked]');
        
        // Do nothing if cardList is already loaded
        if ($scope.cardList)
        {
            return;
        }
        
        // Build config for http query
        var cardListUrl = "https://enertalk-card.encoredtech.com/cards";
        
        // NOTE: do not send header on purpose since we want to load all card list
        // regardless of the specific user
        var httpConfig =
        {
            method: "GET",
            url: cardListUrl
        };
        
        // Query all card list
        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                console.log("[loadCardList] success");
                console.log(response.data.detail);
                
                $scope.cardList = response.data.detail;
                
                callback();
            }, function errorCallback(response)
            {
                console.log("[loadCardList] fail");
                
                console.log(response.statusCode + ' ' + response.type);
            });
    }
})



/// <summary> 
/// Controller for Enertalk Sign-in page
/// </summary>
.controller('EnerTalkSignInCtrl', function($scope, $http, $state) 
{
    /// Const strings for authorization query
    var authUri = "https://enertalk-auth.encoredtech.com/login";
        
    var clientId = "d29vcmFteUBlbmNvcmVkdGVjaC5jb21fd29vcmFteQ==";
    var clientIdParam = "?client_id=" + clientId;
    
    var redirectUri = "https://localhost/callback";
    var redirectUriParam = "&redirect_uri=" + redirectUri;
    
    var responseTypeParam = "&response_type=code";
    var appVersionParam = "&app_version=web";
    var backUrlParam = "&back_url=/authorization";
    
    /// Set default Content-Type for post
    $http.defaults.headers.post['Content-Type'] = 'application/json';
    
    /// Hide sign-in error message before entering sign-in page
    $scope.$on('$ionicView.beforeEnter', function()
    {
        setSignInErrorVisibility(false);
    });
    
    /// Handle login procedure for the app
    $scope.login = function()
    {
        // Clear sign-in error message
        setSignInErrorVisibility(false);
        
        var ref = window.open(
            authUri + clientIdParam + redirectUriParam + responseTypeParam + appVersionParam + backUrlParam,
            '_blank',
            'location=no');
        
        ref.addEventListener('loadstart', function(event)
        {
            // DEBUG
            console.log("[event.url] " + event.url);
            
            // Ignore events if its url does not start with redirect URI  
            if(!(event.url).startsWith(redirectUri))
            {
                return;
            }
            
            // Parse returned token and build post data from it
            var authCode = (event.url).split("code=")[1];
            
            // Get access token from auth code and close login window
            getAccessTokenFromAuthCode(authCode, ref.close()); 
        });
    }
    
    /// Get access token from auth code
    var getAccessTokenFromAuthCode = function(authCode, callback)
    {
        var clientSecret = "a21a74et5dq5e27po75y3ah0q20su0ai9hw8kt2";
        var grantType = "authorization_code"
        var postData = '{"client_id":"' + clientId + '",' +
            '"client_secret":"' + clientSecret + '",' +
            '"grant_type":"' + grantType + '",' +
            '"code":"' + authCode + '"}';
                
        // DEBUG
        console.log(postData);
        
        // Build config for http query
        var httpConfig =
        {
            method: "POST",
            url: "https://enertalk-auth.encoredtech.com/token",
            data: postData
        };
        
        // Get access token from the query result 
        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                // TODO do not use global variable
                accessToken = response.data.access_token;
                
                // DEBUG
                console.log(accessToken);
                
                // Navigate to API tab on sucess
                $state.go('tab.api');
            }, function errorCallback(response)
            {
                // DEBUG
                // alert("ERROR: " + response.data.statusText);
                setSignInErrorVisibility(true);
            });
    }
    
    /// Show or hide sign-in error message
    var setSignInErrorVisibility = function(isVisible)
    {
        document.getElementById("sign-in-error-message").style.display =
            isVisible ? "block" : "none"; 
    }
    
    /// NOTE: startsWith method can be removed once ECMAScript6 is implemented
    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
})