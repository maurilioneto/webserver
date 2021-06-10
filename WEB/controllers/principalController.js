app.controller('principalController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Webserver';
    
    //demonstração de interação com backend
    $scope.obterUsuarios = requestService.GET('/rest/usuario/obterTodos', function(ret){
        if (ret.error) {
            alert(`Erro: ${ret.error}`);
            return;
        }
        $scope.usuarios = ret;
    });

}]);