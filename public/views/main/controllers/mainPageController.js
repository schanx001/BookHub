(function () {
    angular
        .module("BookHubMaker")
        .controller("mainPageController", function () {
            var vm = this;
            vm.check = "HELLO";
            vm.books = [
                {
                    name: "Book1 Loooooooooooooooooooooooooooooooooong",
                    author: "Book1 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                },
                {
                    name: "Book2 Loooooooooooooooooooooooooooooooooong",
                    author: "Book2 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                },
                {
                    name: "Book3 Loooooooooooooooooooooooooooooooooong",
                    author: "Book3 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                },
                {
                    name: "Book4 Loooooooooooooooooooooooooooooooooong",
                    author: "Book4 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                },
                {
                    name: "Book5 Loooooooooooooooooooooooooooooooooong",
                    author: "Book5 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                },
                {
                    name: "Book6 Loooooooooooooooooooooooooooooooooong",
                    author: "Book6 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                },
                {
                    name: "Book7 Loooooooooooooooooooooooooooooooooong",
                    author: "Book7 Author",
                    description: "adfadsfasdfasdfasfasdfasdfasddsfasd afasdfsdfasdfadfsfsfsafsdfasdf"
                }
            ];
        });
})();
