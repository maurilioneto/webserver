app.controller('loginController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Login';

    $scope.btnEntrar = function (usuario) {
        requestService.POST('/autenticar/', usuario, function (res) {
            if (!res.isValid) {
                alert("ERRO: " + res.data.error);
            }
        })
    }


}]);