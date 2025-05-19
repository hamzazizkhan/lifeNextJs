export default function IterButton({ numIter }) {
    function iterButtonClick(newIter) {
        // console.log('iter button clicked', newIter);
        numIter.current = newIter;
    }
    const iterOptions = [10, 20, 40, 50, 80, 100, 200];
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