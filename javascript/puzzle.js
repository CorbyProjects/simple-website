var puzzle = puzzle || [];

(function () {
	
	/* var canvas = document.getElementById('puzzleArea');
	var context = canvas.getContext('2d');
	context.fillStyle = "green";
	context.fillRect(20,20, canvas.width-40, canvas.height-40); */
	
	var svgCanvas = document.getElementById("svgArea");
	
	// rectangle
	function addRect () {
		
		var rect = document.createElement("rect");
		rect.setAttribute("x", 20);
		rect.setAttribute("y", 20);
		rect.setAttribute("width", 100);
		rect.setAttribute("height", 100);
		rect.setAttribute("stroke", "blue");
		rect.setAttribute("fill", "yellow");
		svgCanvas.appendChild(rect);
	}
	
	function moveRect () {
		
	}
	
	function delRect () {
		
	}
	
	// circle
	function addCircle () {
		
		var circ = document.createElement("circle");
		circ.setAttribute("cx", 20);
		circ.setAttribute("cy", 20);
		circ.setAttribute("r", 100);
		circ.setAttribute("stroke", "blue");
		circ.setAttribute("fill", "yellow");
		svgCanvas.appendChild(circ);
	}
	
	document.getElementById("addRect").addEventListener("click",addRect);
	document.getElementById("addCirc").addEventListener("click",addCircle);
	
}) ()