app.controller('loginController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Login';

    $scope.btnEntrar = function (usuario) {
        requestService.POST('/autenticar/', usuario, function (res) {
            if (res.data.error) {
                alert("ERRO: " + res.data.error);
            } else {
                document.location = "/";
            }
        })
    }


}]);