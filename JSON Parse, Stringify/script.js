//main json object
var jsonObj = {
	people : []
};
function addRow(){
	//builds a new row with inputs
	var table = document.getElementById("list");
	var num = table.rows.length;
	var row = table.insertRow(num);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	//dynamic naming for json later
	cell1.innerHTML = '<input id="First' + (num - 1) + '" class="firstName" type="text" onKeyUp="update()"></input>';
	cell2.innerHTML = '<input id="Last' + (num - 1) + '" class="lastName" type="text" onKeyUp="update()"></input>';
	cell3.innerHTML = '<input id="Age' + (num - 1) + '" class="age" type="number" onKeyUp="update()"></input>';
	window.scrollTo(0,document.body.scrollHeight);
}
function update(){
		updateJson();
		stringify();
}
function updateJson(){
	//setup for the for loop
	var table = document.getElementById("list");
	var num = table.rows.length;
	//clears the json for fresh updates
	for(var i = 0; i < num - 1; i++){
		//creates new entry each loop
		var newEntry = {};
		
		//simple check for filled in input then add
		if(document.getElementById("First" + i).value){
			newEntry["firstName"] = document.getElementById("First" + i).value;
		}else{newEntry["firstName"] = "";}
		//simple check for filled in input then add
		if(document.getElementById("Last" + i).value){
			newEntry["lastName"] = document.getElementById("Last" + i).value;
		}else{newEntry["lastName"] = "";}
		//simple check for filled in input then add
		if(document.getElementById("Age" + i).value){
			newEntry["age"] = document.getElementById("Age" + i).value;
		}else{newEntry["age"] = "";}
		//sets each of the people array to equal the newEntry
		jsonObj.people[i] = newEntry;
	}
}
function updateTable(string){
	//Converts the string back into json
	var newObj = JSON.parse(string);
	//setup for the for loop
	var items = newObj.people.length;
	var table = document.getElementById("displayParse");
	
	//clears the table for clean display
	while(table.rows.length > 1){
		table.deleteRow(1);
	}
	
	//builds a dynamic table with json values
	for(var i = 0; i < items; i++){
		var row = table.insertRow(i + 1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		cell1.innerHTML = newObj.people[i].firstName;
		cell2.innerHTML = newObj.people[i].lastName;
		cell3.innerHTML = newObj.people[i].age;
	}
}
function stringify(){
	//stringifies the json to be read or outputted to a file.
	var string = JSON.stringify(jsonObj);
	//places the json that is now a string into the webpage.
	document.getElementById("stringInfo").innerHTML = string;
	updateTable(string);
}
function saveJson(){
	//stringifies the JSON so it can be saved
	var save = JSON.stringify(jsonObj);
	//saves the JSON to the localStorage
	localStorage.setItem("exampleJson", save);
}
function loadJson(){
	//gets the string from the localStorage
	var temp = localStorage.getItem("exampleJson");
	//parses the string into a new JSON object
	var newObj = JSON.parse(temp);
	//sets our object equal to the new object
	jsonObj = newObj;
	//calls the display functions
	stringify();
}
function clearJson(){
	//removes our json object in the localStorage
	localStorage.removeItem("exampleJson");
	//reloads the page for a fresh start.
	location.reload();
}