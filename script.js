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
  if (inputLength.value<1 || inputLength.value>20000000){
    alert("Length must be between 1 and " + 20000000)
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

  //Unicode generator
  if (useUni.checked) {
    for (t=0; password.length<inputLength.value*7; t++){
      var uniChar=(Math.floor(Math.random()*65535)).toString(16)
      while (uniChar.length<4) {
        uniChar+="0"
      }
      password+="&#" + uniChar + ";"
    }
    return passwordText.value = password
  }

  //Conditional logic on values to determine which character set to use
  var selectedArray=(useBin.checked)?"10":(useHex.checked)?validNums + "abcdef":""
  selectedArray+=(stringLower.checked)?caseLower:""
  selectedArray+=(stringUpper.checked)?caseUpper:""
  selectedArray+=(stringSymbols.checked)?validSymbols:""
  selectedArray+=(stringNums.checked)?validNums:""
  selectedArray=(selectedArray=="")?validNums:selectedArray
  Array.from(selectedArray)

  //Optimization for binary/hex/num passwords less than 16 chars long
  if (inputLength.value*1<17 && (useBin.checked || useHex.checked )) {
    var rngStr=""
    for (t=0; rngStr.length<1+inputLength.value*1; t++){
      rngStr+=(Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)+"")
    }
    rngStr=rngStr*1
    var password=(selectedArray=="10")?rngStr.toString(2)
    :(selectedArray=="1234567890abcdef")?rngStr.toString(16)
    :(selectedArray==validNums)?password=rngStr.toString()
    :password
    Array.from(password)
    return passwordText.value = password.slice(1,1+inputLength.value*1)
  }

  //Default password generator
  for(t=0; password.length<inputLength.value; t++){
    password+=selectedArray[(Math.floor(Math.random()*(selectedArray.length))+"")]
  }
  return passwordText.value = password
}