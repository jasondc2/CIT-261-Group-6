//Lightbulb
function onOff() {
   currentvalue = document.getElementById('onoff').value;
   if(currentvalue == "Off"){
      document.body.style.backgroundColor = "#42413D";
      document.getElementById('onoff').src='Images/lightbulb.jpg'
      document.getElementById("onoff").value = "On";
   }else {
      document.body.style.backgroundColor = "#ffffff";
      document.getElementById('onoff').src='Images/lightbulb2.jpg'
      document.getElementById("onoff").value="Off";
    }
}

//Cart
var cart = {};
initializeCart();
// JavaScript Document
function Lamp(id, name, price, type, image, description){
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.image = image;
    this.description = description;
}
function populate(where, item){
	//item = document.createElement("ol");
    var line = document.createElement("li");
    var line2 = document.createElement("li");
    //item.appendChild(line);
	where.appendChild(line);
	where.appendChild(line2);

	line.innerHTML = "hello";
    /*item.getElementById("lamp_name").innerHTML = this.name;
    item.getElementById("lamp_price").innerHTML = this.price;
    item.getElementById("lamp_image").innerHTML = this.image;
    item.getElementById("lamp_type").innerHTML = this.type;
    item.getElementById("lamp_description").innerHTML = this.description;*/
}
//JSON Lamp Catalog
var catalog;
var itemList = [];
initializeCatalog();

var holder = document.getElementsByClassName("inside_shrink");
var galleryItems = new Array(holder.length);
var which = 0;
var resized = false;
var finished = false;
var boxSize;
var largeBoxSize;
var windowX = document.getElementById("wrap").getBoundingClientRect().width;
var windowY = document.getElementById("wrap").getBoundingClientRect().height;

window.addEventListener("resize", function () {
    "use strict";
    resized = true;
    windowX = document.getElementById("wrap").getBoundingClientRect().width;
    windowY = document.getElementById("wrap").getBoundingClientRect().height;
    start();
    if (windowX < 481) {
        window.addEventListener("scroll", removeTop);
    }
});
if (windowX < 481) {
    window.addEventListener("scroll", removeTop);
}
var galItemPosX = 0;
var galItemPosY = 0;
var myIndex = 0;
start();
window.setTimeout(start, 50);
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
function setCatalog(obj){
	var index = 0;
	catalog = obj;
	for(var lamp in obj){
		itemList[index] = new Lamp(lamp, obj[lamp].Name, obj[lamp].Price, obj[lamp].Type, obj[lamp].Picture, obj[lamp].Description);
		index += 1;
	}
	featuredPopulate();
	pagesPopulate();
	start();
}
function start(){
    holder[0].style.left = "";
    holder[0].style.display = "";
    holder[0].style["transition"] = "all 2s linear";
    holder[1].style["transition"] = "all 2s linear";
	
	for (var i = 0; i < holder.length; i++) {
		galleryItems[i] = holder[i].getElementsByClassName("gallery_item");
	}
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
            galleryItems[j][i].style.height = boxSize + "px";
            galleryItems[j][i].style.width = boxSize + "px";
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
        var op2 = 0.1;
        content[i].style.display = 'block';
        var secondtimer = setInterval(function () {
            if (op2 >= 1){
                clearInterval(secondtimer);
            }
            content[i].style.opacity = op2;
            content[i].style.filter = 'alpha(opacity=' + op2 * 100 + ")";
            op2 += op2 * 0.1;
        }, 15);
    }
    document.body.style.overflowX = "";
}

function initializeCart() {
    if(localStorage.cart) {
        cart = JSON.parse(localStorage.cart);
    }
}

function initializeCatalog() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        "use strict";
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            catalog = JSON.parse(xmlhttp.responseText);
			setCatalog(catalog);
			console.log(catalog);
        }
    };

    xmlhttp.open("GET", "catalog.json", true);
    xmlhttp.send();
}

//Add Item To Cart
function addToCart(id) {
    if (cart[id]) {
        cart[id] += 1;
    }
    else {
        cart[id] = 1;
    }
    saveCartLocal();
}

function removeFromCart(item) {
    delete cart[item];
    saveCartLocal();
    buildCart();
    if (document.getElementById("content_cart").innerHTML == "") {
        document.getElementById("content_cart").innerHTML = "Your shopping cart is empty.";
    }
}

function updateQuantity(item) {
    var itemCount = document.getElementById(item).getElementsByClassName("quantityForm")[0].value;
    if (itemCount < 1) {
        itemCount = 1;
    }
    cart[item] = itemCount;
    saveCartLocal();
    buildCart();
}

function saveCartLocal() {
    localStorage.cart = JSON.stringify(cart);
}

function buildCart() {
    var itemSubtotal = 0,
        subtotal = 0,
        summaryItemCount = 0;

    if (document.getElementById("content_cart").firstChild) {
        dismantleCart();
    }
    for (item in cart) {
		console.log("catalog3", catalog);
        var cartItem = document.createElement("div");
        cartItem.className = "cartItem";
        cartItem.id = item;
        document.getElementById("content_cart").appendChild(cartItem);

        var inside = document.createElement("div");
        inside.className = "inside";
        cartItem.appendChild(inside);

        var itemPic = document.createElement("div");
        itemPic.className = "itemPic";
        inside.appendChild(itemPic);
        itemPic.innerHTML = '<img src="' + catalog[item].Picture + '" alt="' + catalog[item].Name + '" width=200px>';

        var itemName = document.createElement("div");
        itemName.className = "itemName";
        inside.appendChild(itemName);
        itemName.innerHTML = catalog[item].Name;

        var itemDescription = document.createElement("div");
        itemDescription.className = "itemDescription";
        itemName.appendChild(itemDescription);
        itemDescription.innerHTML = catalog[item].Description;

        var itemQuantity = document.createElement("div");
        itemQuantity.className = "itemQuantity";
        itemName.appendChild(itemQuantity);
        itemQuantity.innerHTML = 'Quantity:<br> ' + '<input class="quantityForm" type="number" name="itemQuantity" min="1" width=2 value=' + cart[item] + '>' + '<button onclick="updateQuantity(&quot;' + item + '&quot;)">Update</button>';

        var itemPrice = document.createElement("div");
        itemPrice.className = "itemPrice";
        inside.appendChild(itemPrice);
        itemPrice.innerHTML = '$' + catalog[item].Price;


        var outside = document.createElement("div");
        outside.className = "outside";
        cartItem.appendChild(outside);

        var itemRemove = document.createElement("div");
        itemRemove.className = "itemRemove";
        outside.appendChild(itemRemove);
        itemRemove.innerHTML = 'Remove From Cart ' + '<button onclick="removeFromCart(&quot;' + item + '&quot;)">x</button>';

        summaryItemCount = (parseInt(summaryItemCount) + parseInt(cart[item]));
        itemSubtotal = (parseFloat(cart[item]) * parseFloat(catalog[item].Price));
        subtotal = (parseFloat(subtotal) + parseFloat(itemSubtotal)).toFixed(2);
    }

    var cartSummary = document.createElement ("div");
    cartSummary.id = "cartSummary";
    document.getElementById("content_cart").appendChild(cartSummary);
    cartSummary.innerHTML = '<div id="cartCheckout">(' + summaryItemCount + ' items)<br><button id="checkout">Checkout</button></div><div id="cartSubtotal"> Subtotal<br> $' + subtotal + '</div>';
}

//Close Content - Load Cart
function openCart() {
    var showCart = document.getElementById("content_cart");
    var hideContent = document.getElementsByClassName("content");

    //Hide Content
    for(var i = 0; i < hideContent.length; i++){
        hideContent[i].style.display = "none";
    }

    //Show Cart
    showCart.style.display = "block";
}
function featuredPopulate(){
    for(var i = 0; i < 4; i++){
        createGalleryItem(holder[0], (10 * (i - 1)));
        createGalleryItem(holder[1], ((10 * i) - 9));
        createGalleryItem(holder[0], ((10 * i) - 8));
        createGalleryItem(holder[1], ((10 * i) - 7));
    }
}
function pagesPopulate(){
	for(var j = 0; j < 50; j++){
		console.log(itemList[j].type);
		if(itemList[j].type == "Table")
			createGalleryItem(holder[2], j);
		if(itemList[j].type == "Shade")
			createGalleryItem(holder[3], j);
		if(itemList[j].type == "Floor")
			createGalleryItem(holder[4], j);
		if(itemList[j].type == "Desk")
			createGalleryItem(holder[5], j);
		if(itemList[j].type == "Clip")
			createGalleryItem(holder[6], j);
	}
}
function createGalleryItem(where, n){
    var div = document.createElement("div");
    div.className = "gallery_item";
    populate(div, itemList[n]);
    where.appendChild(div);
}
function dismantleCart() {
    var dismantleCart = document.getElementById("content_cart");
    while (dismantleCart.firstChild) {
        dismantleCart.removeChild(dismantleCart.firstChild);
    }
}
