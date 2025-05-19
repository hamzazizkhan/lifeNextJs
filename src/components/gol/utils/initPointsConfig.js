
import findIndex from '@/components/gol/utils/findIndex'
export default function initPointsConfig(cfg, points, gridDimensions){
    const pos = cfg.positions;
    console.log(cfg.rowCount, gridDimensions, 'rowcount, gridims');
    if(cfg.rowCount>gridDimensions.x){
        throw new Error('map does not fit in canvas plot ');
    }

    console.log('plotting',cfg.name, cfg.mapLink, cfg.rowCount, cfg.positions);
    console.log('pointsARRAY');
    console.log(points)
    for(const p of pos){
        const x = p.x;
        const y = p.y;
        
        const match = findIndex(x,y,gridDimensions);
        points[match].status=1
        if(match===null){
            throw new Error('error in finding matching point in points array');
        }
        
    }
    return 1;
}
