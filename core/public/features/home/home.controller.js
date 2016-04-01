module.exports = function (app) {

    app.controller('homeController',
        [
            '$scope',
            '$state',
            '$http',
            'authUserService',
            'appstate',
            '$mdDialog',
            homeController
        ]);

    function homeController(
        $scope,
        $state,
        $http,
        authUserService,
        appstate,
        $mdDialog) {

            $scope.user = authUserService.user;

            appstate.setStateFrom({
                state: 'home',
                params: {}
            });
    }

};