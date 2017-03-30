(function () {
    angular
        .module("BookHubMaker")
        .controller("mainPageController", function ($http) {
            var vm = this;
            vm.getBookListing=getBookListing;
            vm.getBookListingMobile=getBookListingMobile;
            vm.processImage = processImage;
            vm.genreListings=["Science Fiction","Arts & Photography","Horror","Children Books","History","Literature & Fiction"];
            vm.genre="Horror";
            getBookListing();
            function getBookListingMobile(genre) {
                // console.log("Inside mobile listing "+genre);
                vm.genre=genre;
                getBookListing();
            }
            function processImage(url) {
                var temp;
                return url.replace("zoom=1","zoom=0").replace("edge=curl&","");
            }
            function getBookListing() {
                // console.log("Inside");
                vm.books=[];
                var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=subject:"+vm.genre;
                var gbooks=$http.get(googleAPI);
                if(document.getElementById("div_book_listing")){
                    document.getElementById("div_book_listing").innerHTML="";
                }
                if(document.getElementById("div_book_listing_mobile")){
                    document.getElementById("div_book_listing_mobile").innerHTML="";
                }
                gbooks.then(function(response){
                    // console.log(response.data);
                    for( var i=0;i<response.data.items.length;i++){
                        vm.books.push(response.data.items[i]);
                    }
                    // console.log(vm.books);
                    // console.log(vm.books[0].kind);
                    // console.log(vm.books[0].volumeInfo.title);
                },function (response) {
                    // console.log(response);

                });
            }

        });
})();
