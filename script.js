window.onload=function(){
    
const upper =this.document.querySelector("#entered-text");
const lower = this.document.querySelector("#result-text");

upper.textContent="upper keys";
lower.textContent="lower keys";

let keylog=[];
let digitHolder="";
let answered =false;
let lastAnswer = "";
//numeric buttons
const numBtns = Array.from(this.document.querySelectorAll(".numBtn"));

numBtns.forEach(btn => {btn.addEventListener("click",function(){
    console.log(btn.value);
    addChar(btn.value);
    updateDisplay();
}
)})


//operator buttons
const oprBtns = Array.from(this.document.querySelectorAll(".oprBtn"));

oprBtns.forEach(btn => {
    btn.addEventListener("click", function(){
        if(digitHolder===""){
            console.log("holder empty, invalid")
        }else{
        addEntry(digitHolder);
        addEntry(btn.value);
        updateDisplay();
        }
    })
})

//function buttons
const clrBtn = this.document.querySelector("#btnCLR");
clrBtn.addEventListener("click", clearDisplay);

const delBtn = document.querySelector("#btnDEL");
delBtn.addEventListener("click", deleteChar);

const decBtn = document.querySelector("#btnDEC");
decBtn.addEventListener("click",function(){
    console.log("decimal clicked");
    if(digitHolder==""){
        
        digitHolder+="0.";
    }else if(IsNumeric(digitHolder&&!digitHolder.includes("."))){
        digitHolder+=".";
    }
    updateDisplay();
    })



function IsNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}

//calculate
const calcBtn = document.querySelector("#btnCALC");
calcBtn.addEventListener("click",function(){
    if(digitHolder===""){
        console.log("holder empty, invalid")
    }else if(!answered){
    console.log("calc")
    addEntry(digitHolder);
    updateDisplay();


    
    //operate logic goes here
    calculate(keylog);
    lastAnswer= keylog[0];
    answered=true;
    lower.textContent=lastAnswer;
    
    }
})

function deleteChar(){
    if (digitHolder===""){
        console.log("nothing to delete");
    }else{
       digitHolder= digitHolder.substr(0,digitHolder.length-1);
       console.log(`deleted, new: ${digitHolder}`);
    }
    
    updateDisplay();
}

function clearDisplay(){
    console.log("clear")
    keylog=[];
    digitHolder="";
    lower.textContent="";
    answered=false;
    updateDisplay();
}

function updateDisplay(){
    console.log("update display")
    upper.textContent = formatOutput(keylog) +digitHolder;
;
    
}

function addEntry(str){
    keylog
.push(str);
    digitHolder="";
}

function addChar(char){
    digitHolder+=char;
}


//math functions
function add(a,b){
    return a+b;
}

function minus(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b==0){
        return "err:zero-divide";
    }
    return a/b;
}

function power(a,b){
    return a**b;
}

function operate(a,b,opr){
  a= +a;
  b= +b;
  switch(opr){
      case "ADD": {
          console.log("add");
          return add(a,b);
      }
      case "MINUS":{
          console.log("minus");
          return minus(a,b);
      }
      case "MULTIPLY":{
          console.log("MULTIPLY");
          return multiply(a,b);
      }
      case "DIVIDE":{
          console.log("divide");
          return divide(a,b);
      }
      case "POWER":{
          console.log("power");
          return power(a,b);
      }
  }
}//exit operate()

function calculate(arr){
    console.log("enter calculate()")
    
    while(arr.length>1){
        let index = arr.findIndex(e => (e==="POWER"))
        if(index===-1){
            let index = arr.findIndex(e => (e==="MULTIPLY"||e==="DIVIDE"));
            if(index === -1){

                //if no multiply or div found, find next plus or minus
                let index = arr.findIndex(e => (e==="ADD"||e==="MINUS"));
                console.log(`pre-operation: ${arr}`)
                //if found, carry out operation;
                let result = operate(arr[index-1],arr[index+1],arr[index]);
                console.log(`RESULT: ${result}`);
                arr.splice(index-1,3,result);
                console.log(`post-operation: ${arr}`)

            }else{
                let result = operate(arr[index-1],arr[index+1],arr[index]);
                console.log(`RESULT: ${result}`);
                arr.splice(index-1,3,result);
                console.log(`post-operation: ${arr}`)
            }
        }else{
            let result = operate(arr[index-1],arr[index+1],arr[index]);
                console.log(`RESULT: ${result}`);
                arr.splice(index-1,3,result);
                console.log(`post-operation: ${arr}`)
        }
    }
    console.log("calculate: exit while loop")
}

function formatOutput(arr){
    let optString ="";
    arr.forEach(e =>{
        switch(e){
            case "ADD": {
                optString+=" + ";
                break;
            }
            case "MINUS":{
                optString+=" - ";
                break;
            }
            case "MULTIPLY":{
                optString+=" x ";
                break;
            }
            case "DIVIDE":{
                optString+=" ÷ ";
                break;
            }
            case "POWER":{
                optString+=" ^ ";
                break;
            }
            default:{
                optString+=e+"";
                break;
            }
        }
        
    })
    return optString;
}

}//exit window.onload()