parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Q7KD":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3];function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,n,i){return parseInt(t.substr(n,i),16)}function e(t){return(t|=0)<0?"00":t<16?"0"+t.toString(16):t<256?t.toString(16):"ff"}function r(t,n,i){return e(255*((i=i<0?i+6:i>6?i-6:i)<1?t+(n-t)*i:i<3?n:i<4?t+(n-t)*(4-i):t))}function o(t){if(/^#[0-9a-f]{3,8}$/i.test(t)){var n,i=t.length;if(i<6){var e=t[1],r=t[2],o=t[3],u=t[4]||"";n="#"+e+e+r+r+o+o+u+u}return(7==i||i>8)&&(n=t),n}}function u(t){var n,e=i(t,7,2);isNaN(e)?n=t:n="rgba("+i(t,1,2)+","+i(t,3,2)+","+i(t,5,2)+","+(e/255).toFixed(2)+")";return n}function f(t,n,i){var o;if(0==n){var u=e(255*i);o=u+u+u}else{var f=i<=.5?i*(n+1):i+n-i*n,h=2*i-f;o=r(h,f,6*t+2)+r(h,f,6*t)+r(h,f,6*t-2)}return"#"+o}function h(t,n,i){var e=[.55,.5,.5,.46,.6,.55,.55][6*t+.5|0];return f(t,n,i=i<.5?i*e*2:e+(i-.5)*(1-e)*2)}var s="undefined"!=typeof window?window:"undefined"!=typeof self?self:void 0!==t?t:{},c={W:"jdenticon_config",n:"config"},a={};function l(t){a=t}function v(t){return arguments.length&&(a[c.n]=t),a[c.n]}function g(t,i){var e="object"==n(t)&&t||a[c.n]||s[c.W]||{},r=e.lightness||{},u=e.saturation||{},f="color"in u?u.color:u,h=u.grayscale,l=e.backColor,v=e.padding;function g(t,n){var i=r[t];return i&&i.length>1||(i=n),function(t){return(t=i[0]+t*(i[1]-i[0]))<0?0:t>1?1:t}}return{X:function(t){var n,i=e.hues;return i&&i.length>0&&(n=i[0|.999*t*i.length]),"number"==typeof n?(n/360%1+1)%1:t},o:"number"==typeof f?f:.5,F:"number"==typeof h?h:0,p:g("color",[.4,.8]),G:g("grayscale",[.3,.9]),H:o(l),Y:"number"==typeof t?t:"number"==typeof v?v:i}}function p(t,n){this.x=t,this.y=n}function d(t,n,i,e){this.q=t,this.t=n,this.I=i,this.Z=e}d.prototype.J=function(t,n,i,e){var r=this.q+this.I,o=this.t+this.I,u=this.Z;return 1===u?new p(r-n-(e||0),this.t+t):2===u?new p(r-t-(i||0),o-n-(e||0)):3===u?new p(this.q+n,o-t-(i||0)):new p(this.q+t,this.t+n)};var y=new d(0,0,0,0);function w(t){this.K=t,this.u=y}var m=w.prototype;function b(t,n,i,e){var r,o,u,f,h,s;(t%=14)?1==t?(u=0|.5*i,f=0|.8*i,n.j(i-u,0,u,f,2)):2==t?(u=0|i/3,n.i(u,u,i-u,i-u)):3==t?(s=i<6?1:i<8?2:0|.25*i,h=(h=.1*i)>1?0|h:h>.5?1:h,n.i(s,s,i-h-s,i-h-s)):4==t?(o=0|.15*i,u=0|.5*i,n.h(i-u-o,i-u-o,u)):5==t?((s=4*(h=.1*i))>3&&(s|=0),n.i(0,0,i,i),n.g([s,s,i-h,s,s+(i-s-h)/2,i-h],!0)):6==t?n.g([0,0,i,0,i,.7*i,.4*i,.4*i,.7*i,i,0,i]):7==t?n.j(i/2,i/2,i/2,i/2,3):8==t?(n.i(0,0,i,i/2),n.i(0,i/2,i/2,i/2),n.j(i/2,i/2,i/2,i/2,1)):9==t?(h=.14*i,s=i<4?1:i<6?2:0|.35*i,h=i<8?h:0|h,n.i(0,0,i,i),n.i(s,s,i-s-h,i-s-h,!0)):10==t?(s=3*(h=.12*i),n.i(0,0,i,i),n.h(s,s,i-h-s,!0)):11==t?n.j(i/2,i/2,i/2,i/2,3):12==t?(o=.25*i,n.i(0,0,i,i),n.L(o,o,i-o,i-o,!0)):!e&&(o=.4*i,u=1.2*i,n.h(o,o,u)):(r=.42*i,n.g([0,0,i,0,i,i-2*r,i-r,i,0,i]))}function x(t,n,i){var e;(t%=4)?1==t?n.j(0,i/2,i,i/2,0):2==t?n.L(0,0,i,i):(e=i/6,n.h(e,e,i-2*e)):n.j(0,0,i,i,0)}function S(t,n){return[h(t=n.X(t),n.F,n.G(0)),h(t,n.o,n.p(.5)),h(t,n.F,n.G(1)),h(t,n.o,n.p(1)),h(t,n.o,n.p(0))]}function A(t,n,e){var r=g(e,.08);r.H&&t.m(r.H);var o=t.k,u=.5+o*r.Y|0;o-=2*u;var f=new w(t),h=0|o/4,s=0|u+o/2-2*h,c=0|u+o/2-2*h;function a(e,r,o,u,a){var l=i(n,o,1),g=u?i(n,u,1):0;t.M(v[p[e]]);for(var y=0;y<a.length;y++)f.u=new d(s+a[y][0]*h,c+a[y][1]*h,h,g++%4),r(l,f,h,y);t.N()}var l,v=S(i(n,-7)/268435455,r),p=[];function y(t){if(t.indexOf(l)>=0)for(var n=0;n<t.length;n++)if(p.indexOf(t[n])>=0)return!0}for(var m=0;m<3;m++)l=i(n,8+m,1)%v.length,(y([0,4])||y([2,3]))&&(l=1),p.push(l);a(0,x,2,3,[[1,0],[2,0],[2,3],[1,3],[0,1],[3,1],[3,2],[0,2]]),a(1,x,4,5,[[0,0],[3,0],[3,3],[0,3]]),a(2,b,1,null,[[1,1],[2,1],[2,2],[1,2]]),t.finish()}function C(t){var n,i=0,e=0,r=encodeURI(t)+"%80",o=[],u=[],f=1732584193,h=4023233417,s=~f,c=~h,a=3285377520,l=[f,h,s,c,a],v=0,g="";function p(t,n){return t<<n|t>>>32-n}for(;i<r.length;e++)o[e>>2]=o[e>>2]|("%"==r[i]?parseInt(r.substring(i+1,i+=3),16):r.charCodeAt(i++))<<8*(3-(3&e));for(o[(n=16*(1+(e+7>>6)))-1]=8*e-8;v<n;v+=16){for(i=0;i<80;i++)e=p(f,5)+a+(i<20?1518500249+(h&s^~h&c):i<40?1859775393+(h^s^c):i<60?2400959708+(h&s^h&c^s&c):3395469782+(h^s^c))+(u[i]=i<16?0|o[v+i]:p(u[i-3]^u[i-8]^u[i-14]^u[i-16],1)),a=c,c=s,s=p(h,30),h=f,f=e;l[0]=f=l[0]+f|0,l[1]=h=l[1]+h|0,l[2]=s=l[2]+s|0,l[3]=c=l[3]+c|0,l[4]=a=l[4]+a|0}for(i=0;i<40;i++)g+=(l[i>>3]>>>4*(7-(7&i))&15).toString(16);return g}function j(t){return/^[0-9a-f]{11,}$/i.test(t)&&t}function M(t){return C(null==t?"":""+t)}function N(t,n){var i=t.canvas,e=i.width,r=i.height;t.save(),n||(n=Math.min(e,r),t.translate((e-n)/2|0,(r-n)/2|0)),this.l=t,this.k=n,t.clearRect(0,0,n,n)}m.g=function(t,n){for(var i=n?-2:2,e=[],r=n?t.length-2:0;r<t.length&&r>=0;r+=i)e.push(this.u.J(t[r],t[r+1]));this.K.g(e)},m.h=function(t,n,i,e){var r=this.u.J(t,n,i,i);this.K.h(r,i,e)},m.i=function(t,n,i,e,r){this.g([t,n,t+i,n,t+i,n+e,t,n+e],r)},m.j=function(t,n,i,e,r,o){var u=[t+i,n,t+i,n+e,t,n+e,t,n];u.splice((r||0)%4*2,2),this.g(u,o)},m.L=function(t,n,i,e,r){this.g([t+i/2,n,t+i,n+e/2,t+i/2,n+e,t,n+e/2],r)};var k=N.prototype;function I(t,n,i,e){if(!t)throw new Error("No canvas specified.");A(new N(t,i),j(n)||M(n),e)}function P(t){return(10*t+.5|0)/10}function R(){this.v=""}k.m=function(t){var n=this.l,i=this.k;n.fillStyle=u(t),n.fillRect(0,0,i,i)},k.M=function(t){var n=this.l;n.fillStyle=u(t),n.beginPath()},k.N=function(){this.l.fill()},k.g=function(t){var n=this.l;n.moveTo(t[0].x,t[0].y);for(var i=1;i<t.length;i++)n.lineTo(t[i].x,t[i].y);n.closePath()},k.h=function(t,n,i){var e=this.l,r=n/2;e.moveTo(t.x+r,t.y+r),e.arc(t.x+r,t.y+r,r,0,2*Math.PI,i),e.closePath()},k.finish=function(){this.l.restore()};var B=R.prototype;function O(t){this.A,this.B={},this.O=t,this.k=t.k}B.g=function(t){for(var n="",i=0;i<t.length;i++)n+=(i?"L":"M")+P(t[i].x)+" "+P(t[i].y);this.v+=n+"Z"},B.h=function(t,n,i){var e=i?0:1,r=P(n/2),o=P(n),u="a"+r+","+r+" 0 1,"+e+" ";this.v+="M"+P(t.x)+" "+P(t.y+n/2)+u+o+",0"+u+-o+",0"};var T=O.prototype;T.m=function(t){var n=/^(#......)(..)?/.exec(t),e=n[2]?i(n[2],0)/255:1;this.O.m(n[1],e)},T.M=function(t){this.A=this.B[t]||(this.B[t]=new R)},T.N=function(){},T.g=function(t){this.A.g(t)},T.h=function(t,n,i){this.A.h(t,n,i)},T.finish=function(){var t=this.B;for(var n in t)t.hasOwnProperty(n)&&this.O.P(n,t[n].v)};var q={R:"http://www.w3.org/2000/svg",S:"width",T:"height"};function F(t){this.k=t,this.C='<svg xmlns="'+q.R+'" width="'+t+'" height="'+t+'" viewBox="0 0 '+t+" "+t+'">'}var D=F.prototype;function L(t,n,i){var e=new F(n);return A(new O(e),j(t)||M(t),i),e.toString()}D.m=function(t,n){n&&(this.C+='<rect width="100%" height="100%" fill="'+t+'" opacity="'+n.toFixed(2)+'"/>')},D.P=function(t,n){this.C+='<path fill="'+t+'" d="'+n+'"/>'},D.toString=function(){return this.C+"</svg>"};var U=1,$=2,G={U:"data-jdenticon-hash",D:"data-jdenticon-value"},H="["+G.U+"],["+G.D+"]",J="undefined"!=typeof document&&document.querySelectorAll.bind(document);function K(t){if(t){var n=t.tagName;if(/^svg$/i.test(n))return U;if(/^canvas$/i.test(n)&&"getContext"in t)return $}}function V(t,n){for(var i=[],e=arguments.length-2;e-- >0;)i[e]=arguments[e+2];for(var r=document.createElementNS(q.R,n),o=0;o+1<i.length;o+=2)r.setAttribute(i[o],i[o+1]);t.appendChild(r)}function Y(t){var n=this.k=Math.min(Number(t.getAttribute(q.S))||100,Number(t.getAttribute(q.T))||100);for(this.V=t;t.firstChild;)t.removeChild(t.firstChild);t.setAttribute("viewBox","0 0 "+n+" "+n),t.setAttribute("preserveAspectRatio","xMidYMid meet")}var Z=Y.prototype;function E(){J&&W(H)}function W(t,n,i){z(t,n,i,function(t,n){if(n)return n==U?new O(new Y(t)):new N(t.getContext("2d"))})}function X(t,n,i){z(t,n,i,function(t,n){if(n==$)return new N(t.getContext("2d"))})}function _(t,n,i){z(t,n,i,function(t,n){if(n==U)return new O(new Y(t))})}function z(t,n,i,e){if("string"!=typeof t){var r=j(n)||null!=n&&M(n)||j(t.getAttribute(G.U))||t.hasAttribute(G.D)&&M(t.getAttribute(G.D));if(r){var o=e(t,K(t));o&&A(o,r,i)}}else if(J)for(var u=J(t),f=0;f<u.length;f++)z(u[f],n,i,e)}Z.m=function(t,n){n&&V(this.V,"rect",q.S,"100%",q.T,"100%","fill",t,"opacity",n)},Z.P=function(t,n){V(this.V,"path","fill",t,"d",n)};var Q=E;l(Q),Q.configure=v,Q.drawIcon=I,Q.toSvg=L,Q.update=W,Q.updateCanvas=X,Q.updateSvg=_,Q.version="3.1.0",Q.bundle="browser-cjs",module.exports=Q;
},{}],"FOZT":[function(require,module,exports) {
"use strict";function e(e){for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)t+=r.charAt(Math.floor(Math.random()*r.length));return t}function t(e){return document.getElementById(e)}function r(e,t){var r=new URL(window.location.href),n=r.search,a=new URLSearchParams(n);a.get(e)!=t&&(null!=t?a.set(e,t):a.delete(e),r.search=a.toString(),window.history.pushState("",document.title,r))}function n(e){var t=new URL(window.location.href).search;return new URLSearchParams(t).get(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeid=e,exports.GE=t,exports.SetSearchParam=r,exports.GetSearchParam=n;
},{}],"Focm":[function(require,module,exports) {
"use strict";var i,n,a=require("jdenticon"),e=require("./utils.js"),t=["is_black","is_blue","is_red","is_green","is_yellow","is_grey","is_magenta","is_orange","is_aqua","is_maroon"];if((0,e.GE)("animation").innerHTML='\n<img id="anim_false_0" class="animation_image is_hidden" src="images/false/weary_face.gif"/>\n<img id="anim_false_1" class="animation_image is_hidden" src="images/false/frowning_face.gif"/>\n<img id="anim_false_2" class="animation_image is_hidden" src="images/false/unamused_face.gif"/>\n<img id="anim_false_3" class="animation_image is_hidden" src="images/false/crying_face.gif"/>\n<img id="anim_false_4" class="animation_image is_hidden" src="images/false/pleading_face.gif"/>\n<img id="anim_false_5" class="animation_image is_hidden" src="images/false/thinking_face.gif"/>\n\n<img id="anim_true_0" class="animation_image is_hidden" src="images/true/winking_face.gif"/>\n<img id="anim_true_1" class="animation_image is_hidden" src="images/true/beaming_face_with_smiling_eyes.gif"/>\n<img id="anim_true_2" class="animation_image is_hidden" src="images/true/grinning_face_with_smiling_eyes.gif"/>\n<img id="anim_true_3" class="animation_image is_hidden" src="images/true/hugging_face.gif"/>\n<img id="anim_true_4" class="animation_image is_hidden" src="images/true/partying_face.gif"/>\n<img id="anim_true_5" class="animation_image is_hidden" src="images/true/relieved_face.gif"/>\n<img id="anim_true_6" class="animation_image is_hidden" src="images/true/smiling_face.gif"/>\n<img id="anim_true_7" class="animation_image is_hidden" src="images/true/smiling_face_with_sunglasses.gif"/>\n<img id="anim_true_8" class="animation_image is_hidden" src="images/true/star_struck.gif"/>\n<img id="anim_true_9" class="animation_image is_hidden" src="images/true/upside_down_face.gif"/>  \n',window.build_levels=function(n){n?i=n:n=i,console.log(n);var t='\n    <img src="images/logo.png" id="logo-image"/>\n    <div>\n      <a href="https://github.com/volotat/ARC-Game" style="color:black">\n      <svg class="is_inline" height="48" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="48" data-view-component="true" class="octicon octicon-mark-github v-align-middle">\n          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>\n      </svg>\n      <span class="is_inline github_text">Github page</span>\n      </a>\n    <div>\n    <div id="levels_data">';for(var s in n){for(var c in t+="<h2>".concat(s,'</h2>\n      <div class="levels-block">'),n[s]){var o=n[s][c],l=(0,a.toSvg)(c,100);t+='<a href="?task='.concat(encodeURIComponent(o),'">\n          <div class="level-card">\n            <div id="').concat(o,'" class="task-icon ').concat(localStorage.getItem("tasks/".concat(o))?"solved":"",'">').concat(l,"</div> \n            ").concat(c,"\n          </div>\n        </a>")}t+="</div>"}t+="</div>",(0,e.GE)("main_container").innerHTML=t,window.scrollTo(0,0)},window.load_level=function(i){n=i,(0,e.GE)("main_container").innerHTML="Загрузка...",console.log(i);var a=i.replace(/^.*[\\\/]/,"").split(".").slice(0,-1).join(".");fetch(i).then(function(i){return i.json()}).then(function(i){return build_level(i,a)})},(0,e.GetSearchParam)("task")){var s=decodeURIComponent((0,e.GetSearchParam)("task"));load_level("tasks/"+s)}else fetch("tasks/levels.json").then(function(i){return i.json()}).then(function(i){return build_levels(i)});var c,o,l,r={};function _(i){var n,a,e,s,c,o=null!==(n=i.block_name)&&void 0!==n?n:"",l=i.block_data,r=null!==(a=i.is_clickable)&&void 0!==a&&a,_=null!==(e=i.is_dragable)&&void 0!==e&&e,d=null!==(s=i.is_big)&&void 0!==s&&s,u=null!==(c=i.block_size)&&void 0!==c?c:260,m="",f="";_&&(f="onclick=\"copy_block_from_to('".concat(o,"', 'test_result')\" ")),m+='<div class="is_inline '.concat(_?"is_dragable":"",'" ').concat(f,' style="width: ').concat(u,"px; height: ").concat(u,'px;">'),m+='<div class="block '.concat(d?"is_big":"",'" style="grid-template-columns: repeat(').concat(l[0].length,", 1fr); aspect-ratio: ").concat(l[0].length," / ").concat(l.length,';">');var g=l.length>l[0].length?l.length:l[0].length,v=0;return l.forEach(function(i){var n=0;i.forEach(function(i){var a="".concat(o,"_").concat(v,"_").concat(n),e="";r&&(e="\n          onmousedown=\"start_interact_with_cell('".concat(a,"')\" \n          onmouseover=\"hover_over_cell('").concat(a,"')\" \n          onmouseup=\"end_interact_with_cell('").concat(a,"', ").concat(v,", ").concat(n,')" ')),m+='<div id="'.concat(a,'" class="cell ').concat(t[i]," ").concat(r?"is_clickable":"",'" ').concat(e,' style="width: calc(').concat(u,"px / ").concat(g,' - 2px);"></div>'),n+=1}),v+=1}),m+="</div>",m+="</div>"}window.copy_block_from_to=function(i,n){r[i];var a=r[n],s=0;a.forEach(function(a){var c=0;a.forEach(function(a){var o="".concat(i,"_").concat(s,"_").concat(c);if((0,e.GE)(o)){var l=Array.from((0,e.GE)(o).classList).filter(function(i){return t.includes(i)})[0],r="".concat(n,"_").concat(s,"_").concat(c),_=Array.from((0,e.GE)(r).classList).filter(function(i){return t.includes(i)})[0];console.log(o,l,_),(0,e.GE)(r).classList.remove(_),(0,e.GE)(r).classList.add(l)}c+=1}),s+=1})},window.set_main_color=function(i){c=null,d.last_color_index=i},window.build_level=function(i,n){console.log(i);var a="<h2>".concat(n,"</h2>");a+='<div class="noselect">',a+='<div id="train_container">',i.train.forEach(function(i){a+='<div class="train_example">',a+=_({block_data:i.input}),a+=" <img src='images/arrow.png' class=\"arrow_img\"/> ",a+=_({block_data:i.output}),a+="</div>"}),a+="</div>",a+="<br><br>",a+='<div id="test_container">',i.test.forEach(function(i){var n=Array.from(Array(i.output.length),function(){return Array.from(Array(i.output[0].length),function(){return 0})});console.log({output:n}),a+='<div style="margin: 0px 30px 80px 30px;">',a+=_({block_data:i.input,is_dragable:!0,is_big:!0,block_name:"test_input",block_size:340}),a+=" <img src='images/arrow.png' class=\"arrow_img\"/> ",a+=_({block_data:n,is_clickable:!0,is_big:!0,block_name:"test_result",block_size:340}),a+="</div>",r.test_input=i.input,r.test_output=i.output,r.test_result=n}),a+="</div>",a+='\n    <button class="big_button is_green" onclick="check_result()">Check</button>\n    <br>\n    <a href="?"><button class="big_button is_blue">Back</button></a>\n    <div style="height: 140px"><div>\n  ',a+="</div>",a+='\n  <div id="pallete">\n    <div id="main_color" class="pallete_cell main '.concat(t[0],' is_inline"></div>'),t.forEach(function(i){a+='<div class="pallete_cell '.concat(i,' is_inline is_clickable" onclick="set_main_color(').concat(t.indexOf(i),')" onmousedown="fill_color = \'').concat(i,"'\"></div>")}),a+="</div>",(0,e.GE)("main_container").innerHTML=a,new IntersectionObserver(function(i){!0===i[0].isIntersecting?(0,e.GE)("pallete").classList.add("show"):(0,e.GE)("pallete").classList.remove("show")},{threshold:[.2]}).observe((0,e.GE)("test_container"))},window.fill_color=null;var d={last_color_index_:0,set last_color_index(i){this.last_color_index_=i;var n=Array.from((0,e.GE)("main_color").classList).filter(function(i){return t.includes(i)})[0];(0,e.GE)("main_color").classList.remove(n),(0,e.GE)("main_color").classList.add(t[this.last_color_index_])},get last_color_index(){return this.last_color_index_}};window.params=d,window.addEventListener("mouseup",function(){o=null,fill_color=null});var u=null;function m(i){return new Promise(function(n){return setTimeout(n,i)})}window.start_interact_with_cell=function(i){var n=Array.from((0,e.GE)(i).classList).filter(function(i){return t.includes(i)})[0];t.indexOf(n);u=n,o=d.last_color_index,l=i,(0,e.GE)(i).classList.remove(n),(0,e.GE)(i).classList.add(t[o])},window.hover_over_cell=function(i){var n=Array.from((0,e.GE)(i).classList).filter(function(i){return t.includes(i)})[0];t.indexOf(n);null!=o&&((0,e.GE)(i).classList.remove(n),(0,e.GE)(i).classList.add(t[o]))},window.end_interact_with_cell=function(i,n,a){if(null!=fill_color)flood_fill(n,a,fill_color),fill_color=null;else{var s=Array.from((0,e.GE)(i).classList).filter(function(i){return t.includes(i)})[0],o=t.indexOf(s);l==i&&s==u&&(d.last_color_index=(o+1)%t.length,(0,e.GE)(i).classList.remove(s),(0,e.GE)(i).classList.add(t[d.last_color_index]))}c=i},window.check_result=function(){var i=(0,e.GE)("animation");i.style.animation="none",i.offsetHeight,i.style.animation=null,(0,e.GE)("animation").classList.remove("live"),(0,e.GE)("animation").classList.add("live");var a=!0,s=r.test_output,c=0;s.forEach(function(i){var n=0;i.forEach(function(i){var s="test_result_".concat(c,"_").concat(n),o=Array.from((0,e.GE)(s).classList).filter(function(i){return t.includes(i)})[0];i!=t.indexOf(o)&&(a=!1),n+=1}),c+=1});for(var o=0;o<10;o++)(0,e.GE)("anim_true_".concat(o)).classList.add("is_hidden");for(o=0;o<6;o++)(0,e.GE)("anim_false_".concat(o)).classList.add("is_hidden");if(a){o=Math.floor(10*Math.random());(0,e.GE)("anim_true_".concat(o)).classList.remove("is_hidden"),localStorage.setItem(n,!0),setTimeout(function(){window.location="?"},2600)}else{o=Math.floor(6*Math.random());(0,e.GE)("anim_false_".concat(o)).classList.remove("is_hidden")}},window.flood_fill=function(i,n,a){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,c="test_result_".concat(i,"_").concat(n);if((0,e.GE)(c)&&s!=a){var o=Array.from((0,e.GE)(c).classList).filter(function(i){return t.includes(i)})[0];s||(s=o),o==s&&((0,e.GE)(c).classList.remove(o),(0,e.GE)(c).classList.add(a),setTimeout(function(){flood_fill(i+1,n,a,s),flood_fill(i-1,n,a,s),flood_fill(i,n+1,a,s),flood_fill(i,n-1,a,s)},10))}};
},{"jdenticon":"Q7KD","./utils.js":"FOZT"}]},{},["Focm"], null)
//# sourceMappingURL=source.f8cf3d25.js.map