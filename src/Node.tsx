import React from "react";
import './Node.css';

interface NodeType {
    i: number;
    j: number;
    f: number;
    g: number;
    h: number;
    previous: (NodeType | null);
    isWall: boolean;
  }

export default function Node(props: { start: any; end: any; i: number; j: number; path: NodeType[]; }){

    const {start,end,i,j,path} = props;




    // console.log(path)
    const isStart = start[0] === i && start[1] === j;
    const isEnd = end[0] === i && end[1] === j;
    let isPath = false;
    path.forEach((p: NodeType) => {
        if(p.i === i && p.j === j){
            isPath = true;
        }
    });
    
    const className = isStart ? 'node node-start' : isEnd ? 'node node-end' : isPath ? 'node node-path' : 'node';
    const style = {
        backgroundColor: isStart ? 'green' : isEnd ? 'red' : isPath ? 'blue' : 'white',
        border: '1px solid black'
    }
    return (
        <div className={className} style={style}>
            
        </div>
    )
}