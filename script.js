var cardColor=[255,225,245];
var cardBorder=[125,190,255];
var textColor=[10,10,20];
var redColor=[203, 66, 51];
var blueColor=[38, 141, 168];
var yellowColor=[212, 194, 167];
var blackColor=[80];
var numWords=16;  //4x4 grid, hopefully easy to make 5x5 later by adjusting this
var words=[];   //all words in bank
var board=[];  //array of objects class is called CARD
var colors;  //array of R's B's I's and 1 A
var rgbColors=[]; //array of actual rgb combos for each element
var boardWords=[];  //25 words on the board
var activated=[]; //will be 16 0's created when words are created, become 1 when tapped
var boardSideValue;  //# of pixels that is height of the rectangular board
var boardWidthValue; //will be 20thirteenths of the boardSideValue later (*20/13)
var widthOfEachCard;
var xValues;
var yValues;
var data;
var wdth;
var hgt;
var redPicking=false;
var bluePicking=false;
var showing=false;
var blueAgent; var blueDouble; var redAgent; var redDouble; var assassin; var bystander; var otherBystander;


function preload(){
  //data=loadTable("Math_Codenames_Word_List.csv",".csv");
  data=loadTable("codemath-words.csv",".csv");
}

function setup(){
  createCanvas(windowWidth-10,windowHeight-10);
  background(230);
  fill(245);
  blueAgent=loadImage('blue_agent.png');
  blueDouble=loadImage('blue_double.png');
  redAgent=loadImage('red_agent.png');
  redDouble=loadImage('red_double.png');
  assassin=loadImage('assassin.png');
  bystander=loadImage('bystander1.png');
  otherBystander=loadImage('bystander2.png');
  if(windowWidth>windowHeight){ 
    boardSideValue=windowHeight-20
    boardWidthValue=int(boardSideValue*(20/13)); 
  }
  else{ 
    boardWidthValue=windowWidth-20;
    boardSideValue=int(boardWidthValue*(13/20));
  }
  rect(5,5,boardWidthValue, boardSideValue,6);
  words=data.getColumn(0);
  boardWords=getBoardWords();  // will get {numWords} words, being written as 16
  colors=generateCodenamesGrid();  //colors now has B's R's Y's A
  for(var p=0; p<colors.length; p++){  //rgbColors mirrors colors with rgb codes for each
    if(colors[p]==="R"){rgbColors.push(redColor);}
    else if(colors[p]==="B"){rgbColors.push(blueColor);}
    else if(colors[p]==="I"){rgbColors.push(yellowColor);}
    else{rgbColors.push(blackColor);}
  }
  xValues=figureX();
  yValues=figureY();
  determineTextSize(38);  
  var counter=0;
  for(var r=0;r<4;r++){
    for(var c=0;c<4;c++){
      board.push(new card(xValues[c],yValues[r],widthOfEachCard,.65*widthOfEachCard,boardWords[counter],counter));
      activated.push(0);
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
  drawBoard();
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
    return cards;
}


function getBoardWords(){
    var tempArray=[];
    var indexes=getDistinctRandomIntegers(numWords, words.length-1);
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
  for(var d=0;d<board.length;d++){
    board[d].drawit(d);
    board[d].drawPic(d);
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
  var spaceToOccupyByCards=boardWidthValue-30   
  widthOfEachCard=spaceToOccupyByCards/4;
  var arr=[];
  for(var b=0;b<5;b++){
    arr.push(10+b*widthOfEachCard+b*4);
  }
  return arr;
}

function figureY(){
  var spaceToOccupyByCards=boardSideValue-30   
  var heightOfEachCard=spaceToOccupyByCards/4;
  var arr=[];
  for(var b=0;b<5;b++){
    arr.push(10+b*heightOfEachCard+b*4);
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

function touchStarted(){
  for(var j=0;j<board.length;j++){
    board[j].tapit();
  }
  return false;
}

function keyTyped() {     //this function will run anytime the user types any key
  if (key === 's'){
    showing=true;
    showColors();
  }
  
  else if (key === 'f'){
    showing=false;
    drawBoard();
  }
}

class card{
  constructor(x,y,w,h,txt,ind){
    this.x=x;this.y=y;this.w=w;this.h=h;this.txt=txt;this.ind=ind;this.rgb=cardColor;
    if(random()>.5){this.picIndicator=1;}
    else{this.picIndicator=0;}
  }

  drawit(indy){
    if(showing){
      if(colors[indy]==="R"){fill(redColor);}
      else if(colors[indy]==="B"){fill(blueColor);}
      else if(colors[indy]==="I"){fill(yellowColor);}
      else {fill(blackColor);}    
    }
    else {fill(this.rgb);}
    stroke(cardBorder);
    strokeWeight(1);
    rect(this.x,this.y,this.w,this.h,3);
    textAlign(CENTER,CENTER);
    fill(textColor);
    noStroke();
    text(this.txt,this.x+this.w/2,this.y+this.h/2);
  }

  tapit(){
    if(mouseX>=this.x&&mouseX<=this.x+this.w&&mouseY>=this.y&&mouseY<=this.y+this.h){
      activated[this.ind]=1;
      this.rgb=rgbColors[this.ind];
      drawBoard();

    }
  }

  drawPic(indy){
    if(activated[indy]===1){
      if(colors[this.ind]==="R"){
        if(this.picIndicator===1){image(redAgent,this.x+2,this.y+2,this.w-4,this.h-4);}
        else{image(redDouble,this.x+2,this.y+2,this.w-4,this.h-4);}
      }
      else if(colors[this.ind]==="B"){
        if(this.picIndicator===1){image(blueAgent,this.x+2,this.y+2,this.w-4,this.h-4);}
        else{image(blueDouble,this.x+2,this.y+2,this.w-4,this.h-4);}
      }
      else if(colors[this.ind]==="I"){
        if(this.picIndicator===1){image(bystander,this.x+2,this.y+2,this.w-4,this.h-4);}
        else{image(otherBystander,this.x+2,this.y+2,this.w-4,this.h-4);}
      }
      else {image(assassin,this.x+2,this.y+2,this.w-4,this.h-4);} 
    }
}
}
