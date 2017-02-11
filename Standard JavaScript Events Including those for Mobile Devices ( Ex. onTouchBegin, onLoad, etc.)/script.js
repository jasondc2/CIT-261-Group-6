// JavaScript Document
//Creating Events with Listener
document.getElementById("grid").addEventListener("mousemove", getPos);
document.getElementById("grid").addEventListener("touchmove", getFingerPos);
document.body.addEventListener("mouseup", place);
document.body.addEventListener("touchend", place);

//Global Variables
var x, y, num, numEnemy;
var isDown = false, running = false, started = false;
var score = 0, numEnemySpawned = 0;
var timer, collisionTimer;

//Start Event
document.getElementById("start").onclick=function(e){
	//find your initial enemy cound modifier that is larger than 5
	do{
		numEnemy = Math.floor(Math.random() * 20);	
	}
	while(numEnemy < 5);
	
	//clear the instructions and begin the collision timer
	document.getElementById("instructions").style.display = "none";
	started = true;
	collisionTimer = setInterval(collisionChecker, 100);
};

//while pressed do this
function move(n){
	//check if game has actually been started
	if(started){
		isDown = true;
		num = n;
		//makes sure that there are not multilpe score timers running
		if(running === true){
			clearInterval(timer);
			running = false;
		}
		running = true;
		//Speed of score based on block pressed
		switch(n){
			case 0:
				timer = setInterval(myCounter, 1000);
				break;
			case 1:
				timer = setInterval(myCounter, 500);
				break;
			case 2:
				timer = setInterval(myCounter, 250);
				break;
			case 3:
				timer = setInterval(myCounter, 125);
				break;
		}	
		//start pressed box animation
		var boxes = document.getElementsByClassName("box");
		boxes[n].style.animationPlayState = "running";
	}
}
//Unpressed the mouse or screen
function place(e){
	//makes sure a block was previously pressed before continuing
	if(started && isDown){
		//checks if you are inside the game area if not you lose
		var grid = document.getElementById("grid");
		if(e.target)
			var isInside = grid.contains(e.target);
		if(!isInside){
			reset();
		}
		//Turns off the score and changes animation state to paused
		isDown = false;
		clearInterval(timer);
		timer = null;
		var boxes = document.getElementsByClassName("box");
		boxes[num].style.animationPlayState = "paused";
	}
}
//You lost now the game needs to reset.
function reset(){
	//default the variables
	num = 0;
	isDown = false;
	//display the final score
	var boxes = document.getElementsByClassName("box");
	document.getElementById("score").innerHTML = "Score: " + score;
	//remove all of the boxes 
	var i = boxes.length - 1;
	while(boxes.length >= 1){
		boxes[i].parentNode.removeChild(boxes[i]);
		i--;
	}
	//place a new initial block
	addBox();
	//calls the lost script
	lost();
	//resets the score
	score = 0;
}
//displays and builds the submission element
function lost(){
	started = false;
	document.getElementById("lost").style.display = "block";
	document.getElementById("endScore").innerHTML = "Your score was: " + score;
	document.getElementById("sendScore").value = score;
}
//counter for the score and enemy spawning 
function myCounter() {
	//increase the score by one
	if(isDown)
		score += 1;
	else{
		return false;
	}
	document.getElementById("score").innerHTML = "Score: " + score;
	document.getElementById("score").innerHTML += " Enemies Spawned: " + numEnemySpawned;
	// adds a new box based on the score and number of current boxes
	var list = document.getElementsByClassName("box");
	if((score >= 25 && score) && list.length == 1){
		addBox();
	}
	if((score >= 125 && score < 625) && list.length == 2){
		addBox();
	}
	if((score >= 625 && score < 3125) && list.length == 3){
		addBox();
	}
	//Enemy spawning logic
	if(score % 100 === 0){
		numEnemy += Math.floor(Math.random() * 10);
	}
	var freq = Math.floor(100 / numEnemy);
	if(score % freq === 0){
		spawnEnemy();
	}
}
//gets the position of the mouse
function getPos(e){
	//the event or e is the point where the mouse moved so you can get the x and y position of that
	x = e.clientX;
	y = e.clientY;
	var boxes = document.getElementsByClassName("box");
	//gets the game area
	var rect = document.getElementById("grid").getBoundingClientRect();
	//calculates the adjusted position of the mouse relative to the game area
	var posX = parseInt(x - rect.left) - 25;
	var posY = parseInt(y - rect.top) - 25;
	//move current box to the adjusted position
	if(isDown){
		boxes[num].style.top = ((posY > 449)? 449 : (posY <= 0)? 0 : posY) + "px";
		boxes[num].style.left = ((posX > (rect.width - 51))? (rect.width - 51) : (posX <= 0)? 0 : posX) + "px";
	}
	//display adjusted position
	document.getElementById("mousePos").innerHTML = "Mouse position is (" + parseInt(x - rect.left) + ", " + parseInt(y - rect.top) + ").";
}
//Same as getPos but using finger touches
function getFingerPos(e){
	if(isDown)
		e.preventDefault();		//means the screen wont scroll tell its done.
	var touchobj = e.changedTouches[0]; //gets the correct touch event position
	x = touchobj.clientX;
	y = touchobj.clientY;
	var grid = document.getElementById("grid");
	var boxes = document.getElementsByClassName("box");
	var rect = grid.getBoundingClientRect();
	var posX = parseInt(x - rect.left) - 25;
	var posY = parseInt(y - rect.top) - 25;
	
	if(isDown){
		boxes[num].style.top = ((posY > 449)? 449 : (posY <= 0)? 0 : posY) + "px";
		boxes[num].style.left = ((posX > rect.width - 51)? rect.width - 51 : (posX <= 0)? 0 : posX) + "px";
	}
	document.getElementById("mousePos").innerHTML = "Finger position is (" + parseInt(x - rect.left) + ", " + parseInt(y - rect.top) + ").";
}
//Builds a new enemy box
function spawnEnemy(){
	//creates a div
	var newBox = document.createElement("div");
	//gets the game area bounds
	var rect = document.getElementById("grid").getBoundingClientRect();
	//adds class name and id
	newBox.className = "enemyBox";
	newBox.id = "boxes";
	//Calculates position at the top to place the new block
	var place;
	do{
		place = Math.floor(Math.random() * (rect.width - 50))
	}while(place <= 50);
	newBox.style.left = place + "px";
	//initialized the animation style
	newBox.style.animation = "";
	//adds the enemy to the game area
	document.getElementById("grid").appendChild(newBox);
	//if the box does not have anything in the animation style add the move animation to it.
	var boxes = document.getElementsByClassName("enemyBox");
	for(var i = 0; i < boxes.length; i++)
		if(boxes[i].style.animation != "moveEnemy 10s 1 forwards")
			boxes[i].style.animation = "moveEnemy 10s 1 forwards";
	//setTimeout(numEnemySpawned++, 5000);
	numEnemySpawned++;
}
//adds a friendly to the screen
function addBox(){
	var list = document.getElementsByClassName("box");
	//creates the box and then adds a number, dynamic class name, two event attributes and one style attribute.
	var newBox = document.createElement("div");
	newBox.innerHTML = (list.length + 1);
	newBox.className = "box" + (list.length + 1) + " box";
	newBox.id = "boxes";
	newBox.setAttribute("ontouchstart", "move(" + list.length + ")");
	newBox.setAttribute("onmousedown", "move(" + list.length + ")");
	newBox.setAttribute("style", "animation-play-state:paused");
	//adds box to game area.
	document.getElementById("grid").appendChild(newBox);
}
//collision logic(not very good but it works mostly)
function collisionChecker(){
	var evilBoxes = document.getElementsByClassName("enemyBox");
	var boxes = document.getElementsByClassName("box");
	//loops through both friendly and enemy box lists and checks if they are close to eachother
	for(var i = 0; i < boxes.length; i++){
		for(var j = 0; j < evilBoxes.length; j++){
			if(i != num){		//a box shouldnt collide with itself
				var first = boxes[i].getBoundingClientRect();
				var second = boxes[num].getBoundingClientRect();
				var third = evilBoxes[j].getBoundingClientRect();
				if(calcCollision(first, second) && isDown)
					reset();
				if(calcCollision(third, first) && isDown)
					reset();
			}else{
				var first = boxes[i].getBoundingClientRect();
				var third = evilBoxes[j].getBoundingClientRect();
				if(calcCollision(third, first) && isDown)
					reset();
			}
		}
	}
}
//This calculates the center points of the to objects passed then finds the distance between them
function calcCollision(first, second){
	var x1 = first.left + (first.width/2);
	var y1 = first.top + (first.height/2);
	var x2 = second.left + (second.width/2);
	var y2 = second.top + (second.height/2);
	var comb = (first.width/2) + (second.width/2);
	var dist = Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 ) - 3;
	//if close enough together return true or false
	if(comb > dist){
		return true;
	}else{
		return false;
	}
}
//simple form preventing long names in score board.
function validate(item){
	var str = /^[a-zA-Z0-9]{,16}$/g;
	if(item.value.length > 16){
		temp = item.value;
		document.getElementsByClassName("gameName")[0].value = temp.slice(0, -1);
	}
}