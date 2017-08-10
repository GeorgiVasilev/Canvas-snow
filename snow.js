window.onload = function() {
	var canvas = document.getElementById('sky');
	var ctx = canvas.getContext('2d');

	var w = window.innerWidth;
	var h = window.innerHeight;
	canvas.width = w;
	canvas.height = h;

	var mf = 100;//max flakes
	var flakes = [];

	//load trought the empty flakes and apply attributes

	for (var i = 0; i < mf; i++) {
		flakes.push({
			x: Math.random() * w,
			y: Math.random() * h,
			r: Math.random() * 5 + 2, //min of 2px and max of 7px
			d: Math.random() + 1 //density of the flakes
		})
	}

	//draw flakes into canvas
	function drawFlakes(){
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.beginPath();

		for(i = 0; i < mf; i++){
			var f = flakes[i];
			ctx.moveTo(f.x, f.y);
			ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
		}
		ctx.fill();
		moveFlakes();
	}

	//animate the flakes
	var angle = 0;

	function moveFlakes(){
		angle += 0.01;
		for(var i = 0; i < mf; i++){
			var f = flakes[i];
			//update X and Y coordinates for each flake
			f.y += Math.pow(f.d, 2) + 1;
			f.x += Math.sin(angle) * 2;

			//if the snowflake reaches the bottom send a new one to the top 
			if(f.y > h){
				flakes[i] = {
					x: Math.random() * w,
					y: 0,
					r: f.r,
					d: f.d 
				};
			}
		}
	}
	setInterval(drawFlakes, 25);
}