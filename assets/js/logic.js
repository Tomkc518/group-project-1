/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */

function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var searchTerm = $("#search-term").val().trim();
  console.log(searchTerm);

  var queryURL = "https://api.edamam.com/search?q=" + searchTerm;

  // add the api key parameter (the one we received when we registered)
  queryURL += "&app_id=ddbdf056&app_key=31ae432b0845168eaf5f7feca2d703fa";

  // grab text the user typed into the search input, add as parameter to url
  console.log(searchTerm);
  queryURL += "&q=" + searchTerm;

  // if the user provides a startYear, include it in the queryURL
  //var diet = $("#start-year").val().trim();
  //console.log(diet);

  //if (parseInt(diet)) {
   // queryURL += "&diet=" + diet;
  //}

  // if the user provides an endYear, include it in the queryURL
  //var maxCalories = $("#max-calories").val().trim();

  // if (parseInt(maxCalories)) {
  //   queryURL += "&calories=" + maxCalories;
  // }


  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */
function updatePage(recipeData) {
  // get from the form the number of results to display
  // api doesn't have a "limit" parameter, so we have to do this ourselves
  var numArticles = 10;

  // log the NYTData to console, where it will show up as an object
  console.log(numArticles);
  console.log("------------------------------------");

  // loop through and build elements for the defined number of articles
  for (var i = 0; i < numArticles; i++) {

    // get specific article info for current index
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

    // increase the articleCount (track article # - starting at 1)
    // var articleCount = i + 1;

    // // create the HTML well (section) and add the article content for each
    // var $articleWell = $("<article>");
    // $articleWell.addClass("well");
    // $articleWell.attr("id", "article-well-" + articleCount);

    // // add the newly created element to the DOM
    // $("#well-section").append($articleWell);

    // // if the article has a headline, log and append to $articleWell
    // var headline = recipeLabel;
    // console.log(headline);

    // if (recipeImgSrc) {
    //   var recipeImage = $("<img>");
    //   recipeImage.attr("src", recipeImgSrc);
    //   $articleWell.append(recipeImage);
    // }
     
            

    // if (headline == true) {
    //   console.log(headline);

    //   $articleWell.append(
    //     "<h3 class='articleHeadline'>" +
    //     "<span class='label label-primary'>" + articleCount + "</span>" +
    //     "<strong> " + headline + "</strong></h3>"
    //   );
    // }

    // if (recipeLabel) {
    //   $articleWell.append("<h5>" + recipeLabel + "</h5>");
    // }

    // if (recipeCalories) {
    //   $articleWell.append("<h5>" + Math.ceil(recipeCalories) + "</h5>");
    // }

    // if (recipeURL) {
    //   $articleWell.append("<h5>" + recipeURL + "</h5>");
    // }
  }
}

// function to empty out the articles
function clear() {
  $("#recipes").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  var searchTerm = $("#search-term").val().trim();
  if (searchTerm == "") {
    
  }

  // empty the region associated with the articles
  clear();

  // build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // make the AJAX request to the API - GETs the JSON data at the queryURL.
  // the data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
