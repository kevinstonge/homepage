import React, { Component } from 'react';
import '../components/colorSliders.css';

export default class HslSliders extends Component {
    constructor(props) {
        super(props);
        this.inputs = {
            "h":359.99,
            "s":100,
            "l":100
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
        const newColor = this.props.state.baseColor.slice();    
        if ((key === null || value === null) && e.nativeEvent.inputType.substr(0,6)!=="delete") {return;}
        if (e.target.type === "text") {
            value = value.replace(/\./,"[dec]").replace(/\./g,"").replace("[dec]",".").replace(/[^\d.]/g,"");
            if (value >= this.inputs[colorVar]) value = this.inputs[colorVar];
            this.buffer=[colorVar,value];
            e.target.value = this.buffer[1];
        }
        if (value) {
            newColor["hsl".indexOf(colorVar)] = Number(value);
            this.props.updateBaseColor(newColor);
        }
    }

    setSliders = () => {
        ["h","s","l"].forEach((e,i)=>{
            const value = (e===this.buffer[0]) ? this.buffer[1] : this.props.state.baseColor[i];
            document.querySelector(`#${e}r`).value = Number(value);
            document.querySelector(`#${e}t`).value = value;
            }
        );
    }
    componentDidUpdate = () => {
        this.setSliders();
    }
    render() {
        return (
                <div className="colorInputBox">
                    <p>hue, saturation, luminosity</p>
                {Object.keys(this.inputs).map(e=>
                        <div className="colorInputRow" key={e[0]}>
                        <label htmlFor={`${e}t`}>{e} 
                        <input name={`${e}t`} id={`${e}r`}  type="range" min="0" max={this.inputs[e]} onChange={this.cChange}/>
                        <input type="text" id={`${e}t`} min="0" max={this.inputs[e]} size="4" onChange={this.cChange} onFocus={this.cFocus} onBlur={()=>this.buffer=[]}/>
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
