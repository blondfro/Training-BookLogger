//this uses the factory creation method for this service

( function () {

    angular.module("app")
        .factory("dataService", dataService);
    
    function dataService(logger) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };
        
        function getAllBooks() {

            logger.output("getting all books");

            return [
                {
                    books_id: 1,
                    title: "Harry Potter and the Deathly Hallows",
                    author: "J.K. Rowling",
                    year_published: 2000
                },
                {
                    books_id: 1,
                    title: "The Cat in the Hat",
                    author: "Dr. Seuss",
                    year_published: 1957
                },
                {
                    books_id: 1,
                    title: "Encyclopedia Brown, Boy Detective",
                    author: "Donald J. Sobol",
                    year_published: 1963
                }
            ];
        }
        
        function getAllReaders() {
            logger.output("getting all readers");

            return [
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
        }
    }

    dataService.inject = ["logger"];

}());