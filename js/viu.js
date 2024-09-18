///the line of every text
let line;
let linesArray;
let content = "";

function drawLines() {
    //size of playground
    let playSize = document.getElementById("playground").offsetHeight;
    console.log("playsize = " + playSize);
    console.log("screen heigh= " + screen.availHeight);

    let scrSize = Math.ceil(screen.availHeight * 0.70) / 28;

    line = document.getElementById("editor");
    for(let i=0; i<=scrSize ; i++) {
        line.innerHTML += "<input autocomplete=\"off\" class=\"lineC\" type=\"text\" tabindex=\"" + i + "\" id=\"line" + i + "\" />";
    }
    focusEditor();
}

function focusEditor() {
    //focuses the first line
    linesArray = document.querySelectorAll(".lineC");
    //adds the event listener
    for (let j = 0; j<linesArray.length; j++) {
        linesArray[j].addEventListener("keydown", focusNextLn);
        linesArray[j].myParam = j;
    }
    linesArray[0].focus();
    prevFocus = linesArray[0];

    
}
function focusNextLn(event){
    let lineNumber = event.currentTarget.myParam

    if(event.key == "Enter" || event.keyCode == 40) {
        //currentFocus = linesArray[lineNumber + 1];
        prevFocus = linesArray[lineNumber+1]; 
        linesArray[lineNumber + 1].focus();
        
    }
    else if (event.keyCode == 38 &&  lineNumber > 0) {
        linesArray[lineNumber - 1].focus();
    }
}

//write mode
let writeMode = true;

document.addEventListener("keydown", changeMode, false);
let msgBox = document.getElementById("mode");
let currentFocus, prevFocus;


//change editor mode with the ESC key
function changeMode(event) {
    
    if(event.key === "Escape" && writeMode == true) {
        writeMode = !writeMode;
        msgBox.textContent = "Write mode= " + writeMode;
        commandBox.focus();
    }
    else if(event.key === "Escape" && writeMode == false) {
        writeMode = !writeMode;
        msgBox.textContent = "Write mode= " + writeMode;
        prevFocus.focus();   
    }
}

//save input to file
let commandBox = document.getElementById("cool-cmd");
commandBox.addEventListener("keydown", executeCMD);

function executeCMD(event){
    let cmd = commandBox.value;
    msgBox.textContent = "Write a commamd";

    if(event.key === "Enter") {
        if(cmd.charAt(0) == 'w' || cmd.charAt(0) == 'W') {
            msgBox.textContent = "thats righhhhhhhht";
            downloadFile(getFileName(cmd));
            
        }
        else {
            msgBox.textContent = cmd.charAt(0);
        }
    }
}

function downloadFile(inputText) {
    const element = document.createElement('a');
    for (let j = 0; j<linesArray.length;j++) {
        content += linesArray[j].value + "\n";
    }
    const blob = new Blob([content], {type: 'plain/text'});
    const fileURL = URL.createObjectURL(blob);

    //asets the values for the attribute on the specified element
    element.setAttribute('href', fileURL);
    element.setAttribute('download',inputText);
    element.style.display='none';
    //appends it and automatically destroys it
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function getFileName(value) {
    value = value.replace(/\s+/g, '');
    value = value.substring(1);
    console.log(value);
    return value;
}


window.addEventListener("load", drawLines, false);