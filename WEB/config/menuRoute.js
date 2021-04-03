// Definindo Rotas
app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : '/views/principal.html',
            controller: 'principalController'
        })
        .when("/rota1", {
            templateUrl : '/views/rota1.html',
            controller: 'rota1Controller'
        })
        .when("/rota2", {
            templateUrl : '/views/rota2.html',
            controller: 'rota2Controller'
        })
        .otherwise({redirectTo: '/'});
    });