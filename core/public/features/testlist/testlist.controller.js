module.exports = function (app) {

    app.controller('testlistController',
        [
            '$scope',
            '$state',
            '$stateParams',
            'authUserService',
            'quizService',
            'testService',
            'userService',
            'appstate',
            '$mdDialog',
            testlistController
        ]);

    function testlistController(
        $scope,
        $state,
        $stateParams,
        authUserService,
        quizService,
        testService,
        userService,
        appstate,
        $mdDialog) {

        $scope.user = authUserService.user;

        listTests();



        function listTests() {

            testService.listAllTests()
                .then(function (response) {
                    $scope.tests = response;
                });
        }



        // crud
        $scope.destroyTest = function (test) {

            testService.destroyTest(test)
                .then(function (response) {
                    listTests();
                });
        };


       $scope.editTest = function (test) {

            appstate.setCurrentTest(test);
            console.log('current test...', appstate.getCurrentTest());
            // userService.updateSelectedMulti(test, $scope.user);
            $state.go('testedit', { test: test._id });
       };

       $scope.setAsCurrentTest = function (test) {

           appstate.setCurrentTest(test);
       }

       $scope.logCurrentTest = function () {

           console.log(appstate.getCurrentTest());
       }


    }
};