angular.module('sportStore')
    .constant('dataUrl', 'http://localhost:5500/products')
    .controller('sportStoreCtr', function ($scope, $http, dataUrl) {
        $scope.data = {};

        $http.get(dataUrl)
            .success(function (response) {
                $scope.data.products = response;
            });

        // $scope.data = {
        //     products: [
        //         {
        //             name: "Product #1", description: "A product",
        //             category: "Category #1", price: 100
        //         },
        //         {
        //             name: "Product #2", description: "A product",
        //             category: "Category #1", price: 110
        //         },
        //         {
        //             name: "Product #3", description: "A product",
        //             category: "Category #2", price: 210
        //         },
        //         {
        //             name: "Product #4", description: "A product",
        //             category: "Category #3", price: 202
        //         }]
        // };
    })
    .directive('withClosure', function () {
        return {
            link: function (scope, element, attrs) {
                var msgOne = 1;

                element.bind('click', (function (msg) {

                    return function () {
                        debugger;
                        element.append('<p>Value of message: ' + (++msg) + '</p>');
                    }

                })(msgOne));
            }
        };
    })
    .directive('withOutClosure', function () {
        return {
            link: function (scope, element, attrs) {
                var msgOne = 1;

                element.bind('click', function () {
                    return element.append('<p>Value of message: ' + (++msgOne) + '</p>');
                });
            }
        };
    });