'use client';
import { useState, useRef, useEffect } from "react";
import 'rippleui/dist/css/styles.css';

import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import ConfigList from '@/components/gol/ConfigList'
import PlayButton from '@/components/gol/PlayButton'
import SizeButton from '@/components/gol/SizeButton'
import SpeedButton from '@/components/gol/SpeedButton'
import IterButton from '@/components/gol/IterButton'
import ColorPicker from'@/components/gol/ColorPicker'
import InputSize from '@/components/gol/InputSize'
import Point from '@/components/gol/utils/Point'
import blinker from '@/components/gol/utils/blinker'
import findCentroidPoint from '@/components/gol/utils/findCentroidPoint'
import findIndex from '@/components/gol/utils/findIndex'
import populate from '@/components/gol/utils/populate'
import formNeighs from '@/components/gol/utils/formNeighs'
import sleep from '@/components/gol/utils/sleep'
import plotpts from '@/components/gol/utils/plotpts'
import initPointsConfig from '@/components/gol/utils/initPointsConfig'
import getMapNamesPromise from '@/components/gol/lib/getMapNamesPromise'
import Card from '@/components/ui/Card'
import Settings from '@/components/gol/Settings'
import LeftDrawer from '@/components/ui/LeftDrawer' 
import RightDrawer from '@/components/ui/RightDrawer' 

let globalStopAnimation = 0;
async function execute(points,  ctx, width, height, speed, gridDimensions, end=10) {
    var points2 = [];
    for (let i = 0; i < end; i++) {
        if (globalStopAnimation===1){return;}
        ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
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
        // ctx.clearRect(0,0,width,height)
        // ctx.translate(gridDimensions.centroidx, gridDimensions.centroidy);
        // console.log('im running');
    }
    return 
}


function AnimationBox(){
    const defaultSize = 10;
    const defaultSpeed = 100;
    const defaultNumIter = 200;

    const box = useRef(null);
    const canvas = <canvas ref={box}></canvas>;
    const percentageReduce = 0.20;
    const [manualReRun, setmanualReRun] = useState(0);
    const ranDuringAnimation  = useRef(0);
    const [showAlert, setshowAlert] = useState(false);
    const [mapFitAlert, setmapFitAlert] = useState(false);
    const [animationPlay, setanimationPlay] = useState(0);
    const [numIter, setnumiterChange] = useState(defaultNumIter);
    const [iterChangeInput, setiterChangeInput] = useState(defaultNumIter);
    const [speed, setspeed] = useState(defaultSpeed);
    const [speedChangeInput, setspeedChangeInput] = useState(defaultSpeed);
    const [size, setsize] = useState(defaultSize);
    const [sizeChange, setsizeChange] = useState(defaultSize);
    const [points, setPoints] = useState(null);
    const [ctx, setCtx] = useState(null);
    const [gridDimensions, setgridDimensions] = useState(null);
    const [configNum, setconfigNum] = useState(null);
    const [mapData, setmapData] = useState(null);
    const [mapNames, setmapNames] = useState(false);
    const [mapSearchValue, setMapSearchValue] = useState(null);
    const [displayMapSearchValues, setDisplayMapSearchValues] = useState(false);
    const [showFullMaps, setShowFullMaps] = useState(false);
    const [showFavMaps, setShowFavMaps] = useState(true);
    const [filterValue, setFilterValue] = useState(null);
    const [pointsColor, setPointsColor] = useState("rgba(59, 224, 26)");
    const [changeColor, setChangeColor] = useState(false);
   

    useEffect(()=>{
        async function getMapNamesData(){
            const names = await getMapNamesPromise(filterValue);
            setmapNames(names);
        }
        getMapNamesData();
        console.log('fetch for names');
    }, [filterValue]) 

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
                // ctx.translate(gridDimensions.centroidx, gridDimensions.centroidy);

                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.fillRect(0, 0, width, height);
                ctx.fill();

                const populateTime = performance.now();
                const solePop = performance.now();
                const points = populate(gridDimensions, pointsColor);
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
                plotpts(points, ctx, gridDimensions);
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
                setChangeColor(false);
                console.log(`useEffect ran again. values: size ${size}, speed ${speed}, map num ${configNum} iter ${numIter}`);
            }else{
                const woot =1;
                ranDuringAnimation.current  = woot;
                setshowAlert(true);
                // showAlert = true;
                console.log(showAlert, 'showALert');

                console.log(`useEffect Else branch ran again value of ranDuringAnimation should be 1 ${ranDuringAnimation.current}`);
            }
        }
        ,[configNum, size,   manualReRun, speed, size, numIter, changeColor]);

    // useEffect(()=>{
    //     for (ele of mapNames){

    //     }
    // }, [mapSearchValue])
    function cancelAlert(setVariable){
        setVariable(false);
    }

    function StopButton() {
        function stopButtonClick(){
            globalStopAnimation=1;    
        }
        return <Button onClick={stopButtonClick} text={"stop"} type={"btn btn-error"}/>
    }
    
    const PlayButt = <PlayButton points={points} ctx={ctx} gridDimensions={gridDimensions} speed={speed} numIter={numIter}
        ranDuringAnimation={ranDuringAnimation} animationPlay={animationPlay} setanimationPlay={setanimationPlay}
        execute={execute} setmanualReRun={setmanualReRun} manualReRun={manualReRun} />
    const StopBut = <StopButton/>
    const SizeButt = <SizeButton setsize={setsize} setsizeChange={setsizeChange} sizeChange={sizeChange} />
    const SpeedButt = <SpeedButton setspeedChangeInput={setspeedChangeInput} speedChangeInput={speedChangeInput} setspeed={setspeed} />
    const IterButt = <IterButton setnumIterChange={setnumiterChange} iterChangeInput={iterChangeInput} setiterChangeInput={setiterChangeInput} />
    const colorPicker = <ColorPicker setPointsColor={setPointsColor} setChangeColor={setChangeColor}/>

    const animationElement = <div > 
        {showAlert && <Alert Title={'too fast!'} Long={'stop animation to see your changes'} cancelAlert={() => cancelAlert(setshowAlert)} />}
        {mapFitAlert && <Alert Title={'map too large'} Long={'try reducing map size'} cancelAlert={() => { cancelAlert(setmapFitAlert) }} />}
        <div className="flex flex-row justify-center my-6">

            <div className="flex flex-col mx-2">
                <div className="my-2">
                    <LeftDrawer drawerName={'settings'} drawerHeading={'change settings'} buttons={[SizeButt, SpeedButt, IterButt]} setsize={setsize} size={size}
                        sizeChange={sizeChange} setspeed={setspeed} speed={speed} speedChangeInput={speedChangeInput} 
                        setnumiterChange={setnumiterChange} numIter={numIter} iterChangeInput={iterChangeInput} />
  
                </div>
                <div>
                    <RightDrawer drawerName={'Choose Map'} drawerHeading={'Search for map'} setMapSearchValue={setMapSearchValue} mapNames={mapNames} setmapData={setmapData}
                        setconfigNum={setconfigNum} mapNameFilter={mapSearchValue} showFullMaps={showFullMaps} setShowFullMaps={setShowFullMaps}
                        displayMapSearchValues={displayMapSearchValues} setDisplayMapSearchValues={setDisplayMapSearchValues}
                        showFavMaps={showFavMaps} setShowFavMaps={setShowFavMaps} setFilterValue={setFilterValue} filterValue={filterValue}/>
                </div>   
            </div>
            
            <div className="flex flex-col mx-2">
                <div className="my-2">
                    {PlayButt}
                </div>
                <div>
                    {StopBut}
                </div>
            </div>

            <div className="flex flex-col mx-2">
                <div className="my-2">
                    {colorPicker}
                </div>
            </div>
            
        </div>

        <div className="flex justify-center my-6">
            {canvas} 
        </div>

    </div>
    return animationElement;
}



export default function Golpage(){
    return (
        <div>
            {/* <div>
                <label for="color-picker">color: </label>
                <input type="color" id="color-picker" value="#ff0000"> color </input>
            </div> */}
            <p className="mask-b-from-neutral-50 font-stretch-105 text-center text-5xl font-bold"> Conways Game Of Life </p>
            <AnimationBox/>      
        </div>
   );
}
