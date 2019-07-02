import React, { Component } from 'react'
import {rgb2hsl,hsl2rgb} from '../accessories/colorConversion';

export default class RgbSliders extends Component {
    constructor(props) {
        super(props);
        this.inputs = {
            "r":255,
            "g":255,
            "b":255,
        };
        this.buffer = [];
    }
    cFocus = (e) => {
        e.target.select();
        const colorVar = e.target.id.substr(0,1);
        this.buffer = [colorVar,e.target.value];
    }
    cChange = (e) => {
        e.persist();
        const colorVar = e.target.id.substr(0,1); 
        const key = e.nativeEvent.data;
        let value = e.target.value;
        const newColor = this.baseColorRGB.slice();    
        if ((key === null || value === null) && e.nativeEvent.inputType.substr(0,6)!=="delete") {return;}
        if (e.target.type === "text") {
            value = value.replace(/\./,"").replace(/[\D]/g,"");
            if (value >= this.inputs[colorVar]) value = this.inputs[colorVar];
            this.buffer=[colorVar,value];
            e.target.value = this.buffer[1];
        }
        if (value) {
            newColor["rgb".indexOf(colorVar)] = Number(value);
            this.props.updateBaseColor(rgb2hsl(...newColor));
        }

    }

    setSliders = () => {
        this.baseColorRGB = hsl2rgb(...this.props.state.baseColor);
        ["r","g","b"].forEach((e,i)=>{
            document.querySelector("#"+e+"r").value = this.baseColorRGB[i];
            document.querySelector("#"+e+"t").value = this.baseColorRGB[i];
            }
        );
    }
    componentDidUpdate = () => {
        this.setSliders();
    }
    render() {
        return (
            <div className="colorInputBox">
            <p>red, green, blue</p>
                {Object.keys(this.inputs).map(e=>
                        <div className="colorInputRow" key={e[0]}>
                        <label htmlFor={`${e}t}`}>{e} 
                        <input name={`${e}r`} id={`${e}r`}  type="range" min="0" max={this.inputs[e]} onChange={this.cChange}/>
                        <input type="text" id={`${e}t`} min="0" max={this.inputs[e]} size="4" onInput={this.cChange} onFocus={this.cFocus} onBlur={()=>this.buffer=[]}/>
                        </label>
                        </div>
                    )
                }
            </div>
        )
    }
    componentDidMount() {
        this.setSliders();
    }
}
