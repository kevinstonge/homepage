import React, { Component } from 'react'
import {hsl2rgb,hueReset} from '../accessories/colorConversion';


export default class Contrast extends Component {
    constructor() {
        super();
        this.push = 0
    }
    calculateColor = (baseHue,baseSaturation,baseLuminosity) => {
        /*
        source: https://www.w3.org/TR/WCAG20-TECHS/G17.html
        Procedure
        Measure the relative luminance of each letter (unless they are all uniform) using the formula:
            L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
            if R sRGB <= 0.03928 then R = R sRGB /12.92 else R = ((R sRGB +0.055)/1.055) ^ 2.4
            if G sRGB <= 0.03928 then G = G sRGB /12.92 else G = ((G sRGB +0.055)/1.055) ^ 2.4
            if B sRGB <= 0.03928 then B = B sRGB /12.92 else B = ((B sRGB +0.055)/1.055) ^ 2.4
            and R sRGB, G sRGB, and B sRGB are defined as:
            R sRGB = R 8bit /255
            G sRGB = G 8bit /255
            B sRGB = B 8bit /255

        Calculate the contrast ratio using the following formula.
            (L1 + 0.05) / (L2 + 0.05), where
                L1 is the relative luminance of the lighter color
                L2 is the relative luminance of the darker color.
                Check that the contrast ratio is equal to or greater than 7:1
        */
        let rgbS = hsl2rgb(baseHue,baseSaturation,baseLuminosity);
        let l1;
        let l2;
        let lRatio;
        let coArray = [0.2126,0.7152,0.0722];
        let rgbSArray = [...rgbS];
        let rgbCArray;

        rgbSArray.forEach((e,i,a)=>{
            e = e/255;
            if (e <= 0.03928) {
                e = e/12.92;
            }
            else {
                e = e + 0.055;
                e = e/1.055;
                e = e**2.4;
            }
            e = coArray[i]*e;
            a[i] = e;
        })
        l1 = rgbSArray.reduce((a,b)=>a+b);

        l2 = ((l1+0.05)<0.164) ? 1.1021 : (l1+0.05)/7 - 0.05;
        lRatio = (l1+.05)/(l2+.05);
        rgbCArray = [...rgbS];
        rgbCArray.forEach((e,i,a)=>{
            e = e/255; 
            e = e/coArray[i]; 
            if (e <= 0.14278) { //dark
                e = (e+.05)*12.92;
            }
            else { //light
                e = (e+.05)**(1/2.4);
                e = e*1.055;
                e = e - 0.055;
            }
            e = e*255;
            e = e*l2;
            if (e > 255) { e = 255; }
            if (e < 0) { e = 0; }
            a[i] = e.toFixed(0);
        });

        return `rgb(${rgbCArray[0]},${rgbCArray[1]},${rgbCArray[2]})`;

    }
    render() {
        let baseColor = this.props.globalState.baseColor;
        let baseHue = Number(baseColor[0]);
        let baseSaturation = Number(baseColor[1]);
        let baseLuminosity = Number(baseColor[2]);
        let contrastColor = this.calculateColor(baseHue,baseSaturation,baseLuminosity);
        let baseColorCSS = `hsl(${baseColor[0]},${baseColor[1]}%,${baseColor[2]}%)`;
        return (
            <div>
                <div className="contrastColorRow">
                    <p className="contrastColorLabel">Color with high contrast to selected color:
                    <span 
                        className="contrastColorBox"
                        style={{backgroundColor:contrastColor}}
                    >
                        &nbsp;&nbsp;
                    </span>
                    </p>
                </div>
                <div className="contrastColorSample" style={{backgroundColor:baseColorCSS}}>
                    <p className="contrastColorSampleText" style={{color:contrastColor}}>
                        <span style={{fontWeight:"normal"}}>Normal </span>
                        <span style={{fontWeight:"bold"}}>Bold </span>
                        <span style={{fontStyle:"italic"}}>Italic </span>
                    </p>
                    <p style={{color:contrastColor}}>{contrastColor}</p>
                </div>
                {/* this code was used to look for the most contrasting hues */}
                {/* <table>
                    {new Array(60).fill("0").map((e,i)=>
                        <tr key={`tr${i}`}>
                            <td>{i*6}</td>
                            {new Array(60).fill("0").map((e,j)=>
                                <td style={{backgroundColor:`hsl(${i*6},100%,50%)`}}>
                                    <span style={{color:`hsl(${hueReset((i*6)+(j*6))},100%,50%)`}}>
                                        {((j*6))}
                                    </span>
                                </td>
                            )}
                        </tr>
                    )}
                </table> */}

                {/* hues of 65 & 175 look best contrasting low luminosities */}
                {/* hues of 226 through  20 look best contrasting high luminosities */}
                {/* luminosity cutoff to switch colors varies by hue AND saturation*/}

                {/* the code below generates tables of possible background colors with text color of baseColor */}

                {/* <div>
                    {new Array(10).fill("0").map((e,i)=>{
                        return(
                            <table style={{display:"inline-block"}}>
                            {new Array(10).fill("0").map((f,j)=>{
                                return(
                                    <tr>
                                        {new Array(10).fill("0").map((g,k)=>{
                                            return(
                                                <td style={{backgroundColor:`hsl(${i*36},${j*10}%,${(k+1)*10}%)`}}>
                                                    <span style={{color:baseColorCSS}}>hi</span>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                            </table>
                        )
                    })}
                </div> */}
            </div>
        )
    }
}
