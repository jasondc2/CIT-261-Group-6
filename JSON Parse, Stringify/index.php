<!doctype html>

<?php include "../includes/header.php" ?>
<script type="text/javascript" src="script.js"></script>
<div id="content">
	<div class="row">
		<button class="btn" onClick="loadJson()">Load</button>
		<button class="btn" onClick="saveJson()">Save</button>
		<button class="btn" onClick="clearJson()">Clear</button>
		<a class="btn" href="example.php">New Page Example</a>
		<h1>JSON Parse and Stringify</h1>
		<div>
			<div class="row">
				<h2>Parse</h2>
				<h3>Use</h3>
				<pre><code>
var jsonObj = {
	people : []
};
var string = JSON.stringify(jsonObj);
var newObj = JSON.parse(string);
newObj.person[i]["firstName"];
				</code></pre>
				<h3>Example</h3>
					<table id="displayParse">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Age</th>
						</tr>
					</table>
			</div>
			<div class="row">
				<h2>Stringify</h2>
				<h3>Use</h3>
				<pre><code>
var jsonObj = {
	people : []
};
var string = JSON.stringify(jsonObj);
document.getElementById("hiddenInput").value = string;
				</code></pre>
				<h3>Example</h3>
				<div id="stringInfo">
				</div>
			</div>
			<div class="row">	
				<h2>Update the Json object here</h2>
				<form id="json">
					<table id="list">
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Age</th>	
						</tr>
						<tr>
							<td><input id="First0" class="firstName" type="text" onKeyUp="update()"></input></td>
							<td><input id="Last0" class="lastName" type="text" onKeyUp="update()"></input></td>
							<td><input id="Age0" class="age" type="number" onKeyUp="update()"></input></td>
						</tr>		
					</table>
					<button class="addRow" onClick="addRow()" type="button">+</button>
					<div class="clear"></div>
				</form>
			</div>
		</div>
	</div>
</div>
<?php include "../includes/footer.php" ?>
