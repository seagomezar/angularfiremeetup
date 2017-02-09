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

                    $mdDialog.show(confirm).then(function (nombre) {
                        crearAsado(nombre);
                    }, function () {
                        console.log('se arrepintió');
                    });

                function crearAsado(nombre){
                    if (nombre && nombre.length) {
                        vm.asadosArray = $firebaseArray(ref);
                        vm.asadosArray.$add({
                            nombre: nombre
                        });

                        // vm.asadosArray = $firebaseObject(ref);
                        // vm.asadosArray.edad = nombre;
                        // vm.asadosArray.$save();
                    } 
                }

                
            };

            vm.verAsados = function() {
                vm.isAsadosDisplayed = true;
                vm.isDetailsDisplayed = false;
                vm.asadosArray = $firebaseArray(ref);
                vm.asadosObject = $firebaseObject(ref);
            };

            vm.verDetalles = function(asado) {
                vm.isDetailsDisplayed = true;
                vm.isAsadosDisplayed = false;
                console.log(asado);
            };
        }]);

})();