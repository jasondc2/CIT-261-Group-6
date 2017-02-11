
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link type="text/css" rel="stylesheet" href="../style.css" />
<title>CIT 261 - Assignments Page</title>
<script>
	function openMenu(){
		var menu = document.getElementsByClassName("nav")[0];
		var pushDown = document.getElementById("content");
		if(menu.style.display == "block"){
			menu.style.display = "none";
			pushDown.style.marginTop = "25px";
		}
		else{
			menu.style.display = "block";
			pushDown.style.marginTop = "155px";
		}
	}
	function adjust(){
		var menu = document.getElementsByClassName("nav")[0];
		var pushDown = document.getElementById("content");
		if(document.documentElement.clientWidth > 900){
			pushDown.style.marginTop = "25px";
			menu.style.display = "block";
		}else{
			menu.style.display = "none";
			pushDown.style.marginTop = "25px";
		}
	}
</script>
</head>

<body onResize="adjust()">
	<div id="wrap">
		<div id="header">
			<div class="row">
				<div class="mobileNav left" onClick="openMenu()"></div>
				<div class="title left"><h1>CIT 261: Review Page</h1></div>
				<div class="nav right">
					<ul>
						<li><a href="../index.php">Topics</a></li>
					</ul>
				</div>
			</div>
			<div class="clear"></div>
		</div><script>
	//Gets the scores from a xmlhttprequest
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
	if (httpRequest.readyState === 4) {
		if (httpRequest.status === 200) {
			var data = JSON.parse(httpRequest.responseText);
			var sorted = [];
			//moves the json data to a javascript list of objects(kind of the same thing just formated easier)
			for(var i = 0; i < data.length; i++){
				sorted.push(data[i]);
			}
			//sort list from larges score to smallest
			sorted.sort(function(a,b){
				return b.Score - a.Score;
			});
			//add all of the scores to the scoreboard
			document.getElementById("scoreboard").innerHTML += "<br>";
			var x = 10;
			if(sorted.length < 11)
				x = sorted.length;
			for(var i = 0; i < x; i++)
				document.getElementById("scoreboard").innerHTML += (i+1) + ") " + sorted[i].Name + " - " + sorted[i].Score + "<br>";
		}
	}
};
httpRequest.open('GET', "scores.json"); //define file and httprequest type
httpRequest.send();
</script>
<div id="content">
	<div class="row">
		<h1>JavaScript Events</h1>
		<p id="scoreboard"><span>High Scores:<span></p>
		<div>
			<div class="row">
			<p>Unfortunately I will not show examples of all 140 JavaScript Events.</p>
				<h2>The Grid!</h2>
				<div id="grid">
					<div id="instructions" style="display: block;">
						<h1>Are you ready?</h1>
						<p>This is a game built purely from JavaScript. There were many JavaScript events used to build this game. Something to note is that this is extremely hard to play on a mobile device. While it is possible I do not recommend it.</p>
						<ol>
						<li>The idea is to get the highest score possible. Click/Touch and drag any friendly block to get points.</li>
						<li>There will be four friendly blocks possible. The higher the number the faster you will get points.</li>
						<li>Enemy blocks will spawn randomly but the faster you get points the faster enemies spawn so be careful.</li>
							<li>If any block collides or if you release the mouse out of bounds you will lose.</li>
						</ol>
						<p>Good Luck!</p>
						<button id="start" class="btn">Start</button>
					</div>
					<div id="lost" style="display: none">
						<h1>You Lost!</h1>
						<p id="endScore">Your score was: </p>
						<form method="post" action="updateScore.php">
							<p>Whats your name?</p>
							<input class="gameName" name="name" type="text" onkeydown="validate(this)" value="" required>
							<input name="score" id="sendScore" type="hidden" value="" />
							<input class="btn" type="submit" value="Submit Score" />
						</form>
					</div>
					<p id="mousePos">Mouse position is (,).</p>
					<p id="score">Score: Enemies Spawned: </p>
					<div id="boxes" class="box1 box" onTouchStart="move(0)" onMouseDown="move(0)" style="animation-play-state:paused">1</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="script.js"></script>

		<div id="footer">
			<div class="left">
				
			</div>
			<div class="right">
				
			</div>
			<div class="clear"></div>
		</div>
	</div>
</body>
</html>