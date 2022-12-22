//Declare constants and listeners
const caseLower="abcdefghijklmnopqrstuvwxyz"
const caseUpper="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const validNums="1234567890"
const validSymbols=" `~!@#$%^&*()_+-=/\\[]{}?.,><:;\'\""
const inputElements=document.getElementsByTagName("input")
const stringOptions=document.getElementById("inputStringOptions")
const generateBtn=document.getElementById("generate")
const cryptBtn=document.getElementById("crypt")
const textTag=document.getElementsByClassName("outputField")
const textInput=document.getElementById("textInput")

//All buttons should be "smart"
generateBtn.addEventListener("click",parseInput) // Generate Password button
cryptBtn.addEventListener("click",cryptMe) // Crypt button
inputElements[1].addEventListener("click",hideStringOptions) // Bin
inputElements[2].addEventListener("click",hideStringOptions) // Hex
inputElements[3].addEventListener("click",hideStringOptions) // Uni
inputElements[4].addEventListener("click",showStringOptions) // String
function hideStringOptions(){stringOptions.style = "display: none;"}
function showStringOptions(){stringOptions.style = "display: block;"}

function parseInput(){
// Error handling
  let inputLength=document.getElementById("pwLength")
  if (inputLength.value<1 || inputLength.value>8192){
    return alert("Length must be between 1 and " + 8192)
  }
// Get values from elements
  let useBin=document.getElementById("useBin")
  let useHex=document.getElementById("useHex")
  let useUni=document.getElementById("useUni")
  let stringLower=document.getElementById("stringLower")
  let stringUpper=document.getElementById("stringUpper")
  let stringSymbols=document.getElementById("stringSymbols")
  let stringNums=document.getElementById("stringNums")
  
  // Clear output
  textTag[0].value=""; textTag[1].value=""; 
  let password=""; let selectedArray=""; let uniChar=""; 
 
  // Unicode generator between 0000 and FFFF
  if (useUni.checked) { 
    for (t=0; password.length<inputLength.value*7; t++){
      uniChar=(Math.floor(Math.random()*65535)).toString(16)
      while (uniChar.length<4) {uniChar+="0"}
      password+="&#" + uniChar + ";"
    }
    return textTag[0].value=password
  }

//Conditional logic on values to determine which character set to use
  selectedArray=(useBin.checked==true)?"10" // Bin
  :(useHex.checked==true)?validNums+"abcdef":selectedArray // Hex OR ""
  if (useBin.checked==false && useHex.checked==false) { // String
    if (stringLower.checked==true)selectedArray+=caseLower
    if (stringUpper.checked==true)selectedArray+=caseUpper
    if (stringSymbols.checked==true)selectedArray+=validSymbols
    if (stringNums.checked==true)selectedArray+=validNums
    if (selectedArray=="") return alert("Select an option for string")
  }

//Default password generator
  Array.from(selectedArray)
  for(t=0; password.length<inputLength.value; t++){
    password+=selectedArray[(Math.floor(Math.random()*(selectedArray.length))+"")]
  }
  return textTag[0].value=password
}

function cryptMe(){
// Clear output
  let outputText=""; let outputHash=""; textTag[0].value="" 
  
//If hash text is empty
  if (textTag[1].value.length==0){
    for (i=0; i<textInput.value.length; i++){
    // Random INT16 (34-6809) is a safe range
      hashInt=(Math.floor(Math.random()*6775))+34
      xorInt=(textInput.value.charCodeAt(i) ^ hashInt)
      if (xorInt<34 || xorInt>6809){--i} // Keep hash/output within valid char range
      else{
      // XOR => output
        outputText+=String.fromCharCode(xorInt)
      // Hash => output
        outputHash+=String.fromCharCode(hashInt)
      }
    }
  // Show results
    return textTag[0].value=outputText,textTag[1].value=outputHash
  }

// If hash is longer than input
  else if (textTag[1].value.length >= textInput.value.length) { 
    for (i=0; i<textInput.value.length; i++){
    // XOR => output
      outputText+=String.fromCharCode(textInput.value.charCodeAt(i) ^ textTag[1].value.charCodeAt(i))
    }
  // Show results
    return textTag[0].value=outputText
  }

// If hash is shorter than input
  else return alert("Input longer than hash\nIN:" + textInput.value.length + " HASH:" + textHash.value.length)
}