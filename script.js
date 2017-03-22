//These functions increase and decrease the image sizes based on mouse over and mouse out
var galleryItems = document.getElementsByClassName("gallery_item");
var galItemPosX = 0;
var galItemPosY = 0;
for(var i = galleryItems.length - 1; i != -1; i--){
    galleryItems[i].style.height = "150px";
    galleryItems[i].style.width = "150px";
    galleryItems[i].style.border = "none"
	console.log((i + 1) % 5 == 0);
	if((i + 1) % 5 == 0 && i+1 != 10){
		galItemPosY += 161;
		galItemPosX = 0;
	}
	galleryItems[i].style.left = galItemPosX + "px";
	galleryItems[i].style.top = galItemPosY + "px";
	galItemPosX += 161;
    galleryItems[i].style.WebkitTransitionDuration = "1s"; 
    galleryItems[i].style.transitionDuration = "1s";
	galleryItems[i].style.zIndex = 22;
}
function getBig(x) {
    x.style.height = "200px";
    x.style.width = "200px";
    x.style.border = "thick solid #FFCE2B"
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
	x.style.zIndex = 55;
}

function getNorm(x) {
    x.style.height = "150px";
    x.style.width = "150px";
    x.style.border = "none"
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
	x.style.zIndex = 22;
}
