import * as Honeycomb from "honeycomb-grid";

const clickedGrid = (state, [x,y]) => ({
        ...state,
        hexMap: [...state.hexMap.map((row, yIdx) =>
            row.map((cell, xIdx) => x===xIdx && y === yIdx
                ? {...cell, color : state.currentColor} : cell))]
})

const setCurrentColor = (state, color) => ({
    ...state,
    currentColor: color
})

const Hex = Honeycomb.extendHex({ size: 5 })
const Grid = Honeycomb.defineGrid(Hex)
const grid = Grid.hexagon({radius: 15, center: [15,15]})
const corners = Hex().corners()
const colors = ["lightBlue", "darkBlue", "PapayaWhip", "brown", "grey", "white", "pink", "darkgreen", "lightgreen"]
const colorSvg = (color, points) => (<polygon points={points} style={{stroke: "white", fill: color, transform: "rotateX(40deg)"}} onClick={[setCurrentColor, color]}/>)

export default (state) => {
    return (<div style={{backgroundColor: "darkBlue", color: "white"}}> Some Map:
        <svg viewBox="-100 0 300 10">
            {Grid.rectangle({height: 1, width: colors.length}).map(hex => (
                colorSvg(colors[hex.x], corners.map(({x, y}) => `${x + hex.toPoint().x}, ${y + hex.toPoint().y}`) )
            ))}
        </svg>
        <svg viewBox="0 0 300 300" style={{overflow: "visible"}}>
            {state.hexMap.map((row, y) => row.map((cell, x) => {
                const hex = grid.get([x, y])
                return hex && <polygon points={corners.map(({x, y}) => `${x + hex.toPoint().x}, ${y + hex.toPoint().y}`)}
                                style={{stroke: "black", fill: cell.color, transform: "rotateX(40deg)"}}
                                onClick={[clickedGrid, [x, y]]}/>
            }))}
        })}
        </svg>
    </div>)
}
