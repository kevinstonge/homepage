const SNSfunc = {
    //cleanup later: any time SNSvars needs to be passed to a subsequent function, you can't use { destructuring }, but if you are only reading values either use destructuring or assign those values to scoped variables
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffle (a) {
      let i=0; let j=0; let t=null;
      for (i = a.length - 1; i > 0; i -= 1) {
        j=Math.floor(Math.random() * (i + 1));
        t=a[i];
        a[i]=a[j];
        a[j]=t;
      }
    },
    highlightOn(SNSstate,SNSdisplay) {
      SNSstate[0]={opacity: 1};
      SNSdisplay(SNSstate);
      setTimeout(this.highlightOff,500,SNSstate,SNSdisplay);
    },
    highlightOff(SNSstate,SNSdisplay) {
      SNSstate[0]={opacity: 0};
      SNSdisplay(SNSstate);
    },
    clearDisplay(SNSdisplay) {
      const newState = { };
      for (let i=1; i<9; i++) {
        newState[i]=[];
        for (let j=1; j<17; j++) {
          newState[i][j]={fillOpacity:0};
        }
      }
      SNSdisplay(newState);
    },
    keyDown(e,SNSvars,SNSdisplay) {
      if (SNSvars["wait"] === true) { return; }
      let key = e.which || e.keyCode || 0;
      let keyString = String.fromCharCode(key).toLowerCase();
      if (key === 13) { this.buttonPress(40); }
      if (key === 8) { this.buttonPress(39); }
      if (key === 222) { this.buttonPress(37); }
      //13-enter, 8-backspace, 17-ctrl
      if (/^[a-z]+$/.test(keyString) && 65 <= key && key <= 90) { this.buttonPress(keyString,SNSvars,SNSdisplay); }
    },
    pushOutput(outputText,{outputCodes},SNSdisplay) {
        this.clearDisplay(SNSdisplay);
        const newState = { };
        for (let i=1; i<9; i++) {
          newState[i]=[];
          let segments = outputCodes[outputText.substr(i-1,1)];
          for (let j=1; j<17; j++) {
            let x = 0;
            if (segments && Object.values(segments).includes(j)) { x = 1; }
            newState[i][j]={fillOpacity:x};
          }
        }
        SNSdisplay(newState);
    },
    syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio) {
      SNSvars.wait = true;
      if (SNSvars.audioArray[0] === "'") { SNSvars.audioArray[0] = "beep"; }
        if (SNSvars.audioArray.length > 0 & SNSvars.isPlaying[0] === false) {
        this.pushOutput(SNSvars.textArray[0],SNSvars,SNSdisplay);
        const startTime = SNSvars.soundIndex[SNSvars.soundIndex.indexOf(SNSvars.audioArray[0])+1];
        const duration = SNSvars.soundIndex[SNSvars.soundIndex.indexOf(SNSvars.audioArray[0])+2];
        //should use function in SNS.js to play audio!!
        SNSvars.snsAudio[0].currentTime = startTime;
        SNSvars.snsAudio[0].play();
        SNSvars.isPlaying[0] = true;
        setTimeout(this.syncNext,duration,SNSvars,SNSstate,SNSdisplay,SNSaudio);
      };
    },
    syncNext(SNSvars,SNSstate,SNSdisplay,SNSaudio) {
      if (SNSvars.isPlaying[0]) { 
        SNSvars.snsAudio[0].pause();
        SNSvars.isPlaying[0]=false;
        SNSvars.snsAudio.shift();
        SNSvars.textArray.shift();
        if (SNSvars.snsAudio.length > 0) { this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio); }
        else { SNSvars.wait = false; }
      }
    },
    spellNext(SNSvars,SNSstate,SNSdisplay,SNSaudio) {
      if (SNSvars.spellProgress < 10) {
        let rawWord = SNSvars.spellingWords[SNSvars.spellProgress];
        let homo = rawWord.substr(rawWord.length - 2);
        let word = rawWord;
        let homophone = false;
        if (homo === "-x") {
          homophone = true;
          word = rawWord.substr(0,rawWord.length-2);
        }
        let userAnswer = SNSvars.displayedText.replace(/[_]/g,'');
    
        //game initialize, first word
        if (SNSvars.spellProgress === 0 & SNSvars.spellAttempts === 0) {
          SNSvars.audioArray.push("spell", word); SNSvars.textArray.push("_","_");
          if (homophone) { SNSvars.audioArray.push("as_in", word, rawWord); SNSvars.textArray.push("_","_","_"); }
          this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
        }
    
        //game in progress, next word
        else if (SNSvars.spellProgress > 0 & SNSvars.spellAttempts === 0) {
          SNSvars.audioArray.push("next" + this.randomInt(1,4), word); SNSvars.textArray.push("_","_");
          if (homophone) { SNSvars.audioArray.push("as_in", word, rawWord); SNSvars.textArray.push("_","_","_"); }
          this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
        }
    
        //correct on first try
        else if (SNSvars.spellAttempts === 1 & word === userAnswer) {
          SNSvars.correctWords += 1;
          SNSvars.spellProgress += 1;
          SNSvars.spellAttempts = 0;
          SNSvars.audioArray.push('correct' + this.randomInt(0,3));
          SNSvars.textArray.push(SNSvars.displayedText);
          this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
          this.spellNext(SNSvars,SNSstate,SNSdisplay,SNSaudio);
        }
        //incorrect on first try
        else if (SNSvars.spellAttempts === 1 & word !== userAnswer) {
          SNSvars.audioArray.push('wrong', word);
          SNSvars.textArray.push("_", "_");
          this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
        }
    
        //correct on second try
        else if (SNSvars.spellAttempts === 2 & word === userAnswer) {
          SNSvars.spellProgress += 1;
          SNSvars.spellAttempts = 0;
          SNSvars.audioArray.push('correct' + this.randomInt(0,3));
          SNSvars.textArray.push(SNSvars.displayedText);
          this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
          this.spellNext(SNSvars,SNSstate,SNSdisplay,SNSaudio);
        }
        //incorrect on second try
        else if (SNSvars.spellAttempts === 2 & word !== userAnswer) {
          SNSvars.spellProgress +=1;
          SNSvars.spellAttempts = 0;
          SNSvars.audioArray.push('incorrect', word, 'is');
          SNSvars.textArray.push(SNSvars.displayedText, '_')
          for (let i=0;i<word.length;i++) {
            SNSvars.audioArray.push(word.substr(i,1));
            SNSvars.textArray.push(word.substr(0,i) + '_');
          }
          SNSvars.audioArray.push(word);
          SNSvars.textArray.push(word + "_", word + "_");
          this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
          this.spellNext(SNSvars,SNSstate,SNSdisplay,SNSaudio);
        }
      }
    //completed all words - display score
      else if (SNSvars.spellProgress === 10) {
        let wrongWords = 10 - SNSvars.correctWords;
        let displayedScore = "+" + SNSvars.correctWords + "  -" + wrongWords;
        if (wrongWords === 0) {
          SNSvars.textArray.push(displayedScore, displayedScore, displayedScore, displayedScore);
          SNSvars.audioArray.push("activity" + this.randomInt(1,4), "activity" + this.randomInt(1,4), "activity" + this.randomInt(1,4), "perfect_score");
        }
        else {
          SNSvars.textArray.push(displayedScore, displayedScore, displayedScore, displayedScore, displayedScore, displayedScore, displayedScore);
          SNSvars.audioArray.push("activity" + this.randomInt(1,4), "activity" + this.randomInt(1,4), 'your_score', SNSvars.correctWords, "correct", wrongWords, "wrong2");
        }
      }
    },

    buttonPress(button,SNSvars,SNSstate,SNSdisplay,SNSaudio) {
        console.log(button);
      if (button === 1) { this.clearDisplay(); this.resetVariables(); SNSvars.mode = "off"; };
      if (button === 10) {
        this.resetVariables();
        if (SNSvars.mode === "off") {
          SNSvars.audioArray.push("activity1");
        }
        else {
          SNSvars.audioArray.push("activity" + this.randomInt(1,4));
        };
        SNSvars.textArray.push("spell  a");
        SNSvars.mode = "on-spella";
        this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio);
      };
      if (SNSvars.wait === true) { return; };
      if (button >= 11 & button <= 36) { button = String.fromCharCode(button*1+86); };
      if (button === 37) { button = "'"; };
      if (SNSvars.mode === "off" & button !== 10 && button !== 1) { this.highlightOn(SNSstate,SNSdisplay); };
      if (SNSvars.mode.slice(0,8) === "on-spell" & (/^[a-d]+$/.test(button))) { SNSvars.audioArray.push(button); SNSvars.textArray.push("spell  " + button); this.syncOutput(SNSvars,SNSstate,SNSdisplay,SNSaudio); SNSvars.mode = "on-spell" + button; };
      if (SNSvars.mode !== "off" & button === 9) { SNSvars.audioArray.push("activity1"); SNSvars.textArray.push("say it a"); this.syncOutput(); SNSvars.mode = "on-sayita"; };
      if (SNSvars.mode.slice(0,8) === "on-sayit" & (/^[a-d]+$/.test(button))) { SNSvars.audioArray.push(button); SNSvars.textArray.push("say it " + button); this.syncOutput(); SNSvars.mode = "on-sayit" + button; };
      if (SNSvars.mode.slice(0,2) === "on" & (/^[e-z]+$/.test(button) | button === "'")) {
        SNSvars.audioArray.push(button); SNSvars.textArray.push(SNSvars.displayedText); this.syncOutput();
      };
      if (button === 2 & (SNSvars.mode.slice(3,8) === "spell" | SNSvars.mode.slice(3,8) === "sayit")) {
        SNSvars.level = SNSvars.mode.slice(8,9);
        SNSvars.spellProgress = 0;
        SNSvars.spellAttempts = 0;
        SNSvars.correctWords = 0;
        SNSvars.spellingWords = SNSvars.words[SNSvars.level];
        SNSvars.spellingWords = this.shuffle(SNSvars.spellingWords);
        SNSvars.spellingWords = SNSvars.spellingWords.slice(0,10);
        if (SNSvars.mode.slice(3,8) === "sayit") {
          for (let i = 0; i<SNSvars.spellingWords.length; i++) {
            if (SNSvars.spellingWords[i].substr(SNSvars.spellingWords[i].length - 2) === "-x") { SNSvars.word = SNSvars.spellingWords[i].substr(0,SNSvars.spellingWords[i].length-2); }
            else { SNSvars.word = SNSvars.spellingWords[i]; }
            SNSvars.audioArray.push("sayit", SNSvars.word, "silence");
            SNSvars.textArray.push(SNSvars.word, SNSvars.word, SNSvars.word);
            this.syncOutput();
          };
        }
        SNSvars.mode = "go-spell" + SNSvars.level;
        this.spellNext();
      };
      if (SNSvars.mode !== "off" & button === 8) {
        SNSvars.mode = "letter";
        let letter =  String.fromCharCode(97 + Math.floor(Math.random() * 26));
        SNSvars.audioArray.push("activity" + this.randomInt(1,4), letter);
        SNSvars.textArray.push(letter + "_", letter + "_");
        this.syncOutput();
      }
      if (SNSvars.mode !== "off" & button === 7) {
        SNSvars.mode = "code";
        SNSvars.textArray.push("_");
        SNSvars.audioArray.push("activity" + this.randomInt(1,4));
        this.syncOutput();
      };
      if ((/^[a-z]+$/.test(button) | button === "'") & (SNSvars.mode.slice(0,8) === "go-spell" | SNSvars.mode.slice(0,4) === "code" | SNSvars.mode.slice(0,6) === "letter")) {
        let truncatedText = SNSvars.displayedText.replace(/[_]/g,'');
        let newText = truncatedText + button;
        if (newText.length < 8) { SNSvars.textArray.push(newText + "_"); SNSvars.audioArray.push(button); this.syncOutput(); }
        else if (newText.length === 8 ) { SNSvars.textArray.push(newText); SNSvars.audioArray.push(button); this.syncOutput(); }
        else { SNSvars.textArray.push(newText.slice(0,8)); SNSvars.audioArray.push("beep"); this.syncOutput(); };
      };
      if (button === 39 & (SNSvars.mode.slice(0,8) === "go-spell" | SNSvars.mode.slice(0,4) === "code" | SNSvars.mode.slice(0,6) === "letter")) { this.pushOutput("_"); };
      if (button === 40 & (SNSvars.mode.slice(0,4) === "code" | SNSvars.mode.slice(0,6) === "letter")) {
        let input = SNSvars.displayedText.replace(/[_]/g,'');
        let decode = "";
        for (let i = 0; i<input.length; i++) {
          decode += SNSvars.codeB[SNSvars.codeA.indexOf(input[i])];
        };
        SNSvars.audioArray.push("activity" + this.randomInt(1,4));
        SNSvars.textArray.push(decode + "_");
        this.syncOutput();
      };
      if (SNSvars.mode.slice(0,8) === "go-spell" & button === 40) {
        SNSvars.spellAttempts += 1;
        this.spellNext();
      };
      if (SNSvars.mode.slice(0,8) === "go-spell" & button === 3) {
        SNSvars.spellProgress = 0;
        SNSvars.spellAttempts = 0;
        SNSvars.correctWords = 0;
        this.spellNext();
      }
      if (SNSvars.mode.slice(0,8) === "go-spell" & button === 4) {
        SNSvars.audioArray.push(SNSvars.spellingWords[SNSvars.spellProgress]); SNSvars.textArray.push(SNSvars.displayedText); this.syncOutput();
      }
      if (SNSvars.mode !== "off" & button === 6) {
        let mysteryWord = SNSvars.mysteryWords[this.randomInt(0,SNSvars.mysteryWords.length-1)];
        SNSvars.mysteryWordGuesses = 0;
        SNSvars.mysteryWordShard = mysteryWord;
        SNSvars.mode = "mysteryWord";
        let blankSpaces = "";
        for (let i=0;i<mysteryWord.length;i++) { blankSpaces = blankSpaces + "_"; };
        SNSvars.audioArray.push("activity" + this.randomInt(1,4)); SNSvars.textArray.push(blankSpaces); this.syncOutput();
      };
      //mystery word game: six guesses allowed, clue counts for two guesses
      if (SNSvars.mode === "mysteryWord" & (/^[a-z]+$/.test(button) | button === "'" | button === 5)) {
        let mysteryDisplay = SNSvars.displayedText;
        let clueLetter = "";
        if (button === 5) {
            clueLetter = SNSvars.mysteryWordShard[this.randomInt(0,SNSvars.mysteryWordShard.length-1)];
            SNSvars.mysteryWordGuesses += 2;
            for(let i=0;i<SNSvars.mysteryWord.length;i++) {
              if (SNSvars.mysteryWord[i] === clueLetter) { mysteryDisplay = mysteryDisplay.substring(0,i) + clueLetter + mysteryDisplay.substring(i+1,mysteryDisplay.length); };
            }
        }
        else {
          clueLetter = button;
          if (SNSvars.mysteryWordShard.indexOf(button) === -1) { SNSvars.mysteryWordGuesses += 1; }
          for(let i=0;i<SNSvars.mysteryWord.length;i++) {
            if (SNSvars.mysteryWord[i] === clueLetter) { mysteryDisplay = mysteryDisplay.substring(0,i) + clueLetter + mysteryDisplay.substring(i+1,mysteryDisplay.length); };
          }
        };
        SNSvars.mysteryWordShard = SNSvars.mysteryWordShard.replace(new RegExp(clueLetter, 'g'),"");
        SNSvars.audioArray.push(clueLetter); SNSvars.textArray.push(SNSvars.displayedText); this.syncOutput();
    //check for win
        if (SNSvars.mysteryWordGuesses <= 6 & mysteryDisplay !== SNSvars.mysteryWord & SNSvars.mysteryWord.indexOf(clueLetter) > -1) { SNSvars.audioArray.push("activity" + this.randomInt(1,4)); SNSvars.textArray.push(mysteryDisplay); this.syncOutput(); }
        else if (SNSvars.mysteryWordGuesses > 6 & mysteryDisplay !== SNSvars.mysteryWord) { SNSvars.audioArray.push("iwin"); SNSvars.textArray.push(SNSvars.mysteryWord); this.syncOutput(); }
        else if (SNSvars.mysteryWordGuesses <= 6 & mysteryDisplay === SNSvars.mysteryWord) { SNSvars.audioArray.push("youwin"); SNSvars.textArray.push(SNSvars.mysteryWord); this.syncOutput(); };
      };
    }

} 
export default SNSfunc;