module.exports = function (app) {

    app.controller('quizlistController',
        [
            '$scope',
            '$state',
            '$stateParams',
            'authUserService',
            'quizService',
            'userService',
            'appstate',
            '$mdDialog',
            quizlistController
        ]);

    function quizlistController(
        $scope,
        $state,
        $stateParams,
        authUserService,
        quizService,
        userService,
        appstate,
        $mdDialog) {

        // grabbing user
        $scope.user = authUserService.user;

        listQuizzes();


        if ($stateParams.display === 'mine') {
            $scope.displayMine = true;
            appstate.setStateFrom({
                state: 'quizlist',
                params: {
                    display: 'mine'
                }
            });
        }
        else if ($stateParams.display === 'all') {
            $scope.displayMine = false;
            appstate.setStateFrom({
                state: 'quizlist',
                params: {
                    display: 'all'
                }
            });
        }


        function listQuizzes() {
            userService.listOneUser($scope.user)
                .then(function (response) {

                    console.log('latest and greatesf from user...', response);
                    $scope.selectedQuizzesIds = [];
                    response.editing.forEach(function (quiz) { $scope.selectedQuizzesIds.push(quiz._id); });

                    quizService.listAllQuizzes()
                        .then(function (response) {

                            $scope.quizzes = response;

                            // programatically setting checkboxes of any selected quizzes
                            if ($scope.selectedQuizzesIds.length > 0) {
                                for (var i in $scope.quizzes) {
                                    if ($scope.selectedQuizzesIds.indexOf($scope.quizzes[i]._id) !== -1) {
                                        $scope.quizzes[i].isSelected = true;
                                    }
                                }
                            }
                        });
                });
        }


        // crud operations
        $scope.editQuiz = function (quiz) {

            appstate.setCurrentQuiz(quiz);
            $state.go('quizedit', { quiz: quiz._id });
        };


        $scope.destroyQuiz = function (id) {

            quizService.destroyQuiz(id)
                .then(function (response) {

                    if (response === "Quiz deleted!") listQuizzes();
                });
        };


        // pushing or splicing a quiz from the user's editing array
        $scope.addOrRemoveFromSelectedQuizzes = function (quiz) {

            userService.updateSelected(quiz, $scope.user);
        };
    }
};