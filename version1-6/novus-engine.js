(function(N){var D=N.DATA;var E={};
var S={init:false,
a:{name:"Jack",mbti:"INTJ",ennea:"4",attach:"secure",llGive:"time",llReceive:"time",conflict:"collaborative",mood:"neutral",support:50,finComfort:60,ocean:{O:.70,C:.60,E:.40,A:.55,N:.45},mh:{},emotionRegulation:.60,selfWorth:.55,secureWithPartner:.50,hope:.55,rejectionSensitivity:.40,trustInPartner:.50,externalStress:.35,selfExpectations:.50,health:.55,intimacy:.50,wot:.65,satirStance:"congruent",vagalState:"ventral"},
b:{name:"Diane",mbti:"ENFP",ennea:"2",attach:"anxious",llGive:"words",llReceive:"words",conflict:"collaborative",mood:"calm",support:50,finComfort:60,ocean:{O:.75,C:.45,E:.70,A:.65,N:.55},mh:{},emotionRegulation:.60,selfWorth:.55,secureWithPartner:.50,hope:.55,rejectionSensitivity:.40,trustInPartner:.50,externalStress:.35,selfExpectations:.50,health:.55,intimacy:.50,wot:.45,satirStance:"placating",vagalState:"ventral"},
rel:{safety:.50,trust:.50,bond:.50,connection:.50,meaning:.50,honesty:.50,stability:.50,intimacy:.40,growth:.50,tension:.08,friction:.05,overall:.55,passion:.50,commitment:.50,sternIntimacy:.50},
relType:"romantic",lifeStage:"committed",finAlign:"some-diff",startCond:"average",
sentHistory:[],behCounts:{},conflictLvl:0,
repairWin:{active:false,remaining:0,trigger:""},
driftA:{score:0,dir:"none"},driftB:{score:0,dir:"none"},
evtCount:0,history:[],undoStack:[],snapshot:null,
log:[],logA:[],logB:[]};
E.S=S;
function cl(v){return Math.max(0,Math.min(1,v));}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
function clone(o){return JSON.parse(JSON.stringify(o));}
function rnd(v,d){var m=Math.pow(10,d||2);return Math.round(v*m)/m;}
E.cl=cl;E.clamp=clamp;E.clone=clone;E.rnd=rnd;
function savePrev(who){S[who]._prev=clone({emotionRegulation:S[who].emotionRegulation,selfWorth:S[who].selfWorth,secureWithPartner:S[who].secureWithPartner,hope:S[who].hope,rejectionSensitivity:S[who].rejectionSensitivity,trustInPartner:S[who].trustInPartner,externalStress:S[who].externalStress,selfExpectations:S[who].selfExpectations,health:S[who].health,intimacy:S[who].intimacy});}
function saveRelPrev(){S.rel._prev=clone(S.rel);}
E.pushUndo=function(){S.undoStack.push(clone({a:S.a,b:S.b,rel:S.rel,sentHistory:S.sentHistory,behCounts:S.behCounts,conflictLvl:S.conflictLvl,repairWin:S.repairWin,driftA:S.driftA,driftB:S.driftB,evtCount:S.evtCount,log:S.log,logA:S.logA,logB:S.logB}));if(S.undoStack.length>30)S.undoStack.shift();};
E.doUndo=function(){if(!S.undoStack.length)return false;var snap=S.undoStack.pop();S.a=snap.a;S.b=snap.b;S.rel=snap.rel;S.sentHistory=snap.sentHistory;S.behCounts=snap.behCounts;S.conflictLvl=snap.conflictLvl;S.repairWin=snap.repairWin;S.driftA=snap.driftA;S.driftB=snap.driftB;S.evtCount=snap.evtCount;S.log=snap.log;S.logA=snap.logA;S.logB=snap.logB;return true;};
E.saveSnap=function(){S.snapshot=clone({a:S.a,b:S.b,rel:S.rel});};
function calcPSO(){var h=S.sentHistory.slice(-20);if(h.length<3)return{mode:"neutral",ratio:.5};var pos=0;for(var i=0;i<h.length;i++){if(h[i]>0)pos++;}var ratio=pos/h.length;if(ratio>=.60)return{mode:"positive",ratio:ratio};if(ratio<=.40)return{mode:"negative",ratio:ratio};return{mode:"neutral",ratio:ratio};}
E.calcPSO=calcPSO;
function applyPSO(val,isNeg){var pso=calcPSO();if(pso.mode==="positive"&&isNeg)return val*.80;if(pso.mode==="negative"&&isNeg)return val*1.20;if(pso.mode==="negative"&&!isNeg)return val*.80;return val;}
function openRepair(label){S.repairWin={active:true,remaining:3,trigger:label};}
function checkRepair(isRepair){if(!S.repairWin.active)return 1.0;if(isRepair){S.repairWin.active=false;S.repairWin.remaining=0;return 2.0;}S.repairWin.remaining--;if(S.repairWin.remaining<=0)S.repairWin.active=false;return 1.0;}
function calcWSent(){var h=S.sentHistory;if(!h.length)return 0;var wS=0,wC=0;for(var i=0;i<h.length;i++){var isN=h[i]<0;var halfL=isN?15:5;var w=Math.pow(.5,(h.length-1-i)/halfL);wS+=h[i]*w;wC+=w;}return wC>0?wS/wC:0;}
E.calcWSent=calcWSent;
function trackBeh(cat){if(!S.behCounts[cat])S.behCounts[cat]=0;S.behCounts[cat]++;var c=S.behCounts[cat];if(c>=5)return 2.0;if(c>=3)return 1.5;return 1.0;}
function updateDrift(who,isNeg){var k=who==="a"?"driftA":"driftB";if(isNeg)S[k].score=clamp(S[k].score-.5,-10,10);else S[k].score=clamp(S[k].score+.3,-10,10);if(S[k].score>2)S[k].dir="toward secure";else if(S[k].score<-2)S[k].dir="toward insecure";else S[k].dir="stable";}
function updateConflict(delta){S.conflictLvl=clamp((S.conflictLvl||0)+delta,0,6);}
function autoMood(who,isNeg){var p=S[who];if(p.health<.20)p.mood="depressed";else if(p.health<.35&&isNeg)p.mood="anxious";else if(p.health>.80&&!isNeg)p.mood="content";}
var soundOn=false;
E.soundOn=false;
E.toggleSound=function(){soundOn=!soundOn;E.soundOn=soundOn;return soundOn;};
function playTone(type){if(!soundOn)return;try{var ctx=new(window.AudioContext||window.webkitAudioContext)();var osc=ctx.createOscillator();var g=ctx.createGain();osc.connect(g);g.connect(ctx.destination);if(type==="pos"){osc.frequency.value=523;g.gain.value=.08;}else if(type==="neg"){osc.frequency.value=220;g.gain.value=.08;}else{osc.frequency.value=440;g.gain.value=.05;}osc.start();g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.3);osc.stop(ctx.currentTime+.35);}catch(e){}}
E.calcMHImpact=function(who){var mh=S[who].mh;var t={emotionRegulation:0,selfWorth:0,secureWithPartner:0,hope:0,rejectionSensitivity:0,trustInPartner:0,externalStress:0,selfExpectations:0};var keys=Object.keys(mh);for(var i=0;i<keys.length;i++){var k=keys[i];var lvl=mh[k];if(!lvl)continue;var def=D.MH[k];if(!def||!def.impact)continue;var sev=lvl/9;var ik=Object.keys(def.impact);for(var j=0;j<ik.length;j++){if(t[ik[j]]!==undefined)t[ik[j]]+=def.impact[ik[j]]*sev;}}return t;};
E.calcHealth=function(who){var p=S[who];var pos=(p.emotionRegulation+p.selfWorth+p.secureWithPartner+p.hope+p.trustInPartner)/5;var neg=(p.rejectionSensitivity+p.externalStress)/2;p.health=cl(pos*.7+(1-neg)*.3);return p.health;};
E.calcBowen=function(p){var ip=cl((p.emotionRegulation+p.selfWorth)/2);var ec=cl(1-p.rejectionSensitivity);var fusion=cl(1-((p.rejectionSensitivity+p.externalStress)/2));var er=cl(p.emotionRegulation);var dos=cl((ip+ec+fusion+er)/4);return{dos:dos,ip:ip,ec:ec,fusion:fusion,er:er};};
E.bowenLabel=function(d){if(d>=.8)return"Highly Differentiated";if(d>=.6)return"Moderately Differentiated";if(d>=.4)return"Partial Fusion";if(d>=.2)return"Significant Fusion";return"Enmeshed";};
E.classifySternberg=function(i,p,c){var t=.4;var hi=function(v){return v>=t;};if(!hi(i)&&!hi(p)&&!hi(c))return{type:"Non-Love",desc:"No significant components present.",color:"#888"};if(hi(i)&&!hi(p)&&!hi(c))return{type:"Liking",desc:"Closeness without passion or commitment.",color:"#8ecae6"};if(!hi(i)&&hi(p)&&!hi(c))return{type:"Infatuation",desc:"Passion without depth or commitment.",color:"#e63946"};if(!hi(i)&&!hi(p)&&hi(c))return{type:"Empty Love",desc:"Commitment without warmth or desire.",color:"#adb5bd"};if(hi(i)&&hi(p)&&!hi(c))return{type:"Romantic Love",desc:"Passion and intimacy without commitment.",color:"#f4a261"};if(hi(i)&&!hi(p)&&hi(c))return{type:"Companionate Love",desc:"Deep bond without passion.",color:"#2a9d8f"};if(!hi(i)&&hi(p)&&hi(c))return{type:"Fatuous Love",desc:"Commitment driven by passion, lacking depth.",color:"#e76f51"};return{type:"Consummate Love",desc:"All three components strong. Ideal.",color:"#06d6a0"};};
function calcRusbultSat(r){return cl((r.intimacy+r.connection+r.honesty)/3);}
function calcRusbultInv(r,a,b){return cl((r.bond+r.meaning+(1-a.rejectionSensitivity)+(1-b.rejectionSensitivity))/4);}
function calcRusbultAlt(a,b){return cl(1-((a.trustInPartner+b.trustInPartner)/2));}
E.calcRusbult=function(){var sat=calcRusbultSat(S.rel);var inv=calcRusbultInv(S.rel,S.a,S.b);var alt=calcRusbultAlt(S.a,S.b);return{sat:sat,inv:inv,alt:alt,commit:cl(sat+inv-alt)};};
E.calcRelHealth=function(){var r=S.rel;var w={safety:.13,trust:.12,bond:.10,connection:.08,meaning:.06,honesty:.07,stability:.07,intimacy:.05,growth:.05,passion:.04,commitment:.05,sternIntimacy:.04,tension:-.04,friction:-.04};var sum=0;var keys=Object.keys(w);for(var i=0;i<keys.length;i++){sum+=w[keys[i]]*(r[keys[i]]||0);}r.overall=cl(sum);var rb=E.calcRusbult();r.commitment=rb.commit;return r.overall;};
E.calcWOT=function(who){var p=S[who];var base=D.WOT_BASE[p.attach]||.5;base+=p.emotionRegulation*.15;base-=p.externalStress*.1;base-=p.rejectionSensitivity*.1;base+=p.selfWorth*.05;var mhKeys=Object.keys(p.mh);for(var i=0;i<mhKeys.length;i++){var lvl=p.mh[mhKeys[i]]||0;if(lvl>0)base-=(lvl/9)*.03;}p.wot=cl(base);return p.wot;};
E.calcSatir=function(who){var p=S[who];var stance=D.SATIR_DERIVE[p.attach]||"congruent";var moodOv=D.SATIR_MOOD_OVERRIDE[p.mood];if(moodOv&&p.emotionRegulation<.5)stance=moodOv;if(p.emotionRegulation>.75&&p.selfWorth>.65)stance="congruent";p.satirStance=stance;return stance;};
E.calcVagal=function(who){var p=S[who];var wot=p.wot||.5;if(wot>=.55)p.vagalState="ventral";else if(wot>=.30)p.vagalState="sympathetic";else p.vagalState="dorsal";return p.vagalState;};
E.calcRadar=function(who){var p=S[who];var mbti=D.MBTI[p.mbti]||{};var enn=D.ENNEA[p.ennea]||{};var att=D.ATT[p.attach]||{};var mood=D.MOOD[p.mood]||{};var o=p.ocean;var result={};for(var d=0;d<D.DIM_SHORT.length;d++){var dim=D.DIM_SHORT[d];var val=.50;val+=(att[dim]||0)*.28;var oc=0;var oKeys=["O","C","E","A","N"];for(var oi=0;oi<oKeys.length;oi++){var ok=oKeys[oi];var norm=((o[ok]||.5)-.5)*2;oc+=norm*(D.OCEAN_W[ok][dim]||0)*100;}val+=oc*.18;val+=(mbti[dim]||0)*.04;val+=(enn[dim]||0)*.02;val+=(mood[dim]||0)*.5;var bw=E.calcBowen(p);if(dim==="sr")val+=(bw.dos-.5)*.06;if(dim==="r")val-=(bw.dos-.5)*.04;if(dim==="adp")val+=(bw.dos-.5)*.03;var vagal=p.vagalState||"ventral";if(vagal==="sympathetic"){if(dim==="r")val+=.04;if(dim==="sr")val-=.03;if(dim==="a")val-=.02;}else if(vagal==="dorsal"){if(dim==="w")val+=.05;if(dim==="exp")val-=.04;if(dim==="a")val-=.04;}result[D.DIM_KEYS[d]]=cl(rnd(val,3));}return result;};
function calcVuln(who){var p=S[who];var base=1.0;base+=(1-p.emotionRegulation)*.5;base+=(1-p.selfWorth)*.4;base+=p.rejectionSensitivity*.5;base+=p.externalStress*.4;base+=((p.ocean.N||.5)-.5)*.33;var wotMod=(1-(p.wot||.5))*.3;base+=wotMod;return clamp(rnd(base,2),.4,2.0);}
function calcFrag(){var r=S.rel;var base=1.0;base+=(1-r.safety)*.5;base+=(1-r.trust)*.5;base+=r.tension*.5;base+=r.friction*.4;base+=(S.conflictLvl||0)*.05;return clamp(rnd(base,2),.4,2.0);}
function calcLLBonus(actor,receiver,cat){var la=S[actor].llGive||S[actor].ll||"time",lb=S[receiver].llReceive||S[receiver].ll||"time";var prox=(D.LL_COMPAT[la]||{})[lb]||.5;if(cat==="Affection"&&(lb==="touch"||lb==="words"))return prox*.03;if(cat==="Quality Time"&&lb==="time")return prox*.03;if(cat==="Support"&&lb==="acts")return prox*.02;return prox*.01;}

E.processInteraction=function(dir,catKey,scenIdx,intensity){
E.pushUndo();var actor=dir==="AtoB"?"a":"b";var receiver=dir==="AtoB"?"b":"a";
var cat=D.INTERACTIONS[catKey];if(!cat)return null;
var scen=cat.scenarios[scenIdx]||cat.scenarios[0];var label=scen.label;
savePrev(actor);savePrev(receiver);saveRelPrev();
var vuln=calcVuln(receiver);var frag=calcFrag();
var isNeg=(cat.base.tension||0)>0||(cat.base.trust||0)<0;
var repMult=1.0;
if(catKey==="Repair")repMult=checkRepair(true);
else if(isNeg){checkRepair(false);openRepair(label);}
var confMod=1+(S.conflictLvl||0)*.08;var behFreq=trackBeh(catKey);
var llB=calcLLBonus(actor,receiver,catKey);
var lifeMod=D.LIFE_STAGE[S.lifeStage]||{stress:0};
var finMod=D.FIN_ALIGN[S.finAlign]||{trust:0,tension:0,stability:0};
var satirA=E.calcSatir(actor);var satirR=E.calcSatir(receiver);
var selfD={},partD={},relD={};
if(cat.selfBase){var sk=Object.keys(cat.selfBase);for(var i=0;i<sk.length;i++){var v=cat.selfBase[sk[i]]*intensity*2;if(isNeg)v=applyPSO(v,true)*confMod*behFreq;else v=applyPSO(v,false)*repMult;selfD[sk[i]]=rnd(v,3);S[actor][sk[i]]=cl(S[actor][sk[i]]+v);}}
S[actor].externalStress=cl(S[actor].externalStress+(lifeMod.stress||0)*.005);
var satirSelf=D.SATIR.selfImpact[satirA]||{};var ssk=Object.keys(satirSelf);for(var i=0;i<ssk.length;i++){var sv=satirSelf[ssk[i]]*intensity;S[actor][ssk[i]]=cl(S[actor][ssk[i]]+sv);}
if(cat.partnerBase){var pk=Object.keys(cat.partnerBase);for(var i=0;i<pk.length;i++){var v=cat.partnerBase[pk[i]]*intensity*2*vuln;if(isNeg)v=applyPSO(v,true)*confMod*behFreq;else v=applyPSO(v,false)*repMult*(1+llB);partD[pk[i]]=rnd(v,3);S[receiver][pk[i]]=cl(S[receiver][pk[i]]+v);}}
var satirPart=D.SATIR.partnerImpact[satirA]||{};var spk=Object.keys(satirPart);for(var i=0;i<spk.length;i++){var sv=satirPart[spk[i]]*intensity*vuln;S[receiver][spk[i]]=cl(S[receiver][spk[i]]+sv);}
var rk=Object.keys(cat.base);for(var i=0;i<rk.length;i++){var v=cat.base[rk[i]]*intensity*2*frag;if(isNeg)v=applyPSO(v,true)*confMod*behFreq;else v=applyPSO(v,false)*repMult*(1+llB);if(rk[i]==="tension")v+=(finMod.tension||0);if(rk[i]==="trust")v+=(finMod.trust||0);if(rk[i]==="stability")v+=(finMod.stability||0);relD[rk[i]]=rnd(v,3);S.rel[rk[i]]=cl((S.rel[rk[i]]||.5)+v);}
var satirRel=D.SATIR.relImpact[satirA]||{};var srk=Object.keys(satirRel);for(var i=0;i<srk.length;i++){var sv=satirRel[srk[i]]*intensity*frag;S.rel[srk[i]]=cl((S.rel[srk[i]]||.5)+sv);}
var vagalActor=S[actor].vagalState||"ventral";var vagalRel=D.POLYVAGAL.relImpact[vagalActor]||{};var vrk=Object.keys(vagalRel);for(var i=0;i<vrk.length;i++){var vv=vagalRel[vrk[i]]*intensity*.5;S.rel[vrk[i]]=cl((S.rel[vrk[i]]||.5)+vv);}
var cs=D.CONFLICT[S[actor].conflict]||{};if(isNeg){if(cs.tension)S.rel.tension=cl(S.rel.tension+cs.tension*intensity);if(cs.trust)S.rel.trust=cl(S.rel.trust+cs.trust*intensity);if(cs.safety)S.rel.safety=cl(S.rel.safety+(cs.safety||0)*intensity);}
if(catKey==="Intimacy"||catKey==="Affection"){S.rel.passion=cl(S.rel.passion+intensity*.03);S.rel.sternIntimacy=cl(S.rel.sternIntimacy+intensity*.02);}else if(isNeg){S.rel.passion=cl(S.rel.passion-intensity*.015);S.rel.sternIntimacy=cl(S.rel.sternIntimacy-intensity*.02);}
E.calcHealth(actor);E.calcHealth(receiver);E.calcWOT(actor);E.calcWOT(receiver);E.calcSatir(actor);E.calcSatir(receiver);E.calcVagal(actor);E.calcVagal(receiver);E.calcRelHealth();
S.sentHistory.push(isNeg?-1:1);if(isNeg)updateConflict(1);else if(catKey==="Repair")updateConflict(-2);else updateConflict(-.5);
updateDrift(receiver,isNeg);autoMood(actor,isNeg);autoMood(receiver,isNeg);S.evtCount++;
var dirLabel=dir==="AtoB"?(S.a.name+" \u2192 "+S.b.name):(S.b.name+" \u2192 "+S.a.name);
S.history.push({event:S.evtCount,label:label,category:catKey,relHealth:S.rel.overall,healthA:S.a.health,healthB:S.b.health,direction:dirLabel,intensity:intensity,selfD:selfD,partD:partD,relD:relD});
E.addLog(dirLabel+": "+label+" ["+catKey+"] @"+D.pct(intensity)+"%","rel");
E.addLog(label+" (sent)","ind",actor);E.addLog(label+" (received)","ind",receiver);
playTone(isNeg?"neg":"pos");
return{action:dirLabel+": "+label,category:catKey,intensity:intensity,selfImpact:selfD,partnerImpact:partD,relImpact:relD,vulnScale:vuln,fragScale:frag,pso:calcPSO(),repairMult:repMult,conflictLevel:S.conflictLvl,actor:actor,receiver:receiver,satirA:satirA,satirR:satirR,vagalA:S[actor].vagalState,vagalR:S[receiver].vagalState};};
E.applyPractice=function(who,idx){E.pushUndo();var p=D.PRACTICES[idx];if(!p)return;savePrev(who);saveRelPrev();var other=who==="a"?"b":"a";if(p.effects){var ek=Object.keys(p.effects);for(var i=0;i<ek.length;i++){if(S[who][ek[i]]!==undefined)S[who][ek[i]]=cl(S[who][ek[i]]+p.effects[ek[i]]);}}if(p.partnerEffects){var pk=Object.keys(p.partnerEffects);for(var i=0;i<pk.length;i++){if(S[other][pk[i]]!==undefined)S[other][pk[i]]=cl(S[other][pk[i]]+p.partnerEffects[pk[i]]);}}if(p.relEffects){var rk=Object.keys(p.relEffects);for(var i=0;i<rk.length;i++){if(S.rel[rk[i]]!==undefined)S.rel[rk[i]]=cl(S.rel[rk[i]]+p.relEffects[rk[i]]);}}E.calcHealth(who);E.calcHealth(other);E.calcWOT(who);E.calcWOT(other);E.calcSatir(who);E.calcSatir(other);E.calcVagal(who);E.calcVagal(other);E.calcRelHealth();S.sentHistory.push(1);S.evtCount++;E.addLog(S[who].name+" practiced: "+p.label,"ind",who);E.addLog(S[who].name+" \u2192 "+p.label+" (resilience)","rel");playTone("pos");};
E.applyToxic=function(who,idx){E.pushUndo();var t=D.TOXICS[idx];if(!t)return;savePrev(who);saveRelPrev();var other=who==="a"?"b":"a";if(t.effects){var ek=Object.keys(t.effects);for(var i=0;i<ek.length;i++){if(S[who][ek[i]]!==undefined)S[who][ek[i]]=cl(S[who][ek[i]]+t.effects[ek[i]]);}}if(t.partnerEffects){var pk=Object.keys(t.partnerEffects);for(var i=0;i<pk.length;i++){if(S[other][pk[i]]!==undefined)S[other][pk[i]]=cl(S[other][pk[i]]+t.partnerEffects[pk[i]]);}}if(t.relEffects){var rk=Object.keys(t.relEffects);for(var i=0;i<rk.length;i++){if(S.rel[rk[i]]!==undefined)S.rel[rk[i]]=cl(S.rel[rk[i]]+t.relEffects[rk[i]]);}}E.calcHealth(who);E.calcHealth(other);E.calcWOT(who);E.calcWOT(other);E.calcSatir(who);E.calcSatir(other);E.calcVagal(who);E.calcVagal(other);E.calcRelHealth();S.sentHistory.push(-1);S.evtCount++;updateConflict(1);openRepair(t.label);E.addLog(S[who].name+" did: "+t.label,"ind",who);E.addLog(S[who].name+" \u2192 "+t.label+" (toxic)","rel");playTone("neg");};
E.addLog=function(msg,type,who){var entry={time:new Date().toLocaleTimeString(),msg:msg,evt:S.evtCount};if(type==="rel")S.log.push(entry);if(type==="ind"&&who==="a")S.logA.push(entry);if(type==="ind"&&who==="b")S.logB.push(entry);};
E.initEngine=function(){E.applyStart();E.applyMoodEffects("a");E.applyMoodEffects("b");E.applyFinComfort("a");E.applyFinComfort("b");var mhA=E.calcMHImpact("a");var mhB=E.calcMHImpact("b");var mk=Object.keys(mhA);for(var i=0;i<mk.length;i++){S.a[mk[i]]=cl(S.a[mk[i]]+mhA[mk[i]]);S.b[mk[i]]=cl(S.b[mk[i]]+mhB[mk[i]]);}E.calcHealth("a");E.calcHealth("b");E.calcWOT("a");E.calcWOT("b");E.calcSatir("a");E.calcSatir("b");E.calcVagal("a");E.calcVagal("b");E.calcRelHealth();S.init=true;};
E.recalcAll=function(){E.calcHealth("a");E.calcHealth("b");E.calcWOT("a");E.calcWOT("b");E.calcSatir("a");E.calcSatir("b");E.calcVagal("a");E.calcVagal("b");E.calcRelHealth();};
E.applyStart=function(){var cond=D.START[S.startCond];if(!cond)return;var keys=Object.keys(cond);for(var i=0;i<keys.length;i++){if(keys[i]!=="label"&&S.rel[keys[i]]!==undefined)S.rel[keys[i]]=cond[keys[i]];}};
E.setOceanFromMBTI=function(who){var m=D.MBTI[S[who].mbti];if(!m||!m.ocean)return;var o=m.ocean;S[who].ocean={O:o.O,C:o.C,E:o.E,A:o.A,N:o.N};};

E.calcBioMetrics=function(who){var p=S[who];var stress=p.externalStress;var ereg=p.emotionRegulation;var wot=p.wot||.5;var vagal=p.vagalState||"ventral";var mhLoad=0;var mk=Object.keys(p.mh);for(var i=0;i<mk.length;i++){if(p.mh[mk[i]]>0)mhLoad+=p.mh[mk[i]]/9;}mhLoad=Math.min(mhLoad,1);
var vagalMod=vagal==="ventral"?0:vagal==="sympathetic"?.3:.5;
var stressIdx=cl((stress+vagalMod+(1-ereg)*.3+mhLoad*.2)/1.5);
var hr={};hr.value=Math.round(D.BIO.heartRate.baseline+stressIdx*50);for(var i=0;i<D.BIO.heartRate.ranges.length;i++){var r=D.BIO.heartRate.ranges[i];if(hr.value>=r.min&&hr.value<=r.max){hr.label=r.label;hr.state=r.state;break;}}if(!hr.label)hr.label=hr.value>120?"Acute Stress":"Resting";hr.state=hr.state||"calm";
var br={};br.value=Math.round(D.BIO.breathing.baseline+stressIdx*12);for(var i=0;i<D.BIO.breathing.ranges.length;i++){var r=D.BIO.breathing.ranges[i];if(br.value>=r.min&&br.value<=r.max){br.label=r.label;br.state=r.state;break;}}if(!br.label)br.label="Normal";br.state=br.state||"calm";
var cort={};cort.value=rnd(cl(D.BIO.cortisol.baseline+stressIdx*.5),2);for(var i=0;i<D.BIO.cortisol.ranges.length;i++){var r=D.BIO.cortisol.ranges[i];if(cort.value>=r.min&&cort.value<=r.max){cort.label=r.label;cort.state=r.state;break;}}if(!cort.label)cort.label="Normal";cort.state=cort.state||"normal";
var mt={};mt.value=rnd(cl(D.BIO.muscleTension.baseline+stressIdx*.5+(1-wot)*.15),2);for(var i=0;i<D.BIO.muscleTension.ranges.length;i++){var r=D.BIO.muscleTension.ranges[i];if(mt.value>=r.min&&mt.value<=r.max){mt.label=r.label;mt.state=r.state;break;}}if(!mt.label)mt.label="Relaxed";mt.state=mt.state||"relaxed";
var sl={};var slBase=.65-stressIdx*.3-mhLoad*.15+(ereg-.5)*.1;sl.value=rnd(cl(slBase),2);for(var i=0;i<D.BIO.sleepQuality.ranges.length;i++){var r=D.BIO.sleepQuality.ranges[i];if(sl.value>=r.min&&sl.value<=r.max){sl.label=r.label;sl.state=r.state;break;}}if(!sl.label)sl.label="Adequate";sl.state=sl.state||"fair";
var im={};var imBase=.7-stressIdx*.25-mhLoad*.1;im.value=rnd(cl(imBase),2);for(var i=0;i<D.BIO.immuneFunction.ranges.length;i++){var r=D.BIO.immuneFunction.ranges[i];if(im.value>=r.min&&im.value<=r.max){im.label=r.label;im.state=r.state;break;}}if(!im.label)im.label="Normal";im.state=im.state||"normal";
return{heartRate:hr,breathing:br,cortisol:cort,muscleTension:mt,sleepQuality:sl,immuneFunction:im};};
E.getIndRecs=function(who){var p=S[who];var recs=[];for(var i=0;i<D.IND_REC_RULES.length;i++){var rule=D.IND_REC_RULES[i];try{if(rule.condition(p))recs.push({emoji:rule.emoji,text:rule.text,priority:rule.priority});}catch(e){}}recs.sort(function(a,b){return a.priority-b.priority;});return recs;};
E.calcRelRadar=function(){var r=S.rel;var result=[];for(var i=0;i<D.REL_RADAR_KEYS.length;i++){var k=D.REL_RADAR_KEYS[i];result.push(r[k]||.5);}return result;};
E.getEmotionalState=function(who){var p=S[who];var mood=D.MOOD[p.mood]||{};var moodLabel=mood.label||p.mood;var healthLbl=D.getMetricLabel("health",p.health);var wotLbl=p.wot>=.55?"Regulated":p.wot>=.30?"Dysregulated":"Shutdown";var vagalLbl=p.vagalState==="ventral"?"Engaged (Safe)":p.vagalState==="sympathetic"?"Fight/Flight":"Freeze/Collapse";var satirLbl=(D.SATIR&&D.SATIR.stances&&D.SATIR.stances[p.satirStance])?D.SATIR.stances[p.satirStance].label:p.satirStance;return{mood:moodLabel,health:healthLbl.label,healthDesc:healthLbl.desc,wot:wotLbl,vagal:vagalLbl,satir:satirLbl,wotVal:p.wot,healthVal:p.health};};
E.getRelEmotionalState=function(){var r=S.rel;var oLbl=D.getMetricLabel("health",r.overall);var tLbl=D.getMetricLabel("tension",r.tension);var pso=calcPSO();var psoLbl=pso.mode==="positive"?"Positive Sentiment":"negative"===pso.mode?"Negative Sentiment":"Neutral Sentiment";var stern=E.classifySternberg(r.sternIntimacy,r.passion,r.commitment);var rb=E.calcRusbult();return{overall:oLbl.label,overallDesc:oLbl.desc,overallVal:r.overall,tension:tLbl.label,pso:psoLbl,psoRatio:pso.ratio,loveType:stern.type,loveDesc:stern.desc,loveColor:stern.color,commitment:rb.commit,conflictLvl:S.conflictLvl};};


E.getRelRecs=function(){var r=S.rel;var recs=[];if(!D.REL_REC_RULES)return recs;for(var i=0;i<D.REL_REC_RULES.length;i++){var rule=D.REL_REC_RULES[i];try{if(rule.condition(r,S))recs.push({emoji:rule.emoji,text:rule.text,priority:rule.priority});}catch(e){}}recs.sort(function(a,b){return a.priority-b.priority;});return recs;};

E.processPersonal=function(who,actId,isPositive){E.pushUndo();savePrev(who);saveRelPrev();
var list=isPositive?D.PERSONAL_POS:D.PERSONAL_NEG;var act=null;for(var i=0;i<list.length;i++){if(list[i].id===actId){act=list[i];break;}}if(!act)return null;
var eff=act.effects||{};for(var k in eff){if(S[who][k]!==undefined)S[who][k]=cl(S[who][k]+eff[k]);}
var spill=act.relSpillover||{};for(var k in spill){if(S.rel[k]!==undefined)S.rel[k]=cl(S.rel[k]+spill[k]);}
E.calcHealth(who);E.calcRelOverall();
var entry={type:"personal",who:who,act:act.label,positive:isPositive,effects:eff,spillover:spill};S.history.push(entry);S.evtCount++;
var logMsg=(isPositive?"+":"-")+" "+S[who].name+": "+act.label;S.log.push(logMsg);if(who==="a")S.logA.push(logMsg);else S.logB.push(logMsg);
return entry;};

E.applyMoodEffects=function(who){var p=S[who];var mood=D.MOOD[p.mood];if(!mood)return;var base={emotionRegulation:.60,selfWorth:.55,secureWithPartner:.50,hope:.55,rejectionSensitivity:.40,trustInPartner:.50,externalStress:.35,selfExpectations:.50};var dimMap={r:"rejectionSensitivity",w:"externalStress",a:"secureWithPartner",g:"hope",res:"emotionRegulation",exp:"selfWorth",sr:"emotionRegulation",adp:"hope"};var keys=Object.keys(mood);for(var i=0;i<keys.length;i++){var k=keys[i];if(k==="label")continue;var target=dimMap[k];if(target&&p[target]!==undefined){p[target]=cl(p[target]+mood[k]*.3);}}};
E.applyFinComfort=function(who){var p=S[who];var fc=D.getFinComfort?D.getFinComfort(p.finComfort||60):null;if(!fc)return;p.externalStress=cl(p.externalStress+(fc.stressMod||0));};
E.calcRelOverall=function(){E.calcRelHealth();};
N.E=E;})(window.Novus);
