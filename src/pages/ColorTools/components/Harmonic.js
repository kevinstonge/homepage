import React, { Component } from 'react'
import {hueReset} from '../accessories/colorConversion';
import * as cookies from '../accessories/cookies';


export default class Harmonic extends Component {
    constructor(props) {
        super(props)
        this.settings = {
            "Palette Mode": {
                type: "list",
                "Analogous": [0,30,330],
                "Complementary": [0,180],
                "Complementary split": [0,150,210],
                "Complementary with split": [0,150,180,210],
                "Tetradic rectangle": [0,30,60,210,240],
                "Tetradic square": [0,90,180,270],
                "Triadic": [0,120,240],
                // "Custom": []
            },
            "Saturation Steps": {
                type: "range",
                min: 1,
                max: 7
            },
            "Luminosity Steps": {
                type: "range",
                min: 1,
                max: 7
            }
        }
        this.state = {
            "Palette Mode": "Analogous",
            "Saturation Steps": 4,
            "Luminosity Steps": 4,
        }
    }
    updateState = (e) => {
        e.persist();
        let newState = this.state;
        let value = e.target.value;
        if (value.match(/\d+/g)) { value = Number(value) }
        newState[e.target.name] = value;
        this.setState(newState);
        this.updateCookie();
    }
    updateCookie = () => {
        cookies.setCookie("Harmonic",JSON.stringify(this.state),1);
    }

    applyCookie = () => {
        let cookie = cookies.getCookie("Harmonic");
        (cookie) ? this.setState(JSON.parse(cookie)) : this.updateCookie();
    }

    render() {
        return (
            <div>
                <h3>harmonic color palettes</h3>
                <div className="paletteSettings">
                    {Object.keys(this.state).map(e=>
                        <div key={`set${e}`} className="paletteSetting">
                        <span className="paletteSettingLabel">
                            <span className="paletteSettingLabelName">{e}</span>
                            <span className="paletteSettingLabelValue">
                                {(Number(this.state[e])) ? `(${this.state[e]})` : "" }
                            </span>
                        </span>
                        <span className="paletteSettingInputBlock">
                            {(this.settings[e].type === "list") ? 
                                Object.keys(this.settings[e]).map((f,i)=>{
                                    if (i===0) { return null }
                                    else { 
                                        return (
                                            <span key={f} className="paletteInputRadioBlock">
                                                <input 
                                                    id={f} 
                                                    name={e} 
                                                    value={f} 
                                                    type="radio" 
                                                    onChange={this.updateState}
                                                    checked={(f===this.state[e]) ? true : false}
                                                />
                                                <label key={f} htmlFor={f} className="paletteInputRadio">{f}</label>
                                            </span>
                                        );
                                    }
                                })
                                : 
                                <React.Fragment>
                                    <span className="paletteInputRangeBlock">

                                    <input 
                                        type="range" 
                                        name={e} 
                                        min={this.settings[e]["min"]} 
                                        max={this.settings[e]["max"]} 
                                        value={this.state[e]} 
                                        onChange={this.updateState}
                                    />
                                    </span>
                                </React.Fragment>
                            }
                        </span>
                        </div>
                    )}
                </div>
                <div className="paletteContainer">
                    {Object.values(this.settings["Palette Mode"][this.state["Palette Mode"]]).map((h,i)=>{
                        let hue = hueReset(Number(this.props.globalState.baseColor[0])+h).toFixed(2);
                        return (
                        <div key={`h${i}`} className="paletteBlock">
                        
                        {Array(this.state["Saturation Steps"]).fill("0").map((s,j)=>{
                            let saturation = Number(100*(j+1)/this.state["Saturation Steps"]).toFixed(2);
                            return (
                            <div key={`h${i}s${j}`} className="paletteRow">
                                
                                {Array(this.state["Luminosity Steps"]).fill("0").map((l,k)=> {
                                    let luminosity = Number(100*(k+1)/(1+this.state["Luminosity Steps"])).toFixed(2);
                                    let clipBoardString = this.props.copiedFormats[this.props.paletteState["Copied format"]]([hue,saturation,luminosity]);
                                    return(<div 
                                        key={`h${i}s${j}l${k}`}
                                        className="paletteBox"
                                        style={{backgroundColor:`hsl(${hue},${saturation}%,${luminosity}%)`}}
                                        title={`click to copy:\n${clipBoardString}`}
                                        onClick={(e)=>{this.props.paletteBoxClick(e,clipBoardString,[hue,saturation,luminosity])}}
                                    >
                                    </div>);
                                })}

                            </div>
                            );    
                        })}
                        
                        </div>
                        );
                    })}
                </div>
            </div>
        )
    }
    componentDidMount () {
        this.applyCookie();
    }
}
