
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}

function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var searchTerm = $("#search-term").val().trim();
  console.log(searchTerm);

  var queryURL = "https://api.edamam.com/search?q=" + searchTerm;

  queryURL += "&app_id=ddbdf056&app_key=31ae432b0845168eaf5f7feca2d703fa";

  console.log(searchTerm);
  queryURL += "&q=" + searchTerm;

  console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}

function updatePage(recipeData) {

  var numArticles = 9;

  console.log(numArticles);
  console.log("------------------------------------");

  for (var i = 0; i < numArticles; i++) {

    var recipeLabel = recipeData.hits[i].recipe.label;
    var recipeURL = recipeData.hits[i].recipe.url;
    var recipeCalories = Math.floor(recipeData.hits[i].recipe.calories);
    var recipeImgSrc = recipeData.hits[i].recipe.image;

    var card = $("<div class='card mt-5' style='width: 20rem'>");
    var cardImage = $("<a href='" + recipeURL + "' target='blank'><img class='card-img-top rounded' src='" + recipeImgSrc + "' alt='Card image cap'/>");
    var cardTitle = $("<h5 class='card-title mt-3'>" + recipeLabel + "</h5>")
    var cardText = $("<p class='card-text'>Calories: " + recipeCalories + "</p>");

    card.append(cardImage, cardTitle, cardText);
    $("#recipes").append(card)

    console.log(card);
    console.log(recipeLabel);
    console.log(recipeURL);
    console.log(recipeCalories);
    console.log(recipeImgSrc);
  }
}

function clear() {
  $("#recipes").empty();
}

$("#run-search").on("click", function (event) {

  event.preventDefault();
  var searchTerm = $("#search-term").val().trim();
  
  if (searchTerm === "") {
    $('#myModal').modal();
  } else {
    clear();
    var queryURL = buildQueryURL();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  };
});
