var sessionID = "Not Set";

var wordToSpell ='dog';

var letterIndex = 0;

var score = 0;

document.onkeyup = function(e) {
  
  $('#errorMessage').html('');
  if (e.keyCode == 13) {
    getBotResponse();
  }
  else if (e.keyCode == 8)
    {
      $('#userInputEcho').children().eq(letterIndex-1).remove();
      var underScore = "<span style='font-size:96px;'>-</span>";
      $('#userInputEcho').append(underScore);
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
      for(var i = wordToSpell.length; i > letterIndex; i--)
        {
          $('#userInputEcho').children().last().remove();
        }
      
      var typedLetter = "<span style='color:"+typedLetterColor + ";font-size:96px;'>"+String.fromCharCode(event.keyCode).toLowerCase()+"</span>";
      $('#userInputEcho').append(typedLetter);

        for(var i = letterIndex + 1; i < wordToSpell.length; i++)
        {
          var underScore = "<span style='font-size:96px;'>-</span>";
          $('#userInputEcho').append(underScore);
        }

      letterIndex += 1;
    }
      else
        {
          $('#errorMessage').html("Please enter the letters one at a time slowly");
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
      
      sayText(response.checkResult);
      updateWord(response.newWord);

      letterIndex = 0;
      $('#score').html("Score : " + score);
     
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

function updateWord(word)
{
  wordToSpell = word;
  $('#userInputEcho').empty();
  sayText("Can you now spell, ");
  sayText(wordToSpell, 0.5);
  for (var i = 0; i < wordToSpell.length; i++)
{
  var underScore = "<span style='font-size:96px;'>-</span>";
  $('#userInputEcho').append(underScore);
}
  
}

function replayWord()
{
  sayText(wordToSpell, 0.5);
}

window.onload = function() {
  sayText("Do you know how to spell " + wordToSpell);
};
