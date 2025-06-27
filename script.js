var cards=[];
var words=[];
var data;

function preload(){
  data=loadTable("Math_Codenames_Word_List.csv",".csv");
}

function setup(){
  createCanvas(400,400);
  background(220);
  words=data.getColumn(0);
  for(var b=0;b<words.length;b++){
    //cards.push(new card())
  }
}



class card{
  constructor(x,y,w,h,txt){
    this.x=x;this.y=y;this.w=w;this.h=h;this.txt=txt;
  }

  
}
