app.service('requestService', ['$http', function ($http) {
	
    /* POST */
	this.POST = function (pURL, param, callback) {

		$http.post(pURL, param).then(function(retorno){
			callback(retorno.data) 
		}).catch(function(retorno){
			if (retorno.data.redirect) {
				document.location = retorno.data.redirect;
			}
			callback(retorno.data)
		});      
	}
	
	/* GET */
	this.GET = function (pURL, callback) {
    
		$http.get(pURL).then(function(retorno){
			callback(retorno.data) 
		}).catch(function(retorno){
			if (retorno.data.redirect) {
				document.location = retorno.data.redirect;
			}
			callback(retorno.data)
		});
	}

	/* GET */
	this.redirectNotAuthenticated = function (pURL, callback) {
    
		$http.get(pURL).then(function(retorno){
			callback(retorno.data) 
		}).catch(function(retorno){
			if (retorno.data.redirect) {
				document.location = retorno.data.redirect;
			}
			callback(retorno.data)
		});
	}
	
}]);