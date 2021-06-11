app.controller('rota1Controller', ['$scope', '$routeParams', 'requestService',
function($scope, $routeParams, requestService) {

    //forçar autenticação
    requestService.CHECK();
    
    $scope.name = 'Rota 1';
}]);