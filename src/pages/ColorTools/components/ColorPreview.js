import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';
import '../components/ColorPreview.css';

export default class ColorPreview extends Component {
    constructor(props) {
        super(props);
        this.buffer=[];
        this.colorData={
            "hexInput":()=>cConvert.hsl2hex(...this.props.state.baseColor),
            "hslInput":()=>this.props.state.baseColor.join(", "),
            "rgbInput":()=>cConvert.hsl2rgb(...this.props.state.baseColor).join(", ")
        };
        this.colorTest={
            "hexInput":(input)=>{
                return (input.match(/^#{0,1}[0-9a-f]{6}$/i)) ? cConvert.hex2hsl(input) : null;
            },
            "hslInput":(input)=>{
                let tempColor = input.match(/(\d*\.{0,1}\d*)/g);
                tempColor = (tempColor) ? tempColor.filter(Boolean) : ""; 
                if (tempColor.length===3 && tempColor[0]<360 && tempColor[1]<=100 && tempColor[2]<=100) {
                    return [tempColor[0],tempColor[1],tempColor[2]];
                }
            },
            "rgbInput":(input)=>{
                let tempColor = input.match(/\d{1,3}/g);
                tempColor = (tempColor) ? tempColor.filter(Boolean) : "";
                if (tempColor.length===3 && tempColor[0]<=255 && tempColor[1]<=255 && tempColor[2]<=255) {
                    return cConvert.rgb2hsl(tempColor[0],tempColor[1],tempColor[2]);
                }
            }
        }
        this.colorHelp={
            "hexInput":"enter six-digit hexidecimal values with no spaces,\n\"#\" prefix is optional",
            "hslInput":"enter three values separated by spaces or commas,\nfirst value is hue and must be less than 360,\nsecond value is saturation and must be less than or equal to 100,\nthird value is luminosity and must be less than or equal to 100.\nDecimals values can be used",
            "rgbInput":"enter three values separated by spaces or commas,\neach value must be less than or equal to 255"
        }
    } 
    iChange = (e) => {
        e.persist();
        let input = e.target.value;
        let newColor = this.colorTest[e.target.id](input);
        if (newColor) {
            document.querySelector(`#${e.target.id}Help`).innerText = "❔";
            this.props.updateBaseColor(newColor);
        }
        else {
            document.querySelector(`#${e.target.id}Help`).innerText = "❓";
        }

    }
    iFocus = (e) => {
        e.target.select();
        this.buffer = [e.target.id,e.target.value];
    }

    getData = (type) => { 
        if (typeof this.colorData[type] === "function") { return this.colorData[type]() }
        if (type === "style") {
            let color = (this.props.state.baseColor[2]>45)?"black":"white"
            return ({
                backgroundColor:cConvert.hsl2hex(...this.props.state.baseColor),
                color:color,
                border:`1px solid ${color}`
            });
        }
    }
    updateInputs = () => {
        Object.keys(this.colorData).forEach(e=>{
            if (this.buffer[0]!==e) {
                document.querySelector(`#${e}`).value = this.getData(e);
                document.querySelector(`#${e}Help`).innerText = "❔";
            }
        })
    }
    copyColor = (e) => {
        let elementToCopy = `#${e.target.id.replace("Copy","")}`;
        let copyIconElement = `#${e.target.id}`;
        if (elementToCopy[2] === "s") {
            let hslElement = document.querySelector(elementToCopy);
            let hslElementOriginalValue = hslElement.value;
            let hslArray = this.colorTest["hslInput"](hslElement.value);
            hslElement.value = `${hslArray[0]},${hslArray[1]}%,${hslArray[2]}%`;
            hslElement.select();
            document.execCommand("copy");
            hslElement.value = hslElementOriginalValue;
        }
        else {
            document.querySelector(elementToCopy).select();
            document.execCommand("copy");
        }
        document.querySelector(copyIconElement).innerText = "✔️";
        setTimeout(()=>{document.querySelector(copyIconElement).innerText = "📋"},500);
    }
    render() {
        return (
            <div>
            <div id="colorOutput" style={this.getData("style")}>
                {Object.keys(this.colorData).map(e=>
                    <p key={e}>
                    <label htmlFor={e}>{e.replace("Input",":")} 
                    <input id={e} type="text" size="16" onChange={this.iChange} onFocus={this.iFocus} onBlur={()=>{this.buffer=[]}} style={this.getData("style")} />
                    <span role="img" arei-label="help" aria-hidden="true" id={`${e}Help`} title={this.colorHelp[e]}>❔</span>
                    <span role="img" arei-label="copy" aria-hidden="true" id={`${e}Copy`} title="copy" onClick={this.copyColor}>📋</span>
                    </label>
                    </p>
                )}
          </div>
          </div>
        )
    }
    componentDidMount() {
        this.updateInputs();
    }
    componentDidUpdate() {
        this.updateInputs();
    }
}