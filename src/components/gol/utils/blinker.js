export default function blinker(centroidptIndex, points) {
    points[centroidptIndex - 1].status = 1;
    points[centroidptIndex].status = 1;
    points[centroidptIndex + 1].status = 1;
}