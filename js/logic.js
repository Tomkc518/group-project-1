
function buildQueryURL() {

  var searchTerm = $("#search-term").val().trim();
  console.log(searchTerm);

  var queryURL = "https://api.edamam.com/search?q=" + searchTerm;

  
  queryURL += "&app_id=ddbdf056&app_key=31ae432b0845168eaf5f7feca2d703fa";

  
  console.log(searchTerm);

  queryURL += "&q=" + searchTerm;

  var maxCalories = $("#max-calories").val().trim();

  if (parseInt(maxCalories)) {
    queryURL += "&calories=" + maxCalories;
  }

  console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}

function updatePage(recipeData) {

  var numArticles = $("#article-count").val();

  console.log(numArticles);
  console.log("------------------------------------");

  for (var i = 0; i < numArticles; i++) {

    var recipeLabel = recipeData.hits[i].recipe.label;
    var recipeURL = recipeData.hits[i].recipe.url;
    var recipeCalories = recipeData.hits[i].recipe.calories;

    console.log(recipeLabel);
    console.log(recipeURL);
    console.log(recipeCalories);

    var articleCount = i + 1;

    
    var $articleWell = $("<article>");
    $articleWell.addClass("well");
    $articleWell.attr("id", "article-well-" + articleCount);

    
    $("#well-section").append($articleWell);

    
    var headline = recipeLabel;
    console.log(headline);

    if (headline == true) {
      console.log(headline);

      $articleWell.append(
        "<h3 class='articleHeadline'>" +
        "<span class='label label-primary'>" + articleCount + "</span>" +
        "<strong> " + headline + "</strong></h3>"
      );
    }

    if (recipeLabel) {
      $articleWell.append("<h5>" + recipeLabel + "</h5>");
    }

    if (recipeCalories) {
      $articleWell.append("<h5>" + Math.ceil(recipeCalories) + "</h5>");
    }

    if (recipeURL) {
      $articleWell.append("<h5>" + recipeURL + "</h5>");
    }
  }
}


function clear() {
  $("#well-selection").empty();
}

$("#run-search").on("click", function (event) {

  event.preventDefault();

  clear();

  var queryURL = buildQueryURL();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

