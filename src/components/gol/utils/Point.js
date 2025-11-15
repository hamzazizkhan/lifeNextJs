export default class Point{
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.status = 0;
        this.id = id;
        this.neighs = [];
        this.color = "rgba(59, 224, 26)";
        this.point = [x, y];
    }
    

    draw = function(ctx, gridDimensions) {
        if (this.status === 1) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 1, 1);
            // ctx.translate(gridDimensions.centroidx, gridDimensions.centroidy);
            ctx.fill();
            // log('pt',pt);
        }
    }
    
    // number of living cells around cell in 8 neighborhood
    lives = function(points) {
        let live = 0;
        // console.log('neighs',this.neighs, 'point',this.x,this.y);
        for (const neigh of this.neighs) {
            const curr = points[neigh];
            // log('this', this);
            // console.log('neigh,', neigh);
            if (curr.status === 1) {
                live++;
            }
        }
        return live;
    }
    // changes status f cell in nieghborhood
    changeStatus = function (points) {
        let live = this.lives(points);
        // log('live', live, this.x, this.y);

        if (this.status === 1) {
            if (live < 2) {
                const status = 0;
                return status;
            }
            else if (live >= 2 && live <= 3) {
                return 1;
            }
            else if (live >= 4) {
                const status = 0;
                return status;
            }
        } else {
            if (live === 3) {
                const status = 1;
                return status;
            }
        }
    }
    // status = 1, < 2 alive, status = 0
    // status = 1, >= 2 <= 3 alive, status = same
    // status = 1, >= 3 alive, status = 0
    // status = 0, >= 3 alive, status = 1
}