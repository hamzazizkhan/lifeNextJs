export default function findIndex(x, y, gridDimensions) {
    const maxy = gridDimensions.y;
    const index = (maxy * x) + y
    return index;
}