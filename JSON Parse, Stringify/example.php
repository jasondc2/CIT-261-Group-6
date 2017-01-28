<!doctype html>
<?php include "../includes/header.php" ?>
<script type="text/javascript" src="script.js"></script>
<div id="content">
	<div class="row">
		<a class="btn" href="index.php">Go Back</a>
		<h1>JSON Parse and Stringify</h1>
		<div>
			<div class="row">
				<h2>Parse</h2>
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
				<h3>Example</h3>
				<div id="stringInfo">
				</div>
			</div>
		</div>
		<script>loadJson()</script>
	</div>
</div>
<?php include "../includes/footer.php" ?>
