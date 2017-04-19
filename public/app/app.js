(function() {

    var app = angular.module('app', []);



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

    app.config(["booksProvider", "constants", function (booksProvider, constants) {
        booksProvider.setIncludeVersionInTitle(true);
        console.log("Title from constants service: " + constants.APP_TITLE)
    }]);

}());