// Definindo Rotas
app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : '/views/home.html',
            controller: 'homeController'
        })
        .when("/principal", {
            templateUrl : '/views/principal.html',
            controller: 'principalController'
        })
        .when("/login", {
            templateUrl : '/views/login.html',
            controller: 'loginController'
        })
        .when("/registrar", {
            templateUrl : '/views/registrar.html',
            controller: 'registrarController'
        })
        .when("/rota1", {
            templateUrl : '/views/rota1.html',
            controller: 'rota1Controller'
        })
        .when("/rota2", {
            templateUrl : '/views/rota2.html',
            controller: 'rota2Controller'
        })
        //CADASTROS
        .when("/cadastroMedida", {
            templateUrl : '/views/cadastroMedida.html',
            controller: 'cadastroMedidaController'
        })
        .otherwise({redirectTo: '/'});
    });