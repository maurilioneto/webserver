app.service('requestService', ['$http', function ($http) {
	
    /* POST */
	this.POST = function (pURL, param, callback) {

		$http.post(pURL, param).then(function(retorno){
			callback({isValid: true, data:retorno.data}) 
		}).catch(function(retorno){
			callback({isValid: false, data:retorno.data})
		});      
    }
	
	/* GET */
	this.GET = function (pURL, callback) {
    	$http.get(pURL).then(function(retorno){
			callback({isValid: true, data:retorno.data}) 
		}).catch(function(retorno){
			callback({isValid: false, data:retorno.data})
		});
    }
	
}]);