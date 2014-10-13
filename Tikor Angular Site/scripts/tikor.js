<!DOCTYPE html>

<html ng-app>

<head>
	<title>Getting Started</title>
	<script src="lib/angular.min.js"></script>
	<script src="scripts/hellocontroller.js"></script>
</head>

<body>
	<div ng-controller='sayHello'>
	
		<label for "name">Your name:</label>
		<input type="text" id="name" ng-model='name.text'>
		<p>{{name.text}}, how are you?</p>
		




</body>
</html>
