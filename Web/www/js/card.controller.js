/// <summary> 
/// Controller for Enertalk Card tab
/// </summary>
controllerModule .controller('CardController', function($scope, $http, $ionicModal, TokenFactory)
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