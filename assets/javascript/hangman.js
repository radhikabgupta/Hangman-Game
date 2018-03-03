window.onload = function () {

  // Define variables
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var songs = ["assets/audio/madonna_like_a_prayer.mp3","assets/audio/michael_jackson_billie_jean.mp3"];      
    var artistImages = ["assets/images/madonna_like_a_prayer.jpg","assets/images/michael_jackson_billie_jean.jpeg"];  
    var categories;         
    var chosenCategory;     
    var getHint;         
    var word;              
    var guess;             
    var geusses = [ ];      
    var lives;             
    var counter;           
    var space;              
    var hintIndex ;

    // Get elements
    var myAudio = document.getElementById("myAudio");  
    var audioElement = document.createElement("audio");         
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");

    // create alphabet ul
    var buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    }    
    
    // Select Catagory
    var selectCat = function () {
      if (chosenCategory === categories[0]) {
        catagoryName.innerHTML = "The Category Is Best Singers";
      } 
    }  
  
    // Create geusses ul
     result = function () {
      wordHolder = document.getElementById('hold');
      correct = document.createElement('ul');
  
      for (var i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === "-") {
          guess.innerHTML = "-";
          space = 1;
        } else {
          guess.innerHTML = "_";
        }
  
        geusses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
      }
    }
    
    // Show lives
     comments = function () {
      showLives.innerHTML = "You have " + lives + " lives";
      if (lives < 1) {
        showLives.innerHTML = "Game Over";
      }
      
      for (var i = 0; i < geusses.length; i++) {
        if (counter + space === geusses.length) {

          showLives.innerHTML = "You Win!";

          var catagoryIndex = categories.indexOf(chosenCategory);
          hintIndex = chosenCategory.indexOf(word);

          var cSong =  songs [hintIndex];
          audioElement.setAttribute("src", cSong);
          audioElement.play();    

          var myImage = document.getElementById("gameImg");
          myImage.setAttribute("width", "400");
          myImage.setAttribute("height", "400");          
          var cImage =  artistImages [hintIndex];
          myImage.setAttribute("src", cImage);
        }
      }
    }
  
  // OnClick Function
  check = function () {
    list.onclick = function () {
    var geuss = (this.innerHTML);
    this.setAttribute("class", "active");
    this.onclick = null;
    for (var i = 0; i < word.length; i++) {
      if (word[i] === geuss) {
        geusses[i].innerHTML = geuss;
        counter += 1;
      } 
    }
    
    var j = (word.indexOf(geuss));
    if (j === -1) {
      lives -= 1;
      comments();
      animate();
    } else {
      comments();
    }
    }
  }
         
    // Play
    play = function () {
      categories = [[ "madonna", "michael-jackson"]];
      chosenCategory = categories[Math.floor(Math.random() * categories.length)];
      console.log("chosen category",chosenCategory);

      word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
      console.log("word", word);
      
      word = word.replace(/\s/g, "-");
      console.log("word after replace", word);

      buttons();
      geusses = [ ];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      selectCat();
    }
  
    play();
    
    // Hint
       hint.onclick = function() {
         hints = [["Like a Prayer", "Billie Jean"]];
  
      var catagoryIndex = categories.indexOf(chosenCategory);
      hintIndex = chosenCategory.indexOf(word);
      showClue.innerHTML = "Clue: " +  hints [catagoryIndex][hintIndex];
    };
  
     // Reset
    document.getElementById('reset').onclick = function() {
      audioElement.pause();
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      showClue.innerHTML = "";
      var myImage = document.getElementById("gameImg");    
      myImage.setAttribute("src", "assets/images/game.jpg");      
      play();
    }
  };