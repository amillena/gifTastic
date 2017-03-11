      // Initial array of movies
      var animals = ["kitten", "cat", "puppy", "dog", "panda", "dolphin", "tiger", "hamster", "lion", "turtle", "monkey", "snake", "pony","horse", "bear"];
       
      // displayAnimalInfo function re-renders the HTML to display the appropriate content
      function displayAnimalInfo() {
        
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC" +"&limit=10";
        console.log(animal);
        	if (animal === undefined){
        		return;
        	} 

 		
        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#animals-view").empty();
          // Creating a div to hold the animals
            console.log(response);
            
              for (var i=0; i<response.data.length; i++){
                var animalDiv = $("<div class='animal'>");

                // Storing the rating data
                var rating = response.data[i].rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);
                var pBR = $("<p>").html("<br>");

                // Displaying the rating
                animalDiv.append(pOne);
                animalDiv.append(pBR);

                // Retrieving the URL for the image
                
                var imgURL1 = response.data[i].images.original_still.url;
                var imgURL2 = response.data[i].images.original.url;

                var image = $("<img>").attr({src:imgURL1, 
                                              "data-still":imgURL1,
                                              "data-animate":imgURL2,
                                              "data-state": "still",
                                              "class":"gif"});
                // Appending the image
                animalDiv.append(image);
                
               
                $("#animals-view").append(animalDiv);
              }
        });

      }

      // Function for displaying animal data
      function renderButtons() {
        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons and animals)
         

        // Looping through the array of animal
        for (var i = 0; i < animals.length; i++) {

          // Dynamicaly generating buttons for each animal in the array
          var a = $("<button>");
          // Adding a class of btn to our button
          a.addClass("btn imgBtn btn-info");

          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);

        }
      }

      // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function(event) {
        

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        $("#buttons-view").empty();
            if($("#animal-input").val() == ''){
            alert('Input can not be left blank');
            return;
            }
          

        // Adding animal from the textbox to our array
        animals.push(animal);
		$("input:text").val("");
        // Calling renderButtons which handles the processing of animal array
        renderButtons();
         event.preventDefault();
        
      });

      // Adding a click event listener to all elements with a class of "btn"
      $(document).on("click", ".btn", displayAnimalInfo);
      

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
 		

      $("#animals-view").on("click",".gif", function () {
          var state = $(this).attr("data-state");
        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
      
        }else{

           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
        }

    });