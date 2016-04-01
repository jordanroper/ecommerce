module.exports = function (app) {

    app.controller('testeditController',
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
            testeditController
        ]);

    function testeditController(
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

        appstate.setStateFrom({
            state: 'testedit',
            params: {
                test: $stateParams.test
            }
        });

        // new or edit logic
        if ($stateParams.test === 'new') {
            $scope.creatingOrUpdating = 'New';

            // the quizzes array is populated asynchronously
            $scope.testInProgress = {
                title: "",
                quizzes: [],
                creator: $scope.user._id
            };
        }
        else if ($stateParams.test !== 'new') {
            $scope.creatingOrUpdating = 'Update';
            $scope.testInProgress = appstate.getCurrentTest();
        }

        listQuizzesEditing();


        // brings up the quizzes marked to be included in a test and checks checkboxes
        function listQuizzesEditing() {

            userService.listOneUser($scope.user)
                .then(function (response) {

                    if ($stateParams.test === 'new') {
                        $scope.testInProgress.quizzes = response.editing;
                    }
                    else if ($stateParams.test !== 'new') {
                        userService.updateSelectedMulti(appstate.getCurrentTest(), $scope.user);
                    }
                    for (var i in $scope.testInProgress.quizzes) {
                        $scope.testInProgress.quizzes[i].isSelected = true;
                    }
                });
        }

        function resetQuizzesEditing() {

            userService.resetEditing($scope.user);
        }


        // crud operations
        $scope.editQuiz = function (quiz) {

            appstate.setCurrentQuiz(quiz);
            $state.go('quizedit', { quiz: quiz._id });
        };


        $scope.destroyQuiz = function (id) {

            quizService.destroyQuiz(id)
                .then(function (response) {

                    listQuizzesEditing();
                });
        };


        // validating form and creating new test
        function validateTestInProgress(test) {

            if (test.title.length > 0 && test.quizzes.length > 0) return true;
            return false;
        }

        $scope.createOrUpdateTest = function () {

            console.log('creating new test');

            var validates = validateTestInProgress($scope.testInProgress);

            if (validates) {
                if ($scope.creatingOrUpdating === 'New') {
                    testService.createTest($scope.testInProgress)
                        .then(function (response) {

                            resetQuizzesEditing();
                            $state.go('testlist');
                        });
                }
                else if ($scope.creatingOrUpdating === 'Update') {
                    testService.updateTest($scope.testInProgress)
                        .then(function (response) {

                            resetQuizzesEditing();
                            $state.go('testlist');
                        });
                }
            }
            else $scope.flashMessage = "The form is not filled-out completely";
        };


        // pushing or splicing a quiz from the user's editing array
        $scope.addOrRemoveFromSelectedQuizzes = function (quiz) {

            userService.updateSelected(quiz, $scope.user)
                .then(function (response) {

                    listQuizzesEditing();
                });
        };
    }
};