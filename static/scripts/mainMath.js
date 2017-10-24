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
      $('#userInputEcho').children().eq(letterIndex-1).remove();
     var questionMark = "<span style='font-size:96px;'>?</span>";
      $('#userInputEcho').append(questionMark);
      letterIndex -= 1;
    }
  else 
    {
      console.log(event.keyCode);
      var typedNumber = ''
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))
    { 
      $('#errorMessage').html('');
      if (event.keyCode >= 48 && event.keyCode <= 57)
        {
          typedNumber = String.fromCharCode(event.keyCode);
        }
      else
        {
          typedNumber = event.keyCode-96;
        }
      
      
      for(var i = answerToCheck.toString().length; i > letterIndex; i--)
        {
          $('#userInputEcho').children().last().remove();
        }
      
      var typedLetterColor;
      if (answerToCheck.toString()[letterIndex] == typedNumber.toString())
      {
        typedLetterColor = 'green';
      }
      else
        {
           typedLetterColor = 'red';
        }  

      var typedLetter = "<span style='color:"+typedLetterColor + ";font-size:96px;'>"+typedNumber.toString()+"</span>";
      $('#userInputEcho').append(typedLetter);
      
      for(var i = letterIndex + 1; i < answerToCheck.toString().length; i++)
        {
          var questionMark = "<span style='font-size:96px;'>?</span>";
          $('#userInputEcho').append(questionMark);
        }

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
  if (parseInt(numberEntered) == answerToCheck)
    {
      //console.log(result);
      checkResult = "Awesome";
    }
  else
    {
      checkResult = "Sorry " + firstInt + ' plus ' + secondInt + " is " + answerToCheck;
    }
          
      console.log(checkResult);
      if (checkResult != "Awesome")
         {
          $('#errorMessage').html(firstInt.toString() + " + " + secondInt.toString() + " is " + answerToCheck);
          score -= 1;
          }
      else 
        {
          score += 1;
          $('#errorMessage').html('');
        }
      console.log("Score is " + score);
      $('#score').html("Score : " + score);
      numbersToAdd = firstInt.toString() + " + " + secondInt.toString();
      sayText(checkResult);
      updateProblem();
      

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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function updateProblem()
{

  firstInt = getRandomIntInclusive(1, 10);
  secondInt = getRandomIntInclusive(1, 10);
  $('#userInputEcho').empty();
  sayText("Do you know what is " + firstInt.toString() + ' plus ' + secondInt.toString());
  letterIndex = 0;
  $('#problemText').html(firstInt.toString() + " + " + secondInt.toString());
  answerToCheck = firstInt + secondInt;
    for (var i = 0; i < answerToCheck.toString().length; i++)
{
  var questionMark = "<span style='font-size:96px;'>?</span>";
  $('#userInputEcho').append(questionMark);
}

  
}

window.onload = function() {
  updateProblem();
   
};
