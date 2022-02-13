import "./App.css";
import { useState } from "react";
import Node from "./Node";
import As from "./Alg/As";

interface NodeType {
  i: number;
  j: number;
  f: number;
  g: number;
  h: number;
  previous: (NodeType | null);
  isWall: boolean;
}

const createNode = (i:number, j:number) => {
  return {
    i: i,
    j: j,
    f: 0,
    g: 0,
    h: 0,
    previous: null,
    isWall: false
  }
};

const grid: NodeType[][] =  [];
for (let i = 0; i < 20; i++) {
  grid[i] = [];
  for (let j = 0; j < 40; j++) {
    grid[i][j] = createNode(i, j);
  }
}

const randomGridItem = () => { 
  const randomI = Math.floor(Math.random() * 20);
  const randomJ = Math.floor(Math.random() * 20);
  return grid[randomI][randomJ];
};

function App() {
  const [start, setStart] = useState(randomGridItem());
  const [end, setEnd] = useState(randomGridItem());
  const [clickCount, setClickCount] = useState(0);
  const [path,setPath] = useState<NodeType[]>([]);

  const handleStart = () => {
    setStart(randomGridItem());
    setEnd(randomGridItem());
    setPath(As(grid,start,end)?.path!);
  }


  const handleReset = () => {
    setStart(randomGridItem());
    setEnd(randomGridItem());
    setPath([]);

  }

  return (
    <div className="App">
      {path.length === 0? <div> <button onClick={handleStart}>
        Start
      </button>
    </div>
    : 
    <div className="Grid">
        {grid.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((node, j) => {
                return (
                  <Node
                    key={j}
                    start={start}
                    end={end}
                    path={path}
                    i={i}
                    j={j}
                  />
                );
              })}
            </div>
          );
        })}
      <button onClick={handleReset}>
        Reset
      </button>
      </div>
}
    </div>
  );
}



export default App;