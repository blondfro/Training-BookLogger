(function (){

    angular.module("app")
        .controller("EditBookController", ["$routeParams", "books", "$cookies",
            "$cookieStore", 'dataService', '$log', '$location', "BooksResource", 'currentUser',
            EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore, dataService,
                                $log, $location, BooksResource, currentUser) {
        var vm = this;

        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);

        // dataService.getAllBooks()
        //     .then(function (books) {
        //         vm.currentBook = books.filter(function (item) {
        //             return item.book_id = $routeParams.bookID;
        //         })[0];
        //     });

        vm.currentBook = BooksResource.get({ book_id: $routeParams.bookID});
        $log.log(vm.currentBook);

        //this gets commented out b/c of the injection of the $resource of BooksResource above.
        // dataService.getBookByID($routeParams.bookID)
        //     .then(getBookSuccess)
        //     .catch(getBookError);

        function getBookSuccess(book) {
            vm.currentBook = book;
            currentUser.lastBookEdited = vm.currentBook;

            // the below line can be removed because we're using a service instead of a cookie.
            // $cookieStore.put('lastEdited', vm.currentBook);

        }

        function getBookError(reason) {
            $log.error(reason);
        }

        vm.saveBook = function () {
            vm.currentBook.$update();
            $location.path('/');
           // this gets commented out b/c of the $resoruce injection of the BooksResource above.
            // dataService.updateBook(vm.currentBook)
             //     .then(updateBookSuccess)
             //     .catch(updateBookError);
        };

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }


        // this codes goes away once we start using an api and $http service.
        // vm.currentBook = books.filter(function (item) {
        //     return item.book_id == $routeParams.bookID;
        // })[0];
        
        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        };


    }

}());