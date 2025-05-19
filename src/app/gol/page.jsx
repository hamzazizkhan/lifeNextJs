'use client';
import { useState, useRef, useEffect } from "react";
import 'rippleui/dist/css/styles.css';
import Alert from '@/components/ui/Alert'
import ConfigList from '@/components/gol/ConfigList'
import PlayButton from '@/components/gol/PlayButton'
import SizeButton from '@/components/gol/SizeButton'

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
        // console.log('neighs',this.neighs, 'point',this.x,this.y);
        for (const neigh of this.neighs){
            const curr = points[neigh];
            // log('this', this);
            // console.log('neigh,', neigh);
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
            else if (live>=4){
                const status = 0;
                return status;
            }
            }else{
            if (live===3){
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
function findIndex(x,y, gridDimensions){
    // for (const ptID in points){
    //     const x1 = points[ptID].point[0];
    //     const y1 = points[ptID].point[1];
    //     if (x1===x && y1===y){
    //         return ptID;
    //     }
    // }
    const maxy = gridDimensions.y;
    const index = (maxy*x) +y
    return index;
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
    let max = 0;
    for (const pt of points) {
        for (const d of directions) {
            const newPoint = [pt.point[0] + d[0], pt.point[1] + d[1]];

            // checking dimensions
            if (newPoint[0] > gridDimensions.x -1 || newPoint[1] > gridDimensions.y -1) {
                continue
            } else if (newPoint[0] < 0 || newPoint[1] < 0) {
                continue
            }

            const match = findIndex(newPoint[0], newPoint[1], gridDimensions);
            if (match>=points.length){
                console.log('match greater ', match, newPoint);
            }
            // const newID =  gridDimensions.x *(newPoint[1])+newPoint[1];
            // if(newPoint[0]===0 || newPoint[1]===1){

                // console.log(`${newPoint[0]},${newPoint[1]} realID ${match} newID ${newID}, gridx ${gridDimensions.x}`);
            // }
            // if(match===newID-1){
            //     console.log('True');
            // }
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


let globalStopAnimation = 0;
async function execute(points,  ctx, width, height, speed, end=10) {
    var points2 = [];
    for (let i = 0; i < end; i++) {
        if (globalStopAnimation===1){return;}
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, width, height);
        for (let pt = 0; pt < points.length; pt++) {
            //  need two sets of points
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
        const hello = await sleep(speed);
        // console.log('im running');
    }
    return 
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
// find relationship between id and position. use that to index.
        
        const match = findIndex(x,y,gridDimensions);
        points[match].status=1
        if(match===null){
            throw new Error('error in finding matching point in points array');
        }
        
    }
    return 1;
}

//=============================



//=============================

async function getMapNamesPromise() {
    const url = 'http://localhost:3000/api/gol/names'
    const req = new Request(url)
    const resp = await fetch(req).catch((e) => {
        console.error('could not get map names', e);
    })
    const mapNames = await resp.json();
    console.log('map names', mapNames)
    return mapNames;
    
}





function AnimationBox(){
    const box = useRef(null);
    const canvas = <canvas ref={box}></canvas>;
    const percentageReduce = 0.20;
    const [manualReRun, setmanualReRun] = useState(0);
    const ranDuringAnimation  = useRef(0);
    const [showAlert, setshowAlert] = useState(false);
    const [mapFitAlert, setmapFitAlert] = useState(false);
    const [animationPlay, setanimationPlay] = useState(0);
    const numIter = useRef(50);
    const speed = useRef(1000);
    const [size, setsize] = useState(20);
    const [points, setPoints] = useState(null);
    const [ctx, setCtx] = useState(null);
    const [gridDimensions, setgridDimensions] = useState(null);
    const [configNum, setconfigNum] = useState(null);
    const [mapData, setmapData] = useState(null);
    const [mapNames, setmapNames] = useState(false);
   
    useEffect(()=>{
        async function getMapNamesData(){
            const names = await getMapNamesPromise();
            setmapNames(names);
        }
        getMapNamesData();
        console.log('fetch for names');
    }, []) 

    useEffect(
        ()=>{
            if(animationPlay !== 1){
                
                if(showAlert===true || mapFitAlert===true){
                    setshowAlert(false)
                    setmapFitAlert(false);
                }
                if (globalStopAnimation === 1) {
                    globalStopAnimation = 0;
                }
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

                const populateTime = performance.now();
                const solePop = performance.now();
                const points = populate(gridDimensions);
                const endsolePop = performance.now();
                console.log('time taken for populating only ', endsolePop-solePop);

                const soleNieghs = performance.now();
                formNeighs(points, gridDimensions);
                const endsoleNeighs = performance.now();
                console.log('time taken to form neighs', endsoleNeighs- soleNieghs);

                const soleCentroid = performance.now();
                const centroidptindex = findCentroidPoint(points, gridDimensions);
                const endSoleCEntroid = performance.now();
                console.log('time taken to find centroid poitn',endSoleCEntroid - soleCentroid);

                const populatTImeEnd = performance.now(); 
                console.log('time taken to populate, formneighs and get centroidpoint', populatTImeEnd-populateTime);

                let timetoinit;
                let timetoinitEnd;
                if(configNum===null){
                    blinker(centroidptindex, points);
                    console.log('blinker points', points);
                }else{
                    //run set configuration here
                    let plot;
                    console.log('re-ran, ', configNum, mapData);
                    try{
                        timetoinit = performance.now();
                        plot = initPointsConfig(mapData, points, gridDimensions);
                        timetoinitEnd = performance.now();
                        console.log('time to initalise config',timetoinitEnd-timetoinit);
                    }catch(e){
                        console.error('error in initialising points config:',e);
                        const mapFitAlert = true;
                        setmapFitAlert(true);
                    }
                    
                    if (plot===1){
                        console.log('plot success');
                    }
                    
                }
                const timetoplot = performance.now(); 
                plotpts(points, ctx);
                const timetoplotEnd = performance.now();
                console.log('time taken to plot config', timetoplotEnd- timetoplot);

                console.log('cumulative time taken for setup in useEffect:', (timetoplotEnd - timetoplot) + (timetoinitEnd - timetoinit) + (populatTImeEnd - populateTime)  );
                // execute(points,ctx, width, height) ;
                // console.log(points[0])
                // console.log(points[0].neighs)
                console.log(points.length, ' points length');
                console.log(points[points.length -1 ].id);
                console.log(gridDimensions);
                console.log(points[gridDimensions.x-1])

                setgridDimensions(gridDimensions);
                setCtx(ctx);
                setPoints(points);
                console.log(`useEffect ran again. values: size ${size}, speed ${speed.current}, map num ${configNum}`);
            }else{
                const woot =1;
                ranDuringAnimation.current  = woot;
                setshowAlert(true);
                // showAlert = true;
                console.log(showAlert, 'showALert');

                console.log(`useEffect Else branch ran again value of ranDuringAnimation should be 1 ${ranDuringAnimation.current}`);
            }
        }
        ,[configNum, size,   manualReRun]);

        function cancelAlert(setVariable){
            setVariable(false);
        }
    
        function StopButton() {
            function stopButtonClick(){
                globalStopAnimation=1;    
            }
            return <button onClick={stopButtonClick}> stop </button>
        }
        
        
        
        

        function speedButtonClick(newSpeed){
            console.log('speed button clicked', newSpeed);
            speed.current = newSpeed;
        }

        function SpeedButton({speedButtonClick}){
            const speedOptions = [1000, 800, 600, 400, 200, 100, 80];
            const speedList =
                <div>
                    <ul>
                        {speedOptions.map((speed) => (
                            <li key={speed} id={speed}> <button onClick={() => speedButtonClick(speed)}> change speed {speed/1000} seconds</button> </li>
                        ))}
                    </ul>
                </div>

            return speedList 
        }
        
        function iterButtonClick(newIter){
            console.log('iter button clicked', newIter);
            numIter.current = newIter;
        }

        function IterButton({iterButtonClick}){
            const iterOptions = [10,20,40,50,80,100,200];
            const iterList =
                <div>
                    <ul>
                        {iterOptions.map((iter) => (
                            <li key={iter} id={iter}> <button onClick={() => iterButtonClick(iter)}> change iter {iter} </button> </li>
                        ))}
                    </ul>
                </div>

            return iterList 
        }

        const animationElement = <div> 
            {/* <button onClick={playButton}> play </button> */}
            {showAlert && <Alert Title={'too fast!'} Long={'stop animation to see your changes'} cancelAlert={()=> cancelAlert(setshowAlert)}/>}
            {mapFitAlert && <Alert Title={'map too large'} Long={'try reducing map size'} cancelAlert={()=>{cancelAlert(setmapFitAlert)}}/>}
            <PlayButton points={points} ctx={ctx} gridDimensions={gridDimensions} speed={speed} numIter={numIter} 
            ranDuringAnimation={ranDuringAnimation} animationPlay={animationPlay} setanimationPlay={setanimationPlay} 
            execute={execute}  setmanualReRun={setmanualReRun} manualReRun={manualReRun}/>
            <StopButton />
            <SizeButton setsize={setsize}/>
            <SpeedButton speedButtonClick={speedButtonClick}/>
            <IterButton iterButtonClick = {iterButtonClick}/>
            {canvas} 
            {mapNames && <ConfigList mapNames={mapNames} setconfigNum={setconfigNum} setmapData={setmapData}/> }
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
==============================================================
done:
- if you click on new map mid animation - surrent animation stops and new animation map displayed 
- set size, speed, number of iterations, stop

1) speed up inital config (esp for smaller scales and larger maps) set up.
- figure out sequence of events
- time chunks of code to identify problem areas (config setup issue / animation plot issue).
- find solution.
2) i want to be able to set the scale really small very easily. 

pop up to wait for animation to finish to see new settings.
display map name, period number.
seperate out components - make cleaner and mroe efficient so that you dont make un needed fetch requests to json data for map names
error message when map does fit screen, reduce scale notification
==============================================================

easy:

refactor to clean up code
centre images
lower scales options.
design page - disply map name when playing, highlight selected options
create route to gol page on main life page

user experience!
theme settings

if time allows:
drag and drop combine two configs in the same canvas!! 
click to add point
maybe input field and option for parameters
creat an option to change rule set - HighLife - an alternate set of rules similar to Conway's, but with the additional rule that 6 neighbors generates a birth. Most of the interest in this variant is due to the replicator
*/