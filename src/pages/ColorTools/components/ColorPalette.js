import React, { Component } from 'react'
import Harmonic from './Harmonic';
import Shading from './Shading';
import copyToClipboard from '../accessories/copyToClipboard';
import {hsl2hex, hsl2rgb} from '../accessories/colorConversion';
import * as cookies from '../accessories/cookies';
import './ColorPalette.css';

export default class ColorPalette extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            mode: "Harmonic",
            "Copied format": "hex"
        }
        this.modes = {
            "Harmonic" : Harmonic,
            "Shading" : Shading,
            // "Contrast" : Contrast
        }
        this.copiedFormats = {
            "hex":(color)=>{return hsl2hex(...color)},
            "hsl":(color)=>{return `${color[0]},${color[1]}%,${color[2]}%`},
            "rgb":(color)=>{return hsl2rgb(...color)},
        }
    }
    changeMode = (e) => {
        let newState = this.state;
        newState.mode = e.target.id.replace("paletteMode","");
        this.setState(newState);
        this.updateCookie();
    }

    updateCookie = () => {
        cookies.setCookie("ColorPalette",JSON.stringify(this.state),1);
    }

    applyCookie = () => {
    let cookie = cookies.getCookie("ColorPalette");
    (cookie) ? this.setState(JSON.parse(cookie)) : this.updateCookie();
    }

    changeCopiedFormat = (e) => {
        let newState = this.state;
        newState["Copied format"] = e.target.id.replace("copiedFormat","");
        this.setState(newState);
        this.updateCookie();
    }

    paletteBoxClick = (e,copyString,hslArray) => {
        e.persist();
        if (e.ctrlKey) {
            this.props.updateBaseColor(hslArray);
         }
         else {
            copyToClipboard(copyString);
            e.target.innerText = "✔️";
            setTimeout(()=>{e.target.innerText = ""},500);
         }
    }

    render() {
        return (
            <React.Fragment>
            <div className="colorPaletteModeButtons">
                {/* <span id="paletteToggle" onClick={this.props.togglePicker}>
                ☰
                </span> */}
                {Object.keys(this.modes).map((e,i)=>{
                    let mode = e;
                    let checked = (e===this.state.mode) ? true : false;
                    let id = `paletteMode${e}`;
                    return (
                        <span key={mode} className="colorPaletteModeButton">
                            <input type="radio" name="paletteMode" id={id} checked={checked} onChange={this.changeMode}></input>
                            <label htmlFor={id}>{mode}</label>
                        </span>
                    );
                })}
            </div>
            <div className="colorPaletteModeButtons" style={{borderBottom:"none"}}>
                <span>clipboard format: </span>
                {Object.keys(this.copiedFormats).map(e=>{
                    let mode = e;
                    let checked = (e===this.state["Copied format"]) ? true : false;
                    let id = `copiedFormat${e}`;
                    return(
                        <span key={e} className="colorPaletteModeButton">
                            <input type="radio" name="CopiedFormat" id={id} checked={checked} onChange={this.changeCopiedFormat}></input>
                            <label htmlFor={id}>{mode}</label>
                        </span>
                    )
                })}
            </div>
            {React.createElement(
                this.modes[this.state.mode],
                {   //props
                    paletteState:this.state,
                    globalState:this.props.state,
                    updateBaseColor:this.props.updateBaseColor,
                    updateComponentState:this.updateComponentState,
                    copiedFormats:this.copiedFormats,
                    paletteBoxClick:this.paletteBoxClick,
                }
            )}
            </React.Fragment>
        )
    }
    componentDidMount () {
        this.applyCookie();
    }
}
