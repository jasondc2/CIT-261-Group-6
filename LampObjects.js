// JavaScript Document
function Lamp(name, price, type, wattage, image, description){
	this.name = name;
	this.price = price;
	this.type = type;
	this.image = image;
	this.description = description;
}
Lamp.prototype.populate = function(item){
	item.getElementById("lamp_name").innerHTML = this.name;
	item.getElementById("lamp_price").innerHTML = this.price;
	item.getElementById("lamp_image").innerHTML = this.image;
	item.getElementById("lamp_type").innerHTML = this.type;
	item.getElementById("lamp_description").innerHTML = this.description;
}