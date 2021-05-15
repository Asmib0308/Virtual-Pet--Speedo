//Create variables here
var dog,happyDog,food,foodStock,db;

function preload(){
	//load images here
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(900, 500);

  dog = createSprite(450,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3

  db = firebase.database()
  foodStock = db.ref('food')
  foodStock.on("value",readStock)
  foodStock.set(20)
}

function draw() {  
  background(46,139,87)

  if(food > 0){

    if(keyWentDown(UP_ARROW)){
      writeStock(food)
      //food = food - 1
      dog.addImage(happyDog)
    }
  }  
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
  

  drawSprites();
  //add styles here

  textSize(25);
  fill("white")
  stroke("black")
  text("Milk Stock: "+food ,360,70)
  text("Press up arrow key to feed the Speedo milk.",200,30)

}

function readStock(data){
  food=data.val();
}

function writeStock(x){
  
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
    console.log(x)
  }
  db.ref('/').update({
    food:x
  })
}

