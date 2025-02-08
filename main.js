class Node {
  constructor(position, from = null) {
    this.position = position;
    this.from = from;
  }
}

function possibleMoves(start) {
  let positions = [];

  // Array of possible moves from current (start) position, Knight L shape movement pattern
  let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

  for (let i = 0; i < moves.length; i++) {
    
    // Execute move on each axis, x and y
    let x = start[0] + moves[i][0];
    let y = start[1] + moves[i][1];

    // Check if out of bounds movement
    if ((x >= 0 && x <= 7) && (y >= 0 && y <= 7)) positions.push([x, y]);
  }

  // Return array of valid positions after executing each move from the start position
  return positions;
}

function validInputs(start, end) {
  if(!Array.isArray(start) || !Array.isArray(end)) {
    console.log("Both the start and end positions should be of array type.");
    return false;
  } 

  if(start.length !== 2 || end.length !== 2) {
    console.log("Both the start and end arrays must have length 2.");
    return false;
  }

  let combinedArrays = [...start.concat(end)];

  for(let num of combinedArrays) {
    if(num < 0 || num > 7) {
      console.log("Both positions must be inside the boundaries of chess board (between 0 and 7)");
      return false;
    }
  }

  if(start === end) {
    console.log("Start and end are the same position");
    return false;
  }

  return true;
}

function knightMoves(start, end) {
  if (!validInputs(start, end)) return -1;

  // Start queue with the initial position
  let queue = [new Node(start)];

  let path = [];
  let visited = new Set();
  let currentNode;

  while (queue.length > 0) {
    // Next item in queue
    currentNode = queue.shift();

    // Get string of array of position, for easier checks
    let positionString = JSON.stringify(currentNode.position);

    // Checking if current position was already visited
    if(visited.has(positionString)) {
      // If true, move to next queue item
      continue;
    } else {
      // If false, add current position to visited Set
      visited.add(positionString);
    }

    // Possible moves from current position
    let moves = possibleMoves(currentNode.position);

    for(let i = 0; i < moves.length; i++) {

      // If current move corresponds to end position

      if(moves[i].join("") === end.join("")) {

        // Start retracing path taken, starting with end position

        path.push(end);
        
        // Continue with current node, and previous ones back to the start

        while(currentNode) {
          path.push(currentNode.position);
          currentNode = currentNode.from;
        }

        // Get correct order of moves taken

        path.reverse();
       
        return path;

      } else {

        // Make new node from current move
        // Store reference from current node to the new one
        // Push new position to check to queue

        let node = new Node(moves[i], currentNode);
        queue.push(node);
      }
    }
  }

  return "Path not found.";
}

console.log(knightMoves([3,3], [4,3]));