/// <summary> 
/// Controller for Enertalk Sign-in page
/// </summary>
controllerModule .controller('SignInController', function($scope, $http, $state, TokenFactory) 
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