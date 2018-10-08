angular.module('sportStoreAdmin')
    .constant('productUrl', 'http://localhost:5500/products/')
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller('ProductController', function ($scope, $http, $location, $resource, productUrl, days) {
        $scope.products = [
            { name: "Apples", category: "Fruit", price: 1.20, expiry: 10 },
            { name: "Bananas", category: "Fruit", price: 2.42, expiry: 7 },
            { name: "Pears", category: "Fruit", price: 2.02, expiry: 6 }
        ];

        //Practicing Directives
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday']
        $scope.today = new Date().getDay();
        $scope.day = dayNames[new Date().getDay()];

        $scope.productsResource = $resource(productUrl + ':id', { id: '@id' });

        $scope.listProduct = function () {
            debugger;
            $scope.products = $scope.productsResource.query();
        };

        $scope.deleteProduct = function (product) {
            product.$delete()
                .then(function () {
                    $scope.products.splice($scope.products.indexOf(product), 1);
                });
        };

        $scope.createProduct = function (product) {
            $scope.productsResource(product).$save
                .then(function (newProdut) {
                    $scope.products.push(newProdut);
                    $scope.editProduct = null;
                });
        };

        $scope.updateProduct = function (product) {
            product.$save();
            $scope.editProduct = null;
        };

        $scope.startEdit = function (product) {
            $scope.editProduct = product;
        };

        $scope.cancelEdit = function () {
            $scope.editProduct = null
        };

        $scope.listProduct();

    })
    // .directive('unorderedList', function () {
    //     return function (scope, element, attrs) {
         
    //         var data = scope[attrs["unorderedList"]];

    //         if (angular.isArray(data)) {
    //             for (var i = 0; i < data.length; i++) {
    //                 console.log(data[i].name);
    //             }
    //         }
    //     }
    // })
    // .controller('lessCtrl', function () {

    //     this.hello = function () {
    //         return 1234;
    //     };
    // })
    .directive('highlight', function ($filter) {
        var dayNames = $filter('dayName');
        return function (scope, element, attrs) {
            if (dayNames(scope.day) == attrs["highlight"]) {
                element.css('color', 'red');
            }
        }
    });
    // .filter('dayName', function () {
    //     var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    //     return function (input) {
    //         return angular.isNumber(input) ? dayNames[input] : input;
    //     }
    // }) ;
