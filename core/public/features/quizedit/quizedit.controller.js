module.exports = function (app) {

    app.controller('quizeditController',
        [
            '$scope',
            '$state',
            '$stateParams',
            'authUserService',
            'quizService',
            'appstate',
            '$mdDialog',
            quizeditController
        ]);

    function quizeditController(
        $scope,
        $state,
        $stateParams,
        authUserService,
        quizService,
        appstate,
        $mdDialog) {


        // authentication

        $scope.user = authUserService.user;

        var stateFrom = appstate.getStateFrom();


        // new or edit logic
        if ($stateParams.quiz === 'new') {
            $scope.creatingOrUpdating = 'New';

            $scope.quizInProgress = {
                instructions: "",
                stem: "",
                truthies: [],
                falsies: [],
                tags: [],
                stats: {},
                creator: $scope.user._id
            };
        }

        else {
            $scope.creatingOrUpdating = 'Update';
            $scope.quizInProgress = appstate.getCurrentQuiz();
        }


        // required for chips to work
        $scope.readOnly = false;


        // truthy and falsy block
        var truthies = $scope.quizInProgress.truthies,
            falsies = $scope.quizInProgress.falsies;

        $scope.addToOptions = function (option, i) {

            if (option.length > 0 && truthies.indexOf(option) === -1 && falsies.indexOf(option) === -1) {
                if (i === 'truthy') {
                    truthies.push(option);
                    $scope.tempTruthy = "";
                }
                else if (i === 'falsy') {
                    falsies.push(option);
                    $scope.tempFalsy = "";
                }
            }
        };

        $scope.editOption = function (option, i) {

            if (i === 'truthy') {
                truthies.splice(truthies.indexOf(option), 1);
                if ($scope.tempTruthy) $scope.addToOptions($scope.tempTruthy, 'truthy');
                $scope.tempTruthy = option;
            }
            else if (i === 'falsy') {
                falsies.splice(falsies.indexOf(option), 1);
                if ($scope.tempFalsy) $scope.addToOptions($scope.tempFalsy, 'falsy');
                $scope.tempFalsy = option;
            }
        };


        // crud operations

        function validateQuizInProgress(quiz) {

            if (
                quiz.instructions.length > 0 &&
                quiz.stem.length > 0 &&
                quiz.truthies.length > 0 &&
                quiz.falsies.length > 0 &&
                quiz.tags.length > 0
                ) return true;
            return false;
        }

        $scope.createOrUpdateQuiz = function () {

            var validates = validateQuizInProgress($scope.quizInProgress);

            if (validates) {
                if ($scope.creatingOrUpdating === 'New') {
                    quizService.createQuiz($scope.quizInProgress)
                        .then(function (response) {

                            $state.go(stateFrom.state, stateFrom.params);

                        });
                }
                else if ($scope.creatingOrUpdating === 'Update') {
                    quizService.updateQuiz($scope.quizInProgress)
                        .then(function (response) {

                            $state.go(stateFrom.state, stateFrom.params);
                        });
                }
            }
            else $scope.flash = "The form is not filled-out completely";
        };


        // debugging
        $scope.logQuizInProgress = function () {
            console.log($scope.quizInProgress);
        };


        // cancel button
        $scope.cancelOperation = function () {
            $state.go(stateFrom.state, stateFrom.params);
        };
    }

};