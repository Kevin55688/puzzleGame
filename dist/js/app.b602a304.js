(function(){"use strict";var e={1742:function(e,i,l){var a=l(9242),n=l(3396);function t(e,i,l,a,t,o){const c=(0,n.up)("puzzleComponent");return(0,n.wg)(),(0,n.j4)(c)}var o=l(7139);const c=e=>((0,n.dD)("data-v-4ae0c86b"),e=e(),(0,n.Cn)(),e),r={class:"container",ref:"container"},s={class:"nav"},u={href:"#"},p={class:"icon"},d=c((()=>(0,n._)("span",null,"選擇圖片",-1))),g={href:"#"},v={class:"icon"},f=c((()=>(0,n._)("span",null,"設定",-1))),m={href:"#"},h={class:"icon"},z=c((()=>(0,n._)("span",null,"提示",-1))),b={href:"#"},w={class:"icon"},_=c((()=>(0,n._)("span",null,"歷史記錄",-1))),I=c((()=>(0,n._)("div",{class:"indicator"},null,-1))),C={class:"choseImage-container"},P=c((()=>(0,n._)("strong",null,"請選擇圖片或上傳圖片",-1))),H={class:"sampleList"},y=["src"],A={class:"historyList-container"},D={class:"pic"},S=["src"],k={class:"setting"},x={for:"setupCol"},V={for:"setupRow"},j={class:"pieceCount"},O={class:"puzzle",ref:"puzzle"},L=["data-index"];function T(e,i,l,t,c,T){const W=(0,n.up)("ion-icon");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n._)("nav",s,[(0,n._)("ul",null,[(0,n._)("li",{onClick:i[0]||(i[0]=e=>t.openChoseImage=!0)},[(0,n._)("a",u,[(0,n._)("div",p,[(0,n.Wm)(W,{name:"image-outline"})]),d])]),(0,n._)("li",{onClick:i[1]||(i[1]=e=>t.classVariable.config.isActive=!t.classVariable.config.isActive)},[(0,n._)("a",g,[(0,n._)("div",v,[(0,n.Wm)(W,{name:"settings-outline"})]),f])]),(0,n._)("li",{onClick:i[2]||(i[2]=e=>t.openOriginalImage=!0)},[(0,n._)("a",m,[(0,n._)("div",h,[(0,n.Wm)(W,{name:"alert-outline"})]),z])]),(0,n._)("li",{onClick:i[3]||(i[3]=e=>t.openHistory=!0)},[(0,n._)("a",b,[(0,n._)("div",w,[(0,n.Wm)(W,{name:"reader-outline"})]),_])]),I])]),(0,n._)("div",{onClick:i[6]||(i[6]=(0,a.iM)((e=>t.openChoseImage=!1),["self"])),class:(0,o.C_)(["choseImage",{openChoseImage:t.openChoseImage}])},[(0,n._)("div",C,[P,(0,n._)("div",H,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.defaultImage,(e=>((0,n.wg)(),(0,n.iD)("div",{class:"sample",key:e,onClick:i[4]||(i[4]=(...e)=>t.choseSampleImg&&t.choseSampleImg(...e))},[(0,n._)("img",{src:e,alt:"",class:"sample"},null,8,y)])))),128))]),(0,n._)("input",{type:"file",onChange:i[5]||(i[5]=(...e)=>t.upload&&t.upload(...e))},null,32)])],2),(0,n._)("div",{onClick:i[7]||(i[7]=(0,a.iM)((e=>t.openHistory=!1),["self"])),class:(0,o.C_)(["history",{openHistory:t.openHistory}])},[(0,n._)("div",A,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.historyList,((e,i)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,o.C_)(["historyList",{Red:i===t.historyList.length-1}]),key:i},(0,o.zw)(`Round${i+1}: ${e}`),3)))),128))])],2),(0,n._)("div",{onClick:i[8]||(i[8]=(0,a.iM)((e=>t.openOriginalImage=!1),["self"])),class:(0,o.C_)(["OriginalImage",{openOriginalImage:t.openOriginalImage}])},[(0,n._)("div",D,[t.uploadImgData.src?((0,n.wg)(),(0,n.iD)("img",{key:0,ref:"img",src:t.uploadImgData.src,alt:""},null,8,S)):(0,n.kq)("",!0)])],2),(0,n._)("div",{class:(0,o.C_)(["config",{isActive:t.classVariable.config.isActive}])},[(0,n.Uk)(" 請選擇拼圖片數 "),(0,n._)("div",k,[(0,n._)("label",x,[(0,n.Uk)(" 橫向:"),(0,n.wy)((0,n._)("input",{type:"number",id:"setupCol",min:"1","onUpdate:modelValue":i[9]||(i[9]=e=>t.setupPiece.colPiece=e),placeholder:"1"},null,512),[[a.nr,t.setupPiece.colPiece,void 0,{lazy:!0}]])]),(0,n._)("label",V,[(0,n.Uk)(" 縱向:"),(0,n.wy)((0,n._)("input",{type:"number",id:"setupRow",min:"1","onUpdate:modelValue":i[10]||(i[10]=e=>t.setupPiece.rowPiece=e),placeholder:"1"},null,512),[[a.nr,t.setupPiece.rowPiece,void 0,{lazy:!0}]])])]),(0,n._)("div",j,(0,o.zw)(t.setupPiece.colPiece)+" X "+(0,o.zw)(t.setupPiece.rowPiece)+" 片數 "+(0,o.zw)(t.totalPiece),1),(0,n._)("button",{onClick:i[11]||(i[11]=(...e)=>t.creatPuzzle&&t.creatPuzzle(...e))},"start game")],2),(0,n._)("div",O,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.canvasList,((e,l)=>(0,n.wy)(((0,n.wg)(),(0,n.iD)("canvas",{class:(0,o.C_)(["piece",{firstChosen:t.isChosen[l]}]),key:e.Id,ref_for:!0,ref:e=>{t.canvasRef[l]=e},onClick:i[12]||(i[12]=(...e)=>t.pickup&&t.pickup(...e)),"data-index":l,width:"null",height:"null"},null,10,L)),[[a.F8,t.isGameStart]]))),128))],512)],512)}l(7658);var W=l(4870),G=l.p+"img/ame-1.3fb36237.jpg",M=l.p+"img/ame-2.ef3d69f8.jpg",N=l.p+"img/gura-1.661b4ecb.jpg",F=l.p+"img/ina-1.8af09b05.jpg",E=l.p+"img/ina-2.4e362ddf.png",R=l.p+"img/ina-3.2e4ef08b.jpg";const q=(0,W.iH)([G,M,N,F,E,R]),Y=(0,W.qj)({file:null,src:null,width:null,height:null,pic:new Image}),U=(0,W.iH)(!0),K=(0,W.iH)(!1),Z=(0,W.iH)(!1);function $(e){const i=e=>{Y.file=e.target.files[0];let i=new FileReader;i.readAsDataURL(Y.file),i.onload=()=>{Y.src=i.result,Y.pic.src=i.result,U.value=!1,Z.value=!1}},l=e=>{console.log(e.target.src),console.log(e.target.src.height),Y.src=e.target.src,Y.pic.src=e.target.src,U.value=!1,Z.value=!1};return(0,n.YP)(e,(()=>{Y.width=e.value.offsetWidth,Y.height=e.value.offsetHeight})),{upload:i,uploadImgData:Y,defaultImage:q,choseSampleImg:l,openChoseImage:U,openOriginalImage:K,isGameStart:Z}}function X(e,i,l,a,n,t,o){let c,r;u(o,n),l.width=e,l.height=i;let s=l.getContext("2d");function u(l,a){let n,t=Math.ceil(l/a)-1;n=l%a===0?a-1:l%a-1,c=0-e*n,r=0-i*t}s.drawImage(a.pic,c,r,e*n,i*t)}function B(e){const i=e;let l={};const a=(0,n.Fl)((()=>i.colPiece*i.rowPiece)),t=(0,n.Fl)((()=>{let e=[];for(let i=0;i<a.value;i++)e.push({pieceID:i+1,isChosen:!1});return e.sort((()=>Math.random()-.5)),e})),o=(0,n.Fl)((()=>{let e=[];for(let i=0;i<a.value;i++)e.push({canvasId:i+1});return e}));return l=t,{totalPiece:a,pieceList:t,canvasList:o,test:l}}let J=null,Q=null,ee=(0,W.iH)(!1);function ie(e,i,l,a){e.value=0,ee.value=!1;for(let n=0;n<i.value.length;n++)i.value[n].pieceID==n+1&&e.value++;if(e.value===i.value.length){J=Date.now();const e=Math.floor((J-l)/1e3),i=Math.floor(e/3600),n=Math.floor(e%3600/60),t=Math.floor(e%60);Q=i+"時"+n+"分"+t+"秒",a.value.push(Q),ee.value=!0}return{isComplete:ee}}function le(e,i,l,a,n,t,o,c){let r=e.pic.width,s=e.pic.height;const u=parseFloat(n),p=parseFloat(t),d=parseFloat(o),g=(i.value.offsetWidth-c.value.offsetWidth*(.01*u)*2-2*p-2)/r;let v=r*g/l-2*d,f=s*g/a;return{CANVAS_WIDTH:v,CANVAS_HEIGHT:f}}const ae={name:"puzzleComponent",setup(){const e=(0,W.iH)(null),i=(0,W.iH)(null),l=(0,W.iH)([]),a=(0,W.qj)([]),t=(0,W.qj)({colPiece:1,rowPiece:1});let o=(0,W.qj)([]);const c=(0,W.qj)([]);let r=(0,W.iH)(0);const s=(0,W.iH)(null),{totalPiece:u,pieceList:p,canvasList:d}=B(t),{upload:g,uploadImgData:v,defaultImage:f,choseSampleImg:m,openChoseImage:h,openOriginalImage:z,isGameStart:b}=$(e),w=(0,W.qj)({puzzle:{maxWidth:"51%",padding:"3%",border:"17px",borderStyle:"none",bgc:"none",boxShadow:"none"},piece:{border:"2px"},config:{isActive:!0}});let _=null,I=(0,W.iH)([]),C=(0,W.iH)(!1);const P=()=>{b.value=!0,w.config.isActive=!1,_=Date.now();let{CANVAS_WIDTH:e,CANVAS_HEIGHT:a}=le(v,i,t.colPiece,t.rowPiece,w.puzzle.padding,w.puzzle.border,w.piece.border,s);X(e,a,l.value[0],v,t.colPiece,t.rowPiece,p.value[0].pieceID)},H=()=>{P();let{CANVAS_WIDTH:e,CANVAS_HEIGHT:a}=le(v,i,t.colPiece,t.rowPiece,w.puzzle.padding,w.puzzle.border,w.piece.border,s);b.value=!0;for(let i=0;i<u.value;i++)X(e,a,l.value[i],v,t.colPiece,t.rowPiece,p.value[i].pieceID);let{isComplete:n}=ie(r,p,_,I);n.value&&(C.value=n.value)},y=e=>{o.push(e.target),c[e.target.dataset.index]=!0},A=()=>{b.value=!1,H()};return(0,n.YP)(o,(()=>{if(o[0]===o[1]&&(c.fill(!1),o.length=0),2===o.length){let{CANVAS_WIDTH:e,CANVAS_HEIGHT:l}=le(v,i,t.colPiece,t.rowPiece,w.puzzle.padding,w.puzzle.border,w.piece.border,s),a=o[0].dataset.index,n=o[1].dataset.index;X(e,l,o[0],v,t.colPiece,t.rowPiece,p.value[n].pieceID),X(e,l,o[1],v,t.colPiece,t.rowPiece,p.value[a].pieceID);const c=p.value[a];p.value[a]=p.value[n],p.value[n]=c,o.length=0;let{isComplete:u}=ie(r,p,_,I);u.value&&(C.value=u.value)}})),(0,n.YP)(t,(()=>{b.value=!1})),(0,n.YP)(b,(()=>{b.value?(setTimeout((()=>{let{CANVAS_WIDTH:e,CANVAS_HEIGHT:a}=le(v,i,t.colPiece,t.rowPiece,w.puzzle.padding,w.puzzle.border,w.piece.border,s);b.value=!0;for(let i=0;i<u.value;i++)X(e,a,l.value[i],v,t.colPiece,t.rowPiece,p.value[i].pieceID)}),1),w.puzzle.borderStyle="solid",w.puzzle.bgc="rgb(229, 231, 233)",w.puzzle.boxShadow="inset 39px -40px 20px -23px rgb(66, 66, 66),inset -12px 15px 20px -2px rgb(66, 66, 66)"):(w.puzzle.borderStyle="none",w.puzzle.bgc="none",w.puzzle.boxShadow="none")})),(0,n.bv)((()=>{window.addEventListener("resize",A)})),(0,n.Ah)((()=>{window.removeEventListener("resize",A)})),{uploadImgData:v,upload:g,img:e,puzzle:i,creatPuzzle:H,setupPiece:t,totalPiece:u,pieceList:p,canvasList:d,canvasRef:l,pieces:a,changeTwoPiece:o,pickup:y,isChosen:c,isGameStart:b,count:r,initialize:P,classVariable:w,resizeHandler:A,openChoseImage:h,defaultImage:f,choseSampleImg:m,openOriginalImage:z,container:s,startTime:_,historyList:I,openHistory:C}}},ne=()=>{(0,a.sj)((e=>({"35592f49":e.classVariable.puzzle.maxWidth,"5e3892ac":e.classVariable.puzzle.padding,"313a7b1a":e.classVariable.puzzle.border,"55f90df0":e.classVariable.puzzle.borderStyle,"6e842bd7":e.classVariable.puzzle.bgc,"836d51b8":e.classVariable.puzzle.boxShadow,a7c58496:e.classVariable.piece.border})))},te=ae.setup;ae.setup=te?(e,i)=>(ne(),te(e,i)):ne;var oe=ae,ce=l(89);const re=(0,ce.Z)(oe,[["render",T],["__scopeId","data-v-4ae0c86b"]]);var se=re,ue={name:"App",components:{puzzleComponent:se}};const pe=(0,ce.Z)(ue,[["render",t]]);var de=pe;(0,a.ri)(de).mount("#app")}},i={};function l(a){var n=i[a];if(void 0!==n)return n.exports;var t=i[a]={exports:{}};return e[a](t,t.exports,l),t.exports}l.m=e,function(){var e=[];l.O=function(i,a,n,t){if(!a){var o=1/0;for(u=0;u<e.length;u++){a=e[u][0],n=e[u][1],t=e[u][2];for(var c=!0,r=0;r<a.length;r++)(!1&t||o>=t)&&Object.keys(l.O).every((function(e){return l.O[e](a[r])}))?a.splice(r--,1):(c=!1,t<o&&(o=t));if(c){e.splice(u--,1);var s=n();void 0!==s&&(i=s)}}return i}t=t||0;for(var u=e.length;u>0&&e[u-1][2]>t;u--)e[u]=e[u-1];e[u]=[a,n,t]}}(),function(){l.n=function(e){var i=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(i,{a:i}),i}}(),function(){l.d=function(e,i){for(var a in i)l.o(i,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:i[a]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)}}(),function(){l.p="/puzzleGame/dist/"}(),function(){var e={143:0};l.O.j=function(i){return 0===e[i]};var i=function(i,a){var n,t,o=a[0],c=a[1],r=a[2],s=0;if(o.some((function(i){return 0!==e[i]}))){for(n in c)l.o(c,n)&&(l.m[n]=c[n]);if(r)var u=r(l)}for(i&&i(a);s<o.length;s++)t=o[s],l.o(e,t)&&e[t]&&e[t][0](),e[t]=0;return l.O(u)},a=self["webpackChunkpuzzlegame"]=self["webpackChunkpuzzlegame"]||[];a.forEach(i.bind(null,0)),a.push=i.bind(null,a.push.bind(a))}();var a=l.O(void 0,[998],(function(){return l(1742)}));a=l.O(a)})();
//# sourceMappingURL=app.b602a304.js.map