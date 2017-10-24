var sessionID = "Not Set";

var firstInt = 4;
var secondInt = 6;
var answerToCheck = 10;
var numbersToAdd = '4 + 6';

var letterIndex = 0;

var score = 0;

document.onkeyup = function(e) {
  
  
  if (e.keyCode == 13) {
    checkAnswer();
  }
  else if (e.keyCode == 8)
    {
      $('#userInputEcho').children().last().remove();
      letterIndex -= 1;
    }
  else 
    {
      console.log(event.keyCode);
      var typedNumber = ''
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))
    { 
      
      if (event.keyCode >= 48 && event.keyCode <= 57)
        {
          typedNumber = String.fromCharCode(event.keyCode);
        }
      else
        {
          typedNumber = event.keyCode-96;
        }
      var typedLetterColor;
      if (answerToCheck.toString()[letterIndex] == typedNumber)
      {
        typedLetterColor = 'green';
      }
      else
        {
           typedLetterColor = 'red';
        }  

      var typedLetter = "<span style='color:"+typedLetterColor + ";font-size:96px;'>"+typedNumber.toString()+"</span>";
      $('#userInputEcho').append(typedLetter);

      letterIndex += 1;
    }
    
      else
        {
          $('#errorMessage').html("Please enter the number one at a time slowly");
          letterIndex = 0;
           $('#userInputEcho').empty();
        }
    
    }
};


function checkAnswer() {
  
  var numberEntered = '';
  var numberEnteredDivList = $('#userInputEcho').children();
  for (var numberIndex = 0;  numberIndex < numberEnteredDivList.length;  numberIndex++)
    {
    numberEntered+= numberEnteredDivList [numberIndex].innerHTML;
  }
  console.log(parseInt(numberEntered));
 

  var checkResult = '';        
  if (parseInt(numberEntered) == firstInt + secondInt)
    {
      //console.log(result);
      checkResult = "Awesome";
    }
          
      console.log(checkResult);
      if (checkResult != "Awesome")
         {
          $('#errorMessage').html(firstInt + secondInt);
          score -= 1;
          }
      else 
        {
          score += 1;
           $('#errorMessage').html('');
        }
      console.log("Score is " + score);
      $('#score').html(score);
      numbersToAdd = firstInt.toString() + " + " + secondInt.toString();
      sayText(checkResult);
      sayText("Do you know what is, ");
      sayText(firstInt.toString());
      sayText('plus');
      sayText(secondInt.toString());
       
      letterIndex = 0;
      $('#userInputEcho').empty();
      $('score').html(score);
     
    
  
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
  sayText(firstInt.toString());
  sayText('plus');
  sayText(secondInt.toString());
}

window.onload = function() {
        sayText("Do you know what is, ");
      sayText(firstInt.toString());
      sayText('plus');
      sayText(secondInt.toString());
   $('#score').html(firstInt.toString() + " + " + secondInt.toString());
};
