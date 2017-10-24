var sessionID = "Not Set";

var wordToSpell ='dog';

var letterIndex = 0;

var score = 0;

document.onkeyup = function(e) {
  
  
  if (e.keyCode == 13) {
    getBotResponse();
  }
  else if (e.keyCode == 8)
    {
      $('#userInputEcho').children().last().remove();
      letterIndex -= 1;
    }
  else 
    {
      if (event.keyCode >= 65 && event.keyCode <= 90)
    { 
      
      var typedLetterColor;
      if (wordToSpell[letterIndex] == String.fromCharCode(event.keyCode).toLowerCase())
      {
        typedLetterColor = 'green';
      }
      else
        {
           typedLetterColor = 'red';
        }
      var typedLetter = "<span style='color:"+typedLetterColor + ";font-size:96px;'>"+String.fromCharCode(event.keyCode).toLowerCase()+"</span>";
      $('#userInputEcho').append(typedLetter);
      $("#spellingEntered").val('');

      letterIndex += 1;
    }
      else
        {
          $('#errorMessage').html("Please enter the letters one at a time slowly");
          $("#spellingEntered").val('');
          letterIndex = 0;
           $('#userInputEcho').empty();
        }
    
    }
};


function getBotResponse() {
  var queryDetails = {};
  queryDetails["sessionID"] = sessionID;
  queryDetails["wordToCheck"] = wordToSpell;
  var spellingEntered = '';
  var spellingDivList = $('#userInputEcho').children();
  for (var spellingLetterIndex = 0; spellingLetterIndex < spellingDivList.length; spellingLetterIndex++)
    {
    spellingEntered += spellingDivList[spellingLetterIndex].innerHTML;
  }
  console.log(spellingEntered);
  queryDetails["spellingEntered"] = spellingEntered;

  $.ajax({
    url: "/checkSpelling",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(queryDetails),
    success: function(result, status, jqXHR) {
      //console.log(result);
      var response = JSON.parse(result).response;
      //console.log(response.checkResult);
      if (response.checkResult != "Awesome")
         {
          $('#errorMessage').html(wordToSpell);
          score -= 1;
          }
      else 
        {
          score += 1;
           $('#errorMessage').html('');
        }
      console.log("Score is " + score);
      $('#score').html(score);
      wordToSpell = response.newWord;
      sayText(response.checkResult);
      sayText("Can you now spell, ");
      sayText(wordToSpell, 0.5);
       
      $("#spellingEntered").val('');
      letterIndex = 0;
      $('#userInputEcho').empty();
      $('score').html(score);
     
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}

function sayText(textMessage, rate = 1)
{
  
    var msg = new SpeechSynthesisUtterance(textMessage);
      msg.rate = rate;
      msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google US English" })[0];
    window.speechSynthesis.speak(msg);
}

function replayWord()
{
  sayText(wordToSpell, 0.5);
}

window.onload = function() {
  sayText("Do you know how to spell " + wordToSpell);
};
