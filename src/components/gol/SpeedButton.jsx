export default function SpeedButton({ speed }) {
    function speedButtonClick(newSpeed) {
        // console.log('speed button clicked', newSpeed);
        speed.current = newSpeed;
    }
    const speedOptions = [1000, 800, 600, 400, 200, 100, 80];
    const speedList =
        <div>
            <ul>
                {speedOptions.map((speed) => (
                    <li key={speed} id={speed}> <button onClick={() => speedButtonClick(speed)}> change speed {speed / 1000} seconds</button> </li>
                ))}
            </ul>
        </div>

    return speedList
}