(function () {

    var asaoApp = angular.module('asaoApp', ['firebase', 'ngMaterial']);

    asaoApp.controller('PrincipalCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$mdDialog',
        function ($scope, $firebaseArray, $firebaseObject, $mdDialog) {
            var vm = this;
            var ref = firebase.database().ref().child("asados"); // referencia a los asados
            vm.nuevoAsado = function () {

                    var confirm = $mdDialog.prompt()
                        .title('¿Cuál es el nombre del asado?')
                        .placeholder('Asao Peruano!')
                        .targetEvent()
                        .ok('Seguir')
                        .cancel('Me arrepentí');

                    $mdDialog.show(confirm).then(function (result) {
                        console.log('el asado se va a llamar', result);
                    }, function () {
                        console.log('se arrepintió');
                    });

                vm.asadosArray = $firebaseArray(ref);

            };
        }]);

})();