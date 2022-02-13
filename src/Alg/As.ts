interface NodeType {
  i: number;
  j: number;
  f: number;
  g: number;
  h: number;
  previous: NodeType | null;
  isWall: boolean;
}

const removeArray = (array: NodeType[], node: NodeType) => {
  for(let i = array.length-1; i >= 0; i--) {
    if(array[i].i === node.i && array[i].j === node.j) {
      array.splice(i, 1);
      break;
    }
  }
}

function getNeighbors(grid: NodeType[][],node: NodeType) {
  let neighbors = [];
  let i = node.i;
  let j = node.j;

  var rowLimit = grid.length - 1;
  var columnLimit = grid[0].length - 1;

  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, columnLimit); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, rowLimit); y++) {
          if (x !== i || y !== j) {
            neighbors.push(grid[x][y]);
          }
      }
  } return neighbors;
}


const heuristic = (node: NodeType, end: NodeType) => {
  return Math.abs(node.i - end.i) + Math.abs(node.j - end.j);
}
  

const As = (grid: NodeType[][],start: NodeType,end:NodeType) => {
  let openList = [start];
  let closeList: NodeType[] = [];
  let path: NodeType[] = [];

  start.g = 0;
  start.h = heuristic(start, end);
  start.f = start.g + start.h;


  
  while (openList.length > 0) {
    let fScore = 0;
    let currentNode = openList[fScore];

    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        fScore = i;
      }
    }

    if(currentNode === end){
      let temp = currentNode;
      path.push(temp);
      while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      console.log('found');
      return {path}
    }

    removeArray(openList, currentNode);
    closeList.push(currentNode);


    let neighbors = getNeighbors(grid, currentNode);
    neighbors.forEach(neighbor => {
      if(!closeList.includes(neighbor)){
        let gScore = currentNode.g + 1;
        if(!openList.includes(neighbor)){
          openList.push(neighbor);
        }else if(gScore >= neighbor.g){
          return;
        }
        neighbor.g = gScore;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = currentNode;
      }
    });

}
}

export default As;




