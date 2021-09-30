const allColorOptions = document.getElementById('allColorOptions');
const color = document.getElementById('color');
const start = document.getElementById('start');
const easy = document.getElementById('easy');
const hard = document.getElementById('hard');
const gameResult = document.getElementById('gameResult');
const RootStyles = document.documentElement.style;
let isGameStarted = false;

easy.addEventListener('click',()=>{
    if(allColorOptions.children.length>3){
        allColorOptions.removeChild(allColorOptions.children[allColorOptions.children.length-1]);
        allColorOptions.removeChild(allColorOptions.children[allColorOptions.children.length-1]);
        allColorOptions.removeChild(allColorOptions.children[allColorOptions.children.length-1]);
        start.click();
    } 
})
hard.addEventListener('click',()=>{
    if(allColorOptions.children.length===3){
        let div=document.createElement('div');
        div.classList.add('gameElement');
        allColorOptions.append(div.cloneNode(true));
        allColorOptions.append(div.cloneNode(true));
        allColorOptions.append(div.cloneNode(true));
        start.click();
    }
})
const getMathRandomInt = (max,min) =>{
    return Math.round(Math.random()*(max-min)+min);
}
let randomElement;
start.addEventListener('click',()=>{
    let colorRed = getMathRandomInt(10,200);
    let colorGreen = getMathRandomInt(10,200);
    let colorBlue = getMathRandomInt(10,200);
    let colorRedCopy = Number(colorRed.toString().slice());
    let colorGreenCopy = Number(colorGreen.toString().slice());
    let colorBlueCopy = Number(colorBlue.toString().slice());
    let colorBoxes = allColorOptions.children;
    (allColorOptions.children.length===3)?randomElement=getMathRandomInt(0,2):randomElement=getMathRandomInt(0,5);
    for(let box of colorBoxes){
        box.style.backgroundColor = `rgb(${colorRedCopy+=getMathRandomInt(-55,55)},${colorGreenCopy+=getMathRandomInt(-55,55)},${colorBlueCopy+=getMathRandomInt(-55,55)})`;
    }
    let correct = colorBoxes[randomElement];
    correct.style.backgroundColor = `rgb(${colorRed},${colorGreen},${colorBlue})`;
    correct.setAttribute('data-correct','data-correct');
    color.textContent = ` the color is : rgb(${colorRed},${colorGreen},${colorBlue})`;
    start.textContent = 'new Colors';
    gameResult.textContent='';
    isGameStarted=true;
    RootStyles.setProperty('--gamebgc',`#333`);
})

allColorOptions.addEventListener('click',(e)=>{
    if(e.target.hasAttribute('data-correct') && e.target.classList.contains('gameElement') && isGameStarted===true){
        e.target.removeAttribute('data-correct');
        start.textContent = 'play again??';
        gameResult.textContent = 'you won!!!!';
        RootStyles.setProperty('--gamebgc',`${e.target.style.backgroundColor}`);
    }
    else if(e.target.classList.contains('gameElement') && !e.target.hasAttribute('data-correct') && !isGameStarted===false){
        gameResult.textContent = 'you missed,keep trying';
    }
})
