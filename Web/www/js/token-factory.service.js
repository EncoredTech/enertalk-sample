/* Service module for Token factory */
serviceModule .factory('TokenFactory', [function(){
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