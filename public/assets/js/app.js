var productListUrl = 'https://api.punkapi.com/v2/beers?per_page=10&page=';
var productDetailUrl = 'https://api.punkapi.com/v2/beers/';
var pageText = document.getElementById('pageNumber');
var prevPage = document.getElementById('prevPage');
var nextPage = document.getElementById('nextPage');
var favouritesArr = [];
var beersArr = [];
var page = 1;
 
/**
 @desc: Add a favourite to favourites div in UI
 @param: beer object
 @author: oesemen
**/
function addToFavourites(beer){
    var favouritesDiv = document.querySelector('.favs');
    var beerHtml = tpl(window.BEER_ROW, beer);
 
    favouritesDiv.innerHTML += beerHtml;
}
 
/**
 @desc: Add product to products div in UI
 @param: beer object
 @param: index
 @author: oesemen
 **/
function addToProducts(beer, index){
    beer.index = index;
 
    var beersDiv = document.querySelector('.beers');
    var beerHtml = tpl(window.PRODUCT_ROW, beer);
 
    beersDiv.innerHTML += beerHtml;
 
    // Add disabled attribute to the buttons which is exist in favouritesArr
    // TODO: needs improvement
    for(var i = 0 ; i <= favouritesArr.length - 1; i++){
        if(favouritesArr[i].beer_id === beer.id){
            document.getElementById('btnFav_' + beer.id).setAttribute('disabled', 'disabled');
        }
    }
}
 
/**
 @desc: Send POST request to API to save favourite
 @param: id
 @param: beerIndex
 @author: oesemen
 **/
function setFavourite(id, beerIndex) {
    request('POST', '/favourites/' + id, null, null, function (response) {
        if(response.status === 200){
            var data = JSON.parse(response.responseText);
            var beer = beersArr[beerIndex];
            beer.dbid = data.id.ID;
 
            document.getElementById('btnFav_' + id).setAttribute('disabled', 'disabled');
 
            addToFavourites(beer)
        }else if(response.status === 204){
            document.getElementById('btnFav_' + id).setAttribute('disabled', 'disabled');
            alert("Beer already added to your favourites.");
        }else{
            alert("Something went wrong.")
        }
    })
}
 
/**
 @desc: Send DELETE request to API to remove favourite
 @param: id
 @author: oesemen
 **/
function removeFavourite(id, listId) {
    request('DELETE', '/favourites/' + id, null, null, function (response) {
        if(response.status === 204){
            document.getElementById('beer_' + id).remove();
 
            if(document.getElementById('btnFav_' + listId)){
                document.getElementById('btnFav_' + listId).removeAttribute('disabled');
            }
        }
    })
}
 
/**
 @desc: Send GET request to API to fetch all favourites
 @author: oesemen
 **/
function getFavourites() {
    var favouritesDiv = document.querySelector('.favs');
 
    favouritesDiv.innerHTML = '';
 
    request('GET', '/favourites', null, null, function (response){
        var data = JSON.parse(response.responseText);
 
        favouritesArr = data.list;
 
        //TODO: needs improvement
        for(var i = 0; i <= data.list.length - 1; i++){
            var dbid = data.list[i].id;
 
            request('GET', productDetailUrl + data.list[i].beer_id, null, dbid, function(response, dbid){
                var detail = JSON.parse(response.responseText);
                var beer = detail[0];
 
                beer.dbid = dbid;
 
                addToFavourites(beer);
            });
        }
    })
}
 
/**
 @desc: Send GET request to public API to get product list
 @author: oesemen
 **/
function getBeers () {
    var url = productListUrl + page;
    var beersDiv = document.querySelector('.beers');
 
    getFavourites();
 
    request('GET', url, null, null,function(response){
        var data = JSON.parse(response.responseText);
 
        beersArr = data;
 
        beersDiv.innerHTML = '';
 
        for(var i=0; i <= data.length - 1; i++){
            addToProducts(data[i], i);
        }
 
        refreshPagination(data);
    })
}
 
/**
 @desc: Prepare the pagination buttons toggle disabled or not
 @author: oesemen
 **/
function refreshPagination(data){
    pageText.innerText = page;
    prevPage.disabled = page === 1;
    nextPage.disabled = data.length < 10;
}
 
window.onload = function(){
    prevPage.addEventListener('click', function(){
        page--;
        getBeers();
    });
 
    nextPage.addEventListener('click', function(){
        page++;
        getBeers();
    });
 
    getBeers();
}