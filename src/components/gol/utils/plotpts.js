export default function plotpts(points, ctx) {
    for (let pt = 0; pt < points.length; pt++) {
        // need two sets of points
        points[pt].draw(ctx);
    }
}