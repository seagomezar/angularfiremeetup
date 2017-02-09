(function(){

    var asaoApp = angular.module('asaoApp', ['firebase']);

    asaoApp.controller('PrincipalCtrl', ['$scope', function($scope){
        console.log('Estamos Adentro!');
    }]);

})();