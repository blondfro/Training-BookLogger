//this uses the factory creation method for this service

( function () {

    angular.module("app")
        .factory("dataService", ["$q", "$timeout", '$http', 'constants', dataService]);
    
    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

        function transformGetBooks(data, headersGetter) {
            var transformed = angular.fromJson(data);

            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            console.log(transformed);
            return transformed;
        }

        function sendResponseData(response) {
            return response.data;
        }
        
        function sendGetBooksError(response) {
            return $q.reject('Error returning book(s). (HTTP status: ' + response.status + ')');
        }

        function getBookByID(bookID) {
            return $http.get('api/books/' + bookID)
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

        function updateBook(book) {
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
                .then(updateBookSuccess)
                .catch(updateBookError)
        }

        function updateBookSuccess(response) {
            return 'Book updated: ' + response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject('Error updating book. (HTTP Status: ' + response.status + ')');
        }

        //original getAllBooks function pre using the api setup above.
        // function getAllBooks() {
        //
        //     var booksArray = [
        //         {
        //             book_id: 1,
        //             title: "Harry Potter and the Deathly Hallows",
        //             author: "J.K. Rowling",
        //             year_published: 2000
        //         },
        //         {
        //             book_id: 2,
        //             title: "The Cat in the Hat",
        //             author: "Dr. Seuss",
        //             year_published: 1957
        //         },
        //         {
        //             book_id: 3,
        //             title: "Encyclopedia Brown, Boy Detective",
        //             author: "Donald J. Sobol",
        //             year_published: 1963
        //         }
        //     ];
        //
        //     var deffered = $q.defer();
        //
        //     $timeout(function () {
        //         var successful = true;
        //         if (successful) {
        //
        //             deffered.notify("Just getting started gathering books... ");
        //             deffered.notify("almost done gathering books... ");
        //
        //             deffered.resolve(booksArray);
        //         } else {
        //             deffered.reject("Error retrieving books");
        //         }
        //
        //
        //     }, 1000);
        //
        //     return deffered.promise;
        // }

        function addBook(newBook) {
            return $http.post('api/books',newBook, {
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookError);
        }

        function transformPostRequest(data, headersGetter) {
            data.newBook = true;

            console.log(data);

            return JSON.stringify(data);
        }

        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }

        function addBookError(reason) {
            return $q.reject('Error adding book. (HTTP status' + reason.status + ')');
        }

        function deleteBook(bookID) {
            return $http ({
                method: 'DELETE',
                url: 'api/books/' + bookID
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }

        function deleteBookSuccess(response) {
            return 'Book deleted: ';
        }

        function deleteBookError(reason) {
            return $q.reject('Error deleting book. (HTTP status: ' + reason.status + '/')
        }

        function getAllReaders() {
            var readersArray = [
                {
                    reader_id: 1,
                    name: "Marie",
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: "Daniel",
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: "Lanier",
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deffered = $q.defer();

            $timeout(function () {

                    deffered.resolve(readersArray);

            }, 1500);
            return deffered.promise;
        }
    }

    dataService.inject = ["logger"];

}());