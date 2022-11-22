//setting up grid
var colums = 5;
var rows = colums;
var w,h;
var openSet = [];
var closedSet = [];
var grid = new Array()


//grid object
function Spot(i,j){
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function(){
        fill(255);
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

function setup(){
    createCanvas(400,400);
    console.log('ASTAR');

    w = width / colums;
    h = height / rows;

    for (var i = 0; i < colums; i++){
        grid[i] = new Array(rows)
        for (var j = 0; j < rows; j++)
            grid[i][j] = new Spot(i,j);
            
    }
    
    console.log(grid);

}

function draw(){
    background(0);
    for (var i = 0; i < colums; i++){
        for (var j = 0; j < rows; j++)
            grid[i][j].show();  
    }
}


///psudocode

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function A_Star(start, goal, h)
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    // This is usually implemented as a min-heap or priority queue rather than a hash-set.
    openSet := {start}

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
    // to n currently known.
    cameFrom := an empty map

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    gScore := map with default value of Infinity
    gScore[start] := 0

    // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how cheap a path could be from start to finish if it goes through n.
    fScore := map with default value of Infinity
    fScore[start] := h(start)

    while openSet is not empty
        // This operation can occur in O(Log(N)) time if openSet is a min-heap or a priority queue
        current := the node in openSet having the lowest fScore[] value
        if current = goal
            return reconstruct_path(cameFrom, current)

        openSet.Remove(current)
        for each neighbor of current
            // d(current,neighbor) is the weight of the edge from current to neighbor
            // tentative_gScore is the distance from start to the neighbor through current
            tentative_gScore := gScore[current] + d(current, neighbor)
            if tentative_gScore < gScore[neighbor]
                // This path to neighbor is better than any previous one. Record it!
                cameFrom[neighbor] := current
                gScore[neighbor] := tentative_gScore
                fScore[neighbor] := tentative_gScore + h(neighbor)
                if neighbor not in openSet
                    openSet.add(neighbor)

    // Open set is empty but goal was never reached
    return failure