//These functions increase and decrease the image sizes based on mouse over and mouse out
var holder_0 = document.getElementById("inside_shrink");
var holder_1 = document.getElementById("inside_shrink_2");
var which = 0;
holder_0.style.left = "";
holder_0.style.display = "";
holder_0.style["transition"] = "all 2s linear";
holder_1.style["transition"] = "all 2s linear";
var galleryItems_0 = holder_0.getElementsByClassName("gallery_item");
var galleryItems_1 = holder_1.getElementsByClassName("gallery_item");
var galItemPosX = 0;
var galItemPosY = 0;
for(var i = galleryItems_0.length - 1; i != -1; i--){
    galleryItems_0[i].style.height = "150px";
    galleryItems_0[i].style.width = "150px";
    galleryItems_0[i].style["boxShadow"] = "";
	console.log((i + 1) % 5 == 0);
	if((i + 1) % 5 == 0 && i+1 != 10){
		galItemPosY += 161;
		galItemPosX = 0;
	}
	galleryItems_0[i].style.left = galItemPosX + "px";
	galleryItems_0[i].style.top = galItemPosY + "px";
	galItemPosX += 161;
    galleryItems_0[i].style.WebkitTransitionDuration = "1s"; 
    galleryItems_0[i].style.transitionDuration = "1s";
	galleryItems_0[i].style.zIndex = 2;
}
galItemPosX = 0;
galItemPosY = 0;
for(var i = galleryItems_1.length - 1; i != -1; i--){
    galleryItems_1[i].style.height = "150px";
    galleryItems_1[i].style.width = "150px";
    galleryItems_1[i].style["boxShadow"] = "";
	console.log((i + 1) % 5 == 0);
	if((i + 1) % 5 == 0 && i+1 != 10){
		galItemPosY += 161;
		galItemPosX = 0;
	}
	galleryItems_1[i].style.left = galItemPosX + "px";
	galleryItems_1[i].style.top = galItemPosY + "px";
	galItemPosX += 161;
    galleryItems_1[i].style.WebkitTransitionDuration = "1s"; 
    galleryItems_1[i].style.transitionDuration = "1s";
	galleryItems_1[i].style.zIndex = 2;
}
function moveGallery(n){
	if(n == 0){
		if(which == 1){
			holder_1.style.left = "-150%";
			holder_0.style.left = "0px";
			which = 0;
		}else{
			holder_0.style.left = "150%";
			holder_1.style.left = "0px";
			which = 1;
		}
	}
	else if(n == 1){
		if(which == 1){
			holder_1.style.left = "-150%";
			holder_0.style.left = "0px";
			which = 0;
		}else{
			holder_0.style.left = "150%";
			holder_1.style.left = "0px";
			which = 1;
		}
	}
}
function getBig(x) {
    x.style.height = "200px";
    x.style.width = "200px";
    x.style["boxShadow"] = "0px 0px 30px 3px rgba(255,242,0,1)";
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
	x.style.zIndex = 55;
}

function getNorm(x) {
    x.style.height = "150px";
    x.style.width = "150px";
    x.style["boxShadow"] = "";
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
	x.style.zIndex = 2;
}
