app.controller('loginController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Login';

    $scope.btnEntrar = function (usuario) {

        //validações
        $scope.error = undefined;
        if (!usuario || !usuario.email || !usuario.senha) $scope.error = 'Por favor informe o usuário e a senha!';
        if ($scope.error) return;

        requestService.POST('/autenticar/', usuario, function (res) {
            if (res.error) {
                $scope.error = res.error;
            } else {
                document.location = "#!/principal";
            }
        })
    }

}]);