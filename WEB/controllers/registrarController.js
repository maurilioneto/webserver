app.controller('registrarController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Registrar';


    $scope.btnRegistrar = function (usuario, confirmaSenha) {

        //validações
        if (usuario.senha != confirmaSenha) {
            alert("Senha incorreta!");
        }

        requestService.POST('/autenticar/registrar', usuario, function (res) {
            if (res.data.error) {
                alert("ERRO: " + res.data.error);
            } else {
                document.location = "#!/login";
            }
        })

    }
}]);