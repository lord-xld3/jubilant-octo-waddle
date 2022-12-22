//Declare constants and listeners
const caseLower="abcdefghijklmnopqrstuvwxyz"
const caseUpper="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const validNums="1234567890"
const validSymbols=" `~!@#$%^&*()_+-=/\\[]{}?.,><:;\'\""
var inputElements=document.getElementsByTagName("input")
var stringOptions=document.getElementById("inputStringOptions")
var generateBtn=document.getElementById("generate")
var cryptBtn=document.getElementById("crypt")
var textTag=document.getElementsByClassName("outputField")

//All buttons should be "smart"
generateBtn.addEventListener("click",parseInput) // Generate Password button
cryptBtn.addEventListener("click",cryptMe) // Crypt button
inputElements[1].addEventListener("click",hideStringOptions)
inputElements[2].addEventListener("click",hideStringOptions)
inputElements[3].addEventListener("click",hideStringOptions)
inputElements[4].addEventListener("click",showStringOptions) // String option


function hideStringOptions(){
  stringOptions.style = "display: none;"
}

function showStringOptions(){
  stringOptions.style = "display: block;"
}

function parseInput(){
//Error handling
  var inputLength=document.getElementById("pwLength")
  if (inputLength.value<1 || inputLength.value>8192){
    return alert("Length must be between 1 and " + 8192)
  }

//Get values from elements
  var useBin=document.getElementById("useBin")
  var useHex=document.getElementById("useHex")
  var useUni=document.getElementById("useUni")
  var stringLower=document.getElementById("stringLower")
  var stringUpper=document.getElementById("stringUpper")
  var stringSymbols=document.getElementById("stringSymbols")
  var stringNums=document.getElementById("stringNums")
  var password=""
  var selectedArray=""

//Clear existing password from screen
 textTag[0].value=""
 textTag[1].value=""
  
//Unicode generator between 0000 and FFFF
  if (useUni.checked) {
    for (t=0; password.length<inputLength.value*7; t++){
      var uniChar=(Math.floor(Math.random()*65535)).toString(16)
      while (uniChar.length<4) {
        uniChar+="0"
      }
      password+="&#" + uniChar + ";"
    }
    return textTag[0].value=password
  }

//Conditional logic on values to determine which character set to use
  if (useBin.checked==false && useHex.checked==false) {
    selectedArray=(stringLower.checked)?caseLower:""
    selectedArray+=(stringUpper.checked)?caseUpper:""
    selectedArray+=(stringSymbols.checked)?validSymbols:""
    selectedArray+=(stringNums.checked)?validNums:""
  }
  //Bin or Hex used
  (useBin.checked==true)?selectedArray="10":(useHex.checked==true)?selectedArray=validNums+"abcdef":""
  // If nothing is selected use validNums
  if (selectedArray=="") alert("Select an option for string")
  Array.from(selectedArray)

//Default password generator
  for(t=0; password.length<inputLength.value; t++){
    password+=selectedArray[(Math.floor(Math.random()*(selectedArray.length))+"")]
  }
  return textTag[0].value=password
}

/*-------encrypt0r---------
>> input data
% arithmetic
$ function/reference
? conditional logic
<< output data
@ attributes

>> textbox-input::@length>0 && <8192
>> textbox-hash::@length>0 && <8192
>> checkbox::stringOptions
>> button-submit::@goto $cryptMe

$ cryptMe
  % convert textbox-input to integer [textInput]
  % create random integer of length (textbox.length) [hashText]
  % [outputText] == [textInput] XOR [hashText]
  >> outputText,hashText
$

$ decryptMe
  % convert textbox-input to binary/integer [textInput]
  % convert textbox-hash to binary/integer [inputHash]
  % [outputText] == [textInput] XOR [hashText]
  >> outputText
$
*/

function cryptMe(){

  var textInput=document.getElementById("textInput")
  var textHash=document.getElementById("textHash")
  
  // Clear output
  var outputText=""
  var outputHash=""
  textTag[0].value=""
  textTag[1].value=""

  if (textHash.value.length==0){
    // Generate hash
    for (i=0; i<textInput.value.length; i++){
      hashInt=Math.floor((Math.random()*65535)+1) // Random INT16 (1-65535)
      hashStr=hashInt.toString()
      while (hashStr.length<5){
        hashStr+="0"
      }
      outputText+=String.fromCharCode((textInput.value.charCodeAt(i)) ^ (hashInt)) //XOR ^ and assign to output
      outputHash+=String.fromCharCode(hashInt) //Assign hash to string
    }
    textTag[0].value=outputText
    textTag[1].value=outputHash
  }

  else if (textHash.value.length >= textInput.value.length) {
    //Calculate output with hash
    for (i=0; i<textInput.value.length; i++){
      //XOR ^ and assign to output
      outputText+=String.fromCharCode((textInput.value.charCodeAt(i)) ^ (textHash.value.charCodeAt(i)))
    }
    textTag[0].value=outputText
  }

  else return alert("Input longer than hash\nIN:" + textInput.value.length + " HASH:" + textHash.value.length)
}