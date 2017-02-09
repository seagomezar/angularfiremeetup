(function(){

    var asaoApp = angular.module('asaoApp', ['firebase', 'ngMaterial']);

    asaoApp.controller('PrincipalCtrl', ['$scope', function($scope){
        console.log('Estamos Adentro!');
    }]);

})();