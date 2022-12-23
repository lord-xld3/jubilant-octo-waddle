//#region Globals and listeners
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
  var outBox=textTag[0]
  var hashBox=textTag[1]
  generateBtn.addEventListener("click",passwordGenerator) // Generate Password button
  cryptBtn.addEventListener("click",cryptMe) // Crypt button
  inputElements[1].addEventListener("click",hideStringOptions) // Bin
  inputElements[2].addEventListener("click",hideStringOptions) // Hex
  inputElements[3].addEventListener("click",hideStringOptions) // Uni
  inputElements[4].addEventListener("click",showStringOptions) // String
  function hideStringOptions(){stringOptions.style = "display: none;"}
  function showStringOptions(){stringOptions.style = "display: block;"}
//#endregion
function passwordGenerator(){
// Error handling
  let pwLength=document.getElementById("pwLength"); let inputLength=+pwLength.value
  if (inputLength<1 || inputLength>8192){
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
  let password=""; let selectedArray=""; let uniChar=""; outBox.value=""; hashBox.value=""
 
  // Unicode generator between 0000 and FFFF
  if (useUni.checked) { 
    for (t=0; password.length<inputLength*7; t++){
      uniChar=(Math.floor(Math.random()*65535)).toString(16)
      while (uniChar.length<4) {uniChar+="0"}
      password+="&#" + uniChar + ";"
    }
    return outBox.value=password
  }

//Conditional logic on values to determine which character set to use
  selectedArray=(useBin.checked==true)?"10" // =Bin
  :(useHex.checked==true)?validNums+"abcdef":selectedArray // =Hex OR =empty
  if (useBin.checked==false && useHex.checked==false) { // =String
    if (stringLower.checked==true)selectedArray+=caseLower
    if (stringUpper.checked==true)selectedArray+=caseUpper
    if (stringSymbols.checked==true)selectedArray+=validSymbols
    if (stringNums.checked==true)selectedArray+=validNums
    if (selectedArray=="") return alert("Select an option for string")
  }

//Default password generator
  Array.from(selectedArray)
  for(t=0; password.length<inputLength; t++){
    password+=selectedArray[(Math.floor(Math.random()*(selectedArray.length))+"")]
  }
  return outBox.value=password
}
function cryptMe(){
  let unicodeMin=document.getElementById("uniMin"); let uniMin=+unicodeMin.value
  let unicodeMax=document.getElementById("uniMax"); let uniMax=+unicodeMax.value
// Range error handling
  if (uniMin<1 || uniMax<1 || uniMax<=uniMin+1) return alert("Enter valid unicode range for Crypt0r")
  uniDiff=uniMax+uniMin-6809
  if (uniDiff>0){ // Over max range
    if (uniMin>(uniMax-uniDiff)) return alert("Min+Max out of range. Min must be =<" + (6809-uniMax))
    else return alert("Min+Max out of range. Max must be =<" + (uniMax-uniDiff))
  }
 // Clear output
 let outputText=""; let outputHash=""; outBox.value=""
  
//If hash text is empty
  if (hashBox.value.length==0){
    for (i=0; i<textInput.value.length; i++){
    // Random INT16 (34-6809) is a safe range
      hashInt=(Math.floor(Math.random()*uniMax))+uniMin
      xorInt=(textInput.value.charCodeAt(i) ^ hashInt)
      if (xorInt<uniMin || xorInt>uniMax){--i} // Keep hash/output within valid char range
      else{
      // XOR => output
        outputText+=String.fromCharCode(xorInt)
      // Hash => output
        outputHash+=String.fromCharCode(hashInt)
      }
    }
  // Show results
    return outBox.value=outputText,hashBox.value=outputHash
  }

// If hash is longer than input
  else if (hashBox.value.length >= textInput.value.length) { 
    for (i=0; i<textInput.value.length; i++){
    // XOR => output
      outputText+=String.fromCharCode(textInput.value.charCodeAt(i) ^ hashBox.value.charCodeAt(i))
    }
  // Show results
    return outBox.value=outputText
  }

// If hash is shorter than input
  else return alert("Input longer than hash\nIN:" + textInput.value.length + " HASH:" + textHash.value.length)
}