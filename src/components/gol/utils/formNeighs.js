
import findIndex from '@/components/gol/utils/findIndex'
export default function formNeighs(points, gridDimensions) {
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [-1, -1], [1, -1], [-1, 1], [1, 1]]    //forming neighbours
    let max = 0;
    for (const pt of points) {
        for (const d of directions) {
            const newPoint = [pt.point[0] + d[0], pt.point[1] + d[1]];

            // checking dimensions
            if (newPoint[0] > gridDimensions.x - 1 || newPoint[1] > gridDimensions.y - 1) {
                continue
            } else if (newPoint[0] < 0 || newPoint[1] < 0) {
                continue
            }

            const match = findIndex(newPoint[0], newPoint[1], gridDimensions);
            if (match >= points.length) {
                console.log('match greater ', match, newPoint);
            }

            if (match !== null) {
                pt.neighs.push(match);
            }

        }

    }

}