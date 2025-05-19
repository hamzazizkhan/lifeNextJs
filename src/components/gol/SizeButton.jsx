export default function SizeButton({setsize}) {
    function sizeButtonClick(size) {
        // console.log('size Button clicked!');
        const newSize = size;
        setsize(newSize);
    }

    const sizeOptions = [10, 20, 30, 40, 50];
    const sizeList =
        <div>
            <ul>
                {sizeOptions.map((size) => (
                    <li key={size} id={size}> <button onClick={() => sizeButtonClick(size)}> change size {size}</button> </li>
                ))}
            </ul>
        </div>

    return sizeList
}