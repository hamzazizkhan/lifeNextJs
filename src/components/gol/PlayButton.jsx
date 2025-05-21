import Button from '@/components/ui/Button'
export default function PlayButton({points, ctx, gridDimensions, speed, numIter, manualReRun,
    setanimationPlay, setmanualReRun, execute,   animationPlay}) {
    async function playButtonClick() {
       
        if (animationPlay !== 1) {
            let animationPlay = 1;
            setanimationPlay(animationPlay);
            // console.log(animationPlay, 'animation play b4 exec');
            // console.log(`randuringAnimation before animation should be 0${ranDuringAnimation.current}`)

            await execute(points, ctx, gridDimensions.x, gridDimensions.y, speed, gridDimensions, numIter);

            animationPlay = 0;
            setanimationPlay(animationPlay);
            // console.log(animationPlay, 'animation play after exec');
            // console.log(`randuringAnimation after animation should be 1 ${ranDuringAnimation.current}`)

            const rerun = manualReRun + 1;
            setmanualReRun(rerun);
            // this causes 
            // console.log('play button points:', points, ctx, gridDimensions);
            // console.log('playButton speed', speed.current);
        }
    }
    return <Button onClick={playButtonClick} type={"btn btn-secondary"} text={"play"}/>
}