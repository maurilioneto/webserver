app.controller('principalController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Webserver';
    
    //demonstração de interação com backend
    $scope.obterUsuarios = requestService.GET('/rest/usuario/obterTodos', function(ret){
        if (!ret.isValid) {
            alert(`Erro: ${ret.data}`);
            return;
        }
        $scope.usuarios = ret.data;
    });

}]);