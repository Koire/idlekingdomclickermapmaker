import { app } from "hyperapp"
import MapView from "./MapView";


const devExtension = window.__REDUX_DEVTOOLS_EXTENSION__
const devTools = devExtension ? devExtension.connect() : false

export const devMiddleWare = dispatch => devExtension ? (action, ...props) => {
    if (typeof action !== 'function') {
        return dispatch(action, ...props)
    } else {
        const news = dispatch(action, ...props)
        devTools && devTools.send(action.name, news)
        return news
    }
} : (action, ...props) => dispatch(action,...props)


const range = n => [...Array(n).keys()]
const generateMap = n => range(n).map((row, idx1) =>
    Array.from({length: n}, (cell, idx2) =>({
        isClicked: false,
        color: idx1 === 15 && idx2 === 15 ? "Salmon": "PowderBlue"
    })
))

const appSettings = {
    init: () => ({
        hexMap: generateMap(31),
        currentColor: "pink"
    }),
    view: MapView,
    node: document.getElementById("app")
}

process.env.NODE_ENV === "production" ? app(appSettings) : app(appSettings, devMiddleWare)
