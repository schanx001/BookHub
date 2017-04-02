(function () {
    angular
        .module("BookHubMaker")
        .controller("bookSearchController",bookSearchController);

    function bookSearchController(BookService){
        var vm=this;
        vm.sortBy="";
        vm.sortListings=["Price Low-High","Price High-Low","Title A-Z","Title Z-A","Recent"];
        vm.books=[{title:"Book1",imageSrc:"book1",author:"Author1",price:"price1"},
            {title:"Book2",imgSrc:"book2",author:"Author2",price:"price2"},
            {title:"Book3",imgSrc:"book3",author:"Author3",price:"price3"}];
        vm.bookNumber=0;
        vm.searchText="";
        vm.getSortedListing=getSortedListing;
        vm.addBook=addBook;
        vm.getAllAvBooks=getAllAvBooks;
        vm.getSortListingMobile=getSortListingMobile;
        vm.searchBook=searchBook;
        
        function searchBook() {
            if(vm.searchText!=""){
                // console.log(vm.searchText);
                BookService
                    .findBooksByName(vm.searchText)
                    .then(function (response) {
                        vm.books=response.data;
                        if(response.data.length===0){
                            vm.error="Book not available";
                        }
                    },function (error) {
                        console.log(error);
                        vm.error="Book not available";
                    })
            }
        }
        
        function getSortListingMobile(opt) {
            vm.sortBy=opt;
            getSortedListing();
        }
        
        function getAllAvBooks() {
            BookService
                .findAllAvBooks()
                .then(function (response) {
                    vm.books=response.data;
                },function (error) {
                    console.log(error);
                });
        }
        getAllAvBooks();
        function getSortedListing() {
            // vm.books=orderBy(vm.books,vm.sortBy,true);
            if(vm.sortBy===""){
                vm.sort="";
                vm.reverse=true;
            }else{
                if(vm.sortBy==="Price Low-High"){
                    vm.sort="price";
                    vm.reverse=false;
                }else if(vm.sortBy==="Price High-Low"){
                    vm.sort="price";
                    vm.reverse=true;
                }else if(vm.sortBy==="Title A-Z"){
                    vm.sort="title";
                    vm.reverse=false;
                }else if(vm.sortBy==="Title Z-A"){
                    vm.sort="title";
                    vm.reverse=true;
                }else{
                    vm.sort="dateCreated";
                    vm.reverse=true;
                }
            }
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
                    vm.books=[];
                    if(document.getElementById("div_book_listing")){
                        document.getElementById("div_book_listing").innerHTML="";
                    }
                    if(document.getElementById("div_book_listing_mobile")){
                        document.getElementById("div_book_listing_mobile").innerHTML="";
                    }
                    getAllAvBooks();
                },function (error) {
                    console.log("addbookerror="+error);
                })
        }

    }

})();
