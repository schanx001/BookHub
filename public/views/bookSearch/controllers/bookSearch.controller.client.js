(function () {
    angular
        .module("BookHubMaker")
        .controller("bookSearchController",bookSearchController);

    function bookSearchController(BookService){
        var vm=this;
        vm.sortBy="";
        vm.sortListings=["Price","Alphabets A-Z","Alphabets Z-A","Shared"];
        vm.books=[{title:"Book1",imageSrc:"book1",author:"Author1",price:"price1"},
            {title:"Book2",imgSrc:"book2",author:"Author2",price:"price2"},
            {title:"Book3",imgSrc:"book3",author:"Author3",price:"price3"}];
        vm.bookNumber=0;
        vm.getSortedListing=getSortedListing;
        vm.addBook=addBook;
        function getSortedListing() {
            vm.books=[];
            BookService
                .findAllAvBooks()
                .then(function (response) {
                    vm.books=response.data;
                },function (error) {
                    console.log(error);
                });
        }
        function addBook() {
            // alert("book");
            BookService
                .createBook({title:"book"+vm.bookNumber,
                author:"author"+vm.bookNumber,
                price:vm.bookNumber,
                imgsrc:"link"+vm.bookNumber})
                .then(function (response) {
                    console.log("addbook="+response.data);
                },function (error) {
                    console.log("addbookerror="+error);
                })
        }

    }

})();
