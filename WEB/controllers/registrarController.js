app.controller('registrarController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Registrar';


    $scope.btnRegistrar = function (usuario, confirmaSenha) {

        //validações
        if (usuario.senha != confirmaSenha) {
            alert("Senha incorreta!");
        }

        requestService.POST('/autenticar/registrar', usuario, function (res) {
            if (res.error) {
                alert("ERRO: " + res.error);
            } else {
                document.location = "#!/login";
            }
        })

    }
}]);