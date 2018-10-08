angular.module('sportStoreAdmin')
    .constant('authUrl', 'http://localhost:5500/users')
    .controller('authCtrl', function ($scope, $http, $location, authUrl) {

        $scope.authenticate = function (userName, passWord) {

            $http.post(authUrl, {
                username: userName,
                password: passWord
            }
                , {
                    withCredentials: true
                }).success(function (response) {

                    $location.path('/main');
                }).error(function (error) {
                    $scope.authenticationError = error
                });
        };
    })
    .controller('mainCtrl', function ($scope, $http, $location) {

        $scope.screens = ['Products', 'Orders'];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function (index) {

            return $scope.screens[index];
        };

        $scope.getScreen = function () {

            return $scope.current == 'Products' ? '/views/adminProducts.html' : '/views/adminOrders.html';
        };
    })
   ;