/* Controllers for the app */
angular.module('app.controllers', [])

/// <summary> 
/// Controller for Enertalk API tab
/// </summary>  
.controller('ApiCtrl', function($scope, $http, $ionicPopup, TokenFactory) 
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

/// <summary> 
/// Controller for Enertalk Card tab
/// </summary>   
.controller('CardCtrl', function($scope, $http, $ionicModal, TokenFactory)
{
    $scope.cardList;
    $scope.modalData = 
    {
        cardId: 0,
        cardName: ''
    }
    
    /**
     * Load modal view for card control
     */
    $ionicModal.fromTemplateUrl('templates/modal-cardView.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalCtrl = modal;
    });
    
    /**
     * Open modal for given card
     * @param {String} selectedCardId card id to be displayed
     * @param {String} selectedCardName card name to be displayed
     */
    $scope.openModal = function(selectedCardId, selectedCardName)
    {
        $scope.modalData = 
        {
            cardId: selectedCardId,
            cardName: selectedCardName
        };
        
        $scope.modalCtrl.show();
    };

    /**
     * Handle on modal destroyed event to clean it up
     */
    $scope.$on('$destroy', function() {
        $scope.modalCtrl.remove();
    });
    
    /**
     * Handle on ionic view loaded event
     */
    $scope.$on('$ionicView.loaded', function()
    {
        console.log('[ionicview loaded invoked]');
        
        // Load card list
        loadCardList();
    });
    
    /**
     * Handle on ionic view loaded event
     */
    $scope.$on('modal.shown', function()
    {
        console.log("[modal.shown] event fired")
        
        renderCard();
    });
    
    /**
     * Render card for selected card
     */
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
            accessToken: TokenFactory.data.accessToken,
            target: target
        });
    }
     
    /**
     * Load all card list
     */
    function loadCardList()
    {
        console.log('[loadCardList method invoked]');
        
        // Do nothing if cardList has been already loaded
        if ($scope.cardList)
        {
            return;
        }
        
        // Build config for http query
        var cardListUrl = "https://enertalk-card.encoredtech.com/cards";
        
        // NOTE: we're not sending header with access token here
        // because we want to load all home cards regardless of the specific user
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
.controller('EnerTalkSignInCtrl', function($scope, $http, $state, TokenFactory) 
{
    // Const strings for authorization query
    var authUri = "https://enertalk-auth.encoredtech.com/login";

    // TODO: fill in your client ID
    var clientId = "";
    var clientIdParam = "?client_id=" + clientId;
    
    var redirectUri = "https://localhost/callback";
    var redirectUriParam = "&redirect_uri=" + redirectUri;
    
    var responseTypeParam = "&response_type=code";
    var appVersionParam = "&app_version=web";
    var backUrlParam = "&back_url=/authorization";
    
    /**
     * Set default Content-Type for post
     */
    $http.defaults.headers.post['Content-Type'] = 'application/json';
    
    /**
     * Initialize sign-in page
     */
    $scope.$on('$ionicView.beforeEnter', function()
    {
        // Sign-in error message should be hidden by default
        setSignInErrorVisibility(false);
    });
     
    /**
     * Handle login procedure for the app
     */
    $scope.login = function()
    {   
        // Show OAuth sign-in popup
        var loginUri = authUri + 
            clientIdParam + 
            redirectUriParam + 
            responseTypeParam + 
            appVersionParam + 
            backUrlParam;
 
        var ref = window.open(loginUri, '_blank', 'location=no');
        
        // Listen for events from OAuth sign-in page
        ref.addEventListener('loadstart', function(event)
        {
            // DEBUG
            console.log("[event.url] " + event.url);
            
            // Ignore events whose url does not start with redirect URI  
            if(!(event.url).startsWith(redirectUri))
            {
                return;
            }
            
            // Parse refresh token and get access token from it
            var authCode = (event.url).split("code=")[1];
            getAccessTokenFromAuthCode(authCode, function(accessToken)
            {
                handleAccessToken(accessToken);
                
                // Close sign-in window
                ref.close();
            });
        });
    }
    
    /**
     * Handle access token result such as navigation
     * @param {String} accessToken retrieved access token 
     */
    var handleAccessToken = function(accessToken)
    {
        if (accessToken)
        {
            TokenFactory.setData(accessToken);

            // Navigate to API tab on sucess
            $state.go('tab.api');
        }
        else
        {
            // Show sign-in error message on failure
            setSignInErrorVisibility(true);
        }
    }
     
    /**
     * Get access token from auth code
     * @param {String} authCode auth code to be swapped for access token
     * @callback {handleAccessToken} cb callback method to be invoked upon completion
     */
    var getAccessTokenFromAuthCode = function(authCode, cb)
    {
        // TODO: fill in your client secret
        var clientSecret = "";
        var grantType = "authorization_code"
        var postData = '{"client_id":"' + clientId + '",' +
            '"client_secret":"' + clientSecret + '",' +
            '"grant_type":"' + grantType + '",' +
            '"code":"' + authCode + '"}';

        // DEBUG
        console.log("[postData] " + postData);
        
        // Build config for http query
        var httpConfig =
        {
            method: "POST",
            url: "https://enertalk-auth.encoredtech.com/token",
            data: postData
        };
        
        // Get access token from post result  
        $http(httpConfig)
            .then(function sucessfullCallback(response) 
            {
                // DEBUG
                console.log("[Access Token]" + response.data.access_token);
                
                cb(response.data.access_token);
            }, function errorCallback(response)
            {
                // DEBUG
                console.error(
                    "[getAccessTokenFromAuthCode] http status: " +
                    response.data.statusText);
            });
    }
    
    /**
     * Show or hide sign-in error message
     * @param {Boolean} isVisible true to show sign-in error, false otherwise
     */
    function setSignInErrorVisibility(isVisible)
    {
        document.getElementById("sign-in-error-message").style.display =
            isVisible ? "block" : "none"; 
    }
    
    /**
     * String type startsWith method
     * NOTE: this block can be removed once ECMAScript6 is implemented
     * @param {String} searchString The characters to be searched for at the start of this string
     * @param {Number} position Optional. The position to begin searching; defaults to 0.
     */
    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
})