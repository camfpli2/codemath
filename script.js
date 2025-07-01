var cardColor=[255,225,245];
var cardBorder=[125,100,255];
var words=[];
var board=[];
var boardSideValue;  //# of pixels the square will occupy
var xValues;
var data;
var wdth;
var hgt;
var spaceToOccupyByCards;
var widthOfEachCard;

function preload(){
  data=loadTable("Math_Codenames_Word_List.csv",".csv");
}

function setup(){
  createCanvas(windowWidth-10,windowHeight-10);
  background(240);
  fill(100,150,220);
  if(windowWidth>windowHeight){ boardSideValue=windowHeight-20}
  else{ boardSideValue=windowWidth-20;}
  rect(5,5,boardSideValue, boardSideValue,6);
  words=data.getColumn(0);
  var indexes=getDistinctRandomIntegers(25, words.length-1);
  xValues=figureX();
  for(var r=0;r<5;r++){
    for(var c=0;c<5;c++){
      board.push(new card(xValues[c],xValues[r],widthOfEachCard,widthOfEachCard,words[indexes[r*c]]));
    }
  }
  drawBoard();
  
}

function drawBoard(){
  for(var d=0;d<board.length;d++){
    board[d].drawit();
  }
}

function figureX(){
  spaceToOccupyByCards=boardSideValue-30   // 6 spaces of 5pixels
  widthOfEachCard=spaceToOccupyByCards/5;
  var arr=[];
  for(var b=0;b<6;b++){
    arr.push(10+b*widthOfEachCard+b*5);
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
  }

  
}
