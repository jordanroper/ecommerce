module.exports = function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', routing]);

    function routing($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/home');


        $stateProvider
            .state('home', {
                url: '/home',
                data: {
                    requireLogin: false
                },
                views: {
                    main: {
                        template: require('./features/home/home.template.html'),
                        controller: 'homeController'
                    }
                }
            })

            .state('quizedit', {
                url: '/quizzes/:quiz',
                data: {
                    requireLogin: false
                },
                views: {
                    main: {
                        template: require('./features/quizedit/quizedit.template.html'),
                        controller: 'quizeditController'
                    }
                }
            })

            .state('quizlist', {
                url: '/quizzes?display',
                data: {
                    requireLogin: false
                },
                views: {
                    main: {
                        template: require('./features/quizlist/quizlist.template.html'),
                        controller: 'quizlistController'
                    }
                }
            })

            .state('testedit', {
                url: '/tests/:test',
                data: {
                    requireLogin: false
                },
                views: {
                    main: {
                        template: require('./features/testedit/testedit.template.html'),
                        controller: 'testeditController'
                    }
                }
            })

            .state('testlist', {
                url: '/tests',
                data: {
                    requireLogin: false
                },
                views: {
                    main: {
                        template: require('./features/testlist/testlist.template.html'),
                        controller: 'testlistController'
                    }
                }
            });
    }


    app.run(function ($rootScope, authUserService) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            var requireLogin = toState.data.requireLogin;

            if (requireLogin && !authUserService.user) {
                event.preventDefault();
                console.log('get outta here!');
            }
        });
    });
};