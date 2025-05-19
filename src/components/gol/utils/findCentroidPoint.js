export default function findCentroidPoint(points, gridDimensions) {
    for (let pt = 0; pt < points.length; pt++) {
        if (points[pt].x === gridDimensions.centroidx && points[pt].y === gridDimensions.centroidy) {
            return pt;
        }
    }
}