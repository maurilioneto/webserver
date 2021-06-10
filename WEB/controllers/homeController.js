app.controller('homeController', ['$scope', 'requestService',
function($scope, requestService) {
    $scope.name = 'Seja bem vindo ao Webserver!';
    $scope.frase = 'Esta aplicação foi feita para servir de modelo incial para outras aplicações, fique a vontade para editar e transformar na aplicação que quiser!';
}]);