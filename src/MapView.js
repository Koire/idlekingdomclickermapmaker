import * as Honeycomb from "honeycomb-grid";

const clickedGrid = (state, [x,y]) => ({
        ...state,
        hexMap: [...state.hexMap.map((row, xIdx) =>
            row.map((cell, yIdx) => x===xIdx && y === yIdx
                ? {...cell, color : state.currentColor} : cell))]
})

const setCurrentColor = (state, color) => ({
    ...state,
    currentColor: color
})


export default (state) => {
    const Hex = Honeycomb.extendHex({ size: 5 })
    const Grid = Honeycomb.defineGrid(Hex)
    const corners = Hex().corners()
    const colors = ["lightBlue", "darkBlue", "PapayaWhip", "brown", "grey", "white", "pink", "darkgreen", "lightgreen"]
    const colorSvg = (color, points) => (<polygon points={points} style={{stroke: "white", fill: color, transform: "rotateX(40deg)"}} onClick={[setCurrentColor, color]}/>)
    return (<div style={{backgroundColor: "darkBlue", color: "white"}}> Some Map:
        <svg viewBox="-100 0 300 10">
            {Grid.rectangle({height: 1, width: colors.length}).map(hex => (
                colorSvg(colors[hex.x], corners.map(({x, y}) => `${x + hex.toPoint().x}, ${y + hex.toPoint().y}`) )
            ))}
        </svg>
        <svg viewBox="10 10 300 300" style={{overflow: "visible"}}>
            {Grid.hexagon({radius: 15, center: [15,15]}).map(hex => {
                const curHex = state.hexMap[hex.x][hex.y]
                const dX = hex.toPoint().x + 15
                const dY = hex.toPoint().y + 15
                return <polygon points={corners.map(({x, y}) => `${x + dX}, ${y + dY}`)}
                                style={{stroke: "black", fill: curHex.color, transform: "rotateX(40deg)"}}
                                onClick={[clickedGrid, [hex.x, hex.y]]}/>

        })}
        </svg>
    </div>)
}
