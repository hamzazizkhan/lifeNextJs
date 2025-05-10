'use client';
import { useRef, useEffect } from "react";


function Point(x,y, id){
    this.x = x;
    this.y = y;
    this.status = 0;
    this.id = id;
    this.neighs = [];
    this.color = "rgba(59, 224, 26, 0.68)";
    this.point = [x, y];

    this.draw = function(){
        if(this.status===1){
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, 1, 1);
            ctx.fill();
            // log('pt',pt);
        }
    }
    // number of living cells around cell in 8 neighborhood
    this.lives = function() {
        let live = 0;
        for (neigh of this.neighs){
            curr = points[neigh];
            // log('this', this);
            if (curr.status===1){
                live++;
            }
        }
        return live;
    }
    // changes status f cell in nieghborhood
    this.changeStatus = function(){
        let live = this.lives();
        // log('live', live, this.x, this.y);

        if (this.status===1){
            if (live<2){
                const status = 0;
                return status;
            }
            else if (live>=2 && live<=3){
                return 1;
            }
            else if (live>=3){
                const status = 0;
                return status;
            }
            }else{
            if (live>=3){
                const status = 1;
                return status;
            }
        }
    }
    // status = 1, < 2 alive, status = 0
    // status = 1, >= 2 <= 3 alive, status = same
    // status = 1, >= 3 alive, status = 0
    // status = 0, >= 3 alive, status = 1
}

// initial config - blinker
function blinker(centroidptIndex, points){
    points[centroidptIndex-1].status = 1;
    points[centroidptIndex].status = 1;
    points[centroidptIndex+1].status = 1;
}

function findCentroidPoint(points, gridDimensions){
    for (let pt =0;pt<  points.length; pt++){
        if (points[pt].x===gridDimensions.centroidx && points[pt].y===gridDimensions.centroidy){
            return pt;    
        }
    }
    
}

const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [-1, -1], [1, -1], [-1, 1], [1, 1]]  // up, down, right, left, bottom left, bottom right, top left, top right

// gives you the index of the matching point in points list
function findIndex(x,y, points){
    for (ptID in points){
        const x1 = points[ptID].point[0];
        const y1 = points[ptID].point[1];
        if (x1===x && y1===y){
            return ptID;
        }
    }
    return null;
}

function populate(gridDimensions){
    let points = [];
    // populate
    let id = 0;
    for (let i = 0; i < gridDimensions.x; i++) {
        for (let j = 0; j < gridDimensions.y; j++) {
            let point = new Point(i, j, id);
            // log('point', point);
            points.push(point);
            id++;
        }
    }

    //forming neighbours
    for (const pt of points) {
        for (const d of directions) {
            const newPoint = [pt.point[0] + d[0], pt.point[1] + d[1]];

            // checking dimensions
            if (newPoint[0] > gridDimensions.x || newPoint[1] > gridDimensions.y) {
                continue
            } else if (newPoint[0] < 0 || newPoint[1] < 0) {
                continue
            }

            const match = findIndex(newPoint[0], newPoint[1]);
            if (match !== null) {
                pt.neighs.push(match);
            }

        }

    }

    return points;
}

async function execute(initialConfig, points) {
    const centroidptIndex = findCentroidPoint(points);
    if (initialConfig === 0) {
        blinker(centroidptIndex);
    }

    var points2 = [];
    const end = 10;
    for (let i = 0; i < end; i++) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, width, height);
        for (let pt = 0; pt < points.length; pt++) {
            // need two sets of points
            points[pt].draw();
            let statusChange = points[pt].changeStatus();
            points2[pt] = { ...points[pt] };
            points2[pt].status = statusChange;
        }
        points = points2;
        var points2 = [];
        const hello = await sleep(1000);
    }
}
function plotpts(points){
    for (let pt = 0; pt < points.length; pt++) {
        // need two sets of points
        points[pt].draw();
    }
}
//=============================
//globals



//=============================
function startClick(){
        // if (initialConfig===0){
        //     blinker(findCentroidPoint(points))
        // }
        console.log('button click ran');
}

function StartButton({startClick}){
    const button = <button onClick={startClick}> start </button>
    return button;
}


function AnimationBox(){
    const box = useRef(null);
    const canvas = <canvas ref={box}></canvas>;
    const canvasSize = 0.20;
    const size = 50;
    
    useEffect(
        ()=>{
            const canvas = box.current;
            const ctx = canvas.getContext('2d');

            ctx.scale(size, size);
            canvas.width = window.innerWidth - (canvasSize * window.innerWidth);
            canvas.height = window.innerHeight - (canvasSize * window.innerHeight);
            const width = canvas.width;
            const height = canvas.height;
            const scaledWidth = Math.floor(width / size);
            const scaledHeight = Math.floor(height / size); 
            const gridDimensions = {
                x: scaledWidth - 1,
                y: scaledHeight - 1,
            };
            gridDimensions.centroidx = Math.floor(gridDimensions.x / 2);
            gridDimensions.centroidy = Math.floor(gridDimensions.y / 2);
            

            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, width, height);
            ctx.fill();

            const points = populate(gridDimensions);
            const centroidptindex = findCentroidPoint(points, gridDimensions);
            blinker(centroidptindex, points);
            // plotpts(points);

        }
        ,[]);

    return canvas;
}

export default function Golpage(){
    return (
        <div>
            <p> this is the conway GOL page </p>
            <StartButton startClick={startClick}/>
            <AnimationBox/>            
        </div>
   );
}


/*
default initial config
press start - animataion plays
press stop - animation stops
choose animation menu
*/