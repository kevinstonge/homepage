import React, { Component } from 'react'
import {hueReset} from '../accessories/colorConversion';
import * as cookies from '../accessories/cookies';


export default class Shading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // "setting":[min,max,current/default]
            "shadow temperature":[-50,50,-20],
            "highlight temperature":[-50,50,20],
            "luminosity contrast": [0,10,7],
            "saturation contrast": [0,10,7],
            "palette size": [4,100,100],
        }
    }
    calculateColor = (i) => {
        let baseColor = this.props.globalState.baseColor;
        let baseHue = Number(baseColor[0]);
        let baseSaturation = Number(baseColor[1]);
        let baseLuminosity = Number(baseColor[2]);
        let lContrast = this.state["luminosity contrast"][2];
        let sContrast = this.state["saturation contrast"][2];
        let paletteSize = this.state["palette size"][2];
        let maxSaturation = this.state["saturation contrast"][1];
        let maxLuminosity = this.state["luminosity contrast"][1]

        let h0 = baseHue + this.state["shadow temperature"][2] * ((baseHue >=0 && baseHue < 180) ? -1 : 1);
        let h1  = baseHue + this.state["highlight temperature"][2] * ((baseHue >=0 && baseHue < 180) ? -1 : 1);
        let h = h0 + ((h1-h0)*i/this.state["palette size"][2])

        let s0 = baseSaturation - baseSaturation * (sContrast/maxSaturation);
        let s1 = baseSaturation + (100-baseSaturation) * (sContrast/maxSaturation);
        let s = s0 + ((s1-s0)*i/paletteSize);

        let l0 = baseLuminosity - baseLuminosity * (lContrast/maxLuminosity);
        let l1 = baseLuminosity + (100-baseLuminosity) * (lContrast/maxLuminosity);
        let l = l0 + ((l1-l0)*i/paletteSize);

        return [hueReset(h).toFixed(2),s.toFixed(2),l.toFixed(2)];
    }
    updateSettings = (e) => {
        e.persist();
        let newState = this.state;
        newState[e.target.name][2] = Number(e.target.value);
        this.setState(newState);
        this.updateCookie();
    }
    updateCookie = () => {
        cookies.setCookie("Shading",JSON.stringify(this.state),1);
    }

    applyCookie = () => {
        let cookie = cookies.getCookie("Shading");
        (cookie) ? this.setState(JSON.parse(cookie)) : this.updateCookie();
    }
    render() {
        let paletteSize = this.state["palette size"][2];
        let palette = new Array(paletteSize);
        palette = palette.fill("0").map((e,i,a)=>this.calculateColor(i));
        // let shadingGradient = 
        //     `linear-gradient(to right, 
        //         ${palette.map(e=>`hsl(${e[0]},${e[1]}%,${e[2]}%)`)}
        // )`;
        let sphereCSS = {
            width:"200px",
            height:"200px",
            clipPath:"circle()",
            background:`radial-gradient(
                60% 60% at 40% 40%,
                ${palette.map(e=>`hsl(${e[0]},${e[1]}%,${e[2]}%)`).reverse()}
            )`
        }
        return (
            <React.Fragment>
                <h3>shading color palette</h3>
                <div className="paletteSettings">
                    {Object.keys(this.state).map(e=>{
                        return(
                            <div className="paletteSetting" key={e}>
                                <span className="paletteSettingLabel">
                                    <span className="paletteSettingLabelName">{e}</span>
                                    <span className="paletteSettingLabelValue">({this.state[e][2]})</span>
                                </span>
                                <span className="paletteInputRangeBlock">
                                <input 
                                    type="range" 
                                    min={this.state[e][0]} 
                                    max={this.state[e][1]} 
                                    value={this.state[e][2]} 
                                    title={this.state[e][2]}
                                    onChange={this.updateSettings} 
                                    name={e}>
                                </input>
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="paletteContainer">
                    <div className="paletteBlock">
                        <div className="paletteRow" style={{display:'flex',flexWrap:'wrap',width:'21em'}}>
                            {palette.map((e,i)=>{
                                let color = e;
                                let clipBoardString = this.props.copiedFormats[this.props.paletteState["Copied format"]]([color[0],color[1],color[2]]);
                                let cssColor = `hsl(${color[0]},${color[1]}%,${color[2]}%)`;
                                return(
                                    <div 
                                        className="paletteBox"
                                        key={i}
                                        style={{backgroundColor:cssColor}}
                                        title={`click to copy:\n${clipBoardString}`}
                                        onClick={(e)=>{this.props.paletteBoxClick(e,clipBoardString,[color[0],color[1],color[2]])}}
                                    >
                                    </div>
                                );
                            }) }
                        </div>
                    </div>

                    {/* previews below - suggestion: choose ONE to keep cpu usage lower */}
                    {/* linear gradient preview using css */}
                    {/* <div className="paletteBlock">
                        <div style={{
                            background:shadingGradient,
                            width: "200px",
                            height: "200px"
                        }}>
                        </div>
                    </div> */}

                    {/* radial gradient preview using css */}
                    <div className="paletteBlock">
                        <div style={sphereCSS}>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    componentDidMount () {
        this.applyCookie();
    }
}