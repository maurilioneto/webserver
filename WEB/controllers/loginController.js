app.controller('loginController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Login';

    $scope.btnEntrar = function (usuario) {
        requestService.POST('/autenticar/', usuario, function (res) {
            console.log(res);
            if (res.error) {
                alert("ERRO: " + res.error);
            } else {
                document.location = "/";
            }
        })
    }


}]);