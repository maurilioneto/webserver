app.controller('registrarController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Registrar';

    $scope.btnRegistrar = function (usuario, confirmaSenha) {

        //validações
        $scope.error = undefined;
        if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) $scope.error = "Informe um nome, e-mail e senha validos!";
        if (usuario.senha != confirmaSenha) $scope.error = "As senhas não coincidem!";
        if ($scope.error) return;

        requestService.POST('/autenticar/registrar', usuario, function (res) {
            if (res.error) {
                $scope.error = res.error;
            } else {
                document.location = "#!/login";
            }
        })

    }
}]);