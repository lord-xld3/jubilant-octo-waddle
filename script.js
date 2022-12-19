const caseLower = "abcdefghijklmnopqrstuvwxyz"
const caseUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const validNums = "1234567890"
const validSymbols = "!@#$%^&*()_+-=/\\[]{}?.,><:;'"
const mainInterface = document.getElementById("inputInterface")
const generateBtn = document.querySelector("#generate")
const passwordText = document.querySelector("#password")
generateBtn.addEventListener("click",parseInput)

function parseInput(){
  i = document.getElementById("pwLength")
  if (i.value<8 || i.value>16){
    alert("Length must be between 8 and 16")
  }
  j = document.getElementById("useOption")
  k = document.getElementById("stringOption")
selectedArray = (j.value=="useBinary")
    ? "01"
  :(j.value=="useHex")
    ? validNums + "ABCDEF"
    :selectedArray
  switch(k.value){
    case("useLower"):
    selectedArray += caseLower

    case("useUpper"):
    selectedArray += caseUpper

    case("useSymbol"):
    selectedArray += validSymbols

    case("useNums"):
    selectedArray += validNums

    default:
    selectedArray = "test"
  }
  var char
  for (t=0; t<i.value; t++){
    char+=selectedArray[Math.floor(Math.random()*i.value+1)]
  }
  passwordText.value = char
}
  