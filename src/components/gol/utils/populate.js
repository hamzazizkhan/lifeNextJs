import Point from '@/components/gol/utils/Point'
export default function populate(gridDimensions, color){
    let points = [];
    // populate
    let id = 0;
    for (let i = 0; i < gridDimensions.x; i++) {
        for (let j = 0; j < gridDimensions.y; j++) {
            let point = new Point(i, j, id);
            point.color = color;
            // log('point', point);
            points.push(point);
            id++;
        }
    }
    return points;
}