angular.module('sportStore')
    .constant('productListActiveClass', 'btn-primary')
    .controller('sportListCtr', function ($scope, productListActiveClass, cart) {

        var selectedCategory = '';

        $scope.selectCategory = function (category) {
            selectedCategory = category;
        };

        $scope.categoryFilter = function (product) {
            return selectedCategory == null || product.category == selectedCategory;
        };

        $scope.getCategoryClass = function (category) {
            return category == selectedCategory ? productListActiveClass : '';
        };

        $scope.addProduct = function (product) {
            debugger;
            cart.addProduct(product.id, product.name, product.price);
        };

    });