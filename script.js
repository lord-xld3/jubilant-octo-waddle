const caseLower = "abcdefghijklmnopqrstuvwxyz"
const caseUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const validNums = "1234567890"
const validSymbols = "!@#$%^&*()_+-=/\\[]{}?.,><:;'"
const mainInterface = document.getElementById("inputInterface")
const generateBtn = document.querySelector("#generate")
const passwordText = document.querySelector("#password")
generateBtn.addEventListener("click",parseInput)

function parseInput(){
  var inputLength = document.getElementById("pwLength")
  if (inputLength.value<1 || inputLength.value>16){
    alert("Length must be between 1 and " + 16)
  }
  var useBin = document.getElementById("useBin")
  var useHex = document.getElementById("useHex")
  var useLower = document.getElementById("useLower")
  var useUpper = document.getElementById("useUpper")
  var useSymbols = document.getElementById("useSymbols")
  var useNums = document.getElementById("useNums")

  var selectedArray=(useBin.checked)?"10":(useHex.checked)?validNums + "abcdef":""
  selectedArray+=(useLower.checked)?caseLower:""
  selectedArray+=(useUpper.checked)?caseUpper:""
  selectedArray+=(useSymbols.checked)?validSymbols:""
  selectedArray+=(useNums.checked)?validNums:""
  selectedArray=(selectedArray=="")?validNums:selectedArray
  Array.from(selectedArray)

  if (useBin.checked || useHex.checked) {
    var rngStr=""
    for (t=0; rngStr.length<1+inputLength.value*1; t++){
      rngStr += (Math.floor(Math.random()*(1+inputLength.value*1))+"")
    }
    rngStr=rngStr*1
    var password = (selectedArray=="10")
    ?rngStr.toString(2)
      :(selectedArray=="1234567890abcdef")
    ? rngStr.toString(16)
      :(selectedArray==validNums)
    ? password = rngStr.toString()
      :password
    Array.from(password)
    return passwordText.value = password.slice(1,1+inputLength.value*1)
  }
  var password=""
  for(t=0; password.length<inputLength.value; t++){
    password += selectedArray[(Math.floor(Math.random()*(selectedArray.length))+"")]
  }
  return passwordText.value = password
}