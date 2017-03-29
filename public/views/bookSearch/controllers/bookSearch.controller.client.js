(function () {
    angular
        .module("BookHubMaker")
        .controller("bookSearchController",bookSearchController);

    function bookSearchController(BookSearchService){
        var vm=this;
        vm.sortBy="";
        vm.sortListings=["Price","Alphabets A-Z","Alphabets Z-A","Shared"];
        vm.books=[{title:"Book1",imageSrc:"book1",author:"Author1",price:"price1"},
            {title:"Book2",imageSrc:"book2",author:"Author2",price:"price2"},
            {title:"Book3",imageSrc:"book3",author:"Author3",price:"price3"}];
        vm.getSortedListing=getSortedListing;
        function getSortedListing() {
            
        }
    }

})();
