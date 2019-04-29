const SNSfunc = {
    test1 (button,SNSvars,SNSfunc,SNSdisplay) { 
        const newState = { };
        for (let i=1; i<9; i++) {
          newState[i]=[];
          for (let j=1; j<17; j++) {
            newState[i][j]={fillOpacity:0};
          }
        }
        SNSdisplay(newState);
    },
    
    test3 (e) {
        return "test3" + e;
    },

} 
export default SNSfunc;