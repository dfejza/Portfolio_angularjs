angular.module('myApp').controller('snakegameController', function($scope, $http, $window, loadjson) {
	if($window.json==null){
		loadjson.getItems().then(function(response) { 
          $window.json = response.data; //global json file
      });
	}
	$scope.language = $window.selectedLanguage;


	// Map boundries
	xmax = ymax = 30;
	// Play start location
	xpos = ypos = 15;
	// Direction
	xvel = 0;
	yvel = 1; //default going up
	// Block Size
	blocksize = 20;
	snakeBlockSize = 18;
	// Starting size of snake
	snakeSize = 5;
	// Walls
	walls=false;
	// Make sure only 1 change in velocity per tick
	jobdone = false;
	// food
	foodPos = {};

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	document.addEventListener('keydown', keyPush);
	spawnFood();
	setInterval(gameLoop,1000/15);

	// Snake object
	// Bascially a doubly linked list
	class SnakeSegment {
		constructor(xpos,ypos){
			this.x = xpos;
			this.y = ypos;
			this.next = null;
			this.prev = null;
		}

		setPos(xpos,ypos){
			this.x = xpos;
			this.y = ypos;
		}

		setnext(nextSnakeSegment){
			this.next = nextSnakeSegment;
			this.next.prev = this;
		}

		getTailSegment(){
			var thisSeg = this;
			while(thisSeg.next != null)
			{
				thisSeg = thisSeg.next;
			}
			return thisSeg;
		}
		getNext(){
			return this.next;
		}
	}

	// Create the snake
	let snakeHead = new SnakeSegment(xpos,ypos);
	for(i = 1; i < snakeSize; i++)
	{
		snakeHead.getTailSegment().setnext(new SnakeSegment(xpos,ypos+i));
	}
	
	function keyPush(event){
		// Second conditional ensures the user cant do a 180deg turn
		if(event.keyCode == 37 && xvel != 1 && !jobdone)
		{
			//left arrow
			xvel = -1;
			yvel = 0;
			jobdone = true;
		}
		else if(event.keyCode == 38 && yvel != -1 && !jobdone)
		{
			//up arrow
			xvel = 0;
			yvel = 1;
			jobdone = true;
		}
		else if(event.keyCode == 39 && xvel != -1 && !jobdone)
		{ 
			//right arrow
			xvel = 1;
			yvel = 0;
			jobdone = true;
		}
		else if(event.keyCode == 40 && yvel != 1 && !jobdone)
		{
			 //down arrow
			 xvel = 0;
			 yvel = -1;
			 jobdone = true;
			}
		}

		function spawnFood(){
			xposition = Math.floor((Math.random() * xmax));
			yposition = Math.floor((Math.random() * ymax));

			foodPos.x = xposition;
			foodPos.y = yposition;
		}

		function resetGame(){
		// Play start location
		xpos = ypos = 10;
		// Direction
		xvel = 0;
		yvel = 1; //default going up
		// Starting size of snake
		snakeSize = 5;

		// Create the snake
		snakeHead = new SnakeSegment(xpos,ypos);
		for(i = 1; i < snakeSize; i++)
		{
			snakeHead.getTailSegment().setnext(new SnakeSegment(xpos,ypos+i));
		}

	}

	function gameLoop(){
		// Allow user input again
		jobdone = false;
		
		// Fill brackground
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw the food
		ctx.fillStyle = "#ffb6c1";
		ctx.fillRect(foodPos.x*blocksize, foodPos.y*blocksize, snakeBlockSize, snakeBlockSize);

		// Create the snake head
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(snakeHead.x*blocksize, snakeHead.y*blocksize, snakeBlockSize, snakeBlockSize);

		// Firt draw the snake, then update the pos
		// Update the snake position
		tail = snakeHead.getTailSegment();
		while(tail.prev != null){
			ctx.fillRect(tail.x*blocksize, tail.y*blocksize, snakeBlockSize, snakeBlockSize);
			tail.x = tail.prev.x;
			tail.y = tail.prev.y;
			tail=tail.prev;
		}

		// check if the food was eaten
		if((snakeHead.x == foodPos.x) && (snakeHead.y == foodPos.y))
		{
			tailseg = snakeHead.getTailSegment();
			tailseg.setnext(new SnakeSegment(tailseg.x-xvel,tailseg.y-yvel));

			spawnFood();
		}

		// Update the position
		snakeHead.x+=xvel;
		// Y is inverted by nature
		snakeHead.y-=yvel;

		// Colision detection of self
		nextSeg = snakeHead.next;
		while(nextSeg != null)
		{
			if((snakeHead.x == nextSeg.x) && (snakeHead.y == nextSeg.y))
			{
				alert("game over");
				resetGame();
				break;
			}
			nextSeg = nextSeg.next;
		}

		// What happens when boundries are hit
		if(walls){
			if(snakeHead.x == -1 || snakeHead.x == xmax+1 || snakeHead.y == -1 || snakeHead.y == ymax+1)
			{
				alert("game over");
				resetGame();
			}
		}
		else
		{
			if(snakeHead.x < 0)
				snakeHead.x = xmax-1;
			if(snakeHead.x >= xmax)
				snakeHead.x = 0;
			if(snakeHead.y < 0)
				snakeHead.y = ymax-1;
			if(snakeHead.y >= ymax)
				snakeHead.y = 0;
		}
	}
});