app.controller('cadastroTipoItemController', ['$scope', '$filter', 'requestService',
function($scope, $filter, requestService) {

    $scope.obterTipoItens = () => {

        //LIMPAR DADOS
        $scope.tabela = {
            cabecalho: 
            [
                {
                    nome: 'id',
                    descricao: 'ID',
                    class: 'c1',
                },
                {
                    nome: 'descricao',
                    descricao: 'Descrição',
                    class: 'c2',
                },
            ],
            dados: [],        
        }

        requestService.GET('rest/tipoItem/obterTodos', (ret) => {
            if (ret.error) {
                modalAlerta('Erro!', ret.error);
                return;
            }
            $scope.tabela.dados = ret;
        })
    }

    $scope.obterTipoItens();

    $scope.selecionar = (linha) => {
        $scope.objetoSelecionado = linha;
    }

    $scope.incluir = () => {
        $scope.tipoItem = {};
        $("#modalCadastro").modal('show');
    }

    $scope.alterar = (tipoItem) => {
        if (!tipoItem) {
            modalAlerta('Atenção', 'Selecione um item para alterar!');
            return;
        }
        
        $scope.tipoItem = angular.copy(tipoItem);
        $("#modalCadastro").modal('show');
    }

    $scope.excluir = (tipoItem) => {
        if (!tipoItem) {
            modalAlerta('Atenção', 'Selecione um item para excluir!');
            return;
        }

        requestService.POST(`/rest/tipoItem/deletarPorId/${tipoItem.id}`, null, (ret) => {
            if (ret.error) {
                modalAlerta('Erro!', ret.error);
                return;
            }
            $scope.obterTipoItens();
        });

    }

    $scope.salvar = (tipoItem) => {
        requestService.POST(`/rest/tipoItem/salvar`, tipoItem, (ret) => {
            if (ret.error) {
                modalAlerta('Erro!', ret.error);
                $('#modalCadastro').modal('show');
                return;
            }
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