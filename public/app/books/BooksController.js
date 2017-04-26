(function() {

    angular.module('app')
        .controller('BooksController', ["books", "dataService", "logger", "badgeService",
            "$cookies", "$cookieStore", "$log", "$route", "BooksResource", 'currentUser',
            BooksController]);


    function BooksController(books, dataService, logger, badgeService, $cookie, $cookieStore,
                             $log, $route, BooksResource, currentUser) {

        var vm = this;
        vm.appName = books.appName;

        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        vm.allBooks = BooksResource.query();

        //This gets commented out when we inject the $resource service of BooksResource above.
        // dataService.getAllBooks()
        //     .then(getBooksSuccess, null, getBooksNotification)
        //     .catch(errorCallback)
        //     .finally(getAllBooksComplete);

        function getBooksSuccess(books) {
            vm.allBooks = books;
        }

        // this code would be used if the "null" keyword was not used in the dataService above.
        // function getBooksError(response) {
        //     alert(response);
        // }

        function errorCallback(errorMessage) {
            console.log("Error Message: " + errorMessage);
        }

        function getBooksNotification(notification) {
            // console.log("Promise Notification: " + notification);
        }

        function getAllBooksComplete() {
            console.log("getAllBooks has completed!");
        }
        
        //commented out once we started using the $q service to retrieve data for books.
        // vm.allBooks = dataService.getAllBooks();


        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallback)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
            vm.allReaders = readers;
            $log.awesome('All readers retrieved');
        }

        function getAllReadersComplete() {
            console.log("getAllReaders has completed!")
        }

        vm.deleteBook = function (bookID) {
          dataService.deleteBook(bookID)
              .then(deleteBookSuccess)
              .catch(deleteBookError);
        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

        //commented out once we started using the $q service here as well.
        // vm.allReaders = dataService.getAllReaders();

        vm.getBadge = badgeService.retrieveBadge;

        logger.output("BooksController has been created");

        vm.favoriteBook = $cookie.favoriteBook;

        vm.currentUser = currentUser;

        // this line can be removed because we we've created a service to handle this rather
        // than a cookie.
        // vm.lastEdited = $cookieStore.get('lastEdited');


        // $log service examples.  Requires the injection of the $log service.
        // $log.log("Logging with log");
        // $log.info("logging with info");
        // $log.warn("logging with warn");
        // $log.error("logging with error");
        // $log.debug("logging with debug");

    }


}());