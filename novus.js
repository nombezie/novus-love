/* NOVUS LOVE v3 — Systemic Psychological Dynamics Engine */
(function(){
"use strict";

// ── FRIENDLY NAME MAP ──
var F={emotionRegulation:"Emotion Regulation",selfWorth:"Self-Worth",secureWithPartner:"Security with Partner",
hope:"Hope",rejectionSensitivity:"Rejection Sensitivity",trustInPartner:"Trust in Partner",
externalStress:"External Stress",selfExpectations:"Self-Expectations",health:"Overall Health",
intimacy:"Intimacy",safety:"Safety",trust:"Trust",bond:"Bond",connection:"Connection",
meaning:"Meaning",honesty:"Honesty",stability:"Stability",growth:"Growth",tension:"Tension",
friction:"Friction",overall:"Overall",passion:"Passion",commitment:"Commitment",
sternIntimacy:"Emotional Intimacy",reactivity:"Reactivity",withdrawal:"Withdrawal",
attunement:"Attunement",resilience:"Resilience",expressiveness:"Expressiveness",
selfRegulation:"Self-Regulation",adaptability:"Adaptability"};
function friendly(k){return F[k]||k.replace(/([A-Z])/g," $1").replace(/^./,function(s){return s.toUpperCase();});}

// ── TOOLTIPS DATA ──
var TIP={emotionRegulation:"Ability to manage emotional responses. Higher = calmer under pressure.",
selfWorth:"Core sense of personal value. Low self-worth amplifies negative events.",
secureWithPartner:"How safe this person feels with their partner.",
hope:"Belief that things can improve. Low hope reduces effort investment.",
rejectionSensitivity:"Tendency to overreact to rejection. Higher = more reactive.",
trustInPartner:"Confidence in partner reliability and good intentions.",
externalStress:"Pressure from outside the relationship. Reduces emotional bandwidth.",
selfExpectations:"Standards held for own behavior. Very high = perfectionism.",
health:"Overall psychological wellbeing composite score.",
intimacy:"Emotional and physical closeness.",safety:"How protected each partner feels.",
trust:"Confidence in partner consistency. Built slowly, lost quickly.",
bond:"Depth of emotional connection and attachment.",
connection:"Day-to-day feeling of being in sync.",
meaning:"Shared sense of purpose in the relationship.",
honesty:"Transparency and authenticity in communication.",
stability:"Resistance to disruption. High stability buffers conflict.",
growth:"Capacity for positive change and learning.",
tension:"Accumulated unresolved stress. Amplifies negatives.",
friction:"Day-to-day irritation. Erodes satisfaction.",
overall:"Weighted composite of all relationship metrics.",
passion:"Physical and emotional desire (Sternberg).",
commitment:"Dedication to future. Satisfaction+Investment-Alternatives (Rusbult).",
sternIntimacy:"Emotional closeness: warmth, sharing, understanding (Sternberg)."};

// ── MBTI DATA (16 types) Weight: 0.04 ──
var MBTI={
INTJ:{label:"Architect",ocean:{O:78,C:75,E:28,A:35,N:45},r:-0.02,w:0.06,a:0.03,g:0.04,res:0.04,exp:-0.04,sr:0.06,adp:0.02,conflict:"Analyzes conflict logically. Withdraws to formulate position."},
INTP:{label:"Logician",ocean:{O:82,C:42,E:32,A:45,N:52},r:-0.01,w:0.05,a:0.01,g:0.04,res:0.03,exp:-0.05,sr:0.04,adp:0.05,conflict:"Detaches emotionally to analyze."},
ENTJ:{label:"Commander",ocean:{O:72,C:82,E:75,A:32,N:38},r:0.03,w:-0.02,a:0.01,g:0.05,res:0.05,exp:0.04,sr:0.05,adp:0.03,conflict:"Confronts head-on with logic."},
ENTP:{label:"Debater",ocean:{O:85,C:38,E:72,A:42,N:48},r:0.04,w:-0.03,a:0.02,g:0.05,res:0.03,exp:0.05,sr:0.02,adp:0.06,conflict:"Reframes conflict as debate."},
INFJ:{label:"Advocate",ocean:{O:78,C:62,E:30,A:72,N:58},r:0.03,w:0.03,a:0.06,g:0.04,res:0.02,exp:0.02,sr:0.04,adp:0.03,conflict:"Absorbs then processes internally."},
INFP:{label:"Mediator",ocean:{O:82,C:38,E:28,A:75,N:65},r:0.04,w:0.04,a:0.05,g:0.03,res:0.01,exp:0.03,sr:0.02,adp:0.04,conflict:"Takes conflict personally."},
ENFJ:{label:"Protagonist",ocean:{O:72,C:65,E:78,A:82,N:52},r:0.02,w:-0.04,a:0.07,g:0.04,res:0.03,exp:0.06,sr:0.03,adp:0.04,conflict:"Mediates and restores harmony."},
ENFP:{label:"Campaigner",ocean:{O:88,C:35,E:75,A:72,N:55},r:0.04,w:-0.03,a:0.05,g:0.04,res:0.02,exp:0.06,sr:0.01,adp:0.06,conflict:"Emotionally expressive in conflict."},
ISTJ:{label:"Logistician",ocean:{O:32,C:85,E:30,A:48,N:38},r:-0.02,w:0.03,a:0.00,g:0.01,res:0.05,exp:-0.04,sr:0.07,adp:-0.02,conflict:"References precedent and rules."},
ISFJ:{label:"Defender",ocean:{O:35,C:78,E:32,A:82,N:55},r:0.01,w:0.02,a:0.05,g:0.01,res:0.04,exp:0.01,sr:0.06,adp:-0.01,conflict:"Avoids confrontation. May resent."},
ESTJ:{label:"Executive",ocean:{O:35,C:85,E:72,A:38,N:35},r:0.02,w:-0.02,a:-0.01,g:0.02,res:0.05,exp:0.03,sr:0.06,adp:-0.01,conflict:"Expects clear resolution."},
ESFJ:{label:"Consul",ocean:{O:38,C:72,E:75,A:85,N:52},r:0.02,w:-0.03,a:0.05,g:0.01,res:0.03,exp:0.05,sr:0.04,adp:0.00,conflict:"Seeks quick harmony."},
ISTP:{label:"Virtuoso",ocean:{O:65,C:45,E:35,A:35,N:35},r:-0.01,w:0.04,a:-0.02,g:0.03,res:0.05,exp:-0.05,sr:0.04,adp:0.05,conflict:"Stays calm and detached."},
ISFP:{label:"Adventurer",ocean:{O:72,C:38,E:35,A:72,N:55},r:0.02,w:0.03,a:0.04,g:0.02,res:0.02,exp:0.02,sr:0.02,adp:0.04,conflict:"Withdraws quietly when hurt."},
ESTP:{label:"Entrepreneur",ocean:{O:68,C:38,E:82,A:38,N:38},r:0.04,w:-0.04,a:-0.01,g:0.03,res:0.04,exp:0.05,sr:0.01,adp:0.06,conflict:"Pragmatic and direct."},
ESFP:{label:"Entertainer",ocean:{O:72,C:32,E:85,A:68,N:48},r:0.03,w:-0.04,a:0.03,g:0.02,res:0.02,exp:0.07,sr:0.01,adp:0.05,conflict:"Expresses emotions openly."}
};

// ── ENNEAGRAM DATA (9 types) Weight: 0.02 ──
var ENNEA={
"1":{label:"Reformer",r:0.03,w:0.01,a:0.02,g:0.02,res:0.03,exp:-0.01,sr:0.05,adp:-0.02,pattern:"High standards for self and partner."},
"2":{label:"Helper",r:0.02,w:-0.02,a:0.05,g:0.01,res:0.01,exp:0.04,sr:0.01,adp:0.02,pattern:"Gives to receive. May lose identity."},
"3":{label:"Achiever",r:0.01,w:0.02,a:-0.01,g:0.03,res:0.03,exp:0.02,sr:0.03,adp:0.03,pattern:"Image-conscious."},
"4":{label:"Individualist",r:0.05,w:0.02,a:0.04,g:0.01,res:-0.02,exp:0.05,sr:-0.01,adp:0.02,pattern:"Intense depth. Push-pull."},
"5":{label:"Investigator",r:-0.02,w:0.06,a:-0.02,g:0.03,res:0.04,exp:-0.05,sr:0.05,adp:0.02,pattern:"Needs significant space."},
"6":{label:"Loyalist",r:0.04,w:0.01,a:0.02,g:0.01,res:0.02,exp:0.02,sr:0.02,adp:0.01,pattern:"Tests loyalty."},
"7":{label:"Enthusiast",r:0.02,w:-0.03,a:0.01,g:0.03,res:0.03,exp:0.04,sr:-0.01,adp:0.05,pattern:"Avoids uncomfortable emotions."},
"8":{label:"Challenger",r:0.06,w:-0.02,a:-0.01,g:0.02,res:0.05,exp:0.04,sr:0.02,adp:0.01,pattern:"Protective but dominating."},
"9":{label:"Peacemaker",r:-0.02,w:0.04,a:0.03,g:-0.01,res:0.02,exp:-0.02,sr:0.03,adp:0.03,pattern:"Merges with partner."}
};


// ── ATTACHMENT DATA (12 styles) Weight: 0.28 ──
var ATT={
"secure":{label:"Secure",r:-0.08,w:-0.06,a:0.12,g:0.10,res:0.10,exp:0.06,sr:0.08,adp:0.08,desc:"Comfortable with intimacy and autonomy."},
"anxious":{label:"Anxious-Preoccupied",r:0.12,w:-0.04,a:0.06,g:0.01,res:-0.04,exp:0.08,sr:-0.06,adp:0.02,desc:"Craves closeness. Hypervigilant to rejection."},
"avoidant":{label:"Dismissive-Avoidant",r:-0.04,w:0.14,a:-0.10,g:0.03,res:0.04,exp:-0.10,sr:0.06,adp:-0.04,desc:"Values independence. Suppresses needs."},
"fearful":{label:"Fearful-Avoidant",r:0.10,w:0.08,a:-0.04,g:-0.02,res:-0.06,exp:-0.02,sr:-0.04,adp:-0.02,desc:"Desires closeness but fears rejection."},
"disorganized":{label:"Disorganized",r:0.14,w:0.10,a:-0.08,g:-0.06,res:-0.10,exp:-0.04,sr:-0.08,adp:-0.06,desc:"Contradictory behaviors. Linked to trauma."},
"anxious-secure":{label:"Anxious-Secure Blend",r:0.04,w:-0.02,a:0.08,g:0.06,res:0.02,exp:0.06,sr:0.02,adp:0.04,desc:"Generally secure, anxious under stress."},
"avoidant-secure":{label:"Avoidant-Secure Blend",r:-0.04,w:0.06,a:0.04,g:0.06,res:0.06,exp:-0.02,sr:0.06,adp:0.04,desc:"Secure but defaults to independence."},
"anxious-avoidant":{label:"Anxious-Avoidant Blend",r:0.10,w:0.06,a:-0.02,g:0.00,res:-0.04,exp:0.02,sr:-0.04,adp:-0.02,desc:"Push-pull pattern."},
"fearful-anxious":{label:"Fearful-Anxious Blend",r:0.12,w:0.04,a:0.00,g:-0.02,res:-0.06,exp:0.04,sr:-0.06,adp:-0.02,desc:"Fear of abandonment + fear of intimacy."},
"fearful-avoidant":{label:"Fearful-Avoidant Blend",r:0.08,w:0.10,a:-0.06,g:-0.02,res:-0.04,exp:-0.06,sr:-0.02,adp:-0.04,desc:"Wants connection but distances when vulnerable."},
"earned-secure":{label:"Earned Secure",r:-0.04,w:-0.02,a:0.10,g:0.12,res:0.08,exp:0.04,sr:0.06,adp:0.08,desc:"Worked through insecurity. High growth."}
};

// ── MENTAL HEALTH (20 conditions) ──
var MH={
"adhd":{label:"ADHD",severity:3,selfTip:"Affects focus and impulse control.",partnerTip:"Partner may feel unheard.",relTip:"Missed bids for attention.",engTip:"Self-Regulation -3, Reactivity +2"},
"social-anxiety":{label:"Social Anxiety",severity:4,selfTip:"Fear of social judgment.",partnerTip:"Partner burdened as social buffer.",relTip:"Limits shared experiences.",engTip:"Expressiveness -3, Withdrawal +2"},
"autism":{label:"Autism Spectrum",severity:3,selfTip:"Different social processing.",partnerTip:"May misread flat affect.",relTip:"Needs explicit communication.",engTip:"Expressiveness -3, Attunement -2"},
"gad":{label:"GAD",severity:5,selfTip:"Persistent excessive worry.",partnerTip:"Constant reassurance needed.",relTip:"Chronic tension.",engTip:"Reactivity +4, Resilience -3"},
"ocd":{label:"OCD",severity:5,selfTip:"Intrusive thoughts and compulsions.",partnerTip:"Drawn into rituals.",relTip:"Rigidity reduces flexibility.",engTip:"Adaptability -4, Self-Regulation stress +3"},
"panic":{label:"Panic Disorder",severity:5,selfTip:"Sudden intense fear episodes.",partnerTip:"Helpless during attacks.",relTip:"Avoidance limits experiences.",engTip:"Reactivity +5, Resilience -3"},
"eating":{label:"Eating Disorder",severity:5,selfTip:"Distorted body image.",partnerTip:"Shut out by secrecy.",relTip:"Secrecy erodes honesty.",engTip:"Self-Worth -4, Honesty -3"},
"depression":{label:"Depression",severity:6,selfTip:"Low mood, fatigue, hopelessness.",partnerTip:"Bears increased load.",relTip:"Withdrawal cuts connection.",engTip:"Withdrawal +5, Hope -5"},
"rsd":{label:"RSD",severity:5,selfTip:"Intense pain from perceived rejection.",partnerTip:"Walking on eggshells.",relTip:"Communication paralysis.",engTip:"Reactivity +5, Rejection Sensitivity +5"},
"ptsd":{label:"PTSD",severity:7,selfTip:"Flashbacks, hypervigilance.",partnerTip:"May trigger responses.",relTip:"Unpredictable conflict.",engTip:"Reactivity +5, Withdrawal +4, Safety -4"},
"bipolar":{label:"Bipolar",severity:7,selfTip:"Manic highs, depressive lows.",partnerTip:"Two different people.",relTip:"Instability in planning.",engTip:"Extreme Reactivity, Stability -5"},
"cptsd":{label:"C-PTSD",severity:8,selfTip:"Identity fragmentation from prolonged trauma.",partnerTip:"Projection and sudden shifts.",relTip:"Attachment deeply disrupted.",engTip:"Severe across all dimensions"},
"substance":{label:"Substance Use",severity:7,selfTip:"Alters personality and reliability.",partnerTip:"Becomes caretaker.",relTip:"Destroys safety.",engTip:"All positive metrics -4 to -6"},
"bpd":{label:"BPD",severity:8,selfTip:"Fear of abandonment, splitting.",partnerTip:"Idealization-devaluation cycles.",relTip:"Intense but unstable.",engTip:"Maximum Reactivity, severe Resilience loss"},
"npd":{label:"NPD",severity:7,selfTip:"Grandiosity masking fragile worth.",partnerTip:"Needs deprioritized.",relTip:"One-directional.",engTip:"Partner Safety -6, Attunement -5"},
"did":{label:"DID",severity:9,selfTip:"Multiple identity states.",partnerTip:"Different presentations.",relTip:"Consistency challenging.",engTip:"Extreme variability all dimensions"},
"schizophrenia":{label:"Schizophrenia",severity:9,selfTip:"Distorted reality.",partnerTip:"Symptoms vs intent confusion.",relTip:"Shared reality compromised.",engTip:"Severe all-dimension reduction"},
"aspd":{label:"ASPD",severity:8,selfTip:"Disregard for norms, manipulation.",partnerTip:"Risk of exploitation.",relTip:"Genuine mutuality impossible.",engTip:"Attunement near zero"},
"psychopathy":{label:"Psychopathy",severity:8,selfTip:"Callous traits, no empathy.",partnerTip:"Instrumentalized.",relTip:"Not mutual.",engTip:"Maximum negative impact"},
"szpd":{label:"SzPD",severity:6,selfTip:"Pervasive detachment.",partnerTip:"Emotionally alone.",relTip:"Emotional desert.",engTip:"Max Withdrawal, Expressiveness near floor"}
};
var MH_ORDER=["adhd","social-anxiety","autism","gad","ocd","panic","eating","depression","rsd","ptsd","bipolar","cptsd","substance","bpd","npd","did","schizophrenia","aspd","psychopathy","szpd"];
// ── OCEAN DIMENSION WEIGHTS ── Weight: 0.18
var OCEAN_W={
O:{r:0.001,w:-0.001,a:0.001,g:0.002,res:0.001,exp:0.001,sr:0.000,adp:0.002},
C:{r:-0.001,w:0.000,a:0.001,g:0.001,res:0.002,exp:0.000,sr:0.002,adp:-0.001},
E:{r:0.001,w:-0.002,a:0.001,g:0.001,res:0.001,exp:0.002,sr:0.000,adp:0.001},
A:{r:-0.002,w:-0.001,a:0.002,g:0.001,res:0.001,exp:0.001,sr:0.001,adp:0.001},
N:{r:0.002,w:0.001,a:-0.001,g:-0.001,res:-0.002,exp:0.001,sr:-0.002,adp:-0.001}
};

// ── STERNBERG LOVE TYPES ── Weight: 0.10
function classifySternberg(i,p,c){
var t=0.4;var hi=function(v){return v>=t;};
if(!hi(i)&&!hi(p)&&!hi(c)) return{type:"Non-Love",desc:"No significant components present.",color:"#888"};
if(hi(i)&&!hi(p)&&!hi(c)) return{type:"Liking",desc:"Closeness without passion or commitment.",color:"#8ecae6"};
if(!hi(i)&&hi(p)&&!hi(c)) return{type:"Infatuation",desc:"Passion without depth or commitment.",color:"#e63946"};
if(!hi(i)&&!hi(p)&&hi(c)) return{type:"Empty Love",desc:"Commitment without warmth or desire.",color:"#adb5bd"};
if(hi(i)&&hi(p)&&!hi(c)) return{type:"Romantic Love",desc:"Passion and intimacy without commitment.",color:"#f4a261"};
if(hi(i)&&!hi(p)&&hi(c)) return{type:"Companionate Love",desc:"Deep bond without passion.",color:"#2a9d8f"};
if(!hi(i)&&hi(p)&&hi(c)) return{type:"Fatuous Love",desc:"Commitment driven by passion, lacking depth.",color:"#e76f51"};
return{type:"Consummate Love",desc:"All three components strong. Ideal.",color:"#06d6a0"};
}

// ── RUSBULT INVESTMENT MODEL ── Weight: 0.08
function calcRusbultSatisfaction(rel){return clamp((rel.intimacy+rel.connection+rel.honesty)/3,0,1);}
function calcRusbultInvestment(rel,a,b){return clamp((rel.bond+rel.meaning+(1-a.rejectionSensitivity)+(1-b.rejectionSensitivity))/4,0,1);}
function calcRusbultAlternatives(a,b){return clamp(1-((a.trustInPartner+b.trustInPartner)/2),0,1);}
function calcRusbultCommitment(sat,inv,alt){return clamp(sat+inv-alt,0,1);}

// ── BOWEN DIFFERENTIATION OF SELF ── Weight: 0.06
function calcBowen(p){
var ip=clamp((p.emotionRegulation+p.selfWorth)/2,0,1);
var ec=clamp(1-p.rejectionSensitivity,0,1);
var fusion=clamp(1-((p.rejectionSensitivity+p.externalStress)/2),0,1);
var er=clamp(p.emotionRegulation,0,1);
var dos=clamp((ip+ec+fusion+er)/4,0,1);
return{dos:dos,ip:ip,ec:ec,fusion:fusion,er:er};
}
function bowenLabel(d){
if(d>=0.8) return "Highly Differentiated";
if(d>=0.6) return "Moderately Differentiated";
if(d>=0.4) return "Partial Fusion";
if(d>=0.2) return "Significant Fusion";
return "Enmeshed";
}

// ── LOVE LANGUAGE PROXIMITY ──
var LL_LIST=["words","time","gifts","acts","touch"];
var LL_COMPAT={};
LL_LIST.forEach(function(a){LL_COMPAT[a]={};LL_LIST.forEach(function(b){LL_COMPAT[a][b]=a===b?1.0:0.5;});});
LL_COMPAT["words"]["acts"]=0.7;LL_COMPAT["acts"]["words"]=0.7;
LL_COMPAT["time"]["touch"]=0.7;LL_COMPAT["touch"]["time"]=0.7;
LL_COMPAT["gifts"]["acts"]=0.6;LL_COMPAT["acts"]["gifts"]=0.6;

// ── RELATIONSHIP TYPE WEIGHTS ──
var REL_TYPE={
romantic:{intimacy:1.0,passion:1.0,commitment:1.0,safety:1.0,trust:1.0,bond:1.0,label:"Romantic"},
friendship:{intimacy:0.7,passion:0.1,commitment:0.6,safety:0.8,trust:0.9,bond:0.7,label:"Friendship"},
"parent-child":{intimacy:0.8,passion:0.0,commitment:1.0,safety:1.0,trust:0.9,bond:1.0,label:"Parent-Child"},
business:{intimacy:0.3,passion:0.0,commitment:0.7,safety:0.6,trust:0.8,bond:0.3,label:"Business"}
};

// ── LIFE STAGE MODIFIERS ──
var LIFE_STAGE={
"early-dating":{stress:0.1,energy:0.9,time:0.8,label:"Early Dating"},
"committed":{stress:0.2,energy:0.7,time:0.7,label:"Committed"},
"cohabiting":{stress:0.35,energy:0.6,time:0.6,label:"Cohabiting"},
"engaged":{stress:0.3,energy:0.65,time:0.55,label:"Engaged"},
"married":{stress:0.3,energy:0.55,time:0.5,label:"Married"},
"newborn":{stress:0.7,energy:0.3,time:0.2,label:"Newborn"},
"raising-kids":{stress:0.6,energy:0.4,time:0.3,label:"Raising Kids"},
"empty-nest":{stress:0.2,energy:0.6,time:0.8,label:"Empty Nest"},
"retirement":{stress:0.15,energy:0.5,time:0.9,label:"Retirement"},
"long-distance":{stress:0.5,energy:0.5,time:0.3,label:"Long Distance"},
"blended":{stress:0.55,energy:0.45,time:0.35,label:"Blended Family"},
"crisis":{stress:0.85,energy:0.25,time:0.3,label:"Crisis / Recovery"}
};

// ── FINANCIAL ALIGNMENT ──
var FIN_ALIGN={
"aligned":{trust:0.05,tension:-0.05,stability:0.05,label:"Fully Aligned"},
"mostly":{trust:0.02,tension:-0.02,stability:0.02,label:"Mostly Aligned"},
"some-diff":{trust:0.0,tension:0.02,stability:0.0,label:"Some Differences"},
"significant":{trust:-0.03,tension:0.06,stability:-0.04,label:"Significant Differences"},
"conflicted":{trust:-0.06,tension:0.12,stability:-0.08,label:"Conflicted"}
};


// ── CONFLICT STYLES (Gottman-based) ──
var CONFLICT={
"collaborative":{label:"Collaborative",trust:0.04,tension:-0.04,bond:0.03,safety:0.03},
"validating":{label:"Validating",trust:0.03,tension:-0.03,bond:0.02,safety:0.04},
"volatile":{label:"Volatile",trust:-0.01,tension:0.04,bond:0.01,safety:-0.02},
"avoidant":{label:"Conflict-Avoidant",trust:0.00,tension:0.02,bond:-0.02,safety:0.01},
"hostile":{label:"Hostile",trust:-0.05,tension:0.06,bond:-0.04,safety:-0.05},
"passive-aggressive":{label:"Passive-Aggressive",trust:-0.04,tension:0.05,bond:-0.03,safety:-0.03},
"stonewalling":{label:"Stonewalling",trust:-0.05,tension:0.03,bond:-0.05,safety:-0.04},
"contemptuous":{label:"Contemptuous",trust:-0.06,tension:0.07,bond:-0.06,safety:-0.06}
};

// ── MOOD MODIFIERS (28 states) ──
var MOOD={
"calm":{r:-0.04,w:-0.02,a:0.03,g:0.02,res:0.03,exp:0.01,sr:0.04,adp:0.02},
"happy":{r:-0.03,w:-0.04,a:0.04,g:0.03,res:0.04,exp:0.04,sr:0.02,adp:0.03},
"excited":{r:0.02,w:-0.05,a:0.02,g:0.03,res:0.02,exp:0.06,sr:-0.01,adp:0.03},
"content":{r:-0.04,w:-0.02,a:0.03,g:0.01,res:0.04,exp:0.01,sr:0.03,adp:0.02},
"grateful":{r:-0.05,w:-0.03,a:0.05,g:0.02,res:0.04,exp:0.03,sr:0.03,adp:0.02},
"loving":{r:-0.04,w:-0.05,a:0.06,g:0.03,res:0.04,exp:0.05,sr:0.02,adp:0.03},
"hopeful":{r:-0.02,w:-0.03,a:0.03,g:0.04,res:0.04,exp:0.02,sr:0.02,adp:0.03},
"playful":{r:-0.01,w:-0.04,a:0.03,g:0.02,res:0.02,exp:0.05,sr:0.00,adp:0.04},
"neutral":{r:0.00,w:0.00,a:0.00,g:0.00,res:0.00,exp:0.00,sr:0.00,adp:0.00},
"tired":{r:0.02,w:0.03,a:-0.02,g:-0.01,res:-0.02,exp:-0.02,sr:-0.02,adp:-0.01},
"bored":{r:0.01,w:0.03,a:-0.02,g:-0.02,res:-0.01,exp:-0.01,sr:0.00,adp:-0.01},
"distracted":{r:0.01,w:0.02,a:-0.03,g:-0.01,res:-0.01,exp:-0.01,sr:-0.01,adp:0.00},
"stressed":{r:0.05,w:0.02,a:-0.03,g:-0.02,res:-0.03,exp:-0.01,sr:-0.03,adp:-0.02},
"anxious":{r:0.06,w:0.02,a:-0.02,g:-0.02,res:-0.04,exp:0.01,sr:-0.04,adp:-0.02},
"sad":{r:0.02,w:0.05,a:-0.01,g:-0.03,res:-0.03,exp:-0.02,sr:-0.01,adp:-0.02},
"irritable":{r:0.06,w:0.01,a:-0.04,g:-0.02,res:-0.03,exp:0.02,sr:-0.04,adp:-0.02},
"frustrated":{r:0.05,w:0.01,a:-0.03,g:-0.02,res:-0.02,exp:0.02,sr:-0.03,adp:-0.02},
"lonely":{r:0.03,w:0.04,a:-0.01,g:-0.03,res:-0.04,exp:-0.02,sr:-0.01,adp:-0.02},
"insecure":{r:0.05,w:0.03,a:-0.03,g:-0.03,res:-0.04,exp:-0.01,sr:-0.04,adp:-0.03},
"jealous":{r:0.07,w:0.01,a:-0.05,g:-0.03,res:-0.04,exp:0.02,sr:-0.05,adp:-0.03},
"resentful":{r:0.05,w:0.04,a:-0.05,g:-0.04,res:-0.04,exp:-0.01,sr:-0.03,adp:-0.04},
"angry":{r:0.08,w:-0.01,a:-0.06,g:-0.03,res:-0.03,exp:0.04,sr:-0.06,adp:-0.03},
"hurt":{r:0.04,w:0.05,a:-0.03,g:-0.03,res:-0.05,exp:-0.02,sr:-0.02,adp:-0.03},
"numb":{r:-0.02,w:0.07,a:-0.06,g:-0.05,res:-0.04,exp:-0.06,sr:0.01,adp:-0.04},
"overwhelmed":{r:0.06,w:0.04,a:-0.04,g:-0.03,res:-0.05,exp:0.00,sr:-0.05,adp:-0.04},
"panicked":{r:0.08,w:0.01,a:-0.05,g:-0.04,res:-0.06,exp:0.02,sr:-0.07,adp:-0.04},
"depressed":{r:0.01,w:0.07,a:-0.05,g:-0.06,res:-0.06,exp:-0.04,sr:-0.03,adp:-0.05},
"dissociated":{r:-0.03,w:0.08,a:-0.07,g:-0.06,res:-0.05,exp:-0.07,sr:0.00,adp:-0.05}
};

// ── STARTING CONDITIONS (22) ──
var START={
"strong":{label:"Strong Foundation",trust:0.85,bond:0.8,intimacy:0.8,safety:0.85,connection:0.8,meaning:0.7,honesty:0.85,stability:0.8,growth:0.7,tension:0.1,friction:0.1,passion:0.75,commitment:0.85},
"average":{label:"Average Start",trust:0.6,bond:0.55,intimacy:0.55,safety:0.6,connection:0.55,meaning:0.5,honesty:0.6,stability:0.55,growth:0.5,tension:0.25,friction:0.2,passion:0.6,commitment:0.6},
"new":{label:"Brand New",trust:0.5,bond:0.3,intimacy:0.3,safety:0.5,connection:0.4,meaning:0.3,honesty:0.5,stability:0.4,growth:0.6,tension:0.1,friction:0.1,passion:0.7,commitment:0.3},
"rocky":{label:"Rocky Start",trust:0.35,bond:0.3,intimacy:0.3,safety:0.35,connection:0.3,meaning:0.25,honesty:0.35,stability:0.3,growth:0.3,tension:0.5,friction:0.45,passion:0.4,commitment:0.35},
"rebuilding":{label:"Rebuilding After Betrayal",trust:0.15,bond:0.25,intimacy:0.2,safety:0.15,connection:0.2,meaning:0.3,honesty:0.1,stability:0.2,growth:0.4,tension:0.6,friction:0.5,passion:0.25,commitment:0.45},
"affair":{label:"Post-Affair",trust:0.08,bond:0.2,intimacy:0.15,safety:0.1,connection:0.15,meaning:0.2,honesty:0.05,stability:0.15,growth:0.3,tension:0.7,friction:0.65,passion:0.2,commitment:0.35},
"separation":{label:"Separated",trust:0.2,bond:0.3,intimacy:0.15,safety:0.25,connection:0.1,meaning:0.15,honesty:0.25,stability:0.15,growth:0.2,tension:0.55,friction:0.5,passion:0.1,commitment:0.2},
"reconciling":{label:"Reconciling",trust:0.3,bond:0.35,intimacy:0.25,safety:0.3,connection:0.25,meaning:0.35,honesty:0.3,stability:0.25,growth:0.5,tension:0.4,friction:0.35,passion:0.35,commitment:0.5},
"ldr-start":{label:"Long Distance Start",trust:0.5,bond:0.3,intimacy:0.2,safety:0.5,connection:0.25,meaning:0.4,honesty:0.55,stability:0.35,growth:0.5,tension:0.2,friction:0.15,passion:0.55,commitment:0.45},
"honeymoon":{label:"Honeymoon Phase",trust:0.65,bond:0.6,intimacy:0.7,safety:0.65,connection:0.75,meaning:0.5,honesty:0.6,stability:0.5,growth:0.6,tension:0.05,friction:0.05,passion:0.9,commitment:0.55},
"codependent":{label:"Codependent",trust:0.45,bond:0.7,intimacy:0.55,safety:0.35,connection:0.6,meaning:0.4,honesty:0.3,stability:0.35,growth:0.15,tension:0.4,friction:0.35,passion:0.5,commitment:0.7},
"trauma-bond":{label:"Trauma Bond",trust:0.2,bond:0.65,intimacy:0.35,safety:0.15,connection:0.45,meaning:0.2,honesty:0.15,stability:0.1,growth:0.1,tension:0.7,friction:0.6,passion:0.55,commitment:0.6},
"parallel":{label:"Parallel Lives",trust:0.4,bond:0.2,intimacy:0.15,safety:0.45,connection:0.1,meaning:0.15,honesty:0.4,stability:0.5,growth:0.1,tension:0.3,friction:0.25,passion:0.1,commitment:0.4},
"power-imbalance":{label:"Power Imbalance",trust:0.3,bond:0.35,intimacy:0.3,safety:0.2,connection:0.3,meaning:0.2,honesty:0.25,stability:0.35,growth:0.15,tension:0.5,friction:0.45,passion:0.35,commitment:0.45},
"arranged":{label:"Arranged/Practical",trust:0.4,bond:0.25,intimacy:0.2,safety:0.45,connection:0.25,meaning:0.35,honesty:0.45,stability:0.5,growth:0.4,tension:0.2,friction:0.2,passion:0.2,commitment:0.6},
"grief":{label:"Shared Grief",trust:0.5,bond:0.55,intimacy:0.4,safety:0.45,connection:0.5,meaning:0.5,honesty:0.5,stability:0.3,growth:0.3,tension:0.35,friction:0.25,passion:0.25,commitment:0.55},
"second-chance":{label:"Second Chance",trust:0.25,bond:0.35,intimacy:0.3,safety:0.3,connection:0.3,meaning:0.4,honesty:0.3,stability:0.25,growth:0.55,tension:0.35,friction:0.3,passion:0.4,commitment:0.5},
"blended-family":{label:"Blended Family",trust:0.45,bond:0.35,intimacy:0.35,safety:0.4,connection:0.35,meaning:0.4,honesty:0.45,stability:0.35,growth:0.45,tension:0.4,friction:0.35,passion:0.4,commitment:0.55},
"open":{label:"Open Relationship",trust:0.55,bond:0.45,intimacy:0.5,safety:0.45,connection:0.4,meaning:0.4,honesty:0.65,stability:0.35,growth:0.45,tension:0.3,friction:0.25,passion:0.6,commitment:0.45},
"empty-shell":{label:"Empty Shell",trust:0.25,bond:0.15,intimacy:0.1,safety:0.3,connection:0.05,meaning:0.05,honesty:0.2,stability:0.4,growth:0.05,tension:0.35,friction:0.4,passion:0.05,commitment:0.3},
"online-only":{label:"Online Only",trust:0.4,bond:0.25,intimacy:0.2,safety:0.45,connection:0.3,meaning:0.3,honesty:0.4,stability:0.3,growth:0.45,tension:0.15,friction:0.1,passion:0.5,commitment:0.3},
"friends-to-more":{label:"Friends to More",trust:0.7,bond:0.6,intimacy:0.45,safety:0.7,connection:0.6,meaning:0.5,honesty:0.7,stability:0.6,growth:0.55,tension:0.1,friction:0.1,passion:0.45,commitment:0.5}
};


// ── STATUS TIERS ──
var IND_TIERS=[
{min:0.85,label:"Thriving",color:"#06d6a0"},
{min:0.7,label:"Healthy",color:"#2a9d8f"},
{min:0.55,label:"Stable",color:"#8ecae6"},
{min:0.4,label:"Struggling",color:"#f4a261"},
{min:0.25,label:"At Risk",color:"#e76f51"},
{min:0.0,label:"In Crisis",color:"#e63946"}
];
var REL_TIERS=[
{min:0.85,label:"Flourishing",color:"#06d6a0"},
{min:0.7,label:"Healthy",color:"#2a9d8f"},
{min:0.55,label:"Stable",color:"#8ecae6"},
{min:0.4,label:"Strained",color:"#f4a261"},
{min:0.25,label:"Distressed",color:"#e76f51"},
{min:0.1,label:"Critical",color:"#e63946"},
{min:0.0,label:"Collapsed",color:"#6c757d"}
];
function getTier(v,tiers){for(var i=0;i<tiers.length;i++){if(v>=tiers[i].min)return tiers[i];}return tiers[tiers.length-1];}

// ── RESILIENCE PRACTICES (12) ──
var PRACTICES=[
{id:"active-listen",label:"Active Listening",effects:{emotionRegulation:0.02,secureWithPartner:0.03},partnerEffects:{secureWithPartner:0.03,trustInPartner:0.02},relEffects:{trust:0.03,connection:0.03,intimacy:0.02}},
{id:"gratitude",label:"Express Gratitude",effects:{selfWorth:0.02,hope:0.02},partnerEffects:{selfWorth:0.03,secureWithPartner:0.02},relEffects:{bond:0.02,connection:0.03,honesty:0.01}},
{id:"repair",label:"Repair Attempt",effects:{emotionRegulation:0.02,hope:0.03},partnerEffects:{secureWithPartner:0.04,trustInPartner:0.03},relEffects:{trust:0.04,safety:0.03,tension:-0.04}},
{id:"vulnerability",label:"Share Vulnerability",effects:{selfWorth:0.01,secureWithPartner:0.02},partnerEffects:{secureWithPartner:0.03,trustInPartner:0.02},relEffects:{intimacy:0.04,honesty:0.03,bond:0.03}},
{id:"boundary",label:"Set Healthy Boundary",effects:{emotionRegulation:0.03,selfWorth:0.03,selfExpectations:-0.01},partnerEffects:{secureWithPartner:0.01},relEffects:{safety:0.03,honesty:0.02,stability:0.02}},
{id:"quality-time",label:"Quality Time",effects:{hope:0.02,secureWithPartner:0.02},partnerEffects:{secureWithPartner:0.02,hope:0.02},relEffects:{connection:0.04,intimacy:0.03,bond:0.02}},
{id:"mindfulness",label:"Mindfulness Together",effects:{emotionRegulation:0.04,externalStress:-0.03},partnerEffects:{emotionRegulation:0.02},relEffects:{stability:0.02,tension:-0.03}},
{id:"dream-share",label:"Share Dreams & Goals",effects:{hope:0.03,selfWorth:0.01},partnerEffects:{hope:0.02,secureWithPartner:0.02},relEffects:{meaning:0.04,growth:0.03,commitment:0.02}},
{id:"physical",label:"Physical Affection",effects:{secureWithPartner:0.03},partnerEffects:{secureWithPartner:0.03},relEffects:{intimacy:0.03,passion:0.03,bond:0.02}},
{id:"apology",label:"Genuine Apology",effects:{selfWorth:0.01,emotionRegulation:0.02},partnerEffects:{secureWithPartner:0.04,trustInPartner:0.04},relEffects:{trust:0.05,safety:0.04,tension:-0.05,honesty:0.03}},
{id:"support",label:"Emotional Support",effects:{secureWithPartner:0.02},partnerEffects:{selfWorth:0.03,hope:0.03,secureWithPartner:0.04},relEffects:{bond:0.03,safety:0.03,connection:0.02}},
{id:"celebrate",label:"Celebrate Success",effects:{selfWorth:0.02,hope:0.02},partnerEffects:{selfWorth:0.03,hope:0.02},relEffects:{connection:0.03,meaning:0.02,growth:0.02}}
];

// ── TOXIC ACTIVITIES (10) ──
var TOXICS=[
{id:"criticism",label:"Harsh Criticism",effects:{selfWorth:-0.01,emotionRegulation:-0.02},partnerEffects:{selfWorth:-0.05,secureWithPartner:-0.04},relEffects:{trust:-0.04,safety:-0.04,tension:0.05}},
{id:"contempt",label:"Show Contempt",effects:{selfWorth:0.01},partnerEffects:{selfWorth:-0.06,secureWithPartner:-0.06,hope:-0.05},relEffects:{trust:-0.06,bond:-0.05,safety:-0.06,tension:0.06}},
{id:"stonewall",label:"Stonewall Partner",effects:{emotionRegulation:-0.02},partnerEffects:{secureWithPartner:-0.05,hope:-0.04},relEffects:{connection:-0.06,intimacy:-0.04,trust:-0.03,tension:0.04}},
{id:"gaslight",label:"Gaslight",effects:{},partnerEffects:{selfWorth:-0.07,emotionRegulation:-0.05,secureWithPartner:-0.06},relEffects:{trust:-0.07,honesty:-0.07,safety:-0.07,tension:0.06}},
{id:"dismiss",label:"Dismiss Feelings",effects:{},partnerEffects:{selfWorth:-0.04,secureWithPartner:-0.04,hope:-0.03},relEffects:{intimacy:-0.04,safety:-0.04,honesty:-0.03,tension:0.04}},
{id:"threaten",label:"Threaten to Leave",effects:{},partnerEffects:{secureWithPartner:-0.08,hope:-0.06,trustInPartner:-0.05},relEffects:{safety:-0.07,stability:-0.06,commitment:-0.05,tension:0.07}},
{id:"betray",label:"Betray Trust",effects:{selfWorth:-0.02},partnerEffects:{trustInPartner:-0.08,secureWithPartner:-0.07,hope:-0.06},relEffects:{trust:-0.10,honesty:-0.08,safety:-0.08,bond:-0.06,tension:0.08}},
{id:"control",label:"Controlling Behavior",effects:{},partnerEffects:{selfWorth:-0.05,emotionRegulation:-0.03,secureWithPartner:-0.05},relEffects:{safety:-0.06,honesty:-0.04,growth:-0.05,tension:0.05}},
{id:"blame",label:"Blame Shift",effects:{},partnerEffects:{selfWorth:-0.04,emotionRegulation:-0.03,secureWithPartner:-0.03},relEffects:{trust:-0.04,honesty:-0.05,safety:-0.03,tension:0.05}},
{id:"neglect",label:"Emotional Neglect",effects:{},partnerEffects:{selfWorth:-0.04,secureWithPartner:-0.05,hope:-0.04},relEffects:{connection:-0.05,intimacy:-0.04,bond:-0.04,tension:0.03}}
];


// ── ATTACHMENT COMBOS (22 pairings) ──
var ATT_COMBO={
"secure+secure":{label:"Secure Haven",risk:0.05,dynamics:"Mutual safety, strong repair, high resilience."},
"secure+anxious":{label:"Calming Anchor",risk:0.2,dynamics:"Secure partner soothes anxiety; protest behavior may arise."},
"secure+avoidant":{label:"Patient Bridge",risk:0.25,dynamics:"Secure partner models closeness; avoidant may withdraw under pressure."},
"secure+fearful":{label:"Stabilizing Force",risk:0.3,dynamics:"Secure partner provides consistency; fearful may oscillate."},
"secure+disorganized":{label:"Grounding Presence",risk:0.35,dynamics:"Secure partner absorbs chaos; disorganized needs high patience."},
"anxious+anxious":{label:"Intensity Loop",risk:0.5,dynamics:"High emotional intensity, mutual reassurance-seeking, escalation risk."},
"anxious+avoidant":{label:"Pursuit-Distance Trap",risk:0.65,dynamics:"Classic anxious-avoidant trap: one pursues, one retreats."},
"anxious+fearful":{label:"Volatile Connection",risk:0.6,dynamics:"Intense bond with frequent ruptures and desperate repair."},
"anxious+disorganized":{label:"Chaos Spiral",risk:0.7,dynamics:"Unpredictable cycles of closeness and crisis."},
"avoidant+avoidant":{label:"Parallel Orbits",risk:0.45,dynamics:"Comfortable distance but emotional desert; low conflict, low intimacy."},
"avoidant+fearful":{label:"Approach-Retreat",risk:0.55,dynamics:"Fearful craves what avoidant withholds; painful push-pull."},
"avoidant+disorganized":{label:"Disconnected",risk:0.6,dynamics:"Both struggle with closeness; emotional isolation likely."},
"fearful+fearful":{label:"Mutual Minefield",risk:0.7,dynamics:"Both want and fear intimacy; high rupture frequency."},
"fearful+disorganized":{label:"Destabilized",risk:0.75,dynamics:"Neither can provide safety; professional support essential."},
"disorganized+disorganized":{label:"Storm Pattern",risk:0.85,dynamics:"Maximum unpredictability; cycle of crisis and repair."},
"anxious-secure+avoidant-secure":{label:"Healing Bridge",risk:0.2,dynamics:"Both trending secure; growth-oriented with occasional old patterns."},
"earned-secure+anxious":{label:"Learned Safety",risk:0.25,dynamics:"Earned-secure models regulation; anxious benefits from stability."},
"earned-secure+avoidant":{label:"Gradual Opening",risk:0.3,dynamics:"Earned-secure demonstrates vulnerability; avoidant may slowly open."},
"codependent+anxious":{label:"Enmeshed Bind",risk:0.6,dynamics:"Excessive merger; individual identity erodes."},
"codependent+avoidant":{label:"Suffocating Gap",risk:0.65,dynamics:"Codependent clings, avoidant suffocates; toxic cycle."},
"codependent+codependent":{label:"Total Fusion",risk:0.7,dynamics:"Complete enmeshment; no individual boundaries."},
"codependent+secure":{label:"Boundary Teacher",risk:0.35,dynamics:"Secure models healthy separation; codependent learns autonomy."}
};
function getAttCombo(a,b){
var key1=a+"+"+b,key2=b+"+"+a;
if(ATT_COMBO[key1])return ATT_COMBO[key1];
if(ATT_COMBO[key2])return ATT_COMBO[key2];
var baseMap={"anxious-secure":"secure","avoidant-secure":"secure","anxious-avoidant":"anxious","fearful-anxious":"fearful","fearful-avoidant":"fearful","earned-secure":"secure"};
var ba=baseMap[a]||a, bb=baseMap[b]||b;
key1=ba+"+"+bb;key2=bb+"+"+ba;
return ATT_COMBO[key1]||ATT_COMBO[key2]||{label:"Unique Dynamic",risk:0.4,dynamics:"A less-studied pairing; outcomes depend on individual growth."};
}

// ── CODEPENDENT attachment (missing from ATT) ──
ATT["codependent"]={label:"Codependent",r:0.04,w:-0.02,a:0.03,g:-0.06,res:-0.04,exp:0.02,sr:-0.05,adp:-0.04,desc:"Over-fused identity; sacrifices self for partner stability."};
// ── INTERACTION CATEGORIES (12, positive → negative) ──
var CAT_ORDER=["Affection","Quality Time","Support","Growth","Intimacy","Repair",
"Daily Life","Boundary","External Stress","Neglect","Conflict","Betrayal"];

var INTERACTIONS={
"Affection":{dir:"positive",defaultInt:0.5,
scenarios:[{label:"Warm embrace after long day",int:0.5},{label:"Surprise love note",int:0.4},{label:"Held hands on walk",int:0.35},{label:"Forehead kiss before sleep",int:0.3},{label:"Said I love you unprompted",int:0.45}],
base:{trust:0.03,bond:0.05,connection:0.04,intimacy:0.04,tension:-0.03,safety:0.02,passion:0.03,sternIntimacy:0.03},
selfBase:{secureWithPartner:0.03,hope:0.02,selfWorth:0.01},
partnerBase:{secureWithPartner:0.04,selfWorth:0.03,hope:0.02,rejectionSensitivity:-0.02}},

"Quality Time":{dir:"positive",defaultInt:0.45,
scenarios:[{label:"Cooked a meal together",int:0.4},{label:"Had a deep conversation",int:0.5},{label:"Played a game together",int:0.35},{label:"Went for a sunset walk",int:0.4},{label:"Shared a new hobby",int:0.45}],
base:{bond:0.04,connection:0.05,meaning:0.03,intimacy:0.03,growth:0.02,tension:-0.02,sternIntimacy:0.03},
selfBase:{hope:0.02,secureWithPartner:0.02},
partnerBase:{secureWithPartner:0.03,hope:0.02,selfWorth:0.01}},

"Support":{dir:"positive",defaultInt:0.5,
scenarios:[{label:"Listened without fixing",int:0.5},{label:"Helped with stressful task",int:0.4},{label:"Defended partner to others",int:0.55},{label:"Showed up during crisis",int:0.65},{label:"Validated feelings",int:0.45}],
base:{trust:0.04,bond:0.04,safety:0.03,connection:0.03,meaning:0.03,tension:-0.02,sternIntimacy:0.02},
selfBase:{secureWithPartner:0.02,hope:0.02},
partnerBase:{secureWithPartner:0.04,selfWorth:0.03,hope:0.03,externalStress:-0.03,trustInPartner:0.03}},

"Growth":{dir:"positive",defaultInt:0.5,
scenarios:[{label:"Shared a vulnerable fear",int:0.55},{label:"Set a boundary respectfully",int:0.45},{label:"Tried partner's suggestion",int:0.4},{label:"Attended couples workshop",int:0.5},{label:"Discussed future goals",int:0.45}],
base:{trust:0.03,bond:0.03,growth:0.05,meaning:0.04,honesty:0.03,stability:0.02,connection:0.03,sternIntimacy:0.02},
selfBase:{selfWorth:0.03,hope:0.03,emotionRegulation:0.02,selfExpectations:0.02},
partnerBase:{secureWithPartner:0.03,trustInPartner:0.02,hope:0.02,selfWorth:0.01}},

"Intimacy":{dir:"positive",defaultInt:0.5,
scenarios:[{label:"Shared a fantasy openly",int:0.5},{label:"Initiated physical closeness",int:0.45},{label:"Eye contact during vulnerability",int:0.55},{label:"Cried together",int:0.6},{label:"Expressed a deep need",int:0.5}],
base:{bond:0.05,intimacy:0.06,connection:0.04,trust:0.03,meaning:0.03,tension:-0.02,safety:0.02,passion:0.04,sternIntimacy:0.05},
selfBase:{secureWithPartner:0.03,selfWorth:0.02,hope:0.02},
partnerBase:{secureWithPartner:0.04,selfWorth:0.02,hope:0.02,trustInPartner:0.02}},

"Repair":{dir:"positive",defaultInt:0.5,
scenarios:[{label:"Apologized sincerely",int:0.5},{label:"Acknowledged their perspective",int:0.45},{label:"Offered a compromise",int:0.4},{label:"Took responsibility",int:0.55},{label:"Asked how to fix this",int:0.45}],
base:{trust:0.05,bond:0.04,tension:-0.05,friction:-0.03,safety:0.04,honesty:0.04,stability:0.03,sternIntimacy:0.02},
selfBase:{emotionRegulation:0.02,selfWorth:0.02,hope:0.03},
partnerBase:{secureWithPartner:0.05,trustInPartner:0.04,hope:0.03,rejectionSensitivity:-0.02,selfWorth:0.02}},

"Daily Life":{dir:"neutral",defaultInt:0.3,
scenarios:[{label:"Morning coffee together",int:0.25},{label:"Coordinated schedules",int:0.25},{label:"Handled logistics smoothly",int:0.3},{label:"Managed kids as team",int:0.35},{label:"Shared a meal at home",int:0.25}],
base:{bond:0.02,connection:0.02,stability:0.02,meaning:0.01,tension:-0.01},
selfBase:{hope:0.01,secureWithPartner:0.01},
partnerBase:{secureWithPartner:0.01,hope:0.01}},

"Boundary":{dir:"mixed",defaultInt:0.4,
scenarios:[{label:"Set a clear boundary",int:0.45},{label:"Respected partner's no",int:0.4},{label:"Discussed needs vs wants",int:0.4},{label:"Renegotiated agreement",int:0.35},{label:"Pushed past a stated limit",int:0.5}],
base:{safety:0.03,trust:0.03,honesty:0.04,stability:0.02,tension:-0.01,growth:0.03},
selfBase:{selfWorth:0.03,emotionRegulation:0.02,selfExpectations:0.02},
partnerBase:{secureWithPartner:0.03,trustInPartner:0.02,selfWorth:0.01}},

"External Stress":{dir:"negative",defaultInt:0.6,
scenarios:[{label:"Major life transition",int:0.5},{label:"Financial setback",int:0.55},{label:"Family emergency",int:0.65},{label:"Health scare",int:0.7},{label:"Job loss announced",int:0.6}],
base:{tension:0.04,stability:-0.03,friction:0.02,growth:0.01},
selfBase:{externalStress:0.06,emotionRegulation:-0.03,hope:-0.03,selfWorth:-0.02},
partnerBase:{externalStress:0.03,hope:-0.01,secureWithPartner:-0.01}},

"Neglect":{dir:"negative",defaultInt:0.4,
scenarios:[{label:"Chose phone over conversation",int:0.3},{label:"Skipped planned date night",int:0.4},{label:"Forgot important date",int:0.45},{label:"Dismissed partner's feelings",int:0.5},{label:"Ignored bid for attention",int:0.4}],
base:{bond:-0.03,connection:-0.04,meaning:-0.02,intimacy:-0.03,tension:0.03,friction:0.03,trust:-0.02,passion:-0.02},
selfBase:{selfExpectations:-0.02},
partnerBase:{secureWithPartner:-0.04,selfWorth:-0.03,rejectionSensitivity:0.03,hope:-0.02,trustInPartner:-0.02}},

"Conflict":{dir:"negative",defaultInt:0.5,
scenarios:[{label:"Disagreed about finances",int:0.45},{label:"Argued about chores",int:0.4},{label:"Brought up old grievance",int:0.55},{label:"Criticized partner's decision",int:0.5},{label:"Raised voice",int:0.65}],
base:{trust:-0.03,bond:-0.02,tension:0.06,friction:0.04,safety:-0.03,honesty:-0.01,stability:-0.02,passion:-0.01},
selfBase:{emotionRegulation:-0.03,externalStress:0.04,hope:-0.02},
partnerBase:{secureWithPartner:-0.04,selfWorth:-0.02,rejectionSensitivity:0.03,trustInPartner:-0.03,hope:-0.02}},

"Betrayal":{dir:"negative",defaultInt:0.75,
scenarios:[{label:"Shared private info with others",int:0.6},{label:"Broke a significant promise",int:0.65},{label:"Financial deception revealed",int:0.75},{label:"Discovered a hidden lie",int:0.8},{label:"Emotional affair",int:0.9}],
base:{trust:-0.08,bond:-0.05,safety:-0.06,honesty:-0.08,tension:0.08,friction:0.06,stability:-0.05,meaning:-0.03,intimacy:-0.04,passion:-0.03,commitment:-0.05},
selfBase:{selfWorth:-0.02,hope:-0.03},
partnerBase:{secureWithPartner:-0.08,trustInPartner:-0.08,selfWorth:-0.05,hope:-0.05,rejectionSensitivity:0.05,emotionRegulation:-0.04}}
};
// ── ENGINE STATE ──
var S={
init:false,
a:{name:"Person A",mbti:"INTJ",ennea:"4",attach:"secure",ll:"time",conflict:"collaborative",mood:"neutral",support:50,
  ocean:{O:0.70,C:0.60,E:0.40,A:0.55,N:0.45},mh:{},
  emotionRegulation:0.60,selfWorth:0.55,secureWithPartner:0.50,hope:0.55,
  rejectionSensitivity:0.40,trustInPartner:0.50,externalStress:0.35,selfExpectations:0.50,
  health:0.55,intimacy:0.50},
b:{name:"Person B",mbti:"ENFP",ennea:"2",attach:"anxious",ll:"words",conflict:"collaborative",mood:"calm",support:50,
  ocean:{O:0.75,C:0.45,E:0.70,A:0.65,N:0.55},mh:{},
  emotionRegulation:0.60,selfWorth:0.55,secureWithPartner:0.50,hope:0.55,
  rejectionSensitivity:0.40,trustInPartner:0.50,externalStress:0.35,selfExpectations:0.50,
  health:0.55,intimacy:0.50},
rel:{safety:0.50,trust:0.50,bond:0.50,connection:0.50,meaning:0.50,honesty:0.50,
  stability:0.50,intimacy:0.40,growth:0.50,tension:0.30,friction:0.25,overall:0.50,
  passion:0.50,commitment:0.50,sternIntimacy:0.50},
relType:"romantic",lifeStage:"committed",finAlign:"some-diff",startCond:"average",
sentHistory:[],behCounts:{},conflictLvl:0,
repairWin:{active:false,remaining:0,trigger:""},
driftA:{score:0,dir:"none"},driftB:{score:0,dir:"none"},
evtCount:0,history:[],undoStack:[],snapshot:null,
log:[],logA:[],logB:[]
};

// ── CLAMP & UTILITY ──
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
function cl(v){return clamp(v,0,1);}
function clone(o){return JSON.parse(JSON.stringify(o));}
function rnd(v,d){var m=Math.pow(10,d||2);return Math.round(v*m)/m;}
function pct(v){return Math.round(v*100);}

function savePrev(who){
var p=S[who];p._prev=clone({emotionRegulation:p.emotionRegulation,selfWorth:p.selfWorth,
secureWithPartner:p.secureWithPartner,hope:p.hope,rejectionSensitivity:p.rejectionSensitivity,
trustInPartner:p.trustInPartner,externalStress:p.externalStress,selfExpectations:p.selfExpectations,
health:p.health,intimacy:p.intimacy});}

function saveRelPrev(){S.rel._prev=clone(S.rel);}

function pushUndo(){
S.undoStack.push(clone({a:S.a,b:S.b,rel:S.rel,sentHistory:S.sentHistory,
behCounts:S.behCounts,conflictLvl:S.conflictLvl,repairWin:S.repairWin,
driftA:S.driftA,driftB:S.driftB,evtCount:S.evtCount,
log:S.log,logA:S.logA,logB:S.logB}));
if(S.undoStack.length>30)S.undoStack.shift();}

function doUndo(){
if(!S.undoStack.length)return;
var snap=S.undoStack.pop();
S.a=snap.a;S.b=snap.b;S.rel=snap.rel;S.sentHistory=snap.sentHistory;
S.behCounts=snap.behCounts;S.conflictLvl=snap.conflictLvl;S.repairWin=snap.repairWin;
S.driftA=snap.driftA;S.driftB=snap.driftB;S.evtCount=snap.evtCount;
S.log=snap.log;S.logA=snap.logA;S.logB=snap.logB;
renderAll();addLog("Undo performed.","rel");}

function saveSnap(){S.snapshot=clone({a:S.a,b:S.b,rel:S.rel});}
// ── PSO / NSO ──
function calcPSO(){
var h=S.sentHistory.slice(-20);if(h.length<3)return{mode:"neutral",ratio:0.5};
var pos=0;for(var i=0;i<h.length;i++){if(h[i]>0)pos++;}
var ratio=pos/h.length;
if(ratio>=0.60)return{mode:"positive",ratio:ratio};
if(ratio<=0.40)return{mode:"negative",ratio:ratio};
return{mode:"neutral",ratio:ratio};}
function applyPSO(val,isNeg){
var pso=calcPSO();
if(pso.mode==="positive"&&isNeg)return val*0.80;
if(pso.mode==="negative"&&isNeg)return val*1.20;
if(pso.mode==="negative"&&!isNeg)return val*0.80;
return val;}

// ── REPAIR WINDOW ──
function openRepair(label){S.repairWin={active:true,remaining:3,trigger:label};}
function checkRepair(isRepair){
if(!S.repairWin.active)return 1.0;
if(isRepair){S.repairWin.active=false;S.repairWin.remaining=0;return 2.0;}
S.repairWin.remaining--;
if(S.repairWin.remaining<=0){S.repairWin.active=false;}return 1.0;}

// ── WEIGHTED SENTIMENT ──
function calcWSent(){
var h=S.sentHistory;if(!h.length)return 0;
var wS=0,wC=0;
for(var i=0;i<h.length;i++){
var isN=h[i]<0;var halfL=isN?15:5;
var w=Math.pow(0.5,(h.length-1-i)/halfL);
wS+=h[i]*w;wC+=w;}
return wC>0?wS/wC:0;}

// ── BEHAVIOR FREQUENCY ──
function trackBeh(cat){
if(!S.behCounts[cat])S.behCounts[cat]=0;
S.behCounts[cat]++;
var c=S.behCounts[cat];
if(c>=5)return 2.0;if(c>=3)return 1.5;return 1.0;}

// ── ATTACHMENT DRIFT ──
function updateDrift(who,isNeg){
var k=who==="a"?"driftA":"driftB";
if(isNeg)S[k].score=clamp(S[k].score-0.5,-10,10);
else S[k].score=clamp(S[k].score+0.3,-10,10);
if(S[k].score>2)S[k].dir="toward secure";
else if(S[k].score<-2)S[k].dir="toward insecure";
else S[k].dir="stable";}

// ── CONFLICT LEVEL ──
function updateConflict(delta){S.conflictLvl=clamp((S.conflictLvl||0)+delta,0,6);}

// ── AUTO-MOOD ──
function autoMood(who,isNeg){
var p=S[who];
if(p.health<0.20)p.mood="depressed";
else if(p.health<0.35&&isNeg)p.mood="anxious";
else if(p.health>0.80&&!isNeg)p.mood="content";}

// ── SOUND ──
var soundOn=false;
function playTone(type){
if(!soundOn)return;
try{var ctx=new(window.AudioContext||window.webkitAudioContext)();
var osc=ctx.createOscillator();var g=ctx.createGain();
osc.connect(g);g.connect(ctx.destination);
if(type==="pos"){osc.frequency.value=523;g.gain.value=0.08;}
else if(type==="neg"){osc.frequency.value=220;g.gain.value=0.08;}
else{osc.frequency.value=440;g.gain.value=0.05;}
osc.start();g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);
osc.stop(ctx.currentTime+0.35);}catch(e){}}
// ── MH IMPACT CALCULATOR ──
function calcMHImpact(who){
var mh=S[who].mh;
var t={emotionRegulation:0,selfWorth:0,secureWithPartner:0,hope:0,
rejectionSensitivity:0,trustInPartner:0,externalStress:0,selfExpectations:0};
var keys=Object.keys(mh);
for(var i=0;i<keys.length;i++){
var k=keys[i];var lvl=mh[k];if(!lvl)continue;
var def=MH[k];if(!def)continue;
var sev=lvl/9;
t.emotionRegulation-=def.severity*sev*0.03;
t.selfWorth-=def.severity*sev*0.02;
t.hope-=def.severity*sev*0.015;
t.externalStress+=def.severity*sev*0.02;
t.secureWithPartner-=def.severity*sev*0.02;
t.trustInPartner-=def.severity*sev*0.015;}
return t;}

// ── INDIVIDUAL HEALTH ──
function calcHealth(who){
var p=S[who];
var pos=(p.emotionRegulation+p.selfWorth+p.secureWithPartner+p.hope+p.trustInPartner)/5;
var neg=(p.rejectionSensitivity+p.externalStress)/2;
p.health=cl(pos*0.7+(1-neg)*0.3);
return p.health;}

// ── RELATIONSHIP HEALTH ──
function calcRelHealth(){
var r=S.rel;
var w={safety:0.13,trust:0.12,bond:0.10,connection:0.08,meaning:0.06,honesty:0.07,
stability:0.07,intimacy:0.05,growth:0.05,passion:0.04,commitment:0.05,sternIntimacy:0.04,
tension:-0.04,friction:-0.04};
var sum=0;var keys=Object.keys(w);
for(var i=0;i<keys.length;i++){sum+=w[keys[i]]*(r[keys[i]]||0);}
r.overall=cl(sum);
// Rusbult commitment
var sat=calcRusbultSatisfaction(r);
var inv=calcRusbultInvestment(r,S.a,S.b);
var alt=calcRusbultAlternatives(S.a,S.b);
r.commitment=cl(calcRusbultCommitment(sat,inv,alt));
return r.overall;}

// ── 8-DIMENSION RADAR ──
var DIM_KEYS=["reactivity","withdrawal","attunement","growth","resilience","expressiveness","selfRegulation","adaptability"];
var DIM_LABELS=["Reactivity","Withdrawal","Attunement","Growth","Resilience","Expressiveness","Self-Regulation","Adaptability"];
var DIM_SHORT=["r","w","a","g","res","exp","sr","adp"];

function calcRadar(who){
var p=S[who];
var mbti=MBTI[p.mbti]||{};var enn=ENNEA[p.ennea]||{};
var att=ATT[p.attach]||{};var mood=MOOD[p.mood]||{};
var o=p.ocean;
var result={};
for(var d=0;d<DIM_SHORT.length;d++){
var dim=DIM_SHORT[d];var val=0.50;
// Attachment (0.28)
val+=(att[dim]||0)*0.28;
// OCEAN (0.18)
var oc=0;var oKeys=["O","C","E","A","N"];
for(var oi=0;oi<oKeys.length;oi++){
var ok=oKeys[oi];var norm=((o[ok]||0.5)-0.5)*2;
oc+=norm*(OCEAN_W[ok][dim]||0)*100;}
val+=oc*0.18;
// MBTI (0.04)
val+=(mbti[dim]||0)*0.04;
// Enneagram (0.02)
val+=(enn[dim]||0)*0.02;
// Mood (temp, half weight)
val+=(mood[dim]||0)*0.5;
// Bowen (0.06)
var bw=calcBowen(p);
if(dim==="sr")val+=(bw.dos-0.5)*0.06;
if(dim==="r")val-=(bw.dos-0.5)*0.04;
if(dim==="adp")val+=(bw.dos-0.5)*0.03;
result[DIM_KEYS[d]]=cl(rnd(val,3));}
return result;}

// ── VULNERABILITY & FRAGILITY ──
function calcVuln(who){
var p=S[who];var base=1.0;
base+=(1-p.emotionRegulation)*0.5;
base+=(1-p.selfWorth)*0.4;
base+=p.rejectionSensitivity*0.5;
base+=p.externalStress*0.4;
base+=((p.ocean.N||0.5)-0.5)*0.33;
return clamp(rnd(base,2),0.4,2.0);}
function calcFrag(){
var r=S.rel;var base=1.0;
base+=(1-r.safety)*0.5;
base+=(1-r.trust)*0.5;
base+=r.tension*0.5;
base+=r.friction*0.4;
base+=(S.conflictLvl||0)*0.05;
return clamp(rnd(base,2),0.4,2.0);}
// ── LL BONUS ──
function calcLLBonus(actor,receiver,cat){
var la=S[actor].ll,lb=S[receiver].ll;
var prox=(LL_COMPAT[la]||{})[lb]||0.5;
if(cat==="Affection"&&(lb==="touch"||lb==="words"))return prox*0.03;
if(cat==="Quality Time"&&lb==="time")return prox*0.03;
if(cat==="Support"&&lb==="acts")return prox*0.02;
return prox*0.01;}

// ── PROCESS INTERACTION (core engine) ──
function processInteraction(dir,catKey,scenIdx,intensity){
pushUndo();
var actor=dir==="AtoB"?"a":"b";
var receiver=dir==="AtoB"?"b":"a";
var cat=INTERACTIONS[catKey];if(!cat)return null;
var scen=cat.scenarios[scenIdx]||cat.scenarios[0];
var label=scen.label;
savePrev(actor);savePrev(receiver);saveRelPrev();

var vuln=calcVuln(receiver);
var frag=calcFrag();
var isNeg=(cat.base.tension||0)>0||(cat.base.trust||0)<0;
var repMult=1.0;
if(catKey==="Repair")repMult=checkRepair(true);
else if(isNeg){checkRepair(false);openRepair(label);}

var confMod=1+(S.conflictLvl||0)*0.08;
var behFreq=trackBeh(catKey);
var llB=calcLLBonus(actor,receiver,catKey);
var lifeMod=LIFE_STAGE[S.lifeStage]||{stress:0};
var finMod=FIN_ALIGN[S.finAlign]||{trust:0,tension:0,stability:0};

var selfD={},partD={},relD={};

// Self impact
if(cat.selfBase){var sk=Object.keys(cat.selfBase);
for(var i=0;i<sk.length;i++){
var v=cat.selfBase[sk[i]]*intensity*2;
if(isNeg)v=applyPSO(v,true)*confMod*behFreq;
else v=applyPSO(v,false)*repMult;
selfD[sk[i]]=rnd(v,3);
S[actor][sk[i]]=cl(S[actor][sk[i]]+v);}}
S[actor].externalStress=cl(S[actor].externalStress+(lifeMod.stress||0)*0.005);

// Partner impact
if(cat.partnerBase){var pk=Object.keys(cat.partnerBase);
for(var i=0;i<pk.length;i++){
var v=cat.partnerBase[pk[i]]*intensity*2*vuln;
if(isNeg)v=applyPSO(v,true)*confMod*behFreq;
else v=applyPSO(v,false)*repMult*(1+llB);
partD[pk[i]]=rnd(v,3);
S[receiver][pk[i]]=cl(S[receiver][pk[i]]+v);}}

// Relationship impact
var rk=Object.keys(cat.base);
for(var i=0;i<rk.length;i++){
var v=cat.base[rk[i]]*intensity*2*frag;
if(isNeg)v=applyPSO(v,true)*confMod*behFreq;
else v=applyPSO(v,false)*repMult*(1+llB);
if(rk[i]==="tension")v+=(finMod.tension||0);
if(rk[i]==="trust")v+=(finMod.trust||0);
if(rk[i]==="stability")v+=(finMod.stability||0);
relD[rk[i]]=rnd(v,3);
S.rel[rk[i]]=cl((S.rel[rk[i]]||0.5)+v);}

// Conflict style modifier
var cs=CONFLICT[S[actor].conflict]||{};
if(isNeg){
if(cs.tension)S.rel.tension=cl(S.rel.tension+cs.tension*intensity);
if(cs.trust)S.rel.trust=cl(S.rel.trust+cs.trust*intensity);
if(cs.safety)S.rel.safety=cl(S.rel.safety+(cs.safety||0)*intensity);}

// Sternberg updates
if(catKey==="Intimacy"||catKey==="Affection"){
S.rel.passion=cl(S.rel.passion+intensity*0.03);
S.rel.sternIntimacy=cl(S.rel.sternIntimacy+intensity*0.02);
}else if(isNeg){
S.rel.passion=cl(S.rel.passion-intensity*0.015);
S.rel.sternIntimacy=cl(S.rel.sternIntimacy-intensity*0.02);}

calcHealth(actor);calcHealth(receiver);calcRelHealth();
S.sentHistory.push(isNeg?-1:1);
if(isNeg)updateConflict(1);
else if(catKey==="Repair")updateConflict(-2);
else updateConflict(-0.5);
updateDrift(receiver,isNeg);
autoMood(actor,isNeg);autoMood(receiver,isNeg);
S.evtCount++;

var dirLabel=dir==="AtoB"?(S.a.name+" → "+S.b.name):(S.b.name+" → "+S.a.name);
S.history.push({event:S.evtCount,label:label,category:catKey,
relHealth:S.rel.overall,healthA:S.a.health,healthB:S.b.health,
direction:dirLabel,intensity:intensity,selfD:selfD,partD:partD,relD:relD});

addLog(dirLabel+": "+label+" ["+catKey+"] @"+pct(intensity)+"%","rel");
addLog(label+" (sent)","ind",actor);
addLog(label+" (received)","ind",receiver);
playTone(isNeg?"neg":"pos");

var result={action:dirLabel+": "+label,category:catKey,intensity:intensity,
selfImpact:selfD,partnerImpact:partD,relImpact:relD,
vulnScale:vuln,fragScale:frag,pso:calcPSO(),
repairMult:repMult,conflictLevel:S.conflictLvl,actor:actor,receiver:receiver};
renderAll();
showEventSummary(result);
return result;}

// ── LOGGING ──
function addLog(msg,type,who){
var entry={time:new Date().toLocaleTimeString(),msg:msg,evt:S.evtCount};
if(type==="rel")S.log.push(entry);
if(type==="ind"&&who==="a")S.logA.push(entry);
if(type==="ind"&&who==="b")S.logB.push(entry);}

function renderLog(elId,entries){
var el=$(elId);if(!el)return;
if(!entries||!entries.length){el.innerHTML='<div style="color:var(--dim)">No events yet.</div>';return;}
var h="";for(var i=entries.length-1;i>=0;i--){
h+='<div class="log-entry">['+entries[i].time+'] '+entries[i].msg+'</div>';}
el.innerHTML=h;}
// ── DOM HELPER ──
function $(id){return document.getElementById(id);}

// ── METER ROW BUILDER ──
function meterHTML(id,label,tip){
return '<div class="meter" id="wrap_'+id+'">'
+'<div class="meter-label"><span data-tip="'+(tip||"")+'" style="cursor:help">'+label+'</span>'
+'<span class="meter-val" id="val_'+id+'">0</span></div>'
+'<div class="meter-track"><div class="meter-fill" id="fill_'+id+'"></div></div></div>';}

function buildIndMeters(who){
var s=who==="a"?"A":"B";
var el=$("meters"+s);if(!el)return;
var h="";
h+=meterHTML("emReg"+s,"Emotion Regulation",TIP.emotionRegulation);
h+=meterHTML("worth"+s,"Self-Worth",TIP.selfWorth);
h+=meterHTML("secure"+s,"Security w/ Partner",TIP.secureWithPartner);
h+=meterHTML("hope"+s,"Hope",TIP.hope);
h+=meterHTML("rejSens"+s,"Rejection Sensitivity",TIP.rejectionSensitivity);
h+=meterHTML("trustP"+s,"Trust in Partner",TIP.trustInPartner);
h+=meterHTML("stress"+s,"External Stress",TIP.externalStress);
h+=meterHTML("expect"+s,"Self-Expectations",TIP.selfExpectations);
h+=meterHTML("health"+s,"Overall Health",TIP.health);
h+=meterHTML("intim"+s,"Intimacy",TIP.intimacy);
el.innerHTML=h;}

function buildRelMeters(){
var el=$("relMetersBox");if(!el)return;
var h="";
h+=meterHTML("rSafety","Safety",TIP.safety);
h+=meterHTML("rTrust","Trust",TIP.trust);
h+=meterHTML("rBond","Bond",TIP.bond);
h+=meterHTML("rConn","Connection",TIP.connection);
h+=meterHTML("rMeaning","Meaning",TIP.meaning);
h+=meterHTML("rHonesty","Honesty",TIP.honesty);
h+=meterHTML("rStab","Stability",TIP.stability);
h+=meterHTML("rIntim","Intimacy",TIP.intimacy);
h+=meterHTML("rGrowth","Growth",TIP.growth);
h+=meterHTML("rTension","Tension",TIP.tension);
h+=meterHTML("rFriction","Friction",TIP.friction);
h+=meterHTML("rPassion","Passion",TIP.passion);
h+=meterHTML("rCommit","Commitment",TIP.commitment);
h+=meterHTML("rSternInt","Emotional Intimacy",TIP.sternIntimacy);
h+=meterHTML("rOverall","Overall",TIP.overall);
el.innerHTML=h;}

// ── RENDER A SINGLE METER ──
function setMeter(id,val){
var fill=$("fill_"+id);var valEl=$("val_"+id);
if(!fill||!valEl)return;
var p=Math.round(val*100);
fill.style.width=p+"%";
var color=p>=70?"var(--green)":p>=50?"#8ecae6":p>=35?"var(--yellow)":"var(--red)";
// Invert color for negative metrics
if(id.indexOf("Tension")>=0||id.indexOf("Friction")>=0||
id.indexOf("rejSens")>=0||id.indexOf("stress")>=0){
color=p<=30?"var(--green)":p<=50?"#8ecae6":p<=65?"var(--yellow)":"var(--red)";}
fill.style.background=color;
valEl.textContent=p;
valEl.style.color=color;
var wrap=$("wrap_"+id);
if(wrap){wrap.classList.remove("changed");void wrap.offsetWidth;wrap.classList.add("changed");}}
// ── RADAR SVG RENDERER ──
function renderRadar(containerId,who){
var el=$(containerId);if(!el)return;
var radar=calcRadar(who);
var cx=130,cy=125,maxR=90,n=8;
var svg='<svg width="260" height="260" viewBox="0 0 260 260">';
// Grid circles
for(var r=22;r<=maxR;r+=22){
svg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';}
// Axes + labels
var pts=[];
for(var i=0;i<n;i++){
var ang=(Math.PI*2/n)*i-Math.PI/2;
var ex=cx+Math.cos(ang)*maxR;
var ey=cy+Math.sin(ang)*maxR;
svg+='<line x1="'+cx+'" y1="'+cy+'" x2="'+rnd(ex,1)+'" y2="'+rnd(ey,1)+'" stroke="rgba(255,255,255,0.08)"/>';
var lx=cx+Math.cos(ang)*(maxR+18);
var ly=cy+Math.sin(ang)*(maxR+18);
var v=radar[DIM_KEYS[i]]||0.5;
var anchor="middle";
if(Math.cos(ang)>0.3)anchor="start";
if(Math.cos(ang)<-0.3)anchor="end";
svg+='<text x="'+rnd(lx,0)+'" y="'+rnd(ly,0)+'" fill="var(--dim)" font-size="8" text-anchor="'+anchor+'" dominant-baseline="middle">'+DIM_LABELS[i]+' '+pct(v)+'</text>';
var pv=v;
pts.push([cx+Math.cos(ang)*maxR*pv,cy+Math.sin(ang)*maxR*pv]);}
// Polygon
var poly="";for(var i=0;i<pts.length;i++)poly+=rnd(pts[i][0],1)+","+rnd(pts[i][1],1)+" ";
svg+='<polygon points="'+poly+'" fill="rgba(88,166,255,0.12)" stroke="var(--accent)" stroke-width="2"/>';
for(var i=0;i<pts.length;i++){
svg+='<circle cx="'+rnd(pts[i][0],1)+'" cy="'+rnd(pts[i][1],1)+'" r="4" fill="var(--accent)"/>';}
svg+='</svg>';
el.innerHTML=svg;}
// ── RENDER INDIVIDUAL METRICS ──
function renderIndMetrics(who){
var p=S[who];var s=who==="a"?"A":"B";
setMeter("emReg"+s,p.emotionRegulation);
setMeter("worth"+s,p.selfWorth);
setMeter("secure"+s,p.secureWithPartner);
setMeter("hope"+s,p.hope);
setMeter("rejSens"+s,p.rejectionSensitivity);
setMeter("trustP"+s,p.trustInPartner);
setMeter("stress"+s,p.externalStress);
setMeter("expect"+s,p.selfExpectations);
setMeter("health"+s,p.health);
setMeter("intim"+s,p.intimacy);
// Bowen DoS
var dosEl=$("dos"+s);
if(dosEl){var bw=calcBowen(p);var bl=bowenLabel(bw.dos);
dosEl.innerHTML="<strong>Differentiation:</strong> "+bl+" ("+pct(bw.dos)+"%)";}
// Drift
var drEl=$("drift"+s);
if(drEl){var dk=who==="a"?S.driftA:S.driftB;
if(dk.score!==0)drEl.innerHTML="Attachment drift: <strong>"+dk.dir+"</strong> ("+rnd(dk.score,1)+")";
else drEl.innerHTML="";}
// Sentiment
var seEl=$("sentiment"+s);
if(seEl){var ws=calcWSent();
var lbl=ws>0.3?"Positive":ws<-0.3?"Negative":"Neutral";
seEl.innerHTML="Weighted sentiment: <strong>"+lbl+"</strong> ("+rnd(ws,2)+")";}}

// ── RENDER RELATIONSHIP METRICS ──
function renderRelMetrics(){
var r=S.rel;
setMeter("rSafety",r.safety);setMeter("rTrust",r.trust);
setMeter("rBond",r.bond);setMeter("rConn",r.connection);
setMeter("rMeaning",r.meaning);setMeter("rHonesty",r.honesty);
setMeter("rStab",r.stability);setMeter("rIntim",r.intimacy);
setMeter("rGrowth",r.growth);setMeter("rTension",r.tension);
setMeter("rFriction",r.friction);setMeter("rPassion",r.passion);
setMeter("rCommit",r.commitment);setMeter("rSternInt",r.sternIntimacy);
setMeter("rOverall",r.overall);

// Status tier
var stEl=$("relStatus");
if(stEl){var t=getTier(r.overall,REL_TIERS);
stEl.innerHTML="<strong>Status:</strong> <span style='color:"+t.color+"'>"+t.label+"</span> ("+pct(r.overall)+"%)";}
// Sternberg
var stbEl=$("sternbergBox");
if(stbEl){var st=classifySternberg(r.sternIntimacy,r.passion,r.commitment);
stbEl.innerHTML="<strong>Love Type:</strong> <span style='color:"+st.color+"'>"+st.type+"</span><br><small>"+st.desc+"</small>";}
// Rusbult
var ruEl=$("rusbultBox");
if(ruEl){var sat=calcRusbultSatisfaction(r);var inv=calcRusbultInvestment(r,S.a,S.b);
var alt=calcRusbultAlternatives(S.a,S.b);
ruEl.innerHTML="<strong>Investment Model:</strong> Sat: "+pct(sat)+"% | Inv: "+pct(inv)+"% | Alt: "+pct(alt)+"%";}
// PSO
var psoEl=$("psoBox");
if(psoEl){var pso=calcPSO();
var lbl=pso.mode==="positive"?"Positive Override ✓":pso.mode==="negative"?"Negative Override ✗":"Neutral";
var clr=pso.mode==="positive"?"var(--green)":pso.mode==="negative"?"var(--red)":"var(--dim)";
psoEl.innerHTML="<span style='color:"+clr+"'>"+lbl+"</span> ("+Math.round(pso.ratio*100)+"% positive)";}
// Repair window
var repEl=$("repairBox");
if(repEl){if(S.repairWin.active)repEl.innerHTML="<span style='color:var(--yellow)'>⚠ Repair Window: "+S.repairWin.remaining+" events left</span>";
else repEl.innerHTML="";}
// Conflict
var confEl=$("conflictBox");
if(confEl){if(S.conflictLvl>0){
var labels=["Calm","Mild","Rising","Active","Heated","Escalated","Crisis"];
confEl.innerHTML="Conflict: <strong>"+labels[Math.min(Math.round(S.conflictLvl),6)]+"</strong> ("+Math.round(S.conflictLvl)+"/6)";}
else confEl.innerHTML="";}}
// ── PROFILE STORY ──
function renderStory(who){
var p=S[who];var s=who==="a"?"A":"B";
var el=$("story"+s);if(!el)return;
var mbti=MBTI[p.mbti]||{label:p.mbti};
var enn=ENNEA[p.ennea]||{label:p.ennea};
var att=ATT[p.attach]||{label:p.attach};
var tier=getTier(p.health,IND_TIERS);
var radar=calcRadar(who);
var bw=calcBowen(p);
var h="<strong>"+p.name+"</strong> — "+mbti.label+" ("+p.mbti+"), Enneagram "+enn.label;
h+=". Attachment: <em>"+att.label+"</em>.";
h+="<br>Health: <span style='color:"+tier.color+"'>"+tier.label+"</span> ("+pct(p.health)+"%)";
h+="<br>Differentiation: "+bowenLabel(bw.dos)+" ("+pct(bw.dos)+"%)";
h+="<br><strong>Radar:</strong> ";
for(var i=0;i<DIM_KEYS.length;i++){h+=DIM_LABELS[i]+":"+pct(radar[DIM_KEYS[i]])+"%";if(i<7)h+=" · ";}
if(att.desc)h+="<br><small>"+att.desc+"</small>";
el.innerHTML=h;}

// ── RELATIONSHIP NARRATIVE ──
function renderNarrative(){
var el=$("relNarrative");if(!el)return;
if(!S.evtCount){el.innerHTML="Run the engine to generate narrative.";return;}
var r=S.rel;var tier=getTier(r.overall,REL_TIERS);
var pso=calcPSO();
var combo=getAttCombo(S.a.attach,S.b.attach);
var st=classifySternberg(r.sternIntimacy,r.passion,r.commitment);
var h="<strong>"+S.a.name+" & "+S.b.name+"</strong> — <span style='color:"+tier.color+"'>"+tier.label+"</span> ("+pct(r.overall)+"%)";
h+="<br><strong>Dynamic:</strong> "+combo.label+" — "+combo.dynamics;
h+="<br><strong>Love Type:</strong> "+st.type+" — "+st.desc;
h+="<br><strong>Climate:</strong> ";
if(pso.mode==="positive")h+="Positive Override active — negatives buffered 20%.";
else if(pso.mode==="negative")h+="Negative Override active — negatives amplified 20%.";
else h+="Neutral climate.";
h+="<br><strong>Key Dynamics:</strong><br>";
if(r.trust<0.40)h+="• Trust critically low ("+pct(r.trust)+"%). Needs consistent positive actions.<br>";
if(r.tension>0.60)h+="• High tension ("+pct(r.tension)+"%) amplifying negatives.<br>";
if(r.safety<0.40)h+="• Safety compromised ("+pct(r.safety)+"%).<br>";
if(r.passion<0.30)h+="• Passion faded ("+pct(r.passion)+"%). Needs novelty.<br>";
if(r.bond>0.70)h+="• Strong bond ("+pct(r.bond)+"%) provides resilience.<br>";
if(r.commitment>0.75)h+="• Strong commitment ("+pct(r.commitment)+"%) holds through difficulty.<br>";
if(S.conflictLvl>3)h+="• Conflict at level "+Math.round(S.conflictLvl)+". De-escalation urgent.<br>";
if(S.repairWin.active)h+="• ⚠ Repair window open — repairs now are 2x effective!<br>";
el.innerHTML=h;}

// ── RECOMMENDATIONS ──
function renderRecs(){
var el=$("recommendations");if(!el)return;
if(!S.evtCount){el.innerHTML="Run the engine to generate recommendations.";return;}
var recs=[];var r=S.rel;
if(r.trust<0.50)recs.push("🔒 Trust below 50%. Focus on small, consistent positive actions.");
if(r.tension>0.50)recs.push("🌡 Tension at "+pct(r.tension)+"%. Use Time-Out Protocol, then Repair.");
if(r.safety<0.50)recs.push("🛡 Safety needs work. Validate feelings before problem-solving.");
if(r.intimacy<0.40)recs.push("💞 Intimacy low. Schedule device-free Quality Time.");
if(r.passion<0.30)recs.push("🔥 Passion faded. Prioritize novelty and physical closeness.");
if(S.conflictLvl>3)recs.push("⚡ High conflict. Both partners: Box Breathing before discussions.");
if(S.a.externalStress>0.60||S.b.externalStress>0.60)recs.push("🏔 External stress high. Prioritize individual Resilience Practices.");
if(S.a.selfWorth<0.40||S.b.selfWorth<0.40)recs.push("💎 Low Self-Worth detected. Self-Compassion Break recommended.");
var pso=calcPSO();
if(pso.mode==="negative")recs.push("📊 Negative Override active. Need 5:1 positive-to-negative ratio.");
if(S.repairWin.active)recs.push("🔧 Repair window open! Repair now = 2x effective.");
if(r.commitment<0.40)recs.push("🤝 Commitment low. Discuss shared goals and increase investment.");
if(!recs.length)recs.push("✨ Relationship in good shape. Keep investing in appreciation and quality time.");
el.innerHTML=recs.join("<br>");}
// ── TIMELINE ──
function renderTimeline(){
var el=$("timelineBox");if(!el)return;
if(S.history.length<2){el.innerHTML='<div style="color:var(--dim)">Process events to build timeline.</div>';return;}
var w=500,h=80,pad=30;var n=S.history.length;
var stepX=(w-pad*2)/(n-1);
var svg='<svg width="100%" viewBox="0 0 '+w+' '+h+'">';
for(var g=0;g<=100;g+=25){var gy=pad+(1-g/100)*(h-pad*2);
svg+='<line x1="'+pad+'" y1="'+gy+'" x2="'+(w-pad)+'" y2="'+gy+'" stroke="rgba(255,255,255,0.06)"/>';
svg+='<text x="'+(pad-3)+'" y="'+gy+'" fill="var(--dim)" font-size="7" text-anchor="end" dominant-baseline="middle">'+g+'</text>';}
// Lines
var lines=[{key:"relHealth",color:"var(--accent)"},{key:"healthA",color:"var(--green)"},{key:"healthB",color:"var(--purple)"}];
for(var li=0;li<lines.length;li++){var path="M";
for(var i=0;i<n;i++){var x=pad+i*stepX;var y=pad+(1-S.history[i][lines[li].key])*(h-pad*2);
path+=(i===0?"":" L")+rnd(x,1)+","+rnd(y,1);}
svg+='<path d="'+path+'" fill="none" stroke="'+lines[li].color+'" stroke-width="1.5" opacity="0.8"/>';}
// Dots
for(var i=0;i<n;i++){var x=pad+i*stepX;var y=pad+(1-S.history[i].relHealth)*(h-pad*2);
var e=S.history[i];
svg+='<circle cx="'+rnd(x,1)+'" cy="'+rnd(y,1)+'" r="4" fill="var(--accent)" opacity="0.7" '
+'data-tip="'+e.label+' | '+e.category+' | Rel:'+pct(e.relHealth)+'%" style="cursor:pointer"/>';}
svg+='</svg>';
el.innerHTML=svg;}

// ── EVENT SUMMARY MODAL ──
function showEventSummary(result){
if(!result)return;
var el=$("eventBody");if(!el)return;
var h="<strong>"+result.action+"</strong> @ "+pct(result.intensity)+"%";
h+="<br>Vulnerability: "+result.vulnScale+"x | Fragility: "+result.fragScale+"x | Conflict: Lv"+Math.round(result.conflictLevel);
var sections=[
{label:S[result.actor].name+" (Self)",data:result.selfImpact,color:"var(--accent)"},
{label:S[result.receiver].name+" (Partner ×"+result.vulnScale+")",data:result.partnerImpact,color:"var(--purple)"},
{label:"Relationship (×"+result.fragScale+")",data:result.relImpact,color:"var(--yellow)"}];
for(var s=0;s<sections.length;s++){
if(!sections[s].data)continue;
h+="<br><strong style='color:"+sections[s].color+"'>"+sections[s].label+"</strong><br>";
var keys=Object.keys(sections[s].data);
for(var i=0;i<keys.length;i++){var v=sections[s].data[keys[i]];if(v===0)continue;
var clr=v>0?"var(--green)":"var(--red)";
h+="<span style='color:"+clr+"'>"+friendly(keys[i])+": "+(v>0?"+":"")+pct(v)+"%</span> ";}}
el.innerHTML=h;
$("eventModal").classList.add("active");}

// ── APPLY PRACTICE ──
function applyPractice(who,idx){
pushUndo();var p=PRACTICES[idx];if(!p)return;
savePrev(who);saveRelPrev();
var other=who==="a"?"b":"a";
if(p.effects){var ek=Object.keys(p.effects);
for(var i=0;i<ek.length;i++){if(S[who][ek[i]]!==undefined)S[who][ek[i]]=cl(S[who][ek[i]]+p.effects[ek[i]]);}}
if(p.partnerEffects){var pk=Object.keys(p.partnerEffects);
for(var i=0;i<pk.length;i++){if(S[other][pk[i]]!==undefined)S[other][pk[i]]=cl(S[other][pk[i]]+p.partnerEffects[pk[i]]);}}
if(p.relEffects){var rk=Object.keys(p.relEffects);
for(var i=0;i<rk.length;i++){if(S.rel[rk[i]]!==undefined)S.rel[rk[i]]=cl(S.rel[rk[i]]+p.relEffects[rk[i]]);}}
calcHealth(who);calcHealth(other);calcRelHealth();
S.sentHistory.push(1);S.evtCount++;
addLog(S[who].name+" practiced: "+p.label,"ind",who);
addLog(S[who].name+" → "+p.label+" (resilience)","rel");
playTone("pos");renderAll();}

// ── APPLY TOXIC ──
function applyToxic(who,idx){
pushUndo();var t=TOXICS[idx];if(!t)return;
savePrev(who);saveRelPrev();
var other=who==="a"?"b":"a";
if(t.effects){var ek=Object.keys(t.effects);
for(var i=0;i<ek.length;i++){if(S[who][ek[i]]!==undefined)S[who][ek[i]]=cl(S[who][ek[i]]+t.effects[ek[i]]);}}
if(t.partnerEffects){var pk=Object.keys(t.partnerEffects);
for(var i=0;i<pk.length;i++){if(S[other][pk[i]]!==undefined)S[other][pk[i]]=cl(S[other][pk[i]]+t.partnerEffects[pk[i]]);}}
if(t.relEffects){var rk=Object.keys(t.relEffects);
for(var i=0;i<rk.length;i++){if(S.rel[rk[i]]!==undefined)S.rel[rk[i]]=cl(S.rel[rk[i]]+t.relEffects[rk[i]]);}}
calcHealth(who);calcHealth(other);calcRelHealth();
S.sentHistory.push(-1);S.evtCount++;
updateConflict(1);openRepair(t.label);
addLog(S[who].name+" did: "+t.label,"ind",who);
addLog(S[who].name+" → "+t.label+" (toxic)","rel");
playTone("neg");renderAll();}
// ── OCEAN SLIDER BUILDER ──
function buildOcean(who){
var s=who==="a"?"A":"B";var el=$("oceanSliders"+s);if(!el)return;
var traits=[["O","Openness"],["C","Conscientiousness"],["E","Extraversion"],["A","Agreeableness"],["N","Neuroticism"]];
var h="";
for(var i=0;i<traits.length;i++){var t=traits[i];var v=Math.round((S[who].ocean[t[0]]||0.5)*100);
h+='<div class="ocean-item"><div class="ocean-label"><span>'+t[1]+'</span><span id="ov'+t[0]+s+'">'+v+'</span></div>'
+'<input type="range" min="0" max="100" value="'+v+'" class="slider" data-who="'+who+'" data-trait="'+t[0]+'"></div>';}
el.innerHTML=h;
el.querySelectorAll("input").forEach(function(inp){
inp.addEventListener("input",function(){
var w=this.getAttribute("data-who");var t=this.getAttribute("data-trait");
S[w].ocean[t]=parseInt(this.value)/100;
var vs=w==="a"?"A":"B";var valEl=$("ov"+t+vs);if(valEl)valEl.textContent=this.value;});});}

function setOceanFromMBTI(who){
var m=MBTI[S[who].mbti];if(!m||!m.ocean)return;
var o=m.ocean;S[who].ocean={O:o.O/100,C:o.C/100,E:o.E/100,A:o.A/100,N:o.N/100};
buildOcean(who);}

// ── MH SLIDER BUILDER ──
function buildMH(who){
var s=who==="a"?"A":"B";var el=$("mhSliders"+s);if(!el)return;
var h="";
for(var i=0;i<MH_ORDER.length;i++){var k=MH_ORDER[i];var def=MH[k];if(!def)continue;
var v=S[who].mh[k]||0;
var tip=def.selfTip+" | "+def.partnerTip+" | "+def.engTip;
h+='<div class="mh-item" data-tip="'+tip.replace(/"/g,"&quot;")+'"><div class="mh-label"><span>'+def.label+'</span><span id="mhv_'+k+s+'">'+v+'</span></div>'
+'<input type="range" min="0" max="9" value="'+v+'" class="slider" data-who="'+who+'" data-key="'+k+'"></div>';}
el.innerHTML=h;
el.querySelectorAll("input").forEach(function(inp){
inp.addEventListener("input",function(){
var w=this.getAttribute("data-who");var k=this.getAttribute("data-key");
S[w].mh[k]=parseInt(this.value);
var vs=w==="a"?"A":"B";var vEl=$("mhv_"+k+vs);if(vEl)vEl.textContent=this.value;});});}

// ── PRACTICE BUTTONS ──
function buildPractBtns(who){
var s=who==="a"?"A":"B";var el=$("practiceButtons"+s);if(!el)return;
var h="";for(var i=0;i<PRACTICES.length;i++){
h+='<button class="btn" data-who="'+who+'" data-idx="'+i+'" data-tip="'+PRACTICES[i].label+'">'+PRACTICES[i].label+'</button>';}
el.innerHTML=h;
el.querySelectorAll("button").forEach(function(btn){
btn.addEventListener("click",function(){applyPractice(this.getAttribute("data-who"),parseInt(this.getAttribute("data-idx")));});});}

// ── TOXIC BUTTONS ──
function buildToxBtns(who){
var s=who==="a"?"A":"B";var el=$("toxicButtons"+s);if(!el)return;
var h="";for(var i=0;i<TOXICS.length;i++){
h+='<button class="btn btn-danger" data-who="'+who+'" data-idx="'+i+'">'+TOXICS[i].label+'</button>';}
el.innerHTML=h;
el.querySelectorAll("button").forEach(function(btn){
btn.addEventListener("click",function(){applyToxic(this.getAttribute("data-who"),parseInt(this.getAttribute("data-idx")));});});}

// ── POPULATE CATEGORY DROPDOWN ──
function populateCats(selId){
var el=$(selId);if(!el)return;
el.innerHTML='<option value="">-- Select --</option>';
for(var i=0;i<CAT_ORDER.length;i++){
el.innerHTML+='<option value="'+CAT_ORDER[i]+'">'+CAT_ORDER[i]+'</option>';}}

function populateScens(catKey,selId){
var el=$(selId);if(!el)return;
el.innerHTML='<option value="">-- Select Category --</option>';
var cat=INTERACTIONS[catKey];if(!cat)return;
for(var i=0;i<cat.scenarios.length;i++){
el.innerHTML+='<option value="'+i+'">'+cat.scenarios[i].label+'</option>';}}

// ── READ UI INTO STATE ──
function readUI(){
S.a.name=$("nameA")?$("nameA").value:"Person A";
S.b.name=$("nameB")?$("nameB").value:"Person B";
S.a.mbti=$("mbtiA")?$("mbtiA").value:"INTJ";
S.b.mbti=$("mbtiB")?$("mbtiB").value:"ENFP";
S.a.ennea=$("enneagramA")?$("enneagramA").value:"4";
S.b.ennea=$("enneagramB")?$("enneagramB").value:"2";
S.a.attach=$("attachA")?$("attachA").value:"secure";
S.b.attach=$("attachB")?$("attachB").value:"anxious";
S.a.ll=$("llA")?$("llA").value:"time";
S.b.ll=$("llB")?$("llB").value:"words";
S.a.conflict=$("conflictA")?$("conflictA").value:"collaborative";
S.b.conflict=$("conflictB")?$("conflictB").value:"collaborative";
S.a.mood=$("moodA")?$("moodA").value:"neutral";
S.b.mood=$("moodB")?$("moodB").value:"calm";
S.a.support=parseInt(($("supportA")||{}).value)||50;
S.b.support=parseInt(($("supportB")||{}).value)||50;
S.relType=$("relType")?$("relType").value:"romantic";
S.lifeStage=$("lifeStage")?$("lifeStage").value:"committed";
S.finAlign=$("financialAlign")?$("financialAlign").value:"some-diff";
S.startCond=$("startCondition")?$("startCondition").value:"average";
var ha=$("hdA");if(ha)ha.textContent=S.a.name;
var hb=$("hdB");if(hb)hb.textContent=S.b.name;}

// ── APPLY STARTING CONDITION ──
function applyStart(){
var cond=START[S.startCond];if(!cond)return;
var keys=Object.keys(cond);
for(var i=0;i<keys.length;i++){if(keys[i]!=="label"&&S.rel[keys[i]]!==undefined)S.rel[keys[i]]=cond[keys[i]];}}

// ── RENDER ALL ──
function renderAll(){
readUI();calcHealth("a");calcHealth("b");calcRelHealth();
renderIndMetrics("a");renderIndMetrics("b");
renderRelMetrics();
renderRadar("radarA","a");renderRadar("radarB","b");
renderStory("a");renderStory("b");
renderNarrative();renderRecs();renderTimeline();
renderLog("logA",S.logA);renderLog("logB",S.logB);renderLog("relLog",S.log);}
// ── TOOLTIP SYSTEM ──
function initTooltips(){
var tip=$("globalTooltip");if(!tip)return;
document.addEventListener("mouseover",function(e){
var t=e.target;if(!t)return;
var el=t.closest?t.closest("[data-tip]"):null;
if(!el)return;
var text=el.getAttribute("data-tip");if(!text)return;
tip.textContent=text;tip.classList.add("show");
var rect=el.getBoundingClientRect();
var tx=rect.left+window.scrollX;
var ty=rect.bottom+window.scrollY+8;
if(tx+330>window.innerWidth)tx=window.innerWidth-340;
if(tx<4)tx=4;
tip.style.left=tx+"px";tip.style.top=ty+"px";});
document.addEventListener("mouseout",function(e){
if(!e.target)return;
var el=e.target.closest?e.target.closest("[data-tip]"):null;
if(el)tip.classList.remove("show");});}

// ── ACCORDION SYSTEM ──
function initAccordions(){
document.querySelectorAll(".acc-hd").forEach(function(hd){
hd.addEventListener("click",function(){
var acc=this.parentElement;acc.classList.toggle("open");
var arrow=this.querySelector(".arrow");
if(arrow)arrow.textContent=acc.classList.contains("open")?"▼":"▶";});});}

// ── DISCLAIMER ──
function initDisclaimer(){
var ov=$("disclaimerOverlay");if(!ov)return;
if(localStorage.getItem("novus_disc_v3")==="1"){ov.classList.add("dismissed");showApp();return;}
var cb=$("disclaimerCB");var btn=$("disclaimerBtn");
if(!cb||!btn)return;
cb.addEventListener("change",function(){btn.disabled=!cb.checked;});
btn.addEventListener("click",function(){
if(!cb.checked)return;
ov.classList.add("dismissed");
localStorage.setItem("novus_disc_v3","1");
showApp();});}

function showApp(){
var app=$("appWrap");if(app)app.style.display="";}

// ── MODAL SYSTEM ──
function initModals(){
document.querySelectorAll(".modal-x").forEach(function(btn){
btn.addEventListener("click",function(){
var id=this.getAttribute("id");
// Find parent overlay
var overlay=this.closest(".modal-overlay");
if(overlay)overlay.classList.remove("active");});});
document.querySelectorAll(".modal-overlay").forEach(function(ov){
ov.addEventListener("click",function(e){if(e.target===ov)ov.classList.remove("active");});});}

// ── INTERACTION BUILDER WIRING ──
function initIB(){
populateCats("ibCat");populateCats("ibChainCat");
var catSel=$("ibCat");var scenSel=$("ibScen");var goBtn=$("ibGo");
var intSlider=$("ibInt");var intVal=$("ibIntVal");
if(catSel)catSel.addEventListener("change",function(){
populateScens(this.value,"ibScen");updateIBState();});
if(scenSel)scenSel.addEventListener("change",function(){
var cat=INTERACTIONS[catSel.value];
if(cat&&this.value!==""){var sc=cat.scenarios[parseInt(this.value)];
if(sc&&intSlider){intSlider.value=Math.round(sc.int*100);if(intVal)intVal.textContent=Math.round(sc.int*100);}}
updateIBState();});
if(intSlider)intSlider.addEventListener("input",function(){if(intVal)intVal.textContent=this.value;});
function updateIBState(){
var ready=catSel&&catSel.value&&scenSel&&scenSel.value!=="";
if(goBtn)goBtn.disabled=!ready;}
if(goBtn)goBtn.addEventListener("click",function(){
var dir=$("ibDir")?$("ibDir").value:"AtoB";
var cat=catSel.value;var scen=parseInt(scenSel.value);
var inten=parseInt(intSlider.value)/100;
if(!cat||isNaN(scen))return;
processInteraction(dir,cat,scen,inten);
var chain=$("ibChain");if(chain)chain.style.display="block";});

// Chain
var ccSel=$("ibChainCat");var csSel=$("ibChainScen");var cBtn=$("ibChainGo");
var cInt=$("ibChainInt");var cIntVal=$("ibChainIntVal");
if(ccSel)ccSel.addEventListener("change",function(){populateScens(this.value,"ibChainScen");updateChainState();});
if(csSel)csSel.addEventListener("change",function(){updateChainState();});
if(cInt)cInt.addEventListener("input",function(){if(cIntVal)cIntVal.textContent=this.value;});
function updateChainState(){if(cBtn)cBtn.disabled=!(ccSel&&ccSel.value&&csSel&&csSel.value!=="");}
if(cBtn)cBtn.addEventListener("click",function(){
var mainDir=$("ibDir")?$("ibDir").value:"AtoB";
var revDir=mainDir==="AtoB"?"BtoA":"AtoB";
var cat=ccSel.value;var scen=parseInt(csSel.value);
var inten=parseInt(cInt.value)/100;
if(!cat||isNaN(scen))return;
processInteraction(revDir,cat,scen,inten);});}

// ── MOMENT SIMULATOR ──
function initMoment(){
var fab=$("fabMoment");var modal=$("momentModal");var close=$("momentClose");
if(fab)fab.addEventListener("click",function(){if(modal)modal.classList.add("active");});
if(close)close.addEventListener("click",function(){if(modal)modal.classList.remove("active");});
populateCats("momCat");
var mc=$("momCat");var ms=$("momScen");var mi=$("momInt");var miv=$("momIntVal");
var mp=$("momPreview");var mr=$("momRegister");
if(mc)mc.addEventListener("change",function(){populateScens(this.value,"momScen");updateMomState();});
if(ms)ms.addEventListener("change",function(){updateMomState();});
if(mi)mi.addEventListener("input",function(){if(miv)miv.textContent=this.value;});
function updateMomState(){var ready=mc&&mc.value&&ms&&ms.value!=="";
if(mp)mp.disabled=!ready;if(mr)mr.disabled=!ready;}
if(mp)mp.addEventListener("click",function(){
var cat=mc.value;var scen=parseInt(ms.value);var inten=parseInt(mi.value)/100;
if(!cat||isNaN(scen))return;
var catD=INTERACTIONS[cat];var sc=catD.scenarios[scen];
var recv=$("momDir")?($("momDir").value==="AtoB"?"b":"a"):"b";
var vuln=calcVuln(recv);var frag=calcFrag();
var res=$("momResult");if(!res)return;
var h="<strong>Preview:</strong> "+sc.label+"<br>Intensity: "+pct(inten)+"% | Vuln: "+rnd(vuln,2)+"x | Frag: "+rnd(frag,2)+"x<br><strong>Expected:</strong> ";
var bk=Object.keys(catD.base);
for(var i=0;i<bk.length;i++){var v=catD.base[bk[i]]*inten*2*frag;
h+=friendly(bk[i])+": "+(v>0?"+":"")+pct(v)+"% ";}
res.innerHTML=h;res.style.display="block";});
if(mr)mr.addEventListener("click",function(){
var dir=$("momDir")?$("momDir").value:"AtoB";
var cat=mc.value;var scen=parseInt(ms.value);var inten=parseInt(mi.value)/100;
if(!cat||isNaN(scen))return;
if(modal)modal.classList.remove("active");
processInteraction(dir,cat,scen,inten);});}

// ── SAVE / LOAD / EXPORT ──
function saveSession(){try{var d=clone(S);delete d.undoStack;localStorage.setItem("novus_v3",JSON.stringify(d));addLog("Session saved.","rel");}catch(e){}}
function loadSession(){try{var raw=localStorage.getItem("novus_v3");if(!raw)return;var d=JSON.parse(raw);
Object.keys(d).forEach(function(k){S[k]=d[k];});S.undoStack=[];renderAll();addLog("Session loaded.","rel");}catch(e){}}
function exportReport(){
var lines=["NOVUS LOVE v3 — SESSION REPORT","Generated: "+new Date().toLocaleString(),"=".repeat(40)];
lines.push("PERSON A: "+S.a.name+" | "+S.a.mbti+" | "+ATT[S.a.attach].label+" | Health: "+pct(S.a.health)+"%");
lines.push("PERSON B: "+S.b.name+" | "+S.b.mbti+" | "+ATT[S.b.attach].label+" | Health: "+pct(S.b.health)+"%");
lines.push("RELATIONSHIP: "+pct(S.rel.overall)+"% | "+getTier(S.rel.overall,REL_TIERS).label);
var st=classifySternberg(S.rel.sternIntimacy,S.rel.passion,S.rel.commitment);
lines.push("Love Type: "+st.type+" | Conflict: "+Math.round(S.conflictLvl)+"/6");
lines.push("","EVENT LOG ("+S.log.length+")");
for(var i=0;i<S.log.length;i++)lines.push("["+S.log[i].time+"] "+S.log[i].msg);
var blob=new Blob([lines.join("\n")],{type:"text/plain"});
var url=URL.createObjectURL(blob);var a=document.createElement("a");
a.href=url;a.download="novus-report-"+Date.now()+".txt";
document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}

// ── COMPARE MODAL ──
function renderCompare(){
var el=$("compareBody");if(!el)return;
if(!S.snapshot){el.innerHTML="Take a snapshot first.";return;}
var snap=S.snapshot;
var h='<table style="width:100%;border-collapse:collapse;font-size:.8rem"><tr><th style="text-align:left;padding:4px;border-bottom:1px solid var(--border)">Metric</th><th>Snapshot</th><th>Current</th><th>Change</th></tr>';
var rk=["safety","trust","bond","connection","meaning","honesty","stability","intimacy","growth","tension","friction","passion","commitment","sternIntimacy","overall"];
for(var i=0;i<rk.length;i++){var k=rk[i];var old=snap.rel[k]||0;var cur=S.rel[k]||0;
var diff=rnd(cur-old,3);var clr=diff>0?"var(--green)":diff<0?"var(--red)":"var(--dim)";
if(k==="tension"||k==="friction")clr=diff>0?"var(--red)":diff<0?"var(--green)":"var(--dim)";
h+='<tr><td style="padding:3px 6px;border-bottom:1px solid var(--border)">'+friendly(k)+'</td><td style="text-align:center">'+pct(old)+'</td><td style="text-align:center">'+pct(cur)+'</td><td style="text-align:center;color:'+clr+'">'+(diff>0?"+":"")+pct(diff)+'</td></tr>';}
h+='</table>';el.innerHTML=h;}

// ── WHITEPAPER ──
function initWhitepaper(){
var fab=$("fabHelp");var modal=$("wpModal");
if(fab)fab.addEventListener("click",function(){if(modal)modal.classList.add("active");});
var el=$("wpBody");if(!el)return;
el.innerHTML="<h4>Novus Love v3 — Model Reference</h4>"
+"<p><strong>8 Integrated Psychological Models</strong> weighted by evidence strength:</p>"
+"<table><tr><th>Model</th><th>Weight</th><th>Key Contribution</th></tr>"
+"<tr><td>Attachment Theory</td><td>0.28</td><td>Strongest relationship quality predictor</td></tr>"
+"<tr><td>Gottman Method</td><td>0.22</td><td>Four Horsemen, repair, PSO/NSO</td></tr>"
+"<tr><td>Big Five / OCEAN</td><td>0.18</td><td>Most validated personality model</td></tr>"
+"<tr><td>Sternberg Triangle</td><td>0.10</td><td>Intimacy, Passion, Commitment</td></tr>"
+"<tr><td>Rusbult Investment</td><td>0.08</td><td>Commitment = Sat + Inv - Alt</td></tr>"
+"<tr><td>Bowen DoS</td><td>0.06</td><td>Differentiation of Self</td></tr>"
+"<tr><td>MBTI</td><td>0.04</td><td>Communication style</td></tr>"
+"<tr><td>Enneagram</td><td>0.02</td><td>Motivational patterns</td></tr></table>"
+"<h4>8-Dimension Radar</h4>"
+"<p>Reactivity, Withdrawal, Attunement, Growth, Resilience, Expressiveness, Self-Regulation, Adaptability — each computed as a weighted overlay of all 8 models.</p>"
+"<h4>Engine Pipeline</h4>"
+"<p>1. Read profiles → 2. Calculate vulnerability/fragility → 3. Apply base effects × intensity × multipliers → 4. Apply PSO/NSO → 5. Apply conflict style → 6. Love Language bonus → 7. Behavior frequency escalation → 8. Repair window check → 9. Update Sternberg/Rusbult/Bowen → 10. Recalculate composites</p>";}

// ── BOTTOM BAR WIRING ──
function initBottomBar(){
var run=$("btnRun");
if(run)run.addEventListener("click",function(){
readUI();applyStart();
var mhA=calcMHImpact("a");var mhB=calcMHImpact("b");
var mk=Object.keys(mhA);
for(var i=0;i<mk.length;i++){
S.a[mk[i]]=cl(S.a[mk[i]]+mhA[mk[i]]);
S.b[mk[i]]=cl(S.b[mk[i]]+mhB[mk[i]]);}
savePrev("a");savePrev("b");saveRelPrev();
calcHealth("a");calcHealth("b");calcRelHealth();
renderAll();addLog("Engine initialized — "+S.a.name+" & "+S.b.name,"rel");
playTone("pos");});

if($("btnUndo"))$("btnUndo").addEventListener("click",doUndo);
if($("btnSnap"))$("btnSnap").addEventListener("click",function(){saveSnap();addLog("Snapshot taken.","rel");});
if($("btnCompare"))$("btnCompare").addEventListener("click",function(){renderCompare();$("compareModal").classList.add("active");});
if($("btnSave"))$("btnSave").addEventListener("click",saveSession);
if($("btnLoad"))$("btnLoad").addEventListener("click",loadSession);
if($("btnExport"))$("btnExport").addEventListener("click",exportReport);
if($("btnReset"))$("btnReset").addEventListener("click",function(){
if(!confirm("Reset everything? Cannot be undone."))return;
location.reload();});
if($("btnSound"))$("btnSound").addEventListener("click",function(){
soundOn=!soundOn;this.textContent=soundOn?"🔊":"🔇";});

// MBTI auto-sets OCEAN
if($("mbtiA"))$("mbtiA").addEventListener("change",function(){setOceanFromMBTI("a");});
if($("mbtiB"))$("mbtiB").addEventListener("change",function(){setOceanFromMBTI("b");});}

// ── INIT ──
function initApp(){
initAccordions();initTooltips();initModals();
buildIndMeters("a");buildIndMeters("b");buildRelMeters();
buildOcean("a");buildOcean("b");
buildMH("a");buildMH("b");
buildPractBtns("a");buildPractBtns("b");
buildToxBtns("a");buildToxBtns("b");
initIB();initMoment();initBottomBar();initWhitepaper();
readUI();applyStart();
calcHealth("a");calcHealth("b");calcRelHealth();
savePrev("a");savePrev("b");saveRelPrev();
renderAll();
S.init=true;}

// ── BOOTSTRAP ──
document.addEventListener("DOMContentLoaded",function(){
initDisclaimer();
if(!document.querySelector(".disclaimer-overlay:not(.dismissed)"))initApp();
else{var obs=new MutationObserver(function(muts){
for(var i=0;i<muts.length;i++){
if(muts[i].target.classList&&muts[i].target.classList.contains("dismissed")){
initApp();obs.disconnect();return;}}});
obs.observe($("disclaimerOverlay"),{attributes:true,attributeFilter:["class"]});}});

})();
