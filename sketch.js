var hypnoticBall,hypnoticBallImg,database;
var position;
var bgImg;

function preload(){
  hypnoticBallImg= loadAnimation("balloon1.png","balloon2.png","balloon3.png")
  bgImg=loadImage("bgImg.webp")
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.addAnimation("balloon",hypnoticBallImg)
  //hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("bgImg");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  
  database.ref('ball/position').set({
    x:hypnoticBall.x + x,
    y:hypnoticBall.y + y
  })

}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
