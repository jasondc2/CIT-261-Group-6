var holder = document.getElementsByClassName("inside_shrink");
var galleryItems = new Array(holder.length);
var which = 0;
var resized = false;
var boxSize;
var largeBoxSize;
var windowX = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;;
var windowY = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;;
window.addEventListener("resize", function(){
	resized = true;
	windowX = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;
	windowY = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	start();
	if(windowX < 481){
			window.addEventListener("scroll", removeTop);
	}
});
if(windowX < 481){
		window.addEventListener("scroll", removeTop);
}
for(var i = 0; i < holder.length; i++){
	galleryItems[i] = holder[i].getElementsByClassName("gallery_item");
}
var galItemPosX = 0;
var galItemPosY = 0;
var myIndex = 0;
start();
carousel();
function removeTop(){
	if(document.body.scrollTop > 115){
		document.getElementById("header").style.display = "none";
	}
	else{
		document.getElementById("header").style.display = "block";
	}
}
function moveGallery(n){
	if(n == 0){
		if(which == 1){
			holder[1].style.left = "-150%";
			holder[0].style.left = "0px";
			which = 0;
		}else{
			holder[0].style.left = "150%";
			holder[1].style.left = "0px";
			which = 1;
		}
	}
	else if(n == 1){
		if(which == 1){
			holder[1].style.left = "-150%";
			holder[0].style.left = "0px";
			which = 0;
		}else{
			holder[0].style.left = "150%";
			holder[1].style.left = "0px";
			which = 1;
		}
	}
}
function getBig(x) {
    x.style.height = largeBoxSize + "px";
    x.style.width = largeBoxSize + "px";
    x.style["boxShadow"] = "0px 0px 30px 3px rgba(255,242,0,1)";
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
	x.style.zIndex = 55;
}

function getNorm(x) {
    x.style.height = boxSize + "px";
    x.style.width = boxSize + "px";
    x.style["boxShadow"] = "";
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
	x.style.zIndex = 2;
}

function start(){
	holder[0].style.left = "";
	holder[0].style.display = "";
	holder[0].style["transition"] = "all 2s linear";
	holder[1].style["transition"] = "all 2s linear";
	for(var j = 0; j < holder.length; j++){
		var count = 1;
		var temp;
		if(windowX < 481){
			temp = ((windowX * 0.75)/5);
			boxSize =  temp - 10;
			largeBoxSize = boxSize * 1.15;
		}
		else{
			temp = ((windowX * 0.6)/5);
			boxSize = temp - 20;
			largeBoxSize = boxSize * 1.15;
		}
		console.log("Temp = " + temp + " boxSize = " + boxSize);
		for(var i = galleryItems[j].length - 1; i != -1; i--){
			galleryItems[j][i].firstChild.style.height = boxSize + "px";
			galleryItems[j][i].firstChild.style.width = boxSize + "px";
			galleryItems[j][i].style["boxShadow"] = "";
			if((i + 1) % 5 == 0 && (i + 1) != galleryItems[j].length){
				galItemPosY += temp;
				galItemPosX = 0;
				count++;
			}
			galleryItems[j][i].style.left = galItemPosX + "px";
			galleryItems[j][i].style.top = galItemPosY + "px";
			galItemPosX += temp;
			galleryItems[j][i].style.WebkitTransitionDuration = "1s"; 
			galleryItems[j][i].style.transitionDuration = "1s";
			galleryItems[j][i].style.zIndex = 2;
		}
		var amount = count * temp;
		holder[j].parentElement.parentElement.style.height = amount + "px";
		galItemPosX = 0;
		galItemPosY = 0;
	}
	if(!resized){
		var content = document.getElementsByClassName("content");
		for(var i = 0; i < content.length; i++){
			if(i === 0){
				hideHelper(i,0);
			}else{
				content[i].style.display = "none";
			}
		}
	}
}
function carousel() {
    var i;
    var x = document.getElementsByClassName("slides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 5000);
}
function pages(n){
	var content = document.getElementsByClassName("content");
	for(var i = 0; i < content.length; i++){
		if(i === n){
			hideHelper(i,0);
		}else{
			hideHelper(i,1);
		}
	}
}
function hideHelper(i,n){
	var content = document.getElementsByClassName("content");
	document.body.style.overflowX = "hidden";
	if(n === 1){
		var op = 1;
		var timer = setInterval(function () {
			if (op <= 0.1){
				clearInterval(timer);
				content[i].style.display = 'none';
			}
			content[i].style.opacity = op;
			content[i].style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.1;
		}, 15);
	}
	else{
		var op = 0.1;
		content[i].style.display = 'block';
		var timer = setInterval(function () {
			if (op >= 1){
				clearInterval(timer);
			}
			content[i].style.opacity = op;
			content[i].style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.1;
		}, 15);
	}
	document.body.style.overflowX = "";
}