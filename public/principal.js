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
                vm.isAsadosDisplayed = false;
                vm.isDetailsDisplayed = true;
                vm.asadoActual = asado;
                asado.haSidoVisto = true;
                vm.asadosArray.$save(asado);

                var refParticipantes = ref.child(vm.asadoActual.$id).child('participantes');
                vm.participantes = $firebaseArray(refParticipantes);

                var refMateriales = ref.child(vm.asadoActual.$id).child('materiales');
                vm.materiales = $firebaseArray(refMateriales);
            };

            vm.anadirParticipante = function(){
                var confirm = $mdDialog.prompt()
                    .title('¿Cuál es el nombre del participante?')
                    .placeholder('La tia clara')
                    .targetEvent()
                    .ok('Seguir')
                    .cancel('Me arrepentí');

                $mdDialog.show(confirm).then(function (nombre) {

                    var refAsado = ref.child(vm.asadoActual.$id);
                    var asado = $firebaseObject(refAsado);
                    asado.$loaded().then(() => {
                        if (!asado.participantes) {
                            asado.participantes = [
                                {
                                    nombre: nombre
                                }
                            ];
                        } else {
                            asado.participantes.push({
                                nombre: nombre
                            });
                        }
                        asado.$save();
                    });


                }, function () {
                    console.log('se arrepintió');
                });
            }

            vm.anadirMaterial = function() {
                var confirm = $mdDialog.prompt()
                    .title('¿Cuál es el nombre del material?')
                    .placeholder('Cerveza!!!!')
                    .targetEvent()
                    .ok('Guardar')
                    .cancel('Olvidalo MDF!');

                $mdDialog.show(confirm).then(function (nombre) {

                    vm.materiales.$add({
                                nombre: nombre
                            });

                }, function () {
                    console.log('se arrepintió');
                });
            }
        }]);

})();