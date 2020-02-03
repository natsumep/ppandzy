export function initOption(ele){
    let option={
        tooltip: {
            extraCssText: '-webkit-transform: translateZ(111111px);-moz-transform: translateZ(111111px);background: linear-gradient(135deg, transparent 0px, rgba(0,0,0,0.6) 0) top left,linear-gradient(-135deg, transparent 15px, rgba(0,0,0,0.6) 0)top right,linear-gradient(-45deg, transparent 0px, rgba(0,0,0,0.6) 0) bottom right,linear-gradient(45deg, transparent 15px, rgba(0,0,0,0.6) 0) bottom left;background-size: 50.1% 50.1%;background-repeat: no-repeat;',
            padding: 12,
        }
    };
    Object.assign(ele.tooltip,option.tooltip);
    return ele;
};