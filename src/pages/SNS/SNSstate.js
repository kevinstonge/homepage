const SNSstate = { };
SNSstate[0]={opacity: 0};
for (let i=1; i<9; i++) {
  SNSstate[i]=[];
  for (let j=1; j<17; j++) {
    SNSstate[i][j]={fillOpacity:1};
  }
}
export default SNSstate;