(function() {

    var app = angular.module('app', ["ngRoute", "ngCookies", "ngResource"]);



    app.provider("books", ["constants", function (constants) {
        var includeVersionInTTitle = false;

        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTTitle = value;
        };

        this.$get = function () {
            var appName = constants.APP_TITLE;
            var appDesc = constants.APP_DESCRIPTION;

            var version = constants.APP_VERSION;
            if (includeVersionInTTitle) {
                appName += " " + version;
            }

            return {
                appName: appName,
                appDesc: appDesc
            };
        };


    }]);

    app.config(["booksProvider", "$routeProvider", "$logProvider", "$httpProvider",
        function (booksProvider, $routeProvider, $logProvider, $httpProvider) {
        booksProvider.setIncludeVersionInTitle(true);
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('bookLoggerInterceptor');

        $routeProvider
            .when("/", {
                templateUrl: "app/templates/books.html",
                controller: "BooksController",
                controllerAs: "books"
            })
            .when("/AddBook", {
                templateUrl: "app/templates/addBook.html",
                controller: "AddBookController",
                controllerAs: "addNewBook"
            })
            .when("/EditBook/:bookID", {
                templateUrl: "app/templates/editBook.html",
                controller: "EditBookController",
                controllerAs: "editBook"
            })
            .otherwise("/");

        app.run(["$rootScope", function ($rootScope) {
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                console.log("successfully changed route");
            });

            $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                console.log("error changin route");

                console.log(event);
                console.log(current);
                console.log(previous);
                console.log(rejection);

            })
        }])

    }]);

}());