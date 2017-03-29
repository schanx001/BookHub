(function () {
    angular
        .module("BookHubMaker")
        .controller("bookSearchController",bookSearchController);

    function bookSearchController(){
        var vm=this;
        vm.sortBy="";
        vm.sortListings=["Price","Alphabets A-Z","Alphabets Z-A","Shared"];
        vm.getSortedListing=getSortedListing;
        
        function getSortedListing() {
            
        }
    }

})();
