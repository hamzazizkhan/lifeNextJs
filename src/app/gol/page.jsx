'use client';
import { useState, useRef, useEffect } from "react";


function Point(x,y, id){
    this.x = x;
    this.y = y;
    this.status = 0;
    this.id = id;
    this.neighs = [];
    this.color = "rgba(59, 224, 26, 0.68)";
    this.point = [x, y];

    this.draw = function(ctx){
        if(this.status===1){
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, 1, 1);
            ctx.fill();
            // log('pt',pt);
        }
    }
    // number of living cells around cell in 8 neighborhood
    this.lives = function(points) {
        let live = 0;
        for (const neigh of this.neighs){
            const curr = points[neigh];
            // log('this', this);
            if (curr.status===1){
                live++;
            }
        }
        return live;
    }
    // changes status f cell in nieghborhood
    this.changeStatus = function(points){
        let live = this.lives(points);
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
    for (const ptID in points){
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
    return points;
}

function formNeighs(points, gridDimensions){
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

            const match = findIndex(newPoint[0], newPoint[1], points);
            if (match !== null) {
                pt.neighs.push(match);
            }

        }

    }

}

function sleep(ms) {
    // console.log('sleep');
    return new Promise(resolve => setTimeout(resolve, ms));

}


async function execute(points,  ctx, width, height, end=10) {

    var points2 = [];
    for (let i = 0; i < end; i++) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, width, height);
        for (let pt = 0; pt < points.length; pt++) {
            // need two sets of points
            points[pt].draw(ctx);
            let statusChange = points[pt].changeStatus(points);
            if(statusChange===1){
                // console.log('alive pt found in iter',i, 'pos:', pt.x, pt.y);
            }
            points2[pt] = { ...points[pt] };
            points2[pt].status = statusChange;
        }
        points = points2;
        var points2 = [];
        const hello = await sleep(1000);
        // console.log('im running');
    }
}

function plotpts(points, ctx){
    for (let pt = 0; pt < points.length; pt++) {
        // need two sets of points
        points[pt].draw(ctx);
    }
}



function initPointsConfig(cfg, points, gridDimensions){
    const pos = cfg.positions;
    console.log(cfg.rowCount, gridDimensions, 'rowcount, gridims');
    if(cfg.rowCount>gridDimensions.x){
        throw new Error('map does not fit in canvas plot ');
    }

    console.log('plotting',cfg.name, cfg.mapLink, cfg.rowCount, cfg.positions);
    console.log('pointsARRAY');
    console.log(points)
    for(const p of pos){
        const x = p.x;
        const y = p.y;

        for (const pt of points){
            const match = findIndex(x,y,points);
            points[match].status=1
            if(match===null){
                throw new Error('error in finding matching point in points array');
            }
        }
    }
    return 1;
}

//=============================



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
    const percentageReduce = 0.20;
    const size = 50;
    const [points, setPoints] = useState(null);
    const [ctx, setCtx] = useState(null);
    const [gridDimensions, setgridDimensions] = useState(null);
    const [configNum, setconfigNum] = useState(null);
    const [mapData, setmapData] = useState(null);
    
    useEffect(
        ()=>{
            // setting default config to blinker and plotting points array
            const canvas = box.current;
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth - (percentageReduce * window.innerWidth);
            canvas.height = window.innerHeight - (percentageReduce * window.innerHeight);
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

            ctx.scale(size, size);

            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, width, height);
            ctx.fill();


            const points = populate(gridDimensions);
            formNeighs(points, gridDimensions);
            const centroidptindex = findCentroidPoint(points, gridDimensions);

            if(configNum===null){
                blinker(centroidptindex, points);
                setgridDimensions(gridDimensions);
            }else{
                //run set configuration here
                let plot;
                console.log('re-ran, ', configNum, mapData);
                try{

                    plot = initPointsConfig(mapData, points, gridDimensions)
                }catch(e){
                    console.error('error in initialising points config:',e);
                }
                
                if (plot===1){
                    console.log('plot success');
                }
                  
            }
            plotpts(points, ctx);
            // execute(points,ctx, width, height) ;
            // console.log(points[0])
            // console.log(points[0].neighs)
            console.log(points.length, ' points length');
            console.log(points[points.length -1 ].id);
            console.log(gridDimensions);
            console.log(points[gridDimensions.x-1])

            setCtx(ctx);
            setPoints(points);
        }
        ,[configNum]);


        function playButton(){
            execute(points,ctx, gridDimensions.x, gridDimensions.y) ;
            console.log('play button points:',points, ctx, gridDimensions);
        }

        async function configButtonClick(e) {

            const parELe = e.target.parentElement;
            console.log('clicked mapp button', e.target.parentElement);
            console.log(parELe.id, '<fetching id');
            const mapID = parELe.id;
            const resp = await fetch(`http://localhost:3000/api/gol/${parELe.id}`).catch((e) => {
                console.error('error in getting map with id', id, 'error:', e);
            });
            const data = await resp.json();
            console.log(data);
            setmapData(data);
            setconfigNum(mapID);
        }

        function ConfigList({ configButtonClick }) {
            //156 index configs
            const lists = [];
            for (let configIndex = 0; configIndex < 156; configIndex++) {
                lists.push(
                    <div>
                        <li key={configIndex} id={configIndex}>map number: {configIndex}
                            <button onClick={configButtonClick}> select </button>
                        </li>

                    </div>

                );
            }
            const finalList = <ul>{lists.map((li) => li)}</ul>
            return finalList;
        }

        const animationElement = <div> 
            <button onClick={playButton}> play </button>
            {canvas} 
            <ConfigList configButtonClick={configButtonClick} /> 
            </div>
    return animationElement;
}



export default function Golpage(){
    return (
        <div>
            <p> this is the conway GOL page </p>
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