app.controller('cadastroMedidaController', ['$scope', '$filter', 'requestService',
function($scope, $filter, requestService) {

    $scope.obterMedidas = () => {

        //LIMPAR DADOS
        $scope.tabela = {
            cabecalho: 
            [
                {
                    nome: 'id',
                    descricao: 'ID',
                    class: 'f1',
                },
                {
                    nome: 'descricao',
                    descricao: 'Descrição',
                    class: 'f1',
                },
                {
                    nome: 'sigla',
                    descricao: 'Sigla',
                    class: 'f1',
                },
            ],
            dados: [],        
        }

        requestService.GET('rest/medida/obterTodos', (ret) => {
            if (ret.error) {
                modalAlerta('Erro!', ret.error);
                return;
            }
            $scope.tabela.dados = ret ? ret: [];
        })
    }

    $scope.obterMedidas();

    $scope.selecionar = (linha) => {
        $scope.objetoSelecionado = linha;
    }

    $scope.incluir = () => {
        $scope.medida = {};
        $("#modalCadastro").modal('show');
    }

    $scope.alterar = (medida) => {
        if (!medida || !medida.id) {
            modalAlerta('Atenção', 'Selecione um item para alterar!');
            return;
        }

        $scope.medida = angular.copy(medida);
        $("#modalCadastro").modal('show');
    }

    $scope.excluir = (medida) => {
        if (!medida || !medida.id) {
            modalAlerta('Atenção', 'Selecione um item para excluir!');
            return;
        }

        requestService.POST(`/rest/medida/deletarPorId/${medida.id}`, null, (ret) => {
            if (ret.error) {
                modalAlerta('Erro!', ret.error);
                return;
            }
            $scope.obterMedidas();
        });

    }

    $scope.salvar = (medida) => {
        requestService.POST(`/rest/medida/salvar`, medida, (ret) => {
            if (ret.error) {
                modalAlerta('Erro!', ret.error);
                $('#modalCadastro').modal('show');
                return;
            }
            $scope.obterMedidas();
        });
    }

    //UTILITÁRIOS
    function modalAlerta(titulo, mensagem, confirma, callback) {
        $scope.tituloModal = titulo;
        $scope.mensagemModal = mensagem;
        $scope.confirmaModal = confirma;
        $scope.callback = callback;
        $('#modalAlerta').modal('show');
    }
}]);