//setting up grid
var colums = 4;
var rows = colums;
var w,h;
var neighbors = [];
var openSet = {};
var closedSet = [];
var grid = [];
var testset = [];
var start = [0,0];
var end = [colums-1,rows-1];
current = [];


//grid object
function Spot(i,j){
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.blocks = false;
    this.cameFrom = null;


    this.show = function(color){
        
        if (this.x == start[0] & this.y == start[1]){
            fill('blue');
        }else if (this.x == end[0] & this.y == end[1]){
            fill('blue')
        }else{
            fill(color);
        }

        stroke(0);
        rect(this.x*w,this.y*h,w-1,h-1);
    }
}


//tests if a coordinate exists
function cordsExists(array,x,y){
    if (array[x] != null){
        if (array[x][y] != null){
            return true
        }else{
            return false}}
    else{
        return false}
}

function sleep(seconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < seconds*1000);
  }

function addNeighbors(x,y){
    var i = x;
    var j = y;

    if (i < colums-1){
        neighbors.push(grid[i+1][j]);
    }
    if  (i > 0){
        neighbors.push(grid[i-1][j]);
    }
    if (j < rows-1){
        neighbors.push(grid[i][j+1]);
    }
    if (j > 0){
        neighbors.push(grid[i][j-1]);
    }
}

function getDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}


function setup(){
    
    createCanvas(1000,1000);
    console.log('ASTAR');

    w = width / colums;
    h = height / rows;

    for (var i = 0; i < colums; i++){
        grid[i] = []
        for (var j = 0; j < rows; j++){
            grid[i][j] = new Spot(i,j);
            if (floor(random(1,17)) == 3){

                grid[i][j].blocks = true;

            }
            }
    }

    background(0);
    for (var i = 0; i < colums; i++){
        for (var j = 0; j < rows; j++)
            if (grid[i][j].blocks == true){
                grid[i][j].show('red');
            }else{
                grid[i][j].show(255);
            }

    }

    //seting up first node
    current = grid[start[0]][start[1]];
}


var count = 0

function draw(){

if(count == 4){
    console.log(openSet);
    console.log(closedSet);
    Break;
}
count += 1;

    sleep(1);

    if (current.x == end[0] & current.y == end[1])
    {
        console.log(openSet);
        console.log(closedSet);
        Break;
    }

        addNeighbors(current.x,current.y);
    


    for (var i = 0; i < neighbors.length; i++) {
        var each = neighbors[i];


        if (cordsExists(closedSet,each.x,each.y) == false){
            if (cordsExists(openSet,each.x,each.y) == false){
                if (each.blocks == false){

                    if (openSet[each.x] == null){
                        
                        
                        openSet[each.x] = [];

                    }
                    each.cameFrom = current;
                    cameFrom = each.cameFrom;

                    each.h = getDistance(each.x,each.y,end[0],end[1]);
                    each.g = cameFrom.g + 1;
                    each.f = each.g + each.h;


                    openSet[each.x] = {};
                    openSet[each.x][each.y] = each;
                    each.show(color(0,255,0));
                }
            }
        }
    
    }

    if (closedSet[current.x] == null){
        closedSet[current.x] = {};
    }
    closedSet[current.x][current.y] = current;
    current.show(color( 255, 165, 0));

    delete openSet[current.x][current.y];


    //choose next node todo add binary heap
    neighbors = [];
    currentBest = 1000000000;
    for (const [key, value] of Object.entries(openSet)) {
        for (const [key2, value2] of Object.entries(value)) {
            if (value2.f < currentBest){
                current = openSet[key][key2];
                currentBest = value2.f;
            }
        }
    }


}


