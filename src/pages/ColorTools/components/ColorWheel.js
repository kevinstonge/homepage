import React, { Component } from 'react';
import cWheel from './wheel';
//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorWheel extends Component {

    updateSelectedColor = (color) => { 
        if (color === this.props.state.baseColor) { return; }
        this.props.updateBaseColor(color);
    }
    componentDidUpdate() {
        if(this.colorWheel.selfInvoked === false) {
            this.colorWheel.externalInput(this.props.state.baseColor);
        }
    }
    render() {
        return (
            <React.Fragment>
            <div id="canvasContainer">
                <canvas id="colorCanvas"></canvas>
                <canvas id="colorCanvasUI" tabIndex="1" style={{outline:"none"}}></canvas>
            </div>
            </React.Fragment>
        );
    };
    componentDidMount() {
        let colorCanvas = document.querySelector("#colorCanvas");
        let colorCanvasUI = document.querySelector("#colorCanvasUI");
        this.colorWheel = new cWheel(this.props.state.width,this.props.state.baseColor,colorCanvas,colorCanvasUI,this.updateSelectedColor);
        colorCanvasUI.addEventListener("mousedown",this.colorWheel.mouseDown);
        colorCanvasUI.addEventListener("mousemove",this.colorWheel.mouseMove);
        colorCanvasUI.addEventListener("mouseup",this.colorWheel.mouseUp);
        colorCanvasUI.addEventListener("touchstart",this.colorWheel.mouseDown,{ passive: false });
        colorCanvasUI.addEventListener("touchmove",this.colorWheel.mouseMove,{ passive: false });
        colorCanvasUI.addEventListener("touchend",this.colorWheel.mouseUp);

    }
};

