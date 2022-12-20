const caseLower="abcdefghijklmnopqrstuvwxyz"
const caseUpper="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const validNums="1234567890"
const validSymbols=" `~!@#$%^&*()_+-=/\\[]{}?.,><:;\'\""
const mainInterface=document.getElementById("inputInterface")
const generateBtn=document.querySelector("#generate")
const passwordText=document.querySelector("#password")
generateBtn.addEventListener("click",parseInput)

function parseInput(){
  //Error handling
  var inputLength=document.getElementById("pwLength")
  if (inputLength.value<1 || inputLength.value>3000000){
    alert("Length must be between 1 and " + 3000000)
  }

  //Get values from elements
  var textTag=document.getElementsByClassName("card-body")
  var pTag=document.createElement("p")
  pTag.style = "word-break: break-all;"
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
  if (textTag[0].hasChildNodes()) {
    textTag[0].removeChild(textTag[0].firstChild)
  }
  
  //Unicode generator
  if (useUni.checked) {
    for (t=0; password.length<inputLength.value*7; t++){
      var uniChar=(Math.floor(Math.random()*65535)).toString(16)
      while (uniChar.length<4) {
        uniChar+="0"
      }
      password+="&#" + uniChar + ";"
    }
    pTag.textContent=password
    return textTag[0].appendChild(pTag)
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
  selectedArray=(selectedArray=="")?validNums:selectedArray
  Array.from(selectedArray)

  //Default password generator
  for(t=0; password.length<inputLength.value; t++){
    password+=selectedArray[(Math.floor(Math.random()*(selectedArray.length))+"")]
  }
  pTag.textContent=password
  return textTag[0].appendChild(pTag)
}