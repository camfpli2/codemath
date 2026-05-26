var cardColor=[255,225,245];
var cardBorder=[125,190,255];
var textColor=[10,50,90];
var words=[];   //all words in bank
var board=[];  //array of objects class is called CARD
var boardWords=[];  //25 words on the board
var boardSideValue;  //# of pixels the square will occupy
var xValues;
var data;
var wdth;
var hgt;
var spaceToOccupyByCards;
var widthOfEachCard;
var redPicking=false;
var bluePicking=false;
var showing=false;

function preload(){
  data=loadTable("Math_Codenames_Word_List.csv",".csv");
}

function setup(){
  createCanvas(windowWidth-10,windowHeight-10);
  background(230);
  fill(245);
  if(windowWidth>windowHeight){ boardSideValue=windowHeight-20}
  else{ boardSideValue=windowWidth-20;}
  rect(5,5,boardSideValue, boardSideValue,6);
  words=data.getColumn(0);
  boardWords=getBoardWords();
  xValues=figureX();
  var counter=0;
  for(var r=0;r<4;r++){
    for(var c=0;c<4;c++){
      board.push(new card(xValues[c],xValues[r],widthOfEachCard,widthOfEachCard,boardWords[counter]));
      counter++;
    }
  }
  assignScreen();
  
}

function startScreen(){   //homescreen with AI generated image (later)
}

function assignScreen(){   //instructs players to hit button once codegivers are not looking
  drawBoard();
}

function showColors(){    //showing who picks what, only codegivers should be looking
  
}

function generateCodenamesGrid() {
    // 1. Create the initial array with exactly the required counts
    const cards = [
        'B', 'B', 'B', 'B', // 4 Blue (Team 1)
        'R', 'R', 'R', 'R', // 4 Red (Team 2)
        'I', 'I', 'I', 'I', 'I', 'I', 'I', // 7 Innocent Bystanders
        'A'                 // 1 Assassin
    ];

    // 2. Fisher-Yates Shuffle Algorithm
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return array;
}


function getBoardWords(){
    var tempArray=[];
    var indexes=getDistinctRandomIntegers(16, words.length-1);
    for(var k=0;k<indexes.length;k++){
      tempArray.push(words[indexes[k]]);
    }
  return tempArray;
}

function determineTextSize(current){
  var allgood=true;
  textSize(current);
  for(var g=0;g<boardWords.length;g++){
    if(textWidth(boardWords[g])>widthOfEachCard){
      allgood=false;
    }
  }
  if(allgood){return current;}
  else{
    var next=current-1;
    determineTextSize(next);
  }
}

function drawBoard(){
  determineTextSize(30);  
  for(var d=0;d<board.length;d++){
    board[d].drawit();
  }
}

// function figureX(){
//   spaceToOccupyByCards=boardSideValue-30   // 6 spaces of 5pixels
//   widthOfEachCard=spaceToOccupyByCards/5;
//   var arr=[];
//   for(var b=0;b<6;b++){
//     arr.push(10+b*widthOfEachCard+b*5);
//   }
//   return arr;
// }



function figureX(){
  spaceToOccupyByCards=boardSideValue-30   
  widthOfEachCard=spaceToOccupyByCards/4;
  var arr=[];
  for(var b=0;b<5;b++){
    arr.push(10+b*widthOfEachCard+b*4);
  }
  return arr;
}

function getDistinctRandomIntegers(d, n) {
  if (d > n + 1 || d < 0) {
    throw new Error("Cannot generate " + d + " distinct integers within the range [0, " + n + "].");
  }
  const result = new Set();
  while (result.size < d) {
    const randomNumber = Math.floor(Math.random() * (n + 1)); // Generates a random integer between 0 and n (inclusive)
    result.add(randomNumber);
  }
  return Array.from(result);
}

class card{
  constructor(x,y,w,h,txt){
    this.x=x;this.y=y;this.w=w;this.h=h;this.txt=txt;
  }

  drawit(){
    fill(cardColor);
    stroke(cardBorder);
    strokeWeight(1);
    rect(this.x,this.y,this.w,this.h,3);
    textAlign(CENTER,CENTER);
    fill(textColor);
    noStroke();
    text(this.txt,this.x+this.w/2,this.y+this.h/2);
  }

  
}
