window.onload=function(){
    
let displayVal="";
let resultVal=""
    
function updateDisplay(str){
    displayVal=str;
}




function add(a,b){
    return a+b;
}

function subtract(a,b){
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

function operate(a,b,opr){
    switch(opr){
        case "+": return add(a,b);break;
        case "-": return subtract(a,b);break;
        case "x" : return multiply(a,b);break;
        case "/" :return divide(a,b); break;
    }
}//exit operate()


}//exit window.onload()