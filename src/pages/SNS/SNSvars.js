const SNSvar= {
    spellProgress:0,
    correctWords:0,
    displayedText:"",
    level:"a",
    mode:"off",
    spellingWords:[],
    audioBuffer:[],
    spellAttempts:0,
    audioArray:[],
    textArray:[],
    wait:false,
    mysteryWord:"",
    mysteryWordGuesses:0,
    mysteryWordShard:"",
    mysteryWords:["above", "angel", "answer", "calf", "does", "earth", "echo", "extra", "four", "guess", "half", "health", "iron", "learn", "ocean", "once", "oven", "pint", "pull", "range", "says", "sure", "swap", "talk", "touch", "view", "warm", "wash", "word", "another", "beauty", "beige", "blood", "bullet", "carry", "chalk", "child", "danger", "early", "eight", "flood", "floor", "front", "guide", "haste", "heaven", "linger", "mirror", "other", "priest", "ready", "rural", "school", "squad", "squat", "sugar", "today", "union", "watch", "water", "yield", "already", "believe", "built", "bushel", "comfort", "coming", "couple", "cousin", "enough", "finger", "guard", "healthy", "heavy", "instead", "laugh", "measure", "mother", "niece", "outdoor", "period", "plague", "police", "promise", "quiet", "ranger", "relief", "remove", "search", "shield", "should", "shovel", "someone", "source", "statue", "terror", "trouble", "welcome", "wolves", "woman", "wonder", "worth", "abscess", "ancient", "anything", "brother", "bureau", "butcher", "caravan", "circuit", "corsage", "couldn't", "courage", "discover", "dungeon", "earnest", "feather", "freight", "greater", "jealous", "journey", "language", "laughter", "leisure", "lettuce", "machine", "minute", "pierce", "pleasure", "plunger", "poultry", "quotient", "reindeer", "rhythm", "schedule", "scissors", "serious", "shoulder", "stomach", "stranger", "surgeon", "tomorrow", "treasure", "workman", "yacht"],
    words:{"a" : ["above", "angel", "answer", "calf", "does", "earth", "echo", "extra", "for-x", "four-x", "guess", "half", "health", "iron", "learn", "ocean", "once", "one-x", "oven", "pint", "pull", "range", "says", "ski", "sure", "swap", "talk", "touch", "to-x", "two-x", "view", "warm", "was", "wash", "word"], "b" : ["another", "beauty", "beige", "blood", "bullet", "carry", "chalk", "child", "danger", "early", "eight-x", "flood", "floor", "front", "guide", "haste", "heaven", "linger", "mirror", "other", "priest", "ready", "rural", "school", "squad", "squat", "sugar", "today", "union", "watch", "water", "yield"], "c" : ["already", "believe", "built", "bushel", "comfort", "coming", "couple", "cousin", "enough", "finger", "guard", "healthy", "heavy", "instead", "laugh", "measure", "mother", "niece", "outdoor", "period", "plague", "police", "promise", "quiet", "ranger", "relief", "remove", "search", "shield", "should", "shovel", "someone", "source", "statue", "terror", "trouble", "welcome", "wolves", "woman", "wonder", "worth"], "d" : ["abscess", "ancient", "anything", "brother", "bureau", "butcher", "caravan", "circuit", "corsage", "couldn't", "courage", "discover", "dungeon", "earnest", "feather", "freight", "greater", "jealous", "journey", "language", "laughter", "leisure", "lettuce", "machine", "minute", "pierce", "pleasure", "plunger", "poultry", "quotient", "reindeer", "rhythm", "schedule", "scissors", "serious", "shoulder", "stomach", "stranger", "surgeon", "tomorrow", "treasure", "workman", "yacht"]},
    codeA:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "'"],
    codeB:["f", "e", "d", "c", "b", "a", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "'"],
    isPlaying:[false],
    soundIndex:[0,0,748,1,0.748,623,10,1.367,640,2,2.019,549,3,2.58,593,4,3.177,593,5,3.784,716,6,4.498,641,7,5.127,633,8,5.759,495,9,6.250,760,"a",7.012,570,"above",7.589,794,"abscess",8.383,884,"activity1",9.267,842,"activity2",10.121,918,"activity3",11.025,842,"activity4",11.860,848,"already",12.722,744,"ancient",13.462,776,"angel",14.238,742,"another",14.993,760,"answer",15.765,764,"anything",16.593,800,"as_in",17.381,890,"b",18.263,571,"beauty",18.826,692,"beep",19.518,303,"beige",19.820,838,"believe",20.668,844,"blood",21.496,678,"brother",22.173,688,"built",22.855,599,"bullet",23.462,649,"bureau",24.130,796,"bushel",24.934,686,"butcher",25.611,571,"c",26.192,603,"calf",26.794,686,"caravan",27.483,964,"carry",28.439,600,"chalk",29.039,611,"child",29.642,806,"circuit",30.440,684,"comfort",31.119,852,"coming",31.973,718,"correct",32.695,776,"correct0",33.469,1030,"correct1",34.493,1149,"correct2",35.680,1016,"correct3",36.692,822,"corsage",37.508,1036,"couldn't",38.554,732,"couple",39.270,649,"courage",39.917,740,"cousin",40.657,674,"d",41.334,567,"danger",41.916,804,"discover",42.719,852,"does",43.573,653,"dungeon",44.239,786,"e",45.024,533,"early",45.582,649,"earnest",46.241,690,"earth",46.941,565,"echo",47.502,657,"eight",49.208,420,"eight-x",48.171,1022,"enough",49.649,620,"extra",50.286,712,"f",50.980,481,"feather",51.465,595,"finger",52.074,770,"flood",52.858,660,"floor",53.521,641,"for",54.963,609,"for-x",54.167,792,"four",56.374,607,"four-x",55.568,810,"freight",56.975,620,"front",57.598,740,"g",58.330,573,"greater",58.911,746,"guard",59.660,704,"guess",60.387,619,"guide",61.010,904,"h",61.926,567,"half",62.493,633,"haste",63.111,655,"health",63.778,637,"healthy",64.420,742,"heaven",65.173,647,"heavy",65.813,611,"i",66.418,560,"incorrect",66.991,2874,"instead",69.866,982,"iron",70.856,718,"is",71.578,531,"iwin",72.107,678,"j",72.776,688,"jealous",73.474,680,"journey",74.155,659,"k",74.813,625,"l",75.446,583,"language",76.034,1056,"laugh",77.082,694,"laughter",77.784,822,"learn",78.609,814,"leisure",79.401,836,"lettuce",80.237,710,"linger",80.949,798,"m",81.642,530,"machine",82.266,866,"measure",83.129,690,"minute",83.829,678,"mirror",84.511,700,"mother",85.232,620,"n",85.890,540,"next1",86.463,1250,"next2",87.740,1094,"next3",88.834,1082,"next4",89.915,680,"niece",90.614,600,"o",91.240,500,"ocean",91.775,610,"once",92.406,710,"one",93.891,621,"one-x",93.154,732,"other",94.511,619,"outdoor",95.122,850,"oven",95.988,540,"p",96.441,641,"perfect_score",97.181,1080,"period",98.267,740,"pierce",99.011,570,"pint",99.614,551,"plague",100.163,696,"pleasure",100.861,816,"plunger",101.677,798,"police",102.487,770,"poultry",103.280,810,"priest",104.092,716,"promise",104.826,710,"pull",105.549,657,"q",106.209,630,"quiet",106.852,680,"quotient",107.536,860,"r",108.404,600,"range",109.023,900,"ranger",109.941,866,"ready",110.823,577,"reindeer",111.417,960,"relief",112.401,758,"remove",113.158,870,"rhythm",114.048,593,"rural",114.650,770,"s",115.444,530,"sayit",115.987,2143,"says",118.128,760,"schedule",118.881,858,"school",119.733,780,"scissors",120.525,808,"search",121.333,688,"serious",122.024,780,"shield",122.808,828,"should",123.638,690,"shoulder",124.343,818,"shovel",125.155,732,"silence",125.889,1044,"ski",126.929,726,"someone",127.653,820,"source",128.471,620,"spell",129.118,738,"squad",129.846,980,"squat",130.840,842,"statue",131.684,832,"stomach",132.494,810,"stranger",133.327,1032,"sugar",134.356,680,"sure",135.057,700,"surgeon",135.787,700,"swap",136.511,670,"t",137.188,571,"talk",137.771,630,"terror",138.413,630,"to",139.656,540,"today",140.117,661,"tomorrow",140.884,870,"touch",141.776,570,"to-x",139.068,530,"treasure",142.368,740,"trouble",143.119,692,"two",144.621,557,"two-x",143.825,780,"u",145.182,605,"union",145.795,852,"v",146.643,690,"view",147.353,674,"w",148.034,667,"warm",148.702,640,"was",149.359,700,"wash",150.079,640,"watch",150.726,680,"water",151.414,700,"welcome",152.109,800,"wolves",152.935,790,"woman",153.745,700,"wonder",154.447,720,"word",155.178,736,"workman",155.920,768,"worth",156.682,714,"wrong",157.409,1660,"wrong2",159.093,600,"x",159.718,520,"y",160.276,600,"yacht",160.895,640,"yield",161.556,810,"your_score",162.374,1279,"youwin",163.653,750,"z",164.407,555],
    outputCodes:{"a":[1, 2, 3, 4, 6, 14, 10],"b":[2, 3, 4, 5, 8, 10, 12],"c":[1, 2, 5, 6],"d":[2, 3, 4, 5, 8, 12],"e":[1, 2, 5, 6, 10, 14],"f":[1, 2, 6, 10, 14],"g":[1, 2, 4, 5, 6, 10],"h":[1, 3, 4, 6, 10, 14],"i":[2, 5, 8, 12],"j":[3, 4, 5, 6],"k":[8, 9, 11, 12],"l":[1, 5, 6],"m":[1, 3, 4, 6, 7, 9],"n":[1, 3, 4, 6, 7, 11],"o":[1, 2, 3, 4, 5, 6],"p":[1, 2, 3, 6, 10, 14],"q":[1, 2, 3, 4, 5, 6, 11],"r":[1, 2, 3, 6, 10, 11, 14],"s":[1, 2, 4, 5, 10, 14],"t":[2, 8, 12],"u":[1, 3, 4, 5, 6],"v":[1, 6, 9, 13],"w":[1, 3, 4, 6, 11, 13],"x":[7, 9, 11, 13],"y":[7, 9, 12],"z":[2, 5, 9, 13],"1":[3, 4],"2":[2, 3, 5, 6, 10, 14],"3":[2, 3, 4, 5, 10, 14],"4":[1, 3, 4, 10, 14],"5":[1, 2, 4, 5, 10, 14],"6":[1, 2, 4, 5, 6, 10, 14],"7":[2, 3, 4],"8":[1, 2, 3, 4, 5, 6, 10, 14],"9":[1, 2, 3, 4, 10, 14],"0":[1, 2, 3, 4, 5, 6],"_":[5]," ":[],"+":[8, 10, 12, 14],"-":[10, 14],".":[16],"'":[15]},
};
export default SNSvar;