//These functions increase and decrease the image sizes based on mouse over and mouse out

function getBig(x) {
    x.style.height = "200px";
    x.style.width = "200px";
    x.style.border = "thick solid #0000FF"
    x.style.WebkitTransitionDuration = "1s"; 
    x.style.transitionDuration = "1s"; 
}

function getNorm(x) {
    x.style.height = "150px";
    x.style.width = "150px";
    x.style.border = "none"
}
