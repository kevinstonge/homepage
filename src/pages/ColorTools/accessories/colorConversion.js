export function rgb2hsl (r,g,b) {
    r=r/255; g=g/255; b=b/255;
    let h,s,l,d,min,max = null;
    max=Math.max(r,g,b);
    min=Math.min(r,g,b);
    d=max-min;
    l=(max+min);
    if (max===r) { h = 60*(((g-b)/d)%6); }
    if (max===g) { h = 60*(((b-r)/d)+2); }
    if (max===b) { h = 60*(((r-g)/d)+4); }
    if (d===0) { h=0; s=0; }
    if (h<0) { h=h+360; }
    if (d!==0) { s=d/(1-Math.abs(l-1)); }
    h = h.toFixed(2);
    s = (s*100).toFixed(2);
    l = (l*50).toFixed(2);
    return [h,s,l];
}
export function rgb2hex (r, g, b) {
    let c = [r,g,b];
    c = "#" + c.map(
        function(item){
            return item.toString(16);
        }).map(
        function(item){
            if(item.length===1){return "0" + item;}
            else {return(item);}
        }).join("").toUpperCase();
    return c;
}
export function hsl2rgb (h,s,l) {
    s=s/100;
    l=l/100;
    let c=(1-Math.abs((2*l)-1))*s;
    let x=c*(1-Math.abs(((h/60)%2)-1));
    let m=l-c/2;
    let r,g,b;
    if (h<60|h===360) {r=c;g=x;b=0;}
    else if (h<120)	{r=x;g=c;b=0}
    else if (h<180)	{r=0;g=c;b=x}
    else if (h<240) {r=0;g=x;b=c}
    else if (h<300) {r=x;g=0;b=c}
    else if (h<360)	{r=c;g=0;b=x}
    r=Math.round((r+m)*255);g=Math.round((g+m)*255);b=Math.round((b+m)*255);
    return [r,g,b];	
}
export function hex2rgb (hex) {
    hex = (hex[0]==="#") ? hex : `#${hex}`;
    let r = parseInt(hex.substring(1,3),16);
    let g = parseInt(hex.substring(3,5),16);
    let b = parseInt(hex.substring(5,7),16);
    return [r,g,b];
}
export function hex2hsl (hex) {
    return rgb2hsl(...hex2rgb(hex));
}
export function hsl2hex(h,s,l) {
	return rgb2hex(...hsl2rgb(h,s,l));
}
export function hueReset(hue) {
    while (hue < 0) {
        hue = hue + 360;
    }
    while (hue >= 360) {
        hue = hue - 360;
    }
    return hue;
}
