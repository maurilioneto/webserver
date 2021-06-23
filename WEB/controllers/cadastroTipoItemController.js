app.controller('cadastroTipoItemController', ['$scope', '$filter', 'requestService',
function($scope, $filter, requestService) {

    $scope.obterTipoItens = () => {

        //LIMPAR DADOS
        $scope.tabela = {
            cabecalho: 
            [
                {
                    nome: 'id',
                    descricao: 'ID'
                },
                {
                    nome: 'descricao',
                    descricao: 'Descrição'
                },
            ],
            dados: [],        
        }

        requestService.GET('rest/tipoItem/obterTodos', (ret) => {
            $scope.tabela.dados = ret;
        })
    }

    $scope.obterTipoItens();

    $scope.selecionar = (linha) => {
        $scope.objetoSelecionado = linha;
    }

    $scope.incluir = (tipoItem) => {
        $scope.tipoItem = angular.copy(tipoItem);
        $("#modalCadastro").modal('show');
    }

    $scope.excluir = (tipoItem) => {
        if (!tipoItem || !tipoItem.id) {
            modalAlerta('Atenção', 'Selecione um item para excluir!');
            return;
        }

        requestService.POST(`/rest/tipoItem/deletarPorId/${tipoItem.id}`, null, (ret) => {
            $scope.obterTipoItens();
        });

    }

    $scope.salvar = (tipoItem) => {
        requestService.POST(`/rest/tipoItem/salvar`, tipoItem, (ret) => {
            modalAlerta('Aviso', 'Cadastro foi enviado com sucesso!');
            $scope.obterTipoItens();
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