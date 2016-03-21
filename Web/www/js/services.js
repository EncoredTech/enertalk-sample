/* Services for the app */
angular.module('app.services', [])

.factory('TokenFactory', [function(){
    return {
        data: {
            accessToken: '',
            header: ''  
        },
        
        setData: function(accessToken) {
            this.data.accessToken = accessToken;
            this.data.header = {"Authorization": "Bearer " + accessToken} 
        }
    };
}])