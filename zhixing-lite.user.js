// ==UserScript==
// @name                知行 · 网课助手（轻量版）
// @namespace           zhixing.local
// @downloadURL      https://guanyunmao.github.io/zhixing/zhixing-lite.user.js
// @updateURL        https://guanyunmao.github.io/zhixing/zhixing-lite.user.js
// @version             4.0.3-lite
// @description         知行 · 网课助手：视频倍速、文档阅读、作业与考试辅助作答（不自动交卷）。需自备 OpenAI 兼容 API，点面板「开始」才动手。
// @match               *://*.chaoxing.com/*
// @match               *://*.xuexitong.com/*
// @match               *://*.edu.cn/*
// @match               *://*.org.cn/*
// @match               *://*.ac.cn/*
// @match               *://*.xueyinonline.com/*
// @match               *://*.sslibrary.com/*
// @match               *://*.neauce.com/*
// @match               *://*.nbdlib.cn/*
// @match               *://*.hnsyu.net/*
// @match               *://*.qutjxjy.cn/*
// @match               *://*.ynny.cn/*
// @match               *://*.hnvist.cn/*
// @match               *://*.fjlecb.cn/*
// @match               *://*.gdhkmooc.com/*
// @match               *://*.cugbonline.cn/*
// @match               *://*.zjelib.cn/*
// @match               *://*.cqrspx.cn/*
// @match               *://*.zhihui-yun.com/*
// @match               *://*.cqie.cn/*
// @match               *://*.ccqmxx.com/*
// @match               *://*.jxgmxy.com/*
// @match               *://*.jnzyjsxy.cn/*
// @connect             127.0.0.1
// @connect             *
// @connect             api.deepseek.com
// @connect             cx.icodef.com
// @run-at              document-end
// @grant               unsafeWindow
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_getValue
// @grant               GM_deleteValue
// @grant               GM_info
// @grant               GM_getResourceText
// @icon                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MSA0MSI+PHJlY3Qgd2lkdGg9IjQxIiBoZWlnaHQ9IjQxIiByeD0iMTEiIGZpbGw9IiNlOGVlZjgiLz48dGV4dCB4PSIyMC41IiB5PSIyOS41IiBmb250LXNpemU9IjIzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMTAxYTJlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsSGlyYWdpbm8gU2FucyBHQixNaWNyb3NvZnQgWWFIZWksc2Fucy1zZXJpZiI+55+lPC90ZXh0Pjwvc3ZnPg==
// 说明                  上一行是脚本列表里显示的小图标（41×41 SVG），纯装饰，不需要可整行删除。
// @license             未经授权请勿二开
// 说明                  本文件是原脚本的本地修改版（自建 API + 中文界面 + 安全默认），仅供个人学习使用，请勿公开分发。
// ==/UserScript==

/* ============================================================================
 *  P0 内联依赖（替代 4 个 @require）
 *   · jQuery 3.7.1 (MIT)
 *   · Typr.js + Typr.U.js + blueimp-md5 (MIT) —— 超星混淆字体解密
 *   · GptRequestGuard 桩 —— 自建 API 模式不需要验证码/风控
 *  字体解密表已内联（gzip+base64），脚本不再请求任何第三方域名
 *  测试时可用 INLINE-DEP 标记把这几段整体剔除（见 smoke.mjs）。
 * ========================================================================== */
try {
    window.addEventListener('error', function (ev) {
        try { console.error('[知行][fatal] ' + (ev && ev.message) + '\n' + ((ev && ev.error && ev.error.stack) || '(no stack)')); } catch (_) { }
    });
} catch (_) { }

var __pageJQ = (typeof window !== 'undefined') ? window.jQuery : undefined;
var __pageDollar = (typeof window !== 'undefined') ? window.$ : undefined;

/* ==== INLINE-DEP-BEGIN:jquery ==== */
/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(ie,e){"use strict";var oe=[],r=Object.getPrototypeOf,ae=oe.slice,g=oe.flat?function(e){return oe.flat.call(e)}:function(e){return oe.concat.apply([],e)},s=oe.push,se=oe.indexOf,n={},i=n.toString,ue=n.hasOwnProperty,o=ue.toString,a=o.call(Object),le={},v=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},y=function(e){return null!=e&&e===e.window},C=ie.document,u={type:!0,src:!0,nonce:!0,noModule:!0};function m(e,t,n){var r,i,o=(n=n||C).createElement("script");if(o.text=e,t)for(r in u)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e}var t="3.7.1",l=/HTML$/i,ce=function(e,t){return new ce.fn.init(e,t)};function c(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!v(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}function fe(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}ce.fn=ce.prototype={jquery:t,constructor:ce,length:0,toArray:function(){return ae.call(this)},get:function(e){return null==e?ae.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=ce.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return ce.each(this,e)},map:function(n){return this.pushStack(ce.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(ae.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(ce.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(ce.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:oe.sort,splice:oe.splice},ce.extend=ce.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||v(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(ce.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||ce.isPlainObject(n)?n:{},i=!1,a[t]=ce.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},ce.extend({expando:"jQuery"+(t+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==i.call(e))&&(!(t=r(e))||"function"==typeof(n=ue.call(t,"constructor")&&t.constructor)&&o.call(n)===a)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){m(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(c(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},text:function(e){var t,n="",r=0,i=e.nodeType;if(!i)while(t=e[r++])n+=ce.text(t);return 1===i||11===i?e.textContent:9===i?e.documentElement.textContent:3===i||4===i?e.nodeValue:n},makeArray:function(e,t){var n=t||[];return null!=e&&(c(Object(e))?ce.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:se.call(t,e,n)},isXMLDoc:function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!l.test(t||n&&n.nodeName||"HTML")},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(c(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:le}),"function"==typeof Symbol&&(ce.fn[Symbol.iterator]=oe[Symbol.iterator]),ce.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var pe=oe.pop,de=oe.sort,he=oe.splice,ge="[\\x20\\t\\r\\n\\f]",ve=new RegExp("^"+ge+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ge+"+$","g");ce.contains=function(e,t){var n=t&&t.parentNode;return e===n||!(!n||1!==n.nodeType||!(e.contains?e.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))};var f=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function p(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}ce.escapeSelector=function(e){return(e+"").replace(f,p)};var ye=C,me=s;!function(){var e,b,w,o,a,T,r,C,d,i,k=me,S=ce.expando,E=0,n=0,s=W(),c=W(),u=W(),h=W(),l=function(e,t){return e===t&&(a=!0),0},f="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",t="(?:\\\\[\\da-fA-F]{1,6}"+ge+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",p="\\["+ge+"*("+t+")(?:"+ge+"*([*^$|!~]?=)"+ge+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+t+"))|)"+ge+"*\\]",g=":("+t+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+p+")*)|.*)\\)|)",v=new RegExp(ge+"+","g"),y=new RegExp("^"+ge+"*,"+ge+"*"),m=new RegExp("^"+ge+"*([>+~]|"+ge+")"+ge+"*"),x=new RegExp(ge+"|>"),j=new RegExp(g),A=new RegExp("^"+t+"$"),D={ID:new RegExp("^#("+t+")"),CLASS:new RegExp("^\\.("+t+")"),TAG:new RegExp("^("+t+"|[*])"),ATTR:new RegExp("^"+p),PSEUDO:new RegExp("^"+g),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ge+"*(even|odd|(([+-]|)(\\d*)n|)"+ge+"*(?:([+-]|)"+ge+"*(\\d+)|))"+ge+"*\\)|)","i"),bool:new RegExp("^(?:"+f+")$","i"),needsContext:new RegExp("^"+ge+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ge+"*((?:-\\d)?\\d*)"+ge+"*\\)|)(?=[^-]|$)","i")},N=/^(?:input|select|textarea|button)$/i,q=/^h\d$/i,L=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,H=/[+~]/,O=new RegExp("\\\\[\\da-fA-F]{1,6}"+ge+"?|\\\\([^\\r\\n\\f])","g"),P=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},M=function(){V()},R=J(function(e){return!0===e.disabled&&fe(e,"fieldset")},{dir:"parentNode",next:"legend"});try{k.apply(oe=ae.call(ye.childNodes),ye.childNodes),oe[ye.childNodes.length].nodeType}catch(e){k={apply:function(e,t){me.apply(e,ae.call(t))},call:function(e){me.apply(e,ae.call(arguments,1))}}}function I(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(V(e),e=e||T,C)){if(11!==p&&(u=L.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return k.call(n,a),n}else if(f&&(a=f.getElementById(i))&&I.contains(e,a)&&a.id===i)return k.call(n,a),n}else{if(u[2])return k.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&e.getElementsByClassName)return k.apply(n,e.getElementsByClassName(i)),n}if(!(h[t+" "]||d&&d.test(t))){if(c=t,f=e,1===p&&(x.test(t)||m.test(t))){(f=H.test(t)&&U(e.parentNode)||e)==e&&le.scope||((s=e.getAttribute("id"))?s=ce.escapeSelector(s):e.setAttribute("id",s=S)),o=(l=Y(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+Q(l[o]);c=l.join(",")}try{return k.apply(n,f.querySelectorAll(c)),n}catch(e){h(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return re(t.replace(ve,"$1"),e,n,r)}function W(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function F(e){return e[S]=!0,e}function $(e){var t=T.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function B(t){return function(e){return fe(e,"input")&&e.type===t}}function _(t){return function(e){return(fe(e,"input")||fe(e,"button"))&&e.type===t}}function z(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&R(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function X(a){return F(function(o){return o=+o,F(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function U(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function V(e){var t,n=e?e.ownerDocument||e:ye;return n!=T&&9===n.nodeType&&n.documentElement&&(r=(T=n).documentElement,C=!ce.isXMLDoc(T),i=r.matches||r.webkitMatchesSelector||r.msMatchesSelector,r.msMatchesSelector&&ye!=T&&(t=T.defaultView)&&t.top!==t&&t.addEventListener("unload",M),le.getById=$(function(e){return r.appendChild(e).id=ce.expando,!T.getElementsByName||!T.getElementsByName(ce.expando).length}),le.disconnectedMatch=$(function(e){return i.call(e,"*")}),le.scope=$(function(){return T.querySelectorAll(":scope")}),le.cssHas=$(function(){try{return T.querySelector(":has(*,:jqfake)"),!1}catch(e){return!0}}),le.getById?(b.filter.ID=function(e){var t=e.replace(O,P);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&C){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(O,P);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&C){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):t.querySelectorAll(e)},b.find.CLASS=function(e,t){if("undefined"!=typeof t.getElementsByClassName&&C)return t.getElementsByClassName(e)},d=[],$(function(e){var t;r.appendChild(e).innerHTML="<a id='"+S+"' href='' disabled='disabled'></a><select id='"+S+"-\r\\' disabled='disabled'><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+ge+"*(?:value|"+f+")"),e.querySelectorAll("[id~="+S+"-]").length||d.push("~="),e.querySelectorAll("a#"+S+"+*").length||d.push(".#.+[+~]"),e.querySelectorAll(":checked").length||d.push(":checked"),(t=T.createElement("input")).setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),r.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&d.push(":enabled",":disabled"),(t=T.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||d.push("\\["+ge+"*name"+ge+"*="+ge+"*(?:''|\"\")")}),le.cssHas||d.push(":has"),d=d.length&&new RegExp(d.join("|")),l=function(e,t){if(e===t)return a=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!le.sortDetached&&t.compareDocumentPosition(e)===n?e===T||e.ownerDocument==ye&&I.contains(ye,e)?-1:t===T||t.ownerDocument==ye&&I.contains(ye,t)?1:o?se.call(o,e)-se.call(o,t):0:4&n?-1:1)}),T}for(e in I.matches=function(e,t){return I(e,null,null,t)},I.matchesSelector=function(e,t){if(V(e),C&&!h[t+" "]&&(!d||!d.test(t)))try{var n=i.call(e,t);if(n||le.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){h(t,!0)}return 0<I(t,T,null,[e]).length},I.contains=function(e,t){return(e.ownerDocument||e)!=T&&V(e),ce.contains(e,t)},I.attr=function(e,t){(e.ownerDocument||e)!=T&&V(e);var n=b.attrHandle[t.toLowerCase()],r=n&&ue.call(b.attrHandle,t.toLowerCase())?n(e,t,!C):void 0;return void 0!==r?r:e.getAttribute(t)},I.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ce.uniqueSort=function(e){var t,n=[],r=0,i=0;if(a=!le.sortStable,o=!le.sortStable&&ae.call(e,0),de.call(e,l),a){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)he.call(e,n[r],1)}return o=null,e},ce.fn.uniqueSort=function(){return this.pushStack(ce.uniqueSort(ae.apply(this)))},(b=ce.expr={cacheLength:50,createPseudo:F,match:D,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(O,P),e[3]=(e[3]||e[4]||e[5]||"").replace(O,P),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||I.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&I.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return D.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&j.test(n)&&(t=Y(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(O,P).toLowerCase();return"*"===e?function(){return!0}:function(e){return fe(e,t)}},CLASS:function(e){var t=s[e+" "];return t||(t=new RegExp("(^|"+ge+")"+e+"("+ge+"|$)"))&&s(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=I.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(v," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(d,e,t,h,g){var v="nth"!==d.slice(0,3),y="last"!==d.slice(-4),m="of-type"===e;return 1===h&&0===g?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u=v!==y?"nextSibling":"previousSibling",l=e.parentNode,c=m&&e.nodeName.toLowerCase(),f=!n&&!m,p=!1;if(l){if(v){while(u){o=e;while(o=o[u])if(m?fe(o,c):1===o.nodeType)return!1;s=u="only"===d&&!s&&"nextSibling"}return!0}if(s=[y?l.firstChild:l.lastChild],y&&f){p=(a=(r=(i=l[S]||(l[S]={}))[d]||[])[0]===E&&r[1])&&r[2],o=a&&l.childNodes[a];while(o=++a&&o&&o[u]||(p=a=0)||s.pop())if(1===o.nodeType&&++p&&o===e){i[d]=[E,a,p];break}}else if(f&&(p=a=(r=(i=e[S]||(e[S]={}))[d]||[])[0]===E&&r[1]),!1===p)while(o=++a&&o&&o[u]||(p=a=0)||s.pop())if((m?fe(o,c):1===o.nodeType)&&++p&&(f&&((i=o[S]||(o[S]={}))[d]=[E,p]),o===e))break;return(p-=g)===h||p%h==0&&0<=p/h}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||I.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?F(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=se.call(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:F(function(e){var r=[],i=[],s=ne(e.replace(ve,"$1"));return s[S]?F(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:F(function(t){return function(e){return 0<I(t,e).length}}),contains:F(function(t){return t=t.replace(O,P),function(e){return-1<(e.textContent||ce.text(e)).indexOf(t)}}),lang:F(function(n){return A.test(n||"")||I.error("unsupported lang: "+n),n=n.replace(O,P).toLowerCase(),function(e){var t;do{if(t=C?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=ie.location&&ie.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===r},focus:function(e){return e===function(){try{return T.activeElement}catch(e){}}()&&T.hasFocus()&&!!(e.type||e.href||~e.tabIndex)},enabled:z(!1),disabled:z(!0),checked:function(e){return fe(e,"input")&&!!e.checked||fe(e,"option")&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return q.test(e.nodeName)},input:function(e){return N.test(e.nodeName)},button:function(e){return fe(e,"input")&&"button"===e.type||fe(e,"button")},text:function(e){var t;return fe(e,"input")&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:X(function(){return[0]}),last:X(function(e,t){return[t-1]}),eq:X(function(e,t,n){return[n<0?n+t:n]}),even:X(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:X(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:X(function(e,t,n){var r;for(r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:X(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=B(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=_(e);function G(){}function Y(e,t){var n,r,i,o,a,s,u,l=c[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=y.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=m.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(ve," ")}),a=a.slice(n.length)),b.filter)!(r=D[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?I.error(e):c(e,s).slice(0)}function Q(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function J(a,e,t){var s=e.dir,u=e.next,l=u||s,c=t&&"parentNode"===l,f=n++;return e.first?function(e,t,n){while(e=e[s])if(1===e.nodeType||c)return a(e,t,n);return!1}:function(e,t,n){var r,i,o=[E,f];if(n){while(e=e[s])if((1===e.nodeType||c)&&a(e,t,n))return!0}else while(e=e[s])if(1===e.nodeType||c)if(i=e[S]||(e[S]={}),u&&fe(e,u))e=e[s]||e;else{if((r=i[l])&&r[0]===E&&r[1]===f)return o[2]=r[2];if((i[l]=o)[2]=a(e,t,n))return!0}return!1}}function K(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Z(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function ee(d,h,g,v,y,e){return v&&!v[S]&&(v=ee(v)),y&&!y[S]&&(y=ee(y,e)),F(function(e,t,n,r){var i,o,a,s,u=[],l=[],c=t.length,f=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)I(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),p=!d||!e&&h?f:Z(f,u,d,n,r);if(g?g(p,s=y||(e?d:c||v)?[]:t,n,r):s=p,v){i=Z(s,l),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(s[l[o]]=!(p[l[o]]=a))}if(e){if(y||d){if(y){i=[],o=s.length;while(o--)(a=s[o])&&i.push(p[o]=a);y(null,s=[],i,r)}o=s.length;while(o--)(a=s[o])&&-1<(i=y?se.call(e,a):u[o])&&(e[i]=!(t[i]=a))}}else s=Z(s===t?s.splice(c,s.length):s),y?y(null,t,s,r):k.apply(t,s)})}function te(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=J(function(e){return e===i},a,!0),l=J(function(e){return-1<se.call(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!=w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[J(K(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return ee(1<s&&K(c),1<s&&Q(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(ve,"$1"),t,s<n&&te(e.slice(s,n)),n<r&&te(e=e.slice(n)),n<r&&Q(e))}c.push(t)}return K(c)}function ne(e,t){var n,v,y,m,x,r,i=[],o=[],a=u[e+" "];if(!a){t||(t=Y(e)),n=t.length;while(n--)(a=te(t[n]))[S]?i.push(a):o.push(a);(a=u(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=E+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==T||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==T||(V(o),n=!C);while(s=v[a++])if(s(o,t||T,n)){k.call(r,o);break}i&&(E=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=pe.call(r));f=Z(f)}k.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&ce.uniqueSort(r)}return i&&(E=h,w=p),c},m?F(r):r))).selector=e}return a}function re(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&Y(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&C&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(O,P),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=D.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(O,P),H.test(o[0].type)&&U(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&Q(o)))return k.apply(n,r),n;break}}}return(l||ne(e,c))(r,t,!C,n,!t||H.test(e)&&U(t.parentNode)||t),n}G.prototype=b.filters=b.pseudos,b.setFilters=new G,le.sortStable=S.split("").sort(l).join("")===S,V(),le.sortDetached=$(function(e){return 1&e.compareDocumentPosition(T.createElement("fieldset"))}),ce.find=I,ce.expr[":"]=ce.expr.pseudos,ce.unique=ce.uniqueSort,I.compile=ne,I.select=re,I.setDocument=V,I.tokenize=Y,I.escape=ce.escapeSelector,I.getText=ce.text,I.isXML=ce.isXMLDoc,I.selectors=ce.expr,I.support=ce.support,I.uniqueSort=ce.uniqueSort}();var d=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&ce(e).is(n))break;r.push(e)}return r},h=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},b=ce.expr.match.needsContext,w=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function T(e,n,r){return v(n)?ce.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?ce.grep(e,function(e){return e===n!==r}):"string"!=typeof n?ce.grep(e,function(e){return-1<se.call(n,e)!==r}):ce.filter(n,e,r)}ce.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ce.find.matchesSelector(r,e)?[r]:[]:ce.find.matches(e,ce.grep(t,function(e){return 1===e.nodeType}))},ce.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(ce(e).filter(function(){for(t=0;t<r;t++)if(ce.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)ce.find(e,i[t],n);return 1<r?ce.uniqueSort(n):n},filter:function(e){return this.pushStack(T(this,e||[],!1))},not:function(e){return this.pushStack(T(this,e||[],!0))},is:function(e){return!!T(this,"string"==typeof e&&b.test(e)?ce(e):e||[],!1).length}});var k,S=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(ce.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||k,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:S.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof ce?t[0]:t,ce.merge(this,ce.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:C,!0)),w.test(r[1])&&ce.isPlainObject(t))for(r in t)v(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=C.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(ce):ce.makeArray(e,this)}).prototype=ce.fn,k=ce(C);var E=/^(?:parents|prev(?:Until|All))/,j={children:!0,contents:!0,next:!0,prev:!0};function A(e,t){while((e=e[t])&&1!==e.nodeType);return e}ce.fn.extend({has:function(e){var t=ce(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(ce.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&ce(e);if(!b.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&ce.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?ce.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?se.call(ce(e),this[0]):se.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ce.uniqueSort(ce.merge(this.get(),ce(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ce.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return d(e,"parentNode")},parentsUntil:function(e,t,n){return d(e,"parentNode",n)},next:function(e){return A(e,"nextSibling")},prev:function(e){return A(e,"previousSibling")},nextAll:function(e){return d(e,"nextSibling")},prevAll:function(e){return d(e,"previousSibling")},nextUntil:function(e,t,n){return d(e,"nextSibling",n)},prevUntil:function(e,t,n){return d(e,"previousSibling",n)},siblings:function(e){return h((e.parentNode||{}).firstChild,e)},children:function(e){return h(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(fe(e,"template")&&(e=e.content||e),ce.merge([],e.childNodes))}},function(r,i){ce.fn[r]=function(e,t){var n=ce.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=ce.filter(t,n)),1<this.length&&(j[r]||ce.uniqueSort(n),E.test(r)&&n.reverse()),this.pushStack(n)}});var D=/[^\x20\t\r\n\f]+/g;function N(e){return e}function q(e){throw e}function L(e,t,n,r){var i;try{e&&v(i=e.promise)?i.call(e).done(t).fail(n):e&&v(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}ce.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},ce.each(e.match(D)||[],function(e,t){n[t]=!0}),n):ce.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){ce.each(e,function(e,t){v(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==x(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return ce.each(arguments,function(e,t){var n;while(-1<(n=ce.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<ce.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},ce.extend({Deferred:function(e){var o=[["notify","progress",ce.Callbacks("memory"),ce.Callbacks("memory"),2],["resolve","done",ce.Callbacks("once memory"),ce.Callbacks("once memory"),0,"resolved"],["reject","fail",ce.Callbacks("once memory"),ce.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return ce.Deferred(function(r){ce.each(o,function(e,t){var n=v(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&v(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,v(t)?s?t.call(e,l(u,o,N,s),l(u,o,q,s)):(u++,t.call(e,l(u,o,N,s),l(u,o,q,s),l(u,o,N,o.notifyWith))):(a!==N&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){ce.Deferred.exceptionHook&&ce.Deferred.exceptionHook(e,t.error),u<=i+1&&(a!==q&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(ce.Deferred.getErrorHook?t.error=ce.Deferred.getErrorHook():ce.Deferred.getStackHook&&(t.error=ce.Deferred.getStackHook()),ie.setTimeout(t))}}return ce.Deferred(function(e){o[0][3].add(l(0,e,v(r)?r:N,e.notifyWith)),o[1][3].add(l(0,e,v(t)?t:N)),o[2][3].add(l(0,e,v(n)?n:q))}).promise()},promise:function(e){return null!=e?ce.extend(e,a):a}},s={};return ce.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=ae.call(arguments),o=ce.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?ae.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(L(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||v(i[t]&&i[t].then)))return o.then();while(t--)L(i[t],a(t),o.reject);return o.promise()}});var H=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;ce.Deferred.exceptionHook=function(e,t){ie.console&&ie.console.warn&&e&&H.test(e.name)&&ie.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},ce.readyException=function(e){ie.setTimeout(function(){throw e})};var O=ce.Deferred();function P(){C.removeEventListener("DOMContentLoaded",P),ie.removeEventListener("load",P),ce.ready()}ce.fn.ready=function(e){return O.then(e)["catch"](function(e){ce.readyException(e)}),this},ce.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--ce.readyWait:ce.isReady)||(ce.isReady=!0)!==e&&0<--ce.readyWait||O.resolveWith(C,[ce])}}),ce.ready.then=O.then,"complete"===C.readyState||"loading"!==C.readyState&&!C.documentElement.doScroll?ie.setTimeout(ce.ready):(C.addEventListener("DOMContentLoaded",P),ie.addEventListener("load",P));var M=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n))for(s in i=!0,n)M(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,v(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(ce(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},R=/^-ms-/,I=/-([a-z])/g;function W(e,t){return t.toUpperCase()}function F(e){return e.replace(R,"ms-").replace(I,W)}var $=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function B(){this.expando=ce.expando+B.uid++}B.uid=1,B.prototype={cache:function(e){var t=e[this.expando];return t||(t={},$(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[F(t)]=n;else for(r in t)i[F(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][F(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(F):(t=F(t))in r?[t]:t.match(D)||[]).length;while(n--)delete r[t[n]]}(void 0===t||ce.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!ce.isEmptyObject(t)}};var _=new B,z=new B,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,U=/[A-Z]/g;function V(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(U,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:X.test(i)?JSON.parse(i):i)}catch(e){}z.set(e,t,n)}else n=void 0;return n}ce.extend({hasData:function(e){return z.hasData(e)||_.hasData(e)},data:function(e,t,n){return z.access(e,t,n)},removeData:function(e,t){z.remove(e,t)},_data:function(e,t,n){return _.access(e,t,n)},_removeData:function(e,t){_.remove(e,t)}}),ce.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=z.get(o),1===o.nodeType&&!_.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=F(r.slice(5)),V(o,r,i[r]));_.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){z.set(this,n)}):M(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=z.get(o,n))?t:void 0!==(t=V(o,n))?t:void 0;this.each(function(){z.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){z.remove(this,e)})}}),ce.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=_.get(e,t),n&&(!r||Array.isArray(n)?r=_.access(e,t,ce.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ce.queue(e,t),r=n.length,i=n.shift(),o=ce._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){ce.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return _.get(e,n)||_.access(e,n,{empty:ce.Callbacks("once memory").add(function(){_.remove(e,[t+"queue",n])})})}}),ce.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?ce.queue(this[0],t):void 0===n?this:this.each(function(){var e=ce.queue(this,t,n);ce._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&ce.dequeue(this,t)})},dequeue:function(e){return this.each(function(){ce.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=ce.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=_.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var G=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Y=new RegExp("^(?:([+-])=|)("+G+")([a-z%]*)$","i"),Q=["Top","Right","Bottom","Left"],J=C.documentElement,K=function(e){return ce.contains(e.ownerDocument,e)},Z={composed:!0};J.getRootNode&&(K=function(e){return ce.contains(e.ownerDocument,e)||e.getRootNode(Z)===e.ownerDocument});var ee=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&K(e)&&"none"===ce.css(e,"display")};function te(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return ce.css(e,t,"")},u=s(),l=n&&n[3]||(ce.cssNumber[t]?"":"px"),c=e.nodeType&&(ce.cssNumber[t]||"px"!==l&&+u)&&Y.exec(ce.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)ce.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,ce.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ne={};function re(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=_.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ee(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ne[s])||(o=a.body.appendChild(a.createElement(s)),u=ce.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ne[s]=u)))):"none"!==n&&(l[c]="none",_.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}ce.fn.extend({show:function(){return re(this,!0)},hide:function(){return re(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ee(this)?ce(this).show():ce(this).hide()})}});var xe,be,we=/^(?:checkbox|radio)$/i,Te=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,Ce=/^$|^module$|\/(?:java|ecma)script/i;xe=C.createDocumentFragment().appendChild(C.createElement("div")),(be=C.createElement("input")).setAttribute("type","radio"),be.setAttribute("checked","checked"),be.setAttribute("name","t"),xe.appendChild(be),le.checkClone=xe.cloneNode(!0).cloneNode(!0).lastChild.checked,xe.innerHTML="<textarea>x</textarea>",le.noCloneChecked=!!xe.cloneNode(!0).lastChild.defaultValue,xe.innerHTML="<option></option>",le.option=!!xe.lastChild;var ke={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function Se(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&fe(e,t)?ce.merge([e],n):n}function Ee(e,t){for(var n=0,r=e.length;n<r;n++)_.set(e[n],"globalEval",!t||_.get(t[n],"globalEval"))}ke.tbody=ke.tfoot=ke.colgroup=ke.caption=ke.thead,ke.th=ke.td,le.option||(ke.optgroup=ke.option=[1,"<select multiple='multiple'>","</select>"]);var je=/<|&#?\w+;/;function Ae(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))ce.merge(p,o.nodeType?[o]:o);else if(je.test(o)){a=a||f.appendChild(t.createElement("div")),s=(Te.exec(o)||["",""])[1].toLowerCase(),u=ke[s]||ke._default,a.innerHTML=u[1]+ce.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;ce.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<ce.inArray(o,r))i&&i.push(o);else if(l=K(o),a=Se(f.appendChild(o),"script"),l&&Ee(a),n){c=0;while(o=a[c++])Ce.test(o.type||"")&&n.push(o)}return f}var De=/^([^.]*)(?:\.(.+)|)/;function Ne(){return!0}function qe(){return!1}function Le(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Le(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=qe;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return ce().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=ce.guid++)),e.each(function(){ce.event.add(this,t,i,r,n)})}function He(e,r,t){t?(_.set(e,r,!1),ce.event.add(e,r,{namespace:!1,handler:function(e){var t,n=_.get(this,r);if(1&e.isTrigger&&this[r]){if(n)(ce.event.special[r]||{}).delegateType&&e.stopPropagation();else if(n=ae.call(arguments),_.set(this,r,n),this[r](),t=_.get(this,r),_.set(this,r,!1),n!==t)return e.stopImmediatePropagation(),e.preventDefault(),t}else n&&(_.set(this,r,ce.event.trigger(n[0],n.slice(1),this)),e.stopPropagation(),e.isImmediatePropagationStopped=Ne)}})):void 0===_.get(e,r)&&ce.event.add(e,r,Ne)}ce.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=_.get(t);if($(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&ce.find.matchesSelector(J,i),n.guid||(n.guid=ce.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof ce&&ce.event.triggered!==e.type?ce.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(D)||[""]).length;while(l--)d=g=(s=De.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=ce.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=ce.event.special[d]||{},c=ce.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ce.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),ce.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=_.hasData(e)&&_.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(D)||[""]).length;while(l--)if(d=g=(s=De.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=ce.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||ce.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)ce.event.remove(e,d+t[l],n,r,!0);ce.isEmptyObject(u)&&_.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=ce.event.fix(e),l=(_.get(this,"events")||Object.create(null))[u.type]||[],c=ce.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=ce.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((ce.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<ce(i,this).index(l):ce.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(ce.Event.prototype,t,{enumerable:!0,configurable:!0,get:v(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[ce.expando]?e:new ce.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return we.test(t.type)&&t.click&&fe(t,"input")&&He(t,"click",!0),!1},trigger:function(e){var t=this||e;return we.test(t.type)&&t.click&&fe(t,"input")&&He(t,"click"),!0},_default:function(e){var t=e.target;return we.test(t.type)&&t.click&&fe(t,"input")&&_.get(t,"click")||fe(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},ce.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},ce.Event=function(e,t){if(!(this instanceof ce.Event))return new ce.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ne:qe,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&ce.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[ce.expando]=!0},ce.Event.prototype={constructor:ce.Event,isDefaultPrevented:qe,isPropagationStopped:qe,isImmediatePropagationStopped:qe,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ne,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ne,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ne,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},ce.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},ce.event.addProp),ce.each({focus:"focusin",blur:"focusout"},function(r,i){function o(e){if(C.documentMode){var t=_.get(this,"handle"),n=ce.event.fix(e);n.type="focusin"===e.type?"focus":"blur",n.isSimulated=!0,t(e),n.target===n.currentTarget&&t(n)}else ce.event.simulate(i,e.target,ce.event.fix(e))}ce.event.special[r]={setup:function(){var e;if(He(this,r,!0),!C.documentMode)return!1;(e=_.get(this,i))||this.addEventListener(i,o),_.set(this,i,(e||0)+1)},trigger:function(){return He(this,r),!0},teardown:function(){var e;if(!C.documentMode)return!1;(e=_.get(this,i)-1)?_.set(this,i,e):(this.removeEventListener(i,o),_.remove(this,i))},_default:function(e){return _.get(e.target,r)},delegateType:i},ce.event.special[i]={setup:function(){var e=this.ownerDocument||this.document||this,t=C.documentMode?this:e,n=_.get(t,i);n||(C.documentMode?this.addEventListener(i,o):e.addEventListener(r,o,!0)),_.set(t,i,(n||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=C.documentMode?this:e,n=_.get(t,i)-1;n?_.set(t,i,n):(C.documentMode?this.removeEventListener(i,o):e.removeEventListener(r,o,!0),_.remove(t,i))}}}),ce.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){ce.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||ce.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),ce.fn.extend({on:function(e,t,n,r){return Le(this,e,t,n,r)},one:function(e,t,n,r){return Le(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,ce(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=qe),this.each(function(){ce.event.remove(this,e,n,t)})}});var Oe=/<script|<style|<link/i,Pe=/checked\s*(?:[^=]|=\s*.checked.)/i,Me=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function Re(e,t){return fe(e,"table")&&fe(11!==t.nodeType?t:t.firstChild,"tr")&&ce(e).children("tbody")[0]||e}function Ie(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function We(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Fe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(_.hasData(e)&&(s=_.get(e).events))for(i in _.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)ce.event.add(t,i,s[i][n]);z.hasData(e)&&(o=z.access(e),a=ce.extend({},o),z.set(t,a))}}function $e(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=v(d);if(h||1<f&&"string"==typeof d&&!le.checkClone&&Pe.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),$e(t,r,i,o)});if(f&&(t=(e=Ae(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=ce.map(Se(e,"script"),Ie)).length;c<f;c++)u=e,c!==p&&(u=ce.clone(u,!0,!0),s&&ce.merge(a,Se(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,ce.map(a,We),c=0;c<s;c++)u=a[c],Ce.test(u.type||"")&&!_.access(u,"globalEval")&&ce.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?ce._evalUrl&&!u.noModule&&ce._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):m(u.textContent.replace(Me,""),u,l))}return n}function Be(e,t,n){for(var r,i=t?ce.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||ce.cleanData(Se(r)),r.parentNode&&(n&&K(r)&&Ee(Se(r,"script")),r.parentNode.removeChild(r));return e}ce.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=K(e);if(!(le.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ce.isXMLDoc(e)))for(a=Se(c),r=0,i=(o=Se(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&we.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||Se(e),a=a||Se(c),r=0,i=o.length;r<i;r++)Fe(o[r],a[r]);else Fe(e,c);return 0<(a=Se(c,"script")).length&&Ee(a,!f&&Se(e,"script")),c},cleanData:function(e){for(var t,n,r,i=ce.event.special,o=0;void 0!==(n=e[o]);o++)if($(n)){if(t=n[_.expando]){if(t.events)for(r in t.events)i[r]?ce.event.remove(n,r):ce.removeEvent(n,r,t.handle);n[_.expando]=void 0}n[z.expando]&&(n[z.expando]=void 0)}}}),ce.fn.extend({detach:function(e){return Be(this,e,!0)},remove:function(e){return Be(this,e)},text:function(e){return M(this,function(e){return void 0===e?ce.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return $e(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Re(this,e).appendChild(e)})},prepend:function(){return $e(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Re(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return $e(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return $e(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(ce.cleanData(Se(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ce.clone(this,e,t)})},html:function(e){return M(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Oe.test(e)&&!ke[(Te.exec(e)||["",""])[1].toLowerCase()]){e=ce.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(ce.cleanData(Se(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return $e(this,arguments,function(e){var t=this.parentNode;ce.inArray(this,n)<0&&(ce.cleanData(Se(this)),t&&t.replaceChild(e,this))},n)}}),ce.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){ce.fn[e]=function(e){for(var t,n=[],r=ce(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),ce(r[o])[a](t),s.apply(n,t.get());return this.pushStack(n)}});var _e=new RegExp("^("+G+")(?!px)[a-z%]+$","i"),ze=/^--/,Xe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=ie),t.getComputedStyle(e)},Ue=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ve=new RegExp(Q.join("|"),"i");function Ge(e,t,n){var r,i,o,a,s=ze.test(t),u=e.style;return(n=n||Xe(e))&&(a=n.getPropertyValue(t)||n[t],s&&a&&(a=a.replace(ve,"$1")||void 0),""!==a||K(e)||(a=ce.style(e,t)),!le.pixelBoxStyles()&&_e.test(a)&&Ve.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=n.width,u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==a?a+"":a}function Ye(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",J.appendChild(u).appendChild(l);var e=ie.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),J.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=C.createElement("div"),l=C.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",le.clearCloneStyle="content-box"===l.style.backgroundClip,ce.extend(le,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=C.createElement("table"),t=C.createElement("tr"),n=C.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="box-sizing:content-box;border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",J.appendChild(e).appendChild(t).appendChild(n),r=ie.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,J.removeChild(e)),a}}))}();var Qe=["Webkit","Moz","ms"],Je=C.createElement("div").style,Ke={};function Ze(e){var t=ce.cssProps[e]||Ke[e];return t||(e in Je?e:Ke[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Qe.length;while(n--)if((e=Qe[n]+t)in Je)return e}(e)||e)}var et=/^(none|table(?!-c[ea]).+)/,tt={position:"absolute",visibility:"hidden",display:"block"},nt={letterSpacing:"0",fontWeight:"400"};function rt(e,t,n){var r=Y.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function it(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0,l=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(l+=ce.css(e,n+Q[a],!0,i)),r?("content"===n&&(u-=ce.css(e,"padding"+Q[a],!0,i)),"margin"!==n&&(u-=ce.css(e,"border"+Q[a]+"Width",!0,i))):(u+=ce.css(e,"padding"+Q[a],!0,i),"padding"!==n?u+=ce.css(e,"border"+Q[a]+"Width",!0,i):s+=ce.css(e,"border"+Q[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u+l}function ot(e,t,n){var r=Xe(e),i=(!le.boxSizingReliable()||n)&&"border-box"===ce.css(e,"boxSizing",!1,r),o=i,a=Ge(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(_e.test(a)){if(!n)return a;a="auto"}return(!le.boxSizingReliable()&&i||!le.reliableTrDimensions()&&fe(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===ce.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===ce.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+it(e,t,n||(i?"border":"content"),o,r,a)+"px"}function at(e,t,n,r,i){return new at.prototype.init(e,t,n,r,i)}ce.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Ge(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=F(t),u=ze.test(t),l=e.style;if(u||(t=Ze(s)),a=ce.cssHooks[t]||ce.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=Y.exec(n))&&i[1]&&(n=te(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(ce.cssNumber[s]?"":"px")),le.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=F(t);return ze.test(t)||(t=Ze(s)),(a=ce.cssHooks[t]||ce.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Ge(e,t,r)),"normal"===i&&t in nt&&(i=nt[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),ce.each(["height","width"],function(e,u){ce.cssHooks[u]={get:function(e,t,n){if(t)return!et.test(ce.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?ot(e,u,n):Ue(e,tt,function(){return ot(e,u,n)})},set:function(e,t,n){var r,i=Xe(e),o=!le.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===ce.css(e,"boxSizing",!1,i),s=n?it(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-it(e,u,"border",!1,i)-.5)),s&&(r=Y.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=ce.css(e,u)),rt(0,t,s)}}}),ce.cssHooks.marginLeft=Ye(le.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Ge(e,"marginLeft"))||e.getBoundingClientRect().left-Ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),ce.each({margin:"",padding:"",border:"Width"},function(i,o){ce.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+Q[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(ce.cssHooks[i+o].set=rt)}),ce.fn.extend({css:function(e,t){return M(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Xe(e),i=t.length;a<i;a++)o[t[a]]=ce.css(e,t[a],!1,r);return o}return void 0!==n?ce.style(e,t,n):ce.css(e,t)},e,t,1<arguments.length)}}),((ce.Tween=at).prototype={constructor:at,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||ce.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ce.cssNumber[n]?"":"px")},cur:function(){var e=at.propHooks[this.prop];return e&&e.get?e.get(this):at.propHooks._default.get(this)},run:function(e){var t,n=at.propHooks[this.prop];return this.options.duration?this.pos=t=ce.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):at.propHooks._default.set(this),this}}).init.prototype=at.prototype,(at.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=ce.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){ce.fx.step[e.prop]?ce.fx.step[e.prop](e):1!==e.elem.nodeType||!ce.cssHooks[e.prop]&&null==e.elem.style[Ze(e.prop)]?e.elem[e.prop]=e.now:ce.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=at.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ce.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},ce.fx=at.prototype.init,ce.fx.step={};var st,ut,lt,ct,ft=/^(?:toggle|show|hide)$/,pt=/queueHooks$/;function dt(){ut&&(!1===C.hidden&&ie.requestAnimationFrame?ie.requestAnimationFrame(dt):ie.setTimeout(dt,ce.fx.interval),ce.fx.tick())}function ht(){return ie.setTimeout(function(){st=void 0}),st=Date.now()}function gt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=Q[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function vt(e,t,n){for(var r,i=(yt.tweeners[t]||[]).concat(yt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function yt(o,e,t){var n,a,r=0,i=yt.prefilters.length,s=ce.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=st||ht(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:ce.extend({},e),opts:ce.extend(!0,{specialEasing:{},easing:ce.easing._default},t),originalProperties:e,originalOptions:t,startTime:st||ht(),duration:t.duration,tweens:[],createTween:function(e,t){var n=ce.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=F(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=ce.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=yt.prefilters[r].call(l,o,c,l.opts))return v(n.stop)&&(ce._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return ce.map(c,vt,l),v(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),ce.fx.timer(ce.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}ce.Animation=ce.extend(yt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return te(n.elem,e,Y.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(D);for(var n,r=0,i=e.length;r<i;r++)n=e[r],yt.tweeners[n]=yt.tweeners[n]||[],yt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ee(e),v=_.get(e,"fxshow");for(r in n.queue||(null==(a=ce._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,ce.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ft.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||ce.style(e,r)}if((u=!ce.isEmptyObject(t))||!ce.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=_.get(e,"display")),"none"===(c=ce.css(e,"display"))&&(l?c=l:(re([e],!0),l=e.style.display||l,c=ce.css(e,"display"),re([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===ce.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=_.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&re([e],!0),p.done(function(){for(r in g||re([e]),_.remove(e,"fxshow"),d)ce.style(e,r,d[r])})),u=vt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?yt.prefilters.unshift(e):yt.prefilters.push(e)}}),ce.speed=function(e,t,n){var r=e&&"object"==typeof e?ce.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t};return ce.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in ce.fx.speeds?r.duration=ce.fx.speeds[r.duration]:r.duration=ce.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){v(r.old)&&r.old.call(this),r.queue&&ce.dequeue(this,r.queue)},r},ce.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ee).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=ce.isEmptyObject(t),o=ce.speed(e,n,r),a=function(){var e=yt(this,ce.extend({},t),o);(i||_.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=ce.timers,r=_.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&pt.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||ce.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=_.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=ce.timers,o=n?n.length:0;for(t.finish=!0,ce.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),ce.each(["toggle","show","hide"],function(e,r){var i=ce.fn[r];ce.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(gt(r,!0),e,t,n)}}),ce.each({slideDown:gt("show"),slideUp:gt("hide"),slideToggle:gt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){ce.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),ce.timers=[],ce.fx.tick=function(){var e,t=0,n=ce.timers;for(st=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||ce.fx.stop(),st=void 0},ce.fx.timer=function(e){ce.timers.push(e),ce.fx.start()},ce.fx.interval=13,ce.fx.start=function(){ut||(ut=!0,dt())},ce.fx.stop=function(){ut=null},ce.fx.speeds={slow:600,fast:200,_default:400},ce.fn.delay=function(r,e){return r=ce.fx&&ce.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=ie.setTimeout(e,r);t.stop=function(){ie.clearTimeout(n)}})},lt=C.createElement("input"),ct=C.createElement("select").appendChild(C.createElement("option")),lt.type="checkbox",le.checkOn=""!==lt.value,le.optSelected=ct.selected,(lt=C.createElement("input")).value="t",lt.type="radio",le.radioValue="t"===lt.value;var mt,xt=ce.expr.attrHandle;ce.fn.extend({attr:function(e,t){return M(this,ce.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){ce.removeAttr(this,e)})}}),ce.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?ce.prop(e,t,n):(1===o&&ce.isXMLDoc(e)||(i=ce.attrHooks[t.toLowerCase()]||(ce.expr.match.bool.test(t)?mt:void 0)),void 0!==n?null===n?void ce.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=ce.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!le.radioValue&&"radio"===t&&fe(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(D);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),mt={set:function(e,t,n){return!1===t?ce.removeAttr(e,n):e.setAttribute(n,n),n}},ce.each(ce.expr.match.bool.source.match(/\w+/g),function(e,t){var a=xt[t]||ce.find.attr;xt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=xt[o],xt[o]=r,r=null!=a(e,t,n)?o:null,xt[o]=i),r}});var bt=/^(?:input|select|textarea|button)$/i,wt=/^(?:a|area)$/i;function Tt(e){return(e.match(D)||[]).join(" ")}function Ct(e){return e.getAttribute&&e.getAttribute("class")||""}function kt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(D)||[]}ce.fn.extend({prop:function(e,t){return M(this,ce.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[ce.propFix[e]||e]})}}),ce.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&ce.isXMLDoc(e)||(t=ce.propFix[t]||t,i=ce.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=ce.find.attr(e,"tabindex");return t?parseInt(t,10):bt.test(e.nodeName)||wt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),le.optSelected||(ce.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),ce.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ce.propFix[this.toLowerCase()]=this}),ce.fn.extend({addClass:function(t){var e,n,r,i,o,a;return v(t)?this.each(function(e){ce(this).addClass(t.call(this,e,Ct(this)))}):(e=kt(t)).length?this.each(function(){if(r=Ct(this),n=1===this.nodeType&&" "+Tt(r)+" "){for(o=0;o<e.length;o++)i=e[o],n.indexOf(" "+i+" ")<0&&(n+=i+" ");a=Tt(n),r!==a&&this.setAttribute("class",a)}}):this},removeClass:function(t){var e,n,r,i,o,a;return v(t)?this.each(function(e){ce(this).removeClass(t.call(this,e,Ct(this)))}):arguments.length?(e=kt(t)).length?this.each(function(){if(r=Ct(this),n=1===this.nodeType&&" "+Tt(r)+" "){for(o=0;o<e.length;o++){i=e[o];while(-1<n.indexOf(" "+i+" "))n=n.replace(" "+i+" "," ")}a=Tt(n),r!==a&&this.setAttribute("class",a)}}):this:this.attr("class","")},toggleClass:function(t,n){var e,r,i,o,a=typeof t,s="string"===a||Array.isArray(t);return v(t)?this.each(function(e){ce(this).toggleClass(t.call(this,e,Ct(this),n),n)}):"boolean"==typeof n&&s?n?this.addClass(t):this.removeClass(t):(e=kt(t),this.each(function(){if(s)for(o=ce(this),i=0;i<e.length;i++)r=e[i],o.hasClass(r)?o.removeClass(r):o.addClass(r);else void 0!==t&&"boolean"!==a||((r=Ct(this))&&_.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===t?"":_.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+Tt(Ct(n))+" ").indexOf(t))return!0;return!1}});var St=/\r/g;ce.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=v(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,ce(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=ce.map(t,function(e){return null==e?"":e+""})),(r=ce.valHooks[this.type]||ce.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=ce.valHooks[t.type]||ce.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(St,""):null==e?"":e:void 0}}),ce.extend({valHooks:{option:{get:function(e){var t=ce.find.attr(e,"value");return null!=t?t:Tt(ce.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!fe(n.parentNode,"optgroup"))){if(t=ce(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=ce.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<ce.inArray(ce.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),ce.each(["radio","checkbox"],function(){ce.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<ce.inArray(ce(e).val(),t)}},le.checkOn||(ce.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Et=ie.location,jt={guid:Date.now()},At=/\?/;ce.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new ie.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||ce.error("Invalid XML: "+(n?ce.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Dt=/^(?:focusinfocus|focusoutblur)$/,Nt=function(e){e.stopPropagation()};ce.extend(ce.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||C],d=ue.call(e,"type")?e.type:e,h=ue.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||C,3!==n.nodeType&&8!==n.nodeType&&!Dt.test(d+ce.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[ce.expando]?e:new ce.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:ce.makeArray(t,[e]),c=ce.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!y(n)){for(s=c.delegateType||d,Dt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||C)&&p.push(a.defaultView||a.parentWindow||ie)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(_.get(o,"events")||Object.create(null))[e.type]&&_.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&$(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!$(n)||u&&v(n[d])&&!y(n)&&((a=n[u])&&(n[u]=null),ce.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Nt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Nt),ce.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=ce.extend(new ce.Event,n,{type:e,isSimulated:!0});ce.event.trigger(r,null,t)}}),ce.fn.extend({trigger:function(e,t){return this.each(function(){ce.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ce.event.trigger(e,t,n,!0)}});var qt=/\[\]$/,Lt=/\r?\n/g,Ht=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;function Pt(n,e,r,i){var t;if(Array.isArray(e))ce.each(e,function(e,t){r||qt.test(n)?i(n,t):Pt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==x(e))i(n,e);else for(t in e)Pt(n+"["+t+"]",e[t],r,i)}ce.param=function(e,t){var n,r=[],i=function(e,t){var n=v(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!ce.isPlainObject(e))ce.each(e,function(){i(this.name,this.value)});else for(n in e)Pt(n,e[n],t,i);return r.join("&")},ce.fn.extend({serialize:function(){return ce.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=ce.prop(this,"elements");return e?ce.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!ce(this).is(":disabled")&&Ot.test(this.nodeName)&&!Ht.test(e)&&(this.checked||!we.test(e))}).map(function(e,t){var n=ce(this).val();return null==n?null:Array.isArray(n)?ce.map(n,function(e){return{name:t.name,value:e.replace(Lt,"\r\n")}}):{name:t.name,value:n.replace(Lt,"\r\n")}}).get()}});var Mt=/%20/g,Rt=/#.*$/,It=/([?&])_=[^&]*/,Wt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ft=/^(?:GET|HEAD)$/,$t=/^\/\//,Bt={},_t={},zt="*/".concat("*"),Xt=C.createElement("a");function Ut(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(D)||[];if(v(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Vt(t,i,o,a){var s={},u=t===_t;function l(e){var r;return s[e]=!0,ce.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Gt(e,t){var n,r,i=ce.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&ce.extend(!0,e,r),e}Xt.href=Et.href,ce.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":zt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":ce.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Gt(Gt(e,ce.ajaxSettings),t):Gt(ce.ajaxSettings,e)},ajaxPrefilter:Ut(Bt),ajaxTransport:Ut(_t),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=ce.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?ce(y):ce.event,x=ce.Deferred(),b=ce.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Wt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace($t,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(D)||[""],null==v.crossDomain){r=C.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Xt.protocol+"//"+Xt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=ce.param(v.data,v.traditional)),Vt(Bt,v,t,T),h)return T;for(i in(g=ce.event&&v.global)&&0==ce.active++&&ce.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Ft.test(v.type),f=v.url.replace(Rt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Mt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(At.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(It,"$1"),o=(At.test(f)?"&":"?")+"_="+jt.guid+++o),v.url=f+o),v.ifModified&&(ce.lastModified[f]&&T.setRequestHeader("If-Modified-Since",ce.lastModified[f]),ce.etag[f]&&T.setRequestHeader("If-None-Match",ce.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+zt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Vt(_t,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=ie.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&ie.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<ce.inArray("script",v.dataTypes)&&ce.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(ce.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(ce.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--ce.active||ce.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return ce.get(e,t,n,"json")},getScript:function(e,t){return ce.get(e,void 0,t,"script")}}),ce.each(["get","post"],function(e,i){ce[i]=function(e,t,n,r){return v(t)&&(r=r||n,n=t,t=void 0),ce.ajax(ce.extend({url:e,type:i,dataType:r,data:t,success:n},ce.isPlainObject(e)&&e))}}),ce.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),ce._evalUrl=function(e,t,n){return ce.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){ce.globalEval(e,t,n)}})},ce.fn.extend({wrapAll:function(e){var t;return this[0]&&(v(e)&&(e=e.call(this[0])),t=ce(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return v(n)?this.each(function(e){ce(this).wrapInner(n.call(this,e))}):this.each(function(){var e=ce(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=v(t);return this.each(function(e){ce(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){ce(this).replaceWith(this.childNodes)}),this}}),ce.expr.pseudos.hidden=function(e){return!ce.expr.pseudos.visible(e)},ce.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},ce.ajaxSettings.xhr=function(){try{return new ie.XMLHttpRequest}catch(e){}};var Yt={0:200,1223:204},Qt=ce.ajaxSettings.xhr();le.cors=!!Qt&&"withCredentials"in Qt,le.ajax=Qt=!!Qt,ce.ajaxTransport(function(i){var o,a;if(le.cors||Qt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Yt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&ie.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),ce.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),ce.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return ce.globalEval(e),e}}}),ce.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),ce.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=ce("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),C.head.appendChild(r[0])},abort:function(){i&&i()}}});var Jt,Kt=[],Zt=/(=)\?(?=&|$)|\?\?/;ce.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Kt.pop()||ce.expando+"_"+jt.guid++;return this[e]=!0,e}}),ce.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Zt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Zt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=v(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Zt,"$1"+r):!1!==e.jsonp&&(e.url+=(At.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||ce.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=ie[r],ie[r]=function(){o=arguments},n.always(function(){void 0===i?ce(ie).removeProp(r):ie[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Kt.push(r)),o&&v(i)&&i(o[0]),o=i=void 0}),"script"}),le.createHTMLDocument=((Jt=C.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Jt.childNodes.length),ce.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(le.createHTMLDocument?((r=(t=C.implementation.createHTMLDocument("")).createElement("base")).href=C.location.href,t.head.appendChild(r)):t=C),o=!n&&[],(i=w.exec(e))?[t.createElement(i[1])]:(i=Ae([e],t,o),o&&o.length&&ce(o).remove(),ce.merge([],i.childNodes)));var r,i,o},ce.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=Tt(e.slice(s)),e=e.slice(0,s)),v(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&ce.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?ce("<div>").append(ce.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},ce.expr.pseudos.animated=function(t){return ce.grep(ce.timers,function(e){return t===e.elem}).length},ce.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=ce.css(e,"position"),c=ce(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=ce.css(e,"top"),u=ce.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),v(t)&&(t=t.call(e,n,ce.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},ce.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){ce.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===ce.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===ce.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=ce(e).offset()).top+=ce.css(e,"borderTopWidth",!0),i.left+=ce.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-ce.css(r,"marginTop",!0),left:t.left-i.left-ce.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===ce.css(e,"position"))e=e.offsetParent;return e||J})}}),ce.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;ce.fn[t]=function(e){return M(this,function(e,t,n){var r;if(y(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),ce.each(["top","left"],function(e,n){ce.cssHooks[n]=Ye(le.pixelPosition,function(e,t){if(t)return t=Ge(e,n),_e.test(t)?ce(e).position()[n]+"px":t})}),ce.each({Height:"height",Width:"width"},function(a,s){ce.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){ce.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return M(this,function(e,t,n){var r;return y(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?ce.css(e,t,i):ce.style(e,t,n,i)},s,n?e:void 0,n)}})}),ce.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ce.fn[t]=function(e){return this.on(t,e)}}),ce.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)}}),ce.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){ce.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var en=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;ce.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),v(e))return r=ae.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(ae.call(arguments)))}).guid=e.guid=e.guid||ce.guid++,i},ce.holdReady=function(e){e?ce.readyWait++:ce.ready(!0)},ce.isArray=Array.isArray,ce.parseJSON=JSON.parse,ce.nodeName=fe,ce.isFunction=v,ce.isWindow=y,ce.camelCase=F,ce.type=x,ce.now=Date.now,ce.isNumeric=function(e){var t=ce.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},ce.trim=function(e){return null==e?"":(e+"").replace(en,"$1")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return ce});var tn=ie.jQuery,nn=ie.$;return ce.noConflict=function(e){return ie.$===ce&&(ie.$=nn),e&&ie.jQuery===ce&&(ie.jQuery=tn),ce},"undefined"==typeof e&&(ie.jQuery=ie.$=ce),ce});
/* ==== INLINE-DEP-END:jquery ==== */

var __gptjq = (typeof window !== 'undefined') ? window.jQuery : undefined;
if (typeof window !== 'undefined') { window.jQuery = __pageJQ; window.$ = __pageDollar; }

/* ==== INLINE-DEP-BEGIN:typr ==== */
/**
 * Combined by jsDelivr.
 * Original files:
 * - /gh/photopea/Typr.js@15aa12ffa6cf39e8788562ea4af65b42317375fb/src/Typr.min.js
 * - /gh/photopea/Typr.js@f4fcdeb8014edc75ab7296bd85ac9cde8cb30489/src/Typr.U.min.js
 * - /npm/blueimp-md5@2.19.0/js/md5.min.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /gh/photopea/Typr.js@15aa12ffa6cf39e8788562ea4af65b42317375fb/src/Typr.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var Typr={parse:function(r){var e=function(r,e,a,t){Typr.B;var n=Typr.T,o={cmap:n.cmap,head:n.head,hhea:n.hhea,maxp:n.maxp,hmtx:n.hmtx,name:n.name,"OS/2":n.OS2,post:n.post,loca:n.loca,kern:n.kern,glyf:n.glyf,"CFF ":n.CFF,"SVG ":n.SVG},i={_data:r,_index:e,_offset:a};for(var s in o){var d=Typr.findTable(r,s,a);if(d){var u=d[0],h=t[u];null==h&&(h=o[s].parseTab(r,u,d[1],i)),i[s]=t[u]=h}}return i},a=Typr.B,t=new Uint8Array(r),n={};if("ttcf"==a.readASCII(t,0,4)){var o=4;a.readUshort(t,o);o+=2;a.readUshort(t,o);o+=2;var i=a.readUint(t,o);o+=4;for(var s=[],d=0;d<i;d++){var u=a.readUint(t,o);o+=4,s.push(e(t,d,u,n))}return s}return[e(t,0,0,n)]},findTable:function(r,e,a){for(var t=Typr.B,n=t.readUshort(r,a+4),o=a+12,i=0;i<n;i++){var s=t.readASCII(r,o,4),d=(t.readUint(r,o+4),t.readUint(r,o+8)),u=t.readUint(r,o+12);if(s==e)return[d,u];o+=16}return null},T:{}};Typr.B={readFixed:function(r,e){return(r[e]<<8|r[e+1])+(r[e+2]<<8|r[e+3])/65540},readF2dot14:function(r,e){return Typr.B.readShort(r,e)/16384},readInt:function(r,e){var a=Typr.B.t.uint8;return a[0]=r[e+3],a[1]=r[e+2],a[2]=r[e+1],a[3]=r[e],Typr.B.t.int32[0]},readInt8:function(r,e){return Typr.B.t.uint8[0]=r[e],Typr.B.t.int8[0]},readShort:function(r,e){var a=Typr.B.t.uint8;return a[1]=r[e],a[0]=r[e+1],Typr.B.t.int16[0]},readUshort:function(r,e){return r[e]<<8|r[e+1]},writeUshort:function(r,e,a){r[e]=a>>8&255,r[e+1]=255&a},readUshorts:function(r,e,a){for(var t=[],n=0;n<a;n++){var o=Typr.B.readUshort(r,e+2*n);t.push(o)}return t},readUint:function(r,e){var a=Typr.B.t.uint8;return a[3]=r[e],a[2]=r[e+1],a[1]=r[e+2],a[0]=r[e+3],Typr.B.t.uint32[0]},writeUint:function(r,e,a){r[e]=a>>24&255,r[e+1]=a>>16&255,r[e+2]=a>>8&255,r[e+3]=255&a},readUint64:function(r,e){return 4294967296*Typr.B.readUint(r,e)+Typr.B.readUint(r,e+4)},readASCII:function(r,e,a){for(var t="",n=0;n<a;n++)t+=String.fromCharCode(r[e+n]);return t},writeASCII:function(r,e,a){for(var t=0;t<a.length;t++)r[e+t]=a.charCodeAt(t)},readUnicode:function(r,e,a){for(var t="",n=0;n<a;n++){var o=r[e++]<<8|r[e++];t+=String.fromCharCode(o)}return t},_tdec:window.TextDecoder?new window.TextDecoder:null,readUTF8:function(r,e,a){var t=Typr.B._tdec;return t&&0==e&&a==r.length?t.decode(r):Typr.B.readASCII(r,e,a)},readBytes:function(r,e,a){for(var t=[],n=0;n<a;n++)t.push(r[e+n]);return t},readASCIIArray:function(r,e,a){for(var t=[],n=0;n<a;n++)t.push(String.fromCharCode(r[e+n]));return t},t:function(){var r=new ArrayBuffer(8);return{buff:r,int8:new Int8Array(r),uint8:new Uint8Array(r),int16:new Int16Array(r),uint16:new Uint16Array(r),int32:new Int32Array(r),uint32:new Uint32Array(r)}}()},Typr.T.CFF={parseTab:function(r,e,a){var t=Typr.B,n=Typr.T.CFF;(r=new Uint8Array(r.buffer,e,a))[e=0],r[++e],r[++e],r[++e];e++;var o=[];e=n.readIndex(r,e,o);for(var i=[],s=0;s<o.length-1;s++)i.push(t.readASCII(r,e+o[s],o[s+1]-o[s]));e+=o[o.length-1];var d=[];e=n.readIndex(r,e,d);var u=[];for(s=0;s<d.length-1;s++)u.push(n.readDict(r,e+d[s],e+d[s+1]));e+=d[d.length-1];var h=u[0],p=[];e=n.readIndex(r,e,p);var f=[];for(s=0;s<p.length-1;s++)f.push(t.readASCII(r,e+p[s],p[s+1]-p[s]));if(e+=p[p.length-1],n.readSubrs(r,e,h),h.CharStrings&&(h.CharStrings=n.readBytes(r,h.CharStrings)),h.ROS){e=h.FDArray;var l=[];e=n.readIndex(r,e,l),h.FDArray=[];for(s=0;s<l.length-1;s++){var v=n.readDict(r,e+l[s],e+l[s+1]);n._readFDict(r,v,f),h.FDArray.push(v)}e+=l[l.length-1],e=h.FDSelect,h.FDSelect=[];var y=r[e];if(e++,3!=y)throw y;var c=t.readUshort(r,e);e+=2;for(s=0;s<c+1;s++)h.FDSelect.push(t.readUshort(r,e),r[e+2]),e+=3}return h.charset&&(h.charset=n.readCharset(r,h.charset,h.CharStrings.length)),n._readFDict(r,h,f),h},_readFDict:function(r,e,a){var t,n=Typr.T.CFF;for(var o in e.Private&&(t=e.Private[1],e.Private=n.readDict(r,t,t+e.Private[0]),e.Private.Subrs&&n.readSubrs(r,t+e.Private.Subrs,e.Private)),e)-1!=["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)&&(e[o]=a[e[o]-426+35])},readSubrs:function(r,e,a){a.Subrs=Typr.T.CFF.readBytes(r,e);var t,n=a.Subrs.length+1;t=n<1240?107:n<33900?1131:32768,a.Bias=t},readBytes:function(r,e){Typr.B;var a=[];e=Typr.T.CFF.readIndex(r,e,a);for(var t=[],n=a.length-1,o=r.byteOffset+e,i=0;i<n;i++){var s=a[i];t.push(new Uint8Array(r.buffer,o+s,a[i+1]-s))}return t},tableSE:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],glyphByUnicode:function(r,e){for(var a=0;a<r.charset.length;a++)if(r.charset[a]==e)return a;return-1},glyphBySE:function(r,e){return e<0||e>255?-1:Typr.T.CFF.glyphByUnicode(r,Typr.T.CFF.tableSE[e])},readCharset:function(r,e,a){var t=Typr.B,n=[".notdef"],o=r[e];if(e++,0==o)for(var i=0;i<a;i++){var s=t.readUshort(r,e);e+=2,n.push(s)}else{if(1!=o&&2!=o)throw"error: format: "+o;for(;n.length<a;){s=t.readUshort(r,e);e+=2;var d=0;1==o?(d=r[e],e++):(d=t.readUshort(r,e),e+=2);for(i=0;i<=d;i++)n.push(s),s++}}return n},readIndex:function(r,e,a){var t=Typr.B,n=t.readUshort(r,e)+1,o=r[e+=2];if(e++,1==o)for(var i=0;i<n;i++)a.push(r[e+i]);else if(2==o)for(i=0;i<n;i++)a.push(t.readUshort(r,e+2*i));else if(3==o)for(i=0;i<n;i++)a.push(16777215&t.readUint(r,e+3*i-1));else if(4==o)for(i=0;i<n;i++)a.push(t.readUint(r,e+4*i));else if(1!=n)throw"unsupported offset size: "+o+", count: "+n;return(e+=n*o)-1},getCharString:function(r,e,a){var t=Typr.B,n=r[e],o=r[e+1],i=(r[e+2],r[e+3],r[e+4],1),s=null,d=null;n<=20&&(s=n,i=1),12==n&&(s=100*n+o,i=2),21<=n&&n<=27&&(s=n,i=1),28==n&&(d=t.readShort(r,e+1),i=3),29<=n&&n<=31&&(s=n,i=1),32<=n&&n<=246&&(d=n-139,i=1),247<=n&&n<=250&&(d=256*(n-247)+o+108,i=2),251<=n&&n<=254&&(d=256*-(n-251)-o-108,i=2),255==n&&(d=t.readInt(r,e+1)/65535,i=5),a.val=null!=d?d:"o"+s,a.size=i},readCharString:function(r,e,a){for(var t=e+a,n=Typr.B,o=[];e<t;){var i=r[e],s=r[e+1],d=(r[e+2],r[e+3],r[e+4],1),u=null,h=null;i<=20&&(u=i,d=1),12==i&&(u=100*i+s,d=2),19!=i&&20!=i||(u=i,d=2),21<=i&&i<=27&&(u=i,d=1),28==i&&(h=n.readShort(r,e+1),d=3),29<=i&&i<=31&&(u=i,d=1),32<=i&&i<=246&&(h=i-139,d=1),247<=i&&i<=250&&(h=256*(i-247)+s+108,d=2),251<=i&&i<=254&&(h=256*-(i-251)-s-108,d=2),255==i&&(h=n.readInt(r,e+1)/65535,d=5),o.push(null!=h?h:"o"+u),e+=d}return o},readDict:function(r,e,a){for(var t=Typr.B,n={},o=[];e<a;){var i=r[e],s=r[e+1],d=(r[e+2],r[e+3],r[e+4],1),u=null,h=null;if(28==i&&(h=t.readShort(r,e+1),d=3),29==i&&(h=t.readInt(r,e+1),d=5),32<=i&&i<=246&&(h=i-139,d=1),247<=i&&i<=250&&(h=256*(i-247)+s+108,d=2),251<=i&&i<=254&&(h=256*-(i-251)-s-108,d=2),255==i)throw h=t.readInt(r,e+1)/65535,d=5,"unknown number";if(30==i){var p=[];for(d=1;;){var f=r[e+d];d++;var l=f>>4,v=15&f;if(15!=l&&p.push(l),15!=v&&p.push(v),15==v)break}for(var y="",c=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],S=0;S<p.length;S++)y+=c[p[S]];h=parseFloat(y)}if(i<=21)if(u=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][i],d=1,12==i)u=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold","","","LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend","","","","","","","ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][s],d=2;null!=u?(n[u]=1==o.length?o[0]:o,o=[]):o.push(h),e+=d}return n}},Typr.T.cmap={parseTab:function(r,e,a){var t={tables:[],ids:{},off:e};r=new Uint8Array(r.buffer,e,a);e=0;var n=Typr.B,o=n.readUshort,i=Typr.T.cmap,s=(o(r,e),o(r,e+=2));e+=2;for(var d=[],u=0;u<s;u++){var h=o(r,e),p=o(r,e+=2);e+=2;var f=n.readUint(r,e);e+=4;var l="p"+h+"e"+p,v=d.indexOf(f);if(-1==v){v=t.tables.length;var y={};d.push(f);var c=y.format=o(r,f);0==c?y=i.parse0(r,f,y):4==c?y=i.parse4(r,f,y):6==c?y=i.parse6(r,f,y):12==c&&(y=i.parse12(r,f,y)),t.tables.push(y)}if(null!=t.ids[l])throw"multiple tables for one platform+encoding";t.ids[l]=v}return t},parse0:function(r,e,a){var t=Typr.B;e+=2;var n=t.readUshort(r,e);e+=2;t.readUshort(r,e);e+=2,a.map=[];for(var o=0;o<n-6;o++)a.map.push(r[e+o]);return a},parse4:function(r,e,a){var t=Typr.B,n=t.readUshort,o=t.readUshorts,i=e,s=n(r,e+=2),d=(n(r,e+=2),n(r,e+=2));e+=2;var u=d>>>1;a.searchRange=n(r,e),e+=2,a.entrySelector=n(r,e),e+=2,a.rangeShift=n(r,e),e+=2,a.endCount=o(r,e,u),e+=2*u,e+=2,a.startCount=o(r,e,u),e+=2*u,a.idDelta=[];for(var h=0;h<u;h++)a.idDelta.push(t.readShort(r,e)),e+=2;return a.idRangeOffset=o(r,e,u),e+=2*u,a.glyphIdArray=o(r,e,i+s-e>>>1),a},parse6:function(r,e,a){var t=Typr.B;e+=2;t.readUshort(r,e);e+=2;t.readUshort(r,e);e+=2,a.firstCode=t.readUshort(r,e),e+=2;var n=t.readUshort(r,e);e+=2,a.glyphIdArray=[];for(var o=0;o<n;o++)a.glyphIdArray.push(t.readUshort(r,e)),e+=2;return a},parse12:function(r,e,a){var t=Typr.B.readUint,n=(t(r,e+=4),t(r,e+=4),3*t(r,e+=4));e+=4;for(var o=a.groups=new Uint32Array(n),i=0;i<n;i+=3)o[i]=t(r,e+(i<<2)),o[i+1]=t(r,e+(i<<2)+4),o[i+2]=t(r,e+(i<<2)+8);return a}},Typr.T.glyf={parseTab:function(r,e,a,t){for(var n=[],o=t.maxp.numGlyphs,i=0;i<o;i++)n.push(null);return n},_parseGlyf:function(r,e){var a=Typr.B,t=r._data,n=r.loca;if(n[e]==n[e+1])return null;var o=Typr.findTable(t,"glyf",r._offset)[0]+n[e],i={};if(i.noc=a.readShort(t,o),o+=2,i.xMin=a.readShort(t,o),o+=2,i.yMin=a.readShort(t,o),o+=2,i.xMax=a.readShort(t,o),o+=2,i.yMax=a.readShort(t,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var s=0;s<i.noc;s++)i.endPts.push(a.readUshort(t,o)),o+=2;var d=a.readUshort(t,o);if(o+=2,t.length-o<d)return null;i.instructions=a.readBytes(t,o,d),o+=d;var u=i.endPts[i.noc-1]+1;i.flags=[];for(s=0;s<u;s++){var h=t[o];if(o++,i.flags.push(h),8&h){var p=t[o];o++;for(var f=0;f<p;f++)i.flags.push(h),s++}}i.xs=[];for(s=0;s<u;s++){var l=!!(2&i.flags[s]),v=!!(16&i.flags[s]);l?(i.xs.push(v?t[o]:-t[o]),o++):v?i.xs.push(0):(i.xs.push(a.readShort(t,o)),o+=2)}i.ys=[];for(s=0;s<u;s++){l=!!(4&i.flags[s]),v=!!(32&i.flags[s]);l?(i.ys.push(v?t[o]:-t[o]),o++):v?i.ys.push(0):(i.ys.push(a.readShort(t,o)),o+=2)}var y=0,c=0;for(s=0;s<u;s++)y+=i.xs[s],c+=i.ys[s],i.xs[s]=y,i.ys[s]=c}else{var S;i.parts=[];do{S=a.readUshort(t,o),o+=2;var T={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(T),T.glyphIndex=a.readUshort(t,o),o+=2,1&S){var U=a.readShort(t,o);o+=2;var g=a.readShort(t,o);o+=2}else{U=a.readInt8(t,o);o++;g=a.readInt8(t,o);o++}2&S?(T.m.tx=U,T.m.ty=g):(T.p1=U,T.p2=g),8&S?(T.m.a=T.m.d=a.readF2dot14(t,o),o+=2):64&S?(T.m.a=a.readF2dot14(t,o),o+=2,T.m.d=a.readF2dot14(t,o),o+=2):128&S&&(T.m.a=a.readF2dot14(t,o),o+=2,T.m.b=a.readF2dot14(t,o),o+=2,T.m.c=a.readF2dot14(t,o),o+=2,T.m.d=a.readF2dot14(t,o),o+=2)}while(32&S);if(256&S){var m=a.readUshort(t,o);o+=2,i.instr=[];for(s=0;s<m;s++)i.instr.push(t[o]),o++}}return i}},Typr.T.head={parseTab:function(r,e,a){var t=Typr.B,n={};t.readFixed(r,e);e+=4,n.fontRevision=t.readFixed(r,e),e+=4;t.readUint(r,e);e+=4;t.readUint(r,e);return e+=4,n.flags=t.readUshort(r,e),e+=2,n.unitsPerEm=t.readUshort(r,e),e+=2,n.created=t.readUint64(r,e),e+=8,n.modified=t.readUint64(r,e),e+=8,n.xMin=t.readShort(r,e),e+=2,n.yMin=t.readShort(r,e),e+=2,n.xMax=t.readShort(r,e),e+=2,n.yMax=t.readShort(r,e),e+=2,n.macStyle=t.readUshort(r,e),e+=2,n.lowestRecPPEM=t.readUshort(r,e),e+=2,n.fontDirectionHint=t.readShort(r,e),e+=2,n.indexToLocFormat=t.readShort(r,e),e+=2,n.glyphDataFormat=t.readShort(r,e),e+=2,n}},Typr.T.hhea={parseTab:function(r,e,a){var t=Typr.B,n={};t.readFixed(r,e);e+=4;for(var o=["ascender","descender","lineGap","advanceWidthMax","minLeftSideBearing","minRightSideBearing","xMaxExtent","caretSlopeRise","caretSlopeRun","caretOffset","res0","res1","res2","res3","metricDataFormat","numberOfHMetrics"],i=0;i<o.length;i++){var s=o[i],d="advanceWidthMax"==s||"numberOfHMetrics"==s?t.readUshort:t.readShort;n[s]=d(r,e+2*i)}return n}},Typr.T.hmtx={parseTab:function(r,e,a,t){for(var n=Typr.B,o=[],i=[],s=t.maxp.numGlyphs,d=t.hhea.numberOfHMetrics,u=0,h=0,p=0;p<d;)u=n.readUshort(r,e+(p<<2)),h=n.readShort(r,e+(p<<2)+2),o.push(u),i.push(h),p++;for(;p<s;)o.push(u),i.push(h),p++;return{aWidth:o,lsBearing:i}}},Typr.T.kern={parseTab:function(r,e,a,t){var n=Typr.B,o=Typr.T.kern;if(1==n.readUshort(r,e))return o.parseV1(r,e,a,t);var i=n.readUshort(r,e+2);e+=4;for(var s={glyph1:[],rval:[]},d=0;d<i;d++){e+=2;a=n.readUshort(r,e);e+=2;var u=n.readUshort(r,e);e+=2;var h=u>>>8;0==(h&=15)&&(e=o.readFormat0(r,e,s))}return s},parseV1:function(r,e,a,t){var n=Typr.B,o=Typr.T.kern,i=(n.readFixed(r,e),n.readUint(r,e+4));e+=8;for(var s={glyph1:[],rval:[]},d=0;d<i;d++){n.readUint(r,e);e+=4;var u=n.readUshort(r,e);e+=2;n.readUshort(r,e);e+=2,0==(255&u)&&(e=o.readFormat0(r,e,s))}return s},readFormat0:function(r,e,a){var t=Typr.B,n=t.readUshort,o=-1,i=n(r,e);n(r,e+2),n(r,e+4),n(r,e+6);e+=8;for(var s=0;s<i;s++){var d=n(r,e),u=n(r,e+=2);e+=2;var h=t.readShort(r,e);e+=2,d!=o&&(a.glyph1.push(d),a.rval.push({glyph2:[],vals:[]}));var p=a.rval[a.rval.length-1];p.glyph2.push(u),p.vals.push(h),o=d}return e}},Typr.T.loca={parseTab:function(r,e,a,t){var n=Typr.B,o=[],i=t.head.indexToLocFormat,s=t.maxp.numGlyphs+1;if(0==i)for(var d=0;d<s;d++)o.push(n.readUshort(r,e+(d<<1))<<1);if(1==i)for(d=0;d<s;d++)o.push(n.readUint(r,e+(d<<2)));return o}},Typr.T.maxp={parseTab:function(r,e,a){var t=Typr.B,n=t.readUshort,o={};t.readUint(r,e);return e+=4,o.numGlyphs=n(r,e),e+=2,o}},Typr.T.name={parseTab:function(r,e,a){var t=Typr.B,n={};t.readUshort(r,e);e+=2;var o=t.readUshort(r,e);e+=2;t.readUshort(r,e);for(var i=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],s=e+=2,d=t.readUshort,u=0;u<o;u++){var h=d(r,e),p=d(r,e+=2),f=d(r,e+=2),l=d(r,e+=2),v=d(r,e+=2),y=d(r,e+=2);e+=2;var c,S=s+12*o+y;0==h||3==h&&0==p?c=t.readUnicode(r,S,v/2):0==p?c=t.readASCII(r,S,v):1==p||3==p||4==p||10==p?c=t.readUnicode(r,S,v/2):1==h?(c=t.readASCII(r,S,v),console.log("reading unknown MAC encoding "+p+" as ASCII")):(console.log("unknown encoding "+p+", platformID: "+h),c=t.readASCII(r,S,v));var T="p"+h+","+f.toString(16);null==n[T]&&(n[T]={}),n[T][i[l]]=c,n[T]._lang=f}var U,g="postScriptName";for(var m in n)if(null!=n[m][g]&&1033==n[m]._lang)return n[m];for(var m in n)if(null!=n[m][g]&&0==n[m]._lang)return n[m];for(var m in n)if(null!=n[m][g]&&3084==n[m]._lang)return n[m];for(var m in n)if(null!=n[m][g])return n[m];for(var m in n){U=n[m];break}return console.log("returning name table with languageID "+U._lang),null==U[g]&&null!=U.ID&&(U[g]=U.ID),U}},Typr.T.OS2={parseTab:function(r,e,a){var t=Typr.B.readUshort(r,e);e+=2;var n=Typr.T.OS2,o={};if(0==t)n.version0(r,e,o);else if(1==t)n.version1(r,e,o);else if(2==t||3==t||4==t)n.version2(r,e,o);else{if(5!=t)throw"unknown OS/2 table version: "+t;n.version5(r,e,o)}return o},version0:function(r,e,a){var t=Typr.B;return a.xAvgCharWidth=t.readShort(r,e),e+=2,a.usWeightClass=t.readUshort(r,e),e+=2,a.usWidthClass=t.readUshort(r,e),e+=2,a.fsType=t.readUshort(r,e),e+=2,a.ySubscriptXSize=t.readShort(r,e),e+=2,a.ySubscriptYSize=t.readShort(r,e),e+=2,a.ySubscriptXOffset=t.readShort(r,e),e+=2,a.ySubscriptYOffset=t.readShort(r,e),e+=2,a.ySuperscriptXSize=t.readShort(r,e),e+=2,a.ySuperscriptYSize=t.readShort(r,e),e+=2,a.ySuperscriptXOffset=t.readShort(r,e),e+=2,a.ySuperscriptYOffset=t.readShort(r,e),e+=2,a.yStrikeoutSize=t.readShort(r,e),e+=2,a.yStrikeoutPosition=t.readShort(r,e),e+=2,a.sFamilyClass=t.readShort(r,e),e+=2,a.panose=t.readBytes(r,e,10),e+=10,a.ulUnicodeRange1=t.readUint(r,e),e+=4,a.ulUnicodeRange2=t.readUint(r,e),e+=4,a.ulUnicodeRange3=t.readUint(r,e),e+=4,a.ulUnicodeRange4=t.readUint(r,e),e+=4,a.achVendID=t.readASCII(r,e,4),e+=4,a.fsSelection=t.readUshort(r,e),e+=2,a.usFirstCharIndex=t.readUshort(r,e),e+=2,a.usLastCharIndex=t.readUshort(r,e),e+=2,a.sTypoAscender=t.readShort(r,e),e+=2,a.sTypoDescender=t.readShort(r,e),e+=2,a.sTypoLineGap=t.readShort(r,e),e+=2,a.usWinAscent=t.readUshort(r,e),e+=2,a.usWinDescent=t.readUshort(r,e),e+=2},version1:function(r,e,a){var t=Typr.B;return e=Typr.T.OS2.version0(r,e,a),a.ulCodePageRange1=t.readUint(r,e),e+=4,a.ulCodePageRange2=t.readUint(r,e),e+=4},version2:function(r,e,a){var t=Typr.B,n=t.readUshort;return e=Typr.T.OS2.version1(r,e,a),a.sxHeight=t.readShort(r,e),e+=2,a.sCapHeight=t.readShort(r,e),e+=2,a.usDefault=n(r,e),e+=2,a.usBreak=n(r,e),e+=2,a.usMaxContext=n(r,e),e+=2},version5:function(r,e,a){var t=Typr.B.readUshort;return e=Typr.T.OS2.version2(r,e,a),a.usLowerOpticalPointSize=t(r,e),e+=2,a.usUpperOpticalPointSize=t(r,e),e+=2}},Typr.T.post={parseTab:function(r,e,a){var t=Typr.B,n={};return n.version=t.readFixed(r,e),e+=4,n.italicAngle=t.readFixed(r,e),e+=4,n.underlinePosition=t.readShort(r,e),e+=2,n.underlineThickness=t.readShort(r,e),e+=2,n}},Typr.T.SVG={parseTab:function(r,e,a){var t=Typr.B,n={entries:[]},o=e;t.readUshort(r,e);e+=2;var i=t.readUint(r,e);e+=4;t.readUint(r,e);e+=4,e=i+o;var s=t.readUshort(r,e);e+=2;for(var d=0;d<s;d++){var u=t.readUshort(r,e);e+=2;var h=t.readUshort(r,e);e+=2;var p=t.readUint(r,e);e+=4;var f=t.readUint(r,e);e+=4;for(var l=new Uint8Array(r.buffer,o+p+i,f),v=t.readUTF8(l,0,l.length),y=u;y<=h;y++)n.entries[y]=v}return n}};
;

/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /gh/photopea/Typr.js@f4fcdeb8014edc75ab7296bd85ac9cde8cb30489/src/Typr.U.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
Typr.U={shape:function(t,e,r){for(var s=function(t,e,r,s){var n=e[r],a=e[r+1],h=t.kern;if(h){var o=h.glyph1.indexOf(n);if(-1!=o){var f=h.rval[o].glyph2.indexOf(a);if(-1!=f)return[0,0,h.rval[o].vals[f],0]}}return[0,0,0,0]},n=[],a=0;a<e.length;a++){var h=e.codePointAt(a);h>65535&&a++,n.push(Typr.U.codeToGlyph(t,h))}var o=[];for(a=0;a<n.length;a++){var f=s(t,n,a),i=n[a],l=t.hmtx.aWidth[i]+f[2];o.push({g:i,cl:a,dx:0,dy:0,ax:l,ay:0})}return o},shapeToPath:function(t,e,r){for(var s={cmds:[],crds:[]},n=0,a=0,h=0;h<e.length;h++){for(var o=e[h],f=Typr.U.glyphToPath(t,o.g),i=f.crds,l=0;l<i.length;l+=2)s.crds.push(i[l]+n+o.dx),s.crds.push(i[l+1]+a+o.dy);r&&s.cmds.push(r);for(l=0;l<f.cmds.length;l++)s.cmds.push(f.cmds[l]);var c=s.cmds.length;r&&0!=c&&"X"!=s.cmds[c-1]&&s.cmds.push("X"),n+=o.ax,a+=o.ay}return{cmds:s.cmds,crds:s.crds}},codeToGlyph:function(t,e){for(var r=t.cmap,s=-1,n=["p3e10","p0e4","p3e1","p1e0","p0e3","p0e1"],a=0;a<n.length;a++)if(null!=r.ids[n[a]]){s=r.ids[n[a]];break}if(-1==s)throw"no familiar platform and encoding!";var h=function(t,e,r){for(var s=0,n=Math.floor(t.length/e);s+1!=n;){var a=s+(n-s>>>1);t[a*e]<=r?s=a:n=a}return s*e},o=r.tables[s],f=o.format,i=-1;if(0==f)i=e>=o.map.length?0:o.map[e];else if(4==f){var l=-1,c=o.endCount;if(e>c[c.length-1]?l=-1:c[l=h(c,1,e)]<e&&l++,-1==l)i=0;else if(e<o.startCount[l])i=0;else{i=65535&(0!=o.idRangeOffset[l]?o.glyphIdArray[e-o.startCount[l]+(o.idRangeOffset[l]>>1)-(o.idRangeOffset.length-l)]:e+o.idDelta[l])}}else if(6==f){var u=e-o.firstCode,d=o.glyphIdArray;i=u<0||u>=d.length?0:d[u]}else{if(12!=f)throw"unknown cmap table format "+o.format;var v=o.groups;e>v[v.length-2]?i=0:(v[a=h(v,3,e)]<=e&&e<=v[a+1]&&(i=v[a+2]+(e-v[a])),-1==i&&(i=0))}var p=t["SVG "],g=t.loca;return 0==i||null!=t["CFF "]||null!=p&&null!=p.entries[i]||g[i]!=g[i+1]||-1!=[9,10,11,12,13,32,133,160,5760,8232,8233,8239,12288,6158,8203,8204,8205,8288,65279].indexOf(e)||8192<=e&&e<=8202||(i=0),i},glyphToPath:function(t,e){var r={cmds:[],crds:[]},s=t["SVG "],n=t["CFF "],a=Typr.U;if(s&&s.entries[e]){var h=s.entries[e];null!=h&&("string"==typeof h&&(h=a.SVG.toPath(h),s.entries[e]=h),r=h)}else if(n){var o=n.Private,f={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:o?o.defaultWidthX:0,open:!1};if(n.ROS){for(var i=0;n.FDSelect[i+2]<=e;)i+=2;o=n.FDArray[n.FDSelect[i+1]].Private}a._drawCFF(n.CharStrings[e],f,n,o,r)}else t.glyf&&a._drawGlyf(e,t,r);return{cmds:r.cmds,crds:r.crds}},_drawGlyf:function(t,e,r){var s=e.glyf[t];null==s&&(s=e.glyf[t]=Typr.T.glyf._parseGlyf(e,t)),null!=s&&(s.noc>-1?Typr.U._simpleGlyph(s,r):Typr.U._compoGlyph(s,e,r))},_simpleGlyph:function(t,e){for(var r=Typr.U.P,s=0;s<t.noc;s++){for(var n=0==s?0:t.endPts[s-1]+1,a=t.endPts[s],h=n;h<=a;h++){var o=h==n?a:h-1,f=h==a?n:h+1,i=1&t.flags[h],l=1&t.flags[o],c=1&t.flags[f],u=t.xs[h],d=t.ys[h];if(h==n)if(i){if(!l){r.MoveTo(e,u,d);continue}r.MoveTo(e,t.xs[o],t.ys[o])}else l?r.MoveTo(e,t.xs[o],t.ys[o]):r.MoveTo(e,Math.floor(.5*(t.xs[o]+u)),Math.floor(.5*(t.ys[o]+d)));i?l&&r.LineTo(e,u,d):c?r.qCurveTo(e,u,d,t.xs[f],t.ys[f]):r.qCurveTo(e,u,d,Math.floor(.5*(u+t.xs[f])),Math.floor(.5*(d+t.ys[f])))}r.ClosePath(e)}},_compoGlyph:function(t,e,r){for(var s=0;s<t.parts.length;s++){var n={cmds:[],crds:[]},a=t.parts[s];Typr.U._drawGlyf(a.glyphIndex,e,n);for(var h=a.m,o=0;o<n.crds.length;o+=2){var f=n.crds[o],i=n.crds[o+1];r.crds.push(f*h.a+i*h.b+h.tx),r.crds.push(f*h.c+i*h.d+h.ty)}for(o=0;o<n.cmds.length;o++)r.cmds.push(n.cmds[o])}},pathToSVG:function(t,e){var r=t.cmds,s=t.crds;null==e&&(e=5);for(var n=[],a=0,h={M:2,L:2,Q:4,C:6},o=0;o<r.length;o++){var f=r[o],i=a+(h[f]?h[f]:0);for(n.push(f);a<i;){var l=s[a++];n.push(parseFloat(l.toFixed(e))+(a==i?"":" "))}}return n.join("")},SVGToPath:function(t){var e={cmds:[],crds:[]};return Typr.U.SVG.svgToPath(t,e),{cmds:e.cmds,crds:e.crds}},pathToContext:function(t,e){for(var r=0,s=t.cmds,n=t.crds,a=0;a<s.length;a++){var h=s[a];"M"==h?(e.moveTo(n[r],n[r+1]),r+=2):"L"==h?(e.lineTo(n[r],n[r+1]),r+=2):"C"==h?(e.bezierCurveTo(n[r],n[r+1],n[r+2],n[r+3],n[r+4],n[r+5]),r+=6):"Q"==h?(e.quadraticCurveTo(n[r],n[r+1],n[r+2],n[r+3]),r+=4):"#"==h.charAt(0)?(e.beginPath(),e.fillStyle=h):"Z"==h?e.closePath():"X"==h&&e.fill()}},P:{MoveTo:function(t,e,r){t.cmds.push("M"),t.crds.push(e,r)},LineTo:function(t,e,r){t.cmds.push("L"),t.crds.push(e,r)},CurveTo:function(t,e,r,s,n,a,h){t.cmds.push("C"),t.crds.push(e,r,s,n,a,h)},qCurveTo:function(t,e,r,s,n){t.cmds.push("Q"),t.crds.push(e,r,s,n)},ClosePath:function(t){t.cmds.push("Z")}},_drawCFF:function(t,e,r,s,n){for(var a=e.stack,h=e.nStems,o=e.haveWidth,f=e.width,i=e.open,l=0,c=e.x,u=e.y,d=0,v=0,p=0,g=0,m=0,y=0,T=0,C=0,b=0,_=0,M=Typr.T.CFF,x=Typr.U.P,P=s.nominalWidthX,w={val:0,size:0};l<t.length;){M.getCharString(t,l,w);var S=w.val;if(l+=w.size,"o1"==S||"o18"==S)a.length%2!=0&&!o&&(f=a.shift()+P),h+=a.length>>1,a.length=0,o=!0;else if("o3"==S||"o23"==S){a.length%2!=0&&!o&&(f=a.shift()+P),h+=a.length>>1,a.length=0,o=!0}else if("o4"==S)a.length>1&&!o&&(f=a.shift()+P,o=!0),i&&x.ClosePath(n),u+=a.pop(),x.MoveTo(n,c,u),i=!0;else if("o5"==S)for(;a.length>0;)c+=a.shift(),u+=a.shift(),x.LineTo(n,c,u);else if("o6"==S||"o7"==S)for(var F=a.length,A="o6"==S,U=0;U<F;U++){var G=a.shift();A?c+=G:u+=G,A=!A,x.LineTo(n,c,u)}else if("o8"==S||"o24"==S){F=a.length;for(var L=0;L+6<=F;)d=c+a.shift(),v=u+a.shift(),p=d+a.shift(),g=v+a.shift(),c=p+a.shift(),u=g+a.shift(),x.CurveTo(n,d,v,p,g,c,u),L+=6;"o24"==S&&(c+=a.shift(),u+=a.shift(),x.LineTo(n,c,u))}else{if("o11"==S)break;if("o1234"==S||"o1235"==S||"o1236"==S||"o1237"==S)"o1234"==S&&(v=u,p=(d=c+a.shift())+a.shift(),_=g=v+a.shift(),y=g,C=u,c=(T=(m=(b=p+a.shift())+a.shift())+a.shift())+a.shift(),x.CurveTo(n,d,v,p,g,b,_),x.CurveTo(n,m,y,T,C,c,u)),"o1235"==S&&(d=c+a.shift(),v=u+a.shift(),p=d+a.shift(),g=v+a.shift(),b=p+a.shift(),_=g+a.shift(),m=b+a.shift(),y=_+a.shift(),T=m+a.shift(),C=y+a.shift(),c=T+a.shift(),u=C+a.shift(),a.shift(),x.CurveTo(n,d,v,p,g,b,_),x.CurveTo(n,m,y,T,C,c,u)),"o1236"==S&&(d=c+a.shift(),v=u+a.shift(),p=d+a.shift(),_=g=v+a.shift(),y=g,T=(m=(b=p+a.shift())+a.shift())+a.shift(),C=y+a.shift(),c=T+a.shift(),x.CurveTo(n,d,v,p,g,b,_),x.CurveTo(n,m,y,T,C,c,u)),"o1237"==S&&(d=c+a.shift(),v=u+a.shift(),p=d+a.shift(),g=v+a.shift(),b=p+a.shift(),_=g+a.shift(),m=b+a.shift(),y=_+a.shift(),T=m+a.shift(),C=y+a.shift(),Math.abs(T-c)>Math.abs(C-u)?c=T+a.shift():u=C+a.shift(),x.CurveTo(n,d,v,p,g,b,_),x.CurveTo(n,m,y,T,C,c,u));else if("o14"==S){if(a.length>0&&!o&&(f=a.shift()+r.nominalWidthX,o=!0),4==a.length){var k=a.shift(),O=a.shift(),V=a.shift(),W=a.shift(),B=M.glyphBySE(r,V),I=M.glyphBySE(r,W);Typr.U._drawCFF(r.CharStrings[B],e,r,s,n),e.x=k,e.y=O,Typr.U._drawCFF(r.CharStrings[I],e,r,s,n)}i&&(x.ClosePath(n),i=!1)}else if("o19"==S||"o20"==S){a.length%2!=0&&!o&&(f=a.shift()+P),h+=a.length>>1,a.length=0,o=!0,l+=h+7>>3}else if("o21"==S)a.length>2&&!o&&(f=a.shift()+P,o=!0),u+=a.pop(),c+=a.pop(),i&&x.ClosePath(n),x.MoveTo(n,c,u),i=!0;else if("o22"==S)a.length>1&&!o&&(f=a.shift()+P,o=!0),c+=a.pop(),i&&x.ClosePath(n),x.MoveTo(n,c,u),i=!0;else if("o25"==S){for(;a.length>6;)c+=a.shift(),u+=a.shift(),x.LineTo(n,c,u);d=c+a.shift(),v=u+a.shift(),p=d+a.shift(),g=v+a.shift(),c=p+a.shift(),u=g+a.shift(),x.CurveTo(n,d,v,p,g,c,u)}else if("o26"==S)for(a.length%2&&(c+=a.shift());a.length>0;)d=c,v=u+a.shift(),c=p=d+a.shift(),u=(g=v+a.shift())+a.shift(),x.CurveTo(n,d,v,p,g,c,u);else if("o27"==S)for(a.length%2&&(u+=a.shift());a.length>0;)v=u,p=(d=c+a.shift())+a.shift(),g=v+a.shift(),c=p+a.shift(),u=g,x.CurveTo(n,d,v,p,g,c,u);else if("o10"==S||"o29"==S){var q="o10"==S?s:r;if(0==a.length)console.log("error: empty stack");else{var Q=a.pop(),X=q.Subrs[Q+q.Bias];e.x=c,e.y=u,e.nStems=h,e.haveWidth=o,e.width=f,e.open=i,Typr.U._drawCFF(X,e,r,s,n),c=e.x,u=e.y,h=e.nStems,o=e.haveWidth,f=e.width,i=e.open}}else if("o30"==S||"o31"==S){var D=a.length,E=(L=0,"o31"==S);for(L+=D-(F=-3&D);L<F;)E?(v=u,p=(d=c+a.shift())+a.shift(),u=(g=v+a.shift())+a.shift(),F-L==5?(c=p+a.shift(),L++):c=p,E=!1):(d=c,v=u+a.shift(),p=d+a.shift(),g=v+a.shift(),c=p+a.shift(),F-L==5?(u=g+a.shift(),L++):u=g,E=!0),x.CurveTo(n,d,v,p,g,c,u),L+=4}else{if("o"==(S+"").charAt(0))throw console.log("Unknown operation: "+S,t),S;a.push(S)}}}e.x=c,e.y=u,e.nStems=h,e.haveWidth=o,e.width=f,e.open=i},SVG:function(){var t={getScale:function(t){return Math.sqrt(Math.abs(t[0]*t[3]-t[1]*t[2]))},translate:function(e,r,s){t.concat(e,[1,0,0,1,r,s])},rotate:function(e,r){t.concat(e,[Math.cos(r),-Math.sin(r),Math.sin(r),Math.cos(r),0,0])},scale:function(e,r,s){t.concat(e,[r,0,0,s,0,0])},concat:function(t,e){var r=t[0],s=t[1],n=t[2],a=t[3],h=t[4],o=t[5];t[0]=r*e[0]+s*e[2],t[1]=r*e[1]+s*e[3],t[2]=n*e[0]+a*e[2],t[3]=n*e[1]+a*e[3],t[4]=h*e[0]+o*e[2]+e[4],t[5]=h*e[1]+o*e[3]+e[5]},invert:function(t){var e=t[0],r=t[1],s=t[2],n=t[3],a=t[4],h=t[5],o=e*n-r*s;t[0]=n/o,t[1]=-r/o,t[2]=-s/o,t[3]=e/o,t[4]=(s*h-n*a)/o,t[5]=(r*a-e*h)/o},multPoint:function(t,e){var r=e[0],s=e[1];return[r*t[0]+s*t[2]+t[4],r*t[1]+s*t[3]+t[5]]},multArray:function(t,e){for(var r=0;r<e.length;r+=2){var s=e[r],n=e[r+1];e[r]=s*t[0]+n*t[2]+t[4],e[r+1]=s*t[1]+n*t[3]+t[5]}}};function e(t,e,r){for(var s=[],n=0,a=0,h=0;;){var o=t.indexOf(e,a),f=t.indexOf(r,a);if(-1==o&&-1==f)break;-1==f||-1!=o&&o<f?(0==h&&(s.push(t.slice(n,o).trim()),n=o+1),h++,a=o+1):(-1==o||-1!=f&&f<o)&&(0==--h&&(s.push(t.slice(n,f).trim()),n=f+1),a=f+1)}return s}function r(r){for(var n=e(r,"(",")"),a=[1,0,0,1,0,0],h=0;h<n.length;h+=2){var o=a;a=s(n[h],n[h+1]),t.concat(a,o)}return a}function s(e,r){for(var s=[1,0,0,1,0,0],n=!0,a=0;a<r.length;a++){var h=r.charAt(a);","==h||" "==h?n=!0:"."==h?(n||(r=r.slice(0,a)+","+r.slice(a),a++),n=!1):"-"==h&&a>0&&"e"!=r[a-1]&&(r=r.slice(0,a)+" "+r.slice(a),a++,n=!0)}if(r=r.split(/\s*[\s,]\s*/).map(parseFloat),"translate"==e)1==r.length?t.translate(s,r[0],0):t.translate(s,r[0],r[1]);else if("scale"==e)1==r.length?t.scale(s,r[0],r[0]):t.scale(s,r[0],r[1]);else if("rotate"==e){var o=0,f=0;1!=r.length&&(o=r[1],f=r[2]),t.translate(s,-o,-f),t.rotate(s,-Math.PI*r[0]/180),t.translate(s,o,f)}else"matrix"==e?s=r:console.log("unknown transform: ",e);return s}function n(e,s,a){for(var o=0;o<e.length;o++){var f=e[o],i=f.tagName,l=f.getAttribute("fill");if(null==l&&(l=a),"g"==i){var c={crds:[],cmds:[]};n(f.children,c,l);var u=f.getAttribute("transform");if(u){var d=r(u);t.multArray(d,c.crds)}s.crds=s.crds.concat(c.crds),s.cmds=s.cmds.concat(c.cmds)}else if("path"==i||"circle"==i||"ellipse"==i){var v;if(s.cmds.push(l||"#000000"),"path"==i&&(v=f.getAttribute("d")),"circle"==i||"ellipse"==i){for(var p=[0,0,0,0],g=["cx","cy","rx","ry","r"],m=0;m<5;m++){var y=f.getAttribute(g[m]);y&&(y=parseFloat(y),m<4?p[m]=y:p[2]=p[3]=y)}var T=p[0],C=p[1],b=p[2],_=p[3];v=["M",T-b,C,"a",b,_,0,1,0,2*b,0,"a",b,_,0,1,0,2*-b,0].join(" ")}h(v,s),s.cmds.push("X")}else"defs"==i||console.log(i,f)}}function a(t,e,r){for(var s=e;s<t.length&&"string"!=typeof t[s];)s+=r;return(s-e)/r}function h(t,e){for(var r=function(t){for(var e=[],r=0,s=!1,n="",a="";r<t.length;){var h=t.charCodeAt(r),o=t.charAt(r);r++;var f=48<=h&&h<=57||"."==o||"-"==o||"e"==o||"E"==o;s?"-"==o&&"e"!=a||"."==o&&-1!=n.indexOf(".")?(e.push(parseFloat(n)),n=o):f?n+=o:(e.push(parseFloat(n)),","!=o&&" "!=o&&e.push(o),s=!1):f?(n=o,s=!0):","!=o&&" "!=o&&e.push(o),a=o}return s&&e.push(parseFloat(n)),e}(t),s=0,n=0,h=0,o=0,f=0,i=e.crds.length,l={M:2,L:2,H:1,V:1,T:2,S:4,A:7,Q:4,C:6},c=e.cmds,u=e.crds;s<r.length;){var d=r[s];s++;var v=d.toUpperCase();if("Z"==v)c.push("Z"),n=o,h=f;else for(var p=a(r,s,l[v]),g=0;g<p;g++){1==g&&"M"==v&&(d=d==v?"L":"l",v="L");var m=0,y=0;if(d!=v&&(m=n,y=h),"M"==v)n=m+r[s++],h=y+r[s++],c.push("M"),u.push(n,h),o=n,f=h;else if("L"==v)n=m+r[s++],h=y+r[s++],c.push("L"),u.push(n,h);else if("H"==v)n=m+r[s++],c.push("L"),u.push(n,h);else if("V"==v)h=y+r[s++],c.push("L"),u.push(n,h);else if("Q"==v){var T=m+r[s++],C=y+r[s++],b=m+r[s++],_=y+r[s++];c.push("Q"),u.push(T,C,b,_),n=b,h=_}else if("T"==v){T=n+n-u[P=Math.max(u.length-2,i)],C=h+h-u[P+1],b=m+r[s++],_=y+r[s++];c.push("Q"),u.push(T,C,b,_),n=b,h=_}else if("C"==v){T=m+r[s++],C=y+r[s++],b=m+r[s++],_=y+r[s++];var M=m+r[s++],x=y+r[s++];c.push("C"),u.push(T,C,b,_,M,x),n=M,h=x}else if("S"==v){var P;T=n+n-u[P=Math.max(u.length-("C"==c[c.length-1]?4:2),i)],C=h+h-u[P+1],b=m+r[s++],_=y+r[s++],M=m+r[s++],x=y+r[s++];c.push("C"),u.push(T,C,b,_,M,x),n=M,h=x}else if("A"==v){T=n,C=h;var w=r[s++],S=r[s++],F=r[s++]*(Math.PI/180),A=r[s++],U=r[s++];b=m+r[s++],_=y+r[s++];if(b==n&&_==h&&0==w&&0==S)continue;var G=(T-b)/2,L=(C-_)/2,k=Math.cos(F),O=Math.sin(F),V=k*G+O*L,W=-O*G+k*L,B=w*w,I=S*S,q=V*V,Q=W*W,X=(B*I-B*Q-I*q)/(B*Q+I*q),D=(A!=U?1:-1)*Math.sqrt(Math.max(X,0)),E=D*(w*W)/S,H=S*V*-D/w,R=k*E-O*H+(T+b)/2,Z=O*E+k*H+(C+_)/2,z=function(t,e,r,s){var n=(t*r+e*s)/(Math.sqrt(t*t+e*e)*Math.sqrt(r*r+s*s));return(t*s-e*r>=0?1:-1)*Math.acos(Math.max(-1,Math.min(1,n)))},N=(V-E)/w,j=(W-H)/S,J=z(1,0,N,j),K=z(N,j,(-V-E)/w,(-W-H)/S);!function(t,e,r,s,n,a,h){var o=function(t,e){var r=Math.sin(e),s=Math.cos(e),n=(e=t[0],t[1]),a=t[2],h=t[3];t[0]=e*s+n*r,t[1]=-e*r+n*s,t[2]=a*s+h*r,t[3]=-a*r+h*s},f=function(t,e){for(var r=0;r<e.length;r+=2){var s=e[r],n=e[r+1];e[r]=t[0]*s+t[2]*n+t[4],e[r+1]=t[1]*s+t[3]*n+t[5]}},i=function(t,e){for(var r=0;r<e.length;r++)t.push(e[r])};if(h)for(;a>n;)a-=2*Math.PI;else for(;a<n;)a+=2*Math.PI;var l=(a-n)/4,c=Math.cos(l/2),u=-Math.sin(l/2),d=(4-c)/3,v=0==u?u:(1-c)*(3-c)/(3*u),p=[d,v,d,-v,c,-u],g={cmds:["C","C","C","C"],crds:p.slice(0)},m=[1,0,0,1,0,0];o(m,-l);for(var y=0;y<3;y++)f(m,p),i(g.crds,p);o(m,l/2-n),m[0]*=s,m[1]*=s,m[2]*=s,m[3]*=s,m[4]=e,m[5]=r,f(m,g.crds),f(t.ctm,g.crds),function(t,e){i(t.cmds,e.cmds),i(t.crds,e.crds)}(t.pth,g)}({pth:e,ctm:[w*k,w*O,-S*O,S*k,R,Z]},0,0,1,J,J+(K%=2*Math.PI),0==U),n=b,h=_}else console.log("Unknown SVG command "+d)}}}return{cssMap:function(t){for(var r=e(t,"{","}"),s={},n=0;n<r.length;n+=2)for(var a=r[n].split(","),h=0;h<a.length;h++){var o=a[h].trim();null==s[o]&&(s[o]=""),s[o]+=r[n+1]}return s},readTrnf:r,svgToPath:h,toPath:function(t){var e={cmds:[],crds:[]};if(null==t)return e;var r=(new DOMParser).parseFromString(t,"image/svg+xml").getElementsByTagName("svg")[0],s=r.getAttribute("viewBox");s=s?s.trim().split(" ").map(parseFloat):[0,0,1e3,1e3],n(r.children,e);for(var a=0;a<e.crds.length;a+=2){var h=e.crds[a],o=e.crds[a+1];h-=s[0],o=-(o-=s[1]),e.crds[a]=h,e.crds[a+1]=o}return e}}}(),initHB:function(t,e){var r=function(t){var e=0;return 4294967168&t?4294965248&t?4294901760&t?4292870144&t||(e=4):e=3:e=2:e=1,e},s=new window.TextEncoder("utf8");fetch(t).then((function(t){return t.arrayBuffer()})).then((function(t){return WebAssembly.instantiate(t)})).then((function(t){console.log("HB ready");var n=t.instance.exports,a=n.memory;a.grow(700);var h,o,f,i,l,c=new Uint8Array(a.buffer),u=new Uint32Array(a.buffer),d=new Int32Array(a.buffer);Typr.U.shapeHB=function(t,e,a){var v=t._data,p=t.name.postScriptName;h!=p&&(null!=o&&(n.hb_blob_destroy(o),n.free(f),n.hb_face_destroy(i),n.hb_font_destroy(l)),f=n.malloc(v.byteLength),c.set(v,f),o=n.hb_blob_create(f,v.byteLength,2,0,0),i=n.hb_face_create(o,0),l=n.hb_font_create(i),h=p);var g=n.hb_buffer_create(),m=s.encode(e),y=m.length,T=n.malloc(y);c.set(m,T),n.hb_buffer_add_utf8(g,T,y,0,y),n.free(T),n.hb_buffer_set_direction(g,a?4:5),n.hb_buffer_guess_segment_properties(g),n.hb_shape(l,g,0,0);var C=function(t){for(var e=n.hb_buffer_get_length(t),r=[],s=n.hb_buffer_get_glyph_infos(t,0)>>>2,a=n.hb_buffer_get_glyph_positions(t,0)>>>2,h=0;h<e;++h){var o=s+5*h,f=a+5*h;r.push({g:u[o+0],cl:u[o+2],ax:d[f+0],ay:d[f+1],dx:d[f+2],dy:d[f+3]})}return r}(g);n.hb_buffer_destroy(g);var b=C.slice(0);a||b.reverse();for(var _=0,M=0,x=1;x<b.length;x++){for(var P=b[x],w=P.cl;;){var S=e.codePointAt(_),F=r(S);if(!(M+F<=w))break;M+=F,_+=S<=65535?1:2}P.cl=_}return C},e()}))}};
;

!function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function c(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function i(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function a(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return i(c(a(n=r(n)),8*n.length))}function u(n,t){return function(n,t){var r,e=a(n),o=[],u=[];for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^e[r],u[r]=1549556828^e[r];return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(this);
//# sourceMappingURL=/sm/0a9fb4108ae56bec8db2fb35b9644dc753b1a61ecc7f934d7a82a9e487421157.map
/* ==== INLINE-DEP-END:typr ==== */

/* ==== INLINE-DEP-BEGIN:guard ==== */
var GptRequestGuard = {
    clientId: function () {
        try {
            var saved = GM_getValue('ZhixingSetting.guardClientId', '');
            if (typeof saved === 'string' && /^[a-f0-9]{32}$/.test(saved)) return saved;
            var hex = '', pool = '0123456789abcdef';
            for (var i = 0; i < 32; i++) hex += pool.charAt(Math.floor(Math.random() * 16));
            try { GM_setValue('ZhixingSetting.guardClientId', hex); } catch (_) { }
            return hex;
        } catch (_) { return '00000000000000000000000000000000'; }
    },
    withCaptcha: function (fn) {
        try { return Promise.resolve(fn({})); } catch (e) { return Promise.reject(e); }
    },
    errorBody: function (e) {
        try {
            if (e && e.response && e.response.data) return e.response.data;
            if (e && e.body) return e.body;
            return {};
        } catch (_) { return {}; }
    }
};
/* ==== INLINE-DEP-END:guard ==== */


var setting = {
    showBox: 1,

    task: 0,

    video: 1,
    audio: 1,
    rate: 1,
    review: 0,

    work: 1,
    time: 2500,
    sub: 1,
    force: 0,
    decrypt: 1,
    redo: 0,

    examTurn: 0,
    previewTurn: 1,
    bankOn: 0,
    examTurnTime: 0,
    goodStudent: 1,
    alterTitle: 1,

    autoLogin: 0,
    phone: '',
    password: ''
}

try {
    var domainMatch = location.hostname.match(/(?:^|\.)(chaoxing\.com|xuexitong\.com)$/);
    if (domainMatch) document.domain = domainMatch[1];
} catch (e) {
    console.error('[知行] 无法设置 document.domain', e);
}

try {

    Object.defineProperty(unsafeWindow, 'onblur', {
        get: function () { return function () { }; },
        set: function () { }
    });

    document.hasFocus = function () { return true; };

    Object.defineProperty(document, 'visibilityState', {
        get: function () { return 'visible'; },
        configurable: true
    });
    Object.defineProperty(document, 'hidden', {
        get: function () { return false; },
        configurable: true
    });
} catch (e) {
    console.error('[知行] 无法劫持 window.onblur / document.hasFocus', e);
}

var localStorage = {

    _getPrefix: function () {
        try {
            var host = window.location.hostname;

            if (host === 'xuexitong.com' || host.endsWith('.xuexitong.com')) {
                host = 'chaoxing.com';
            }
            var matches = host.match(/([^.]+\.(?:com|net|org|edu)\.cn|[^.]+\.[^.]+)$/i);
            return (matches ? matches[0] : host) + ':';
        } catch (e) {
            return '';
        }
    },
    getItem: function (key) {
        var prefixedKey = this._getPrefix() + key;
        var val = undefined;

        try {
            val = GM_getValue(prefixedKey);
        } catch (e) {

        }

        if (val === undefined || val === null) {
            try {
                val = window.localStorage.getItem(key);
                if (val !== null) {
                    GM_setValue(prefixedKey, val);
                }
            } catch (e) {

            }
        }
        return (val !== undefined && val !== null) ? val : null;
    },
    setItem: function (key, value) {
        var prefixedKey = this._getPrefix() + key;

        try {
            GM_setValue(prefixedKey, String(value));
        } catch (e) { }

        try {
            window.localStorage.setItem(key, String(value));
        } catch (e) { }
    },
    removeItem: function (key) {
        var prefixedKey = this._getPrefix() + key;
        try {
            GM_deleteValue(prefixedKey);
        } catch (e) { }
        try {
            window.localStorage.removeItem(key);
        } catch (e) { }
    }
};

var _w = unsafeWindow,
    _l = location,
    _d = _w.document,
    $ = (typeof __gptjq !== 'undefined' && __gptjq) || _w.jQuery || (function () {
        try { if (top.jQuery) return top.jQuery; } catch (_) {}
        return jQuery;
    })(),
    md5 = md5 || window.md5,
    UE = _w.UE,
    Swal = Swal || window.Swal;

/* 自建 API 模式下不使用第三方主机，保留空数组只为兼容原分支 */
var HOST_CANDIDATES = [];

var _cachedHost = localStorage.getItem('ZhixingSetting.hostSelected');
var _cachedAt = parseInt(localStorage.getItem('ZhixingSetting.hostSelectedAt') || '0');

var _host = _cachedHost || HOST_CANDIDATES[0] || '';

/* ============================================================================
 *  自建 API 配置（本修改版新增）
 *  把下面三项换成你自己的、兼容 OpenAI 的接口即可，其余逻辑全部保持原样。
 *  支持：OpenAI / DeepSeek / 通义 / Kimi / 智谱 / 各类中转站 / Ollama / vLLM / LM Studio
 *  运行时也可以不改文件直接覆盖：在控制台执行
 *    GM_setValue("OWN_API_CONFIG", { baseUrl: "...", apiKey: "...", model: "..." })
 *  或
 *    localStorage.setItem("OWN_API_CONFIG", JSON.stringify({ baseUrl: "...", apiKey: "...", model: "..." }))
 * ========================================================================== */
var OWN_API = {
    enabled: true,
    baseUrl: '',   // 填到 /v1 为止，脚本会自动拼 /chat/completions
    apiKey: 'sk-REPLACE_ME',   // 你的密钥；本地 Ollama 之类的空密钥直接留空字符串
    model: '',                // 你的模型名
    models: [],  // 面板下拉可切换的模型
    /* ---- 服务商差异（一般不用改） ---- */
    authStyle: 'bearer',        // bearer | x-api-key | api-key | none
    chatPath: '/chat/completions',
    modelsPath: '/models',
    query: '',                  // 例如 Azure 的 ?api-version=2024-02-15-preview
    extraHeaders: {},           // 额外请求头，如 { "X-Custom": "1" }
    maxTokens: 0,               // 0 = 不传；推理模型千万别设小
    vision: 'auto',             // 'auto' 按 /models 的 input_modalities 决定；true 强制发图；false 不发
    maxImages: 5,               // 单题最多附几张图（题干 + 各选项公式图都要算）
    effort: 'low',              // 思考强度：low（快、省）/ high / max / off（最快但易错）
    baseUrls: [],               // 备用地址，前一个失败时自动轮转
    temperature: 0.2,
    timeoutMs: 120000,
    systemPrompt: '你是严谨的答题助手。用户会给你一段 JSON，包含 type(题型)、question(题干)、options(选项，可能没有)、answer_format(作答格式要求)。\n只输出最终答案，不要解释、不要加引号、不要输出“答案：”前缀。\n严格按下列规则输出：\n1) 单选题：从 options 中原样选出一个选项文字，不要带 A./B. 之类的序号，不要改动标点。\n2) 多选题：原样输出所有正确选项文字，用 | 分隔。\n3) 判断题：只输出 正确 或 错误。\n4) 填空题：多个空的答案用 | 分隔并按顺序输出。\n5) 简答题：不超过 50 字。'
};

try {
    var _ownApiOverride = GM_getValue('OWN_API_CONFIG', null);
    if (_ownApiOverride && typeof _ownApiOverride === 'object') {
        for (var _ok in _ownApiOverride) OWN_API[_ok] = _ownApiOverride[_ok];
    }
} catch (e) { }
try {
    var _ownApiLs = window.localStorage.getItem('OWN_API_CONFIG');
    if (_ownApiLs) {
        var _ownApiObj = JSON.parse(_ownApiLs);
        for (var _ok2 in _ownApiObj) OWN_API[_ok2] = _ownApiObj[_ok2];
    }
} catch (e) { }

function ownApiParsePayload(payloadStr) {
    try {
        var o = JSON.parse(payloadStr);
        if (o && typeof o === "object") return o;
    } catch (e) { }
    return { question: String(payloadStr == null ? "" : payloadStr) };
}

function ownApiCleanAnswer(text, payloadStr) {
    var s = String(text == null ? "" : text).trim();
    if (!s) return "";
    s = s.replace(/^```[a-zA-Z]*\s*\n?/, "").replace(/\n?```\s*$/, "").trim();
    s = s.replace(/^(最终答案|参考答案|正确答案|答案)\s*(?:[:：]|(?:是|为)\s*[:：]?)\s*/, "").trim();
    s = s.replace(/^答\s*[:：]\s*/, "").trim();
    s = s.replace(/^["\u201c\u2018]+|["\u201d\u2019]+$/g, "").trim();
    var p = ownApiParsePayload(payloadStr);
    var type = String(p.type == null ? "" : p.type);
    if (type.indexOf("单选") !== -1 || type.indexOf("多选") !== -1 || type.indexOf("判断") !== -1) {
        var parts = s.split(/\s*[|｜]\s*/);
        var cleaned = [];
        for (var i = 0; i < parts.length; i++) {
            var x = parts[i].trim();
            if (!x) continue;
            x = x.replace(/^[（(]\s*[A-Ha-h]\s*[)）]\s*/, "");
            x = x.replace(/^[A-Ha-h]\s*[.、,．:：)）]\s*/, "");
            cleaned.push(x.trim());
        }
        if (cleaned.length) s = cleaned.join("|");
    }
    if (type.indexOf("判断") !== -1) {
        var j = s.replace(/[\s。，.,!！]/g, "");
        if (/^(对|正确|是|√|t|true|yes|ri|right)$/i.test(j)) s = "正确";
        else if (/^(错|错误|否|×|x|f|false|no|wr|wrong)$/i.test(j)) s = "错误";
    }
    s = s.replace(/[。；]\s*$/, "").trim();
    return s;
}

function ownApiTrim(u) {
    var s = String(u || '');
    while (s.length > 1 && s.charAt(s.length - 1) === '/') s = s.slice(0, -1);
    return s;
}

function ownApiEndpoints() {
    var list = [];
    var main = ownApiTrim(OWN_API.baseUrl);
    if (main) list.push(main);
    if (Object.prototype.toString.call(OWN_API.baseUrls) === "[object Array]") {
        OWN_API.baseUrls.forEach(function (u) {
            var x = ownApiTrim(u);
            if (x && list.indexOf(x) === -1) list.push(x);
        });
    }
    return list;
}

function ownApiHeaders() {
    var h = { "Content-Type": "application/json" };
    var style = String(OWN_API.authStyle || "bearer");
    var key = String(OWN_API.apiKey || "");
    if (key) {
        if (style === "x-api-key") h["x-api-key"] = key;
        else if (style === "api-key") h["api-key"] = key;
        else if (style !== "none") h["Authorization"] = "Bearer " + key;
    }
    if (OWN_API.extraHeaders && typeof OWN_API.extraHeaders === "object") {
        Object.keys(OWN_API.extraHeaders).forEach(function (k) {
            if (k) h[k] = String(OWN_API.extraHeaders[k]);
        });
    }
    return h;
}

function ownApiUrl(base, pathKey) {
    var def = pathKey === "modelsPath" ? "/models" : "/chat/completions";
    var p = String(OWN_API[pathKey] || def);
    if (p.charAt(0) !== "/") p = "/" + p;
    var q = String(OWN_API.query || "");
    if (q && q.charAt(0) !== "?") q = "?" + q;
    return base + p + q;
}

function ownApiAbsUrl(u) {
    var s = String(u || "").trim();
    if (!s) return "";
    if (s.indexOf("data:") === 0) return s;
    if (s.indexOf("//") === 0) return "https:" + s;
    if (/^https?:\/\//i.test(s)) return s;
    try {
        var base = (typeof location !== "undefined" && location.href) ? location.href : "";
        if (!base) return "";
        return new URL(s, base).href;
    } catch (_) { return ""; }
}

function ownApiStripMedia(t) {
    return String(t == null ? "" : t)
        .replace(/<img\b[^>]*>/gi, "[图片]")
        .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "[音频]")
        .replace(/<audio\b[^>]*>[\s\S]*?<\/audio>/gi, "[音频]")
        .replace(/<video\b[^>]*>[\s\S]*?<\/video>/gi, "[视频]")
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function ownApiImgList(payloadStr) {
    var max = parseInt(OWN_API.maxImages || 4, 10);
    if (!isFinite(max) || max <= 0) max = 4;
    var urls = [];
    var raw = String(payloadStr || "");
    var re = /<img\b[^>]*?(?:data-src|data-original|src)\s*=\s*\\?["']([^"']+)["']/gi;
    var m;
    while ((m = re.exec(raw)) !== null) {
        var u = ownApiAbsUrl(String(m[1]).replace(/\\+$/, ""));
        if (!u) continue;
        if (u.indexOf("blob:") === 0) {
            try { logger("这张图是 blob: 地址，模型无法访问，已跳过", "orange"); } catch (_) { }
            continue;
        }
        if (u.indexOf("data:") === 0 && u.length > 400000) {
            try { logger("内联图片过大（" + Math.round(u.length / 1024) + "KB），为避免卡住已跳过", "orange"); } catch (_) { }
            continue;
        }
        if (urls.indexOf(u) === -1) urls.push(u);
        if (urls.length >= max) break;
    }
    return urls;
}

function ownApiWantImages() {
    var v = OWN_API.vision;
    if (v === false) return false;
    if (v === true) return true;
    return OWN_API.visionSupported === true;
}

function ownApiBody(payloadStr, withImages) {
    var p = ownApiParsePayload(payloadStr);
    var plain = { type: p.type, answer_format: p.answer_format, question: ownApiStripMedia(p.question) };
    if (Object.prototype.toString.call(p.options) === "[object Array]") {
        plain.options = p.options.map(function (o) { return ownApiStripMedia(o); });
    }
    var _norms = (plain.options || []).map(function (o) {
        return String(o == null ? "" : o).replace(/[\s()（）\[\]【】]/g, "").replace(/si$/i, "").toLowerCase();
    });
    var _unusable = _norms.length > 1 && _norms.every(function (x) { return x === _norms[0]; });
    if (_unusable) {
        delete plain.options;
        plain.answer_format = "请直接给出正确答案的完整表达式（例如 x=0.02cos(4πt-4π/3)），不要只给单位；若选项是图片，则只回答选项字母 A/B/C/D";
    }
    var text = JSON.stringify(plain);
    var imgs = withImages ? ownApiImgList(payloadStr) : [];
    var _optArr = (plain.options || []);
    var _nonText = false;
    for (var _oi = 0; _oi < _optArr.length; _oi++) {
        var _os = String(_optArr[_oi] == null ? "" : _optArr[_oi]).replace(/\[图片\]/g, "").replace(/\[音频\]/g, "");
        if (!/[\u4e00-\u9fa5A-Za-z0-9]/.test(_os)) { _nonText = true; break; }
    }
    if (_unusable) text += "\n\n（本题选项是公式渲染，文字提取不到。请直接给出正确答案的表达式，不要只给单位；若选项是图片，则只回答选项字母）";
    if (_nonText && !_unusable) text += "\n\n（部分选项是公式或图片，文字可能为空。请结合图片判断，并只回答选项字母：A、B、C、D…）";
    if (imgs.length) text += "\n\n（本题附 " + imgs.length + " 张图片，请结合图片作答。若选项是公式，请只回答选项字母）";
    var content = text;
    if (imgs.length) {
        content = [{ type: "text", text: text }];
        for (var i = 0; i < imgs.length; i++) {
            content.push({ type: "image_url", image_url: { url: imgs[i] } });
        }
    }
    return { text: text, content: content, images: imgs.length };
}

function ownApiErrText(obj, xhr) {
    var msg = "";
    try {
        if (obj && obj.error) msg = typeof obj.error === "string" ? obj.error : (obj.error.message || JSON.stringify(obj.error));
        else if (obj && obj.message) msg = String(obj.message);
        else msg = String((xhr && xhr.responseText) || "");
    } catch (_) { msg = ""; }
    if (msg.length > 300) msg = msg.slice(0, 300) + "...";
    return msg;
}

function ownApiAnswer(payloadStr) {
    return new Promise(function (resolve, reject) {
        if (!OWN_API.enabled) { reject(new Error("OWN_API.enabled=false")); return; }
        var eps = ownApiEndpoints();
        if (!eps.length) { reject(new Error("还没配置：请在「设置 → API 设置」里填写地址 / Key / 模型")); return; }
        if (String(OWN_API.apiKey || "").indexOf("REPLACE") !== -1) {
            reject(new Error("还没配置：Key 仍是占位符")); return;
        }
        var probe = ownApiParsePayload(payloadStr);
        var qText = ownApiStripMedia(probe.question);
        var oText = "";
        if (Object.prototype.toString.call(probe.options) === "[object Array]") {
            oText = probe.options.map(ownApiStripMedia).join(" ");
        }
        var plainText = (qText + " " + oText).replace(/\[(图片|音频|视频)\]/g, "");
        var hasText = /[\u4e00-\u9fa5A-Za-z0-9]/.test(plainText);
        var hasImg = ownApiImgList(payloadStr).length > 0;
        if (!hasText && !hasImg) {
            reject(new Error("题干没有可读文字也没有图片（可能是纯音频听力题），模型无法作答，请手动作答"));
            return;
        }
        var idx = 0;
        var imagesDisabled = false;
        var finished = false;
        var startedAt = Date.now();
        var limitMs = OWN_API.timeoutMs || 120000;
        var hardTimer = setTimeout(function () {
            if (finished) return;
            finished = true;
            clearInterval(progTimer);
            reject(new Error("请求超过 " + Math.round(limitMs / 1000) + "s 没有任何响应（常见原因：图片过大、图片需要登录态、或网络/代理卡住）。可先关掉「发送图片」再试"));
        }, limitMs + 5000);
        var progTimer = setInterval(function () {
            if (finished) return;
            var sec = Math.round((Date.now() - startedAt) / 1000);
            if (sec > 60) return;
            try { logger("AI 仍在思考… 已等待 " + sec + "s", "gray"); } catch (_) { }
        }, Math.min(15000, Math.max(2000, Math.round(limitMs / 5))));
        function done(fn, val) {
            if (finished) return;
            finished = true;
            clearTimeout(hardTimer);
            clearInterval(progTimer);
            fn(val);
        }
        function attempt() {
            if (finished) return;
            if (idx >= eps.length) { done(reject, new Error("所有 API 地址都失败了")); return; }
            var base = eps[idx];
            var isLast = idx >= eps.length - 1;
            var built = ownApiBody(payloadStr, !imagesDisabled && ownApiWantImages());
            if (built.images > 0) {
                try { logger("本题附 " + built.images + " 张图片（以 URL 发给模型）", "blue"); } catch (_) { }
            }
            var body = {
                model: OWN_API.model,
                temperature: typeof OWN_API.temperature === "number" ? OWN_API.temperature : 0.2,
                stream: false,
                messages: [
                    { role: "system", content: OWN_API.systemPrompt },
                    { role: "user", content: built.content }
                ]
            };
            var mt = parseInt(OWN_API.maxTokens || 0, 10);
            if (isFinite(mt) && mt > 0) body.max_tokens = mt;
            var _eff = String(OWN_API.effort || "low").toLowerCase();
            if (_eff === "off") { body.thinking = { type: "disabled" }; }
            else if (_eff === "low" || _eff === "high" || _eff === "max") { body.reasoning = { effort: _eff }; }
            GM_xmlhttpRequest({
                method: "POST",
                url: ownApiUrl(base, "chatPath"),
                headers: ownApiHeaders(),
                data: JSON.stringify(body),
                timeout: limitMs,
                onload: function (xhr) {
                    if (finished) return;
                    var obj = null;
                    try { obj = JSON.parse(xhr.responseText); } catch (_) { }
                    var okHttp = xhr.status >= 200 && xhr.status < 300;
                    if (okHttp && obj && !obj.error) {
                        var content = "";
                        try { content = obj.choices[0].message.content || ""; } catch (_) { }
                        if (!content) { try { content = obj.choices[0].text || ""; } catch (_) { } }
                        var ans = ownApiCleanAnswer(content, payloadStr);
                        if (ans && (!/[\u4e00-\u9fa5A-Za-z0-9]/.test(ans) || !String(ans).replace(/\((?:si|SI)\)\.?/g, "").replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g, ""))) {
                            done(reject, new Error("API 返回的内容没有有效文字（只有标点或空）"));
                            return;
                        }
                        try {
                            var _u = obj.usage || {};
                            var _rt = (_u.completion_tokens_details && _u.completion_tokens_details.reasoning_tokens) || 0;
                            logger("tokens " + (_u.prompt_tokens || 0) + " → " + (_u.completion_tokens || 0) + "（思考 " + _rt + "）", "gray");
                        } catch (_) { }
                        if (ans) { done(resolve, ans); return; }
                        var hasReason = false;
                        try { hasReason = !!obj.choices[0].message.reasoning_content; } catch (_) { }
                        done(reject, new Error(hasReason
                            ? "API 只返回了思考过程（reasoning），没有正文：检查 max_tokens 是否太小，或换非推理模型"
                            : "API 返回内容为空"));
                        return;
                    }
                    if (xhr.status === 400 && built.images > 0 && !imagesDisabled) {
                        imagesDisabled = true;
                        OWN_API.visionSupported = false;
                        try { logger("模型/服务拒绝了图片（HTTP 400），已改用纯文本重试", "orange"); } catch (_) { }
                        attempt();
                        return;
                    }
                    var retryable = xhr.status === 429 || xhr.status >= 500 || xhr.status === 0;
                    var text = ownApiErrText(obj, xhr);
                    if (retryable && !isLast) { idx++; attempt(); return; }
                    done(reject, new Error("HTTP " + xhr.status + " " + text));
                },
                onerror: function () {
                    if (finished) return;
                    if (!isLast) { idx++; attempt(); return; }
                    done(reject, new Error("无法连接 " + base + "（检查地址 / @connect / 网络 / 代理）"));
                },
                ontimeout: function () {
                    if (finished) return;
                    done(reject, new Error("API 超时（" + Math.round(limitMs / 1000) + "s）：若本题带图，可先关掉「发送图片」再试"));
                }
            });
        }
        attempt();
    });
}

function gptFillModelSelect(ids, current) {
    try {
        var $s = $('#ne21ApiModelSel');
        if (!$s.length) return;
        var list = [];
        if (Object.prototype.toString.call(ids) === "[object Array]") list = ids.slice(0);
        if (current && list.indexOf(current) === -1) list.unshift(current);
        $s.empty();
        list.forEach(function (m) { $s.append($('<option>').attr('value', m).text(m)); });
        $s.append($('<option>').attr('value', '__custom__').text('＋ 自定义…'));
        var pick = (current && list.indexOf(current) !== -1) ? current : (list[0] || '__custom__');
        $s.val(pick);
        var $i = $('#ne21ApiModel');
        if ($i.length) {
            if (pick === '__custom__') { $i.show().val(current || ''); } else { $i.hide().val(pick); }
        }
    } catch (_) { }
}

function gptApplyModels(ids) {
    try {
        if (Object.prototype.toString.call(ids) !== "[object Array]" || !ids.length) return;
        OWN_API.availableModels = ids.slice(0);
        var cur = OWN_API.model;
        var $sel = $('#modelSelect');
        if ($sel.length) {
            var keep = $sel.val() || cur;
            $sel.empty();
            ids.forEach(function (m) { $sel.append($('<option>').attr('value', m).text(m)); });
            if (ids.indexOf(keep) === -1) keep = ids[0];
            $sel.val(keep);
        }
        gptFillModelSelect(ids, cur);
    } catch (_) { }
}

function gptApiState(txt, color, tip) {
    try {
        var $s = $('#ne21ApiState');
        if (!$s.length) return;
        var c = color === 'red' ? '#dc2626' : (color === 'green' ? '#059669' : 'rgba(15,23,42,.55)');
        $s.text(txt).css('color', c).attr('title', tip || txt);
    } catch (_) { }
}

function ownApiSelfTest() {
    if (window.__gptOwnApiTested) return;
    window.__gptOwnApiTested = true;
    if (!OWN_API || !OWN_API.enabled) { gptApiState("已关闭"); return; }
    var eps = ownApiEndpoints();
    var base = eps[0];
    if (!base || String(OWN_API.apiKey || "").indexOf("REPLACE") !== -1) {
        if (isBankOn()) {
            gptApiState("仅题库", "gray");
            try { logger("未配置模型接口：题库优先已开启，会先用题库；查不到会跳过", "blue"); } catch (_) { }
            return;
        }
        gptApiState("未配置", "gray");
        try { logger("还没配置模型接口：可在「设置 → API 设置」里填，或打开「题库优先」用题库", "blue"); } catch (_) { }
        return;
    }
    gptApiState("测试中…");
    try { logger("知行 · 模型接口：" + base + "  模型：" + OWN_API.model, "blue"); } catch (_) { }

    function chatPing() {
        GM_xmlhttpRequest({
            method: "POST",
            url: ownApiUrl(base, "chatPath"),
            headers: ownApiHeaders(),
            data: JSON.stringify({ model: OWN_API.model, max_tokens: 8, stream: false, messages: [{ role: "user", content: "ping" }] }),
            timeout: 30000,
            onload: function (xhr) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    gptApiState("✅ 连接成功（服务无模型列表）", "green", "该服务不提供 /models，请手动确认模型名");
                    try { logger("API 自检成功（该服务不提供 /models，已用对话探活）", "green"); } catch (_) { }
                } else {
                    var o = null; try { o = JSON.parse(xhr.responseText); } catch (_) { }
                    gptApiState("❌ HTTP " + xhr.status, "red");
                    try { logger("API 自检失败 HTTP " + xhr.status + "：" + ownApiErrText(o, xhr), "red"); } catch (_) { }
                }
            },
            onerror: function () { gptApiState("❌ 无法连接", "red"); try { logger("API 自检失败：无法连接 " + base, "red"); } catch (_) { } },
            ontimeout: function () { gptApiState("❌ 连接超时", "red"); try { logger("API 自检失败：超时", "red"); } catch (_) { } }
        });
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: ownApiUrl(base, "modelsPath"),
        headers: ownApiHeaders(),
        timeout: 20000,
        onload: function (xhr) {
            if (xhr.status >= 200 && xhr.status < 300) {
                var ids = [];
                try { ids = (JSON.parse(xhr.responseText).data || []).map(function (m) { return m.id; }); } catch (_) { }
                var list = [];
                try { list = JSON.parse(xhr.responseText).data || []; } catch (_) { }
                if (!ids.length && Object.prototype.toString.call(list) === "[object Array]") {
                    ids = list.map(function (m) { return m && m.id ? m.id : m; });
                }
                var mine = null;
                for (var Li = 0; Li < list.length; Li++) {
                    if (list[Li] && list[Li].id === OWN_API.model) { mine = list[Li]; break; }
                }
                if (mine && Object.prototype.toString.call(mine.input_modalities) === "[object Array]") {
                    if (mine.input_modalities.indexOf("image") !== -1) {
                        OWN_API.visionSupported = true;
                        try { logger("该模型支持读图：图片题会自动附图", "blue"); } catch (_) { }
                    } else {
                        OWN_API.visionSupported = false;
                        try { logger("该模型不支持图片输入，图片题只能靠文字（可换 deepseek-flash 这类多模态）", "orange"); } catch (_) { }
                    }
                }
                gptApplyModels(ids);
                var hasModel = !ids.length || ids.indexOf(OWN_API.model) !== -1;
                if (hasModel) {
                    gptApiState("✅ 连接成功", "green", ids.length ? ("可选模型：" + ids.join(" / ")) : "已连接");
                } else {
                    gptApiState("⚠ 模型不在可选列表", "red", "可选模型：" + ids.join(" / ") + "；当前填的是 " + OWN_API.model);
                }
                try { logger("API 自检成功：" + (ids.length ? ids.slice(0, 6).join(", ") : "已连接"), "green"); } catch (_) { }
                if (!hasModel) {
                    try { logger("注意：可用模型里没有 " + OWN_API.model + "，检查 model 是否写错", "orange"); } catch (_) { }
                }
                return;
            }
            if (xhr.status === 404 || xhr.status === 405 || xhr.status === 501) { chatPing(); return; }
            if (xhr.status === 401 || xhr.status === 403) {
                gptApiState("❌ 鉴权失败 " + xhr.status, "red");
                try { logger("API 自检失败 HTTP " + xhr.status + "：鉴权被拒，检查 Key 与鉴权方式（当前 " + (OWN_API.authStyle || "bearer") + "）", "red"); } catch (_) { }
                return;
            }
            var o2 = null; try { o2 = JSON.parse(xhr.responseText); } catch (_) { }
            gptApiState("❌ HTTP " + xhr.status, "red");
            try { logger("API 自检失败 HTTP " + xhr.status + "：" + ownApiErrText(o2, xhr), "red"); } catch (_) { }
        },
        onerror: function () { gptApiState("❌ 无法连接", "red"); try { logger("API 自检失败：无法连接 " + base + "（检查网络 / @connect / 代理）", "red"); } catch (_) { } },
        ontimeout: function () { gptApiState("❌ 连接超时", "red"); try { logger("API 自检失败：连接超时", "red"); } catch (_) { } }
    });
}

function gptManualStartOn() {
    try { return localStorage.getItem('ZhixingSetting.manualStart') !== 'false'; } catch (_) { return true; }
}
/* 只有课程学习页（播放/文档/章节测验）允许"点一次开始，连续刷完整门课" */
function gptCoursePage() {
    try {
        var p = location.pathname || '';
        return p.indexOf('/mycourse/studentstudy') !== -1 || p.indexOf('/knowledge/cards') !== -1;
    } catch (_) { return false; }
}
function gptAutoRunFresh() {
    try {
        var ts = parseInt(localStorage.getItem('ZhixingSetting.autoRunAt') || '0', 10);
        return isFinite(ts) && ts > 0 && (Date.now() - ts) < 120000;
    } catch (_) { return false; }
}
function gptTouchAutoRun() {
    try { if (gptCoursePage()) localStorage.setItem('ZhixingSetting.autoRunAt', String(Date.now())); } catch (_) { }
}
function gptRunAllowed() {
    if (window.__gptRunStarted === true) return true;
    if (!gptManualStartOn()) return true;
    if (gptCoursePage() && gptAutoRunFresh()) return true;
    return false;
}
function gptRunGate(fn) {
    if (window.__gptWantStart) { window.__gptRunStarted = true; }
    if (gptRunAllowed()) {
        gptTouchAutoRun();
        try { fn(); } catch (e) { try { logger('启动失败：' + (e && e.message ? e.message : e), 'red'); } catch (_) { } }
        return;
    }
    window.__gptPendingStart = fn;
    try { logger('已就绪（手动模式）：点标题栏 ▶ 才会动手', 'blue'); } catch (_) { }
}

function requestGuardClientId() {
    var saved = GM_getValue('ZhixingSetting.guardClientId', '');
    if (!/^[a-f0-9]{32}$/.test(saved)) {
        saved = GptRequestGuard.clientId();
        GM_setValue('ZhixingSetting.guardClientId', saved);
    }
    return saved;
}
var _guardClientId = requestGuardClientId();

function guardHttp(host, path, method, data, headers) {
    return new Promise(function (resolve, reject) {
        GM_xmlhttpRequest({
            method: method,
            url: host + path,
            headers: Object.assign({ 'X-Client-Id': _guardClientId }, data ? { 'Content-Type': 'application/json' } : {}, headers || {}),
            data: data ? JSON.stringify(data) : undefined,
            timeout: 8000,
            onload: function (xhr) {
                var body = {};
                try {
                    var parsed = JSON.parse(xhr.responseText);
                    if (parsed && typeof parsed === 'object') body = parsed;
                } catch (_) { }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({ data: body, response: xhr.responseText });
                } else {
                    var error = new Error(body.message || body.msg || '服务器请求失败，请稍后重试。');
                    error.response = { status: xhr.status, data: body };
                    reject(error);
                }
            },
            onerror: function () { reject(new Error('暂时无法连接服务器，请稍后重试。')); },
            ontimeout: function () { reject(new Error('服务器响应超时，请稍后重试。')); }
        });
    });
}

function requestAuthRaw(host, headers) {
    var startAt = Date.now();
    var learningAccountId = getLearningAccountId();
    return guardHttp(host, '/api/v1/auth?uid=' + encodeURIComponent(learningAccountId || '')
        + '&v=' + encodeURIComponent(GM_info.script.version), 'GET', null, headers)
        .then(function (result) {
            return { host: host, ms: Date.now() - startAt, response: result.response, learningAccountId: learningAccountId };
        });
}

function requestAuth(host, initialError) {
    var pendingError = initialError;
    return GptRequestGuard.withCaptcha(function (headers) {
        if (pendingError) {
            var error = pendingError;
            pendingError = null;
            return Promise.reject(error);
        }
        return requestAuthRaw(host, headers);
    }, {
        clientId: _guardClientId,
        refresh: function (captchaId, headers) {
            return guardHttp(host, '/api/security/captcha/refresh', 'POST', { captchaId: captchaId }, headers);
        }
    });
}

function rememberHost(result) {
    _host = result.host;
    localStorage.setItem('ZhixingSetting.hostSelected', _host);
    localStorage.setItem('ZhixingSetting.hostSelectedAt', String(Date.now()));
    return result;
}

function findFastest() {
    return new Promise(function (resolve, reject) {
        var finished = false;
        var failures = 0;
        var limitedHost;
        var firstError;
        HOST_CANDIDATES.forEach(function (host) {

            requestAuthRaw(host, { 'X-Client-Id': _guardClientId }).then(function (result) {
                if (!finished) {
                    finished = true;
                    resolve(rememberHost(result));
                }
            }).catch(function (error) {
                firstError = firstError || error;
                if (error.response && error.response.status === 429 && !limitedHost) limitedHost = { host: host, error: error };
                failures++;
                if (failures === HOST_CANDIDATES.length && !finished) {
                    finished = true;
                    if (limitedHost) requestAuth(limitedHost.host, limitedHost.error).then(function (result) {
                        resolve(rememberHost(result));
                    }).catch(reject);
                    else reject(firstError);
                }
            });
        });
    });
}

function initFastestHost() {
    var twoHours = 2 * 60 * 60 * 1000;
    if (_cachedAt && Date.now() - _cachedAt < twoHours) {
        return requestAuthRaw(_host, { 'X-Client-Id': _guardClientId }).catch(function (error) {

            if (error.response && error.response.status === 429) return requestAuth(_host, error);
            return findFastest();
        });
    }
    return findFastest();
}

var _authPromise = OWN_API.enabled
    ? Promise.resolve({
        host: _host,
        learningAccountId: getLearningAccountId(),
        response: JSON.stringify({ code: 200, data: { notice: "", score: "" } })
    })
    : initFastestHost();

_authPromise.catch(function () { });

var _mlist, _defaults, _domList, $subBtn, $saveBtn, $frame_c, $okBtn;
var _currentQuestionMeta = null;

var _ne21NextAiAllowedAt = 0;

$('.navshow').find('a:contains(体验新版)')[0] ? $('.navshow').find('a:contains(体验新版)')[0].click() : '';

try { if (setting.decrypt) { var _dp = decryptFont(); if (_dp && _dp.catch) _dp.catch(function () { }); } } catch (_e) { console.warn('[知行] 字体解密失败，已跳过：', _e); }

if (localStorage.getItem('ZhixingSetting.time') !== null) {
    var _savedTime = parseFloat(localStorage.getItem('ZhixingSetting.time'));
    if (isFinite(_savedTime) && _savedTime >= 0) {
        setting.time = _savedTime * 1000;
    }
}

function isMobileUI() {
    try {
        var _w = window.innerWidth || 0;
        var _touch = ("ontouchstart" in window) || (navigator && navigator.maxTouchPoints > 0);
        if (_touch && _w < 1024) return true;
        return _w <= 520;
    } catch (_) { return false; }
}

function ensureBall() {
    try {
        if (!isMobileUI()) return;
        if (document.getElementById('ne21Ball')) return;
        var el = document.createElement("div");
        el.id = "ne21Ball";
        el.textContent = "知";
        el.title = "显示 / 隐藏 知行面板";
        el.addEventListener("click", function () { try { toggleBoxVisibility(); } catch (_) { } });
        (document.body || document.documentElement).appendChild(el);
    } catch (_) { }
}

function toggleBoxVisibility() {
    var $box = $('#ne-21box', getPanelDocument());
    if ($box.length === 0) return;
    if (localStorage.getItem('ZhixingSetting.showBox') === 'hide') {
        $box.css('display', '');
        localStorage.setItem('ZhixingSetting.showBox', 'show');
        try { logger('Alt+Z 显示面板'); } catch (_) {}
    } else {
        $box.css('display', 'none');
        localStorage.setItem('ZhixingSetting.showBox', 'hide');
    }
}
$(document).on('keydown.ne21f9', function (e) {
    if (e.altKey && (e.key || '').toLowerCase() === 'z') { e.preventDefault(); toggleBoxVisibility(); }
});
try {
    var panelDocument = getPanelDocument();
    if (panelDocument !== document) {
        $(panelDocument).on('keydown.ne21f9', function (e) {
            if (e.altKey && (e.key || '').toLowerCase() === 'z') { e.preventDefault(); toggleBoxVisibility(); }
        });
    }
} catch (_) {}

function waitForJQueryElement(selector, timeout) {
    return new Promise(function (resolve) {
        var interval = setInterval(function () {
            if ($(selector).length > 0) {
                clearInterval(interval);
                if (timer) clearTimeout(timer);
                resolve(true);
            }
        }, 500);
        var timer = null;
        if (timeout && timeout > 0) {
            timer = setTimeout(function () {
                clearInterval(interval);
                resolve(false);
            }, timeout);
        }
    });
}

if (window === top) {
    showBox();
}

if (_l.hostname.startsWith('i.mooc.') || _l.hostname.startsWith('i.chaoxing.com') ||
    (_l.hostname === 'i.xuexitong.com' && (_l.pathname === '/' || _l.pathname.startsWith('/space/')))) {
    if (window === top) {
        if (_l.pathname.includes('/space/out_link.shtml')) {
            logger('检测到外链嵌套页面，脚本将在 iframe 内自动运行考试/作业', 'green');
        } else {
            logger('知行已就绪：进入课程/作业/考试页后，点面板「开始」才动手', 'green');
        }
    }
} else if (_l.pathname == '/login') {
    showBox()
    if (setting.autoLogin) waitForJQueryElement('#phone', 30000).then(function (found) { if (found) autoLogin(); else logger('登录页等待超时（30s），未找到手机号输入框', 'red'); });
} else if (_l.pathname.includes('/mycourse/studentstudy')) {
    showBox()
    $('#ne-21log', getPanelDocument()).html('初始化完毕！')
    setupAntiSleep()
    setupAutoRefresh()

    setInterval(function () {
        try {
            if (typeof _w.checkJob === 'function' && !_w._gptCheckJobHooked) {
                _w._gptCheckJobHooked = true;
                _w.checkJob = function () { return false; };
            }
        } catch (_) {}
        try {
            if (_w.PCount && typeof _w.PCount.next === 'function' && !_w.PCount._gptHooked) {
                var _origPCountNext = _w.PCount.next;
                _w.PCount.next = function () {

                    if (_w._gptJsJumpAllowed) {
                        _w._gptJsJumpAllowed = false;
                        return _origPCountNext.apply(this, arguments);
                    }
                    console.log('[知行] 拦截 PCount.next 自动跳转');
                    return false;
                };
                _w.PCount._gptHooked = true;
            }
        } catch (_) {}
    }, 1000);

    var _blankSectionChecks = 0;
    var _lastBlankSectionDoc = null;
    setInterval(function () {
        var cardsDoc = getStudyCardsDocument(_w);
        if (localStorage.getItem('ZhixingSetting.isPaused') === 'true' || !isEmptyStudyPage(cardsDoc)) {
            _blankSectionChecks = 0;
            _lastBlankSectionDoc = null;
            return;
        }
        if (cardsDoc !== _lastBlankSectionDoc) {
            _blankSectionChecks = 0;
            _lastBlankSectionDoc = cardsDoc;
        }
        _blankSectionChecks++;
        if (_blankSectionChecks >= 2) {
            _blankSectionChecks = 0;
            if (gptRunAllowed()) toNext(true);
        }
    }, 5000);
} else if (_l.pathname.includes('/knowledge/cards')) {
    setupAntiSleep()
    var params = getTaskParams()
    var parsedParams = null;
    if (params && params !== '$mArg') {
        try { parsedParams = $.parseJSON(params); } catch (e) { parsedParams = null; }
    }
    if (!parsedParams || !parsedParams['attachments'] || parsedParams['attachments'].length <= 0) {
        logger('检测到无任务点（无任务参数），自动跳过', 'red')
        setTimeout(function () { toNext(true) }, 2000)
    } else {

        waitForJQueryElement('.wrap .ans-cc .ans-attach-ct', 8000).then(function (found) {
            if (!found) {

                var anyExists = document.querySelectorAll('.ans-attach-ct, .ans-job-ct, .chapter-item').length;
                if (anyExists > 0) {
                    logger('章节任务均已完成，准备跳转', 'green')
                } else {
                    logger('检测到无任务点（DOM 无任务节点），自动跳过', 'red')
                }
                setTimeout(function () { toNext(anyExists === 0) }, 2000)
                return;
            }

            try { if (typeof top.checkJob === 'function') top.checkJob = function () { return false; }; } catch (_) {}
            var _checkJobGuard = setInterval(function () {
                try { if (typeof top.checkJob === 'function') top.checkJob = function () { return false; }; } catch (_) {}
            }, 3000);
            _defaults = parsedParams['defaults']

            var allDomNodes = []
            $.each($('.wrap .ans-cc .ans-attach-ct'), function (i, t) {
                var iframeEl = $(t).find('iframe')
                var dataStr = ''
                try { dataStr = iframeEl.attr('data') || '' } catch (_) {}
                allDomNodes.push({ iframe: iframeEl, data: dataStr })
            })

            var rawList = parsedParams['attachments']
            _mlist = []
            _domList = []
            var usedDomIndexes = {}
            for (var ai = 0; ai < rawList.length; ai++) {
                var att = rawList[ai]
                var attMid = (att['property'] && att['property']['mid']) || ''
                var attObjId = (att['property'] && att['property']['objectid']) || ''
                var matched = false

                for (var di = 0; di < allDomNodes.length; di++) {
                    if (usedDomIndexes[di]) continue
                    var dStr = allDomNodes[di].data
                    if (dStr && ((attMid && dStr.indexOf(attMid) !== -1) || (attObjId && dStr.indexOf(attObjId) !== -1))) {
                        _mlist.push(att)
                        _domList.push(allDomNodes[di].iframe)
                        usedDomIndexes[di] = true
                        matched = true
                        break
                    }
                }
                if (!matched) {
                    var skipType = att['type'] || (att['property'] && att['property']['module']) || 'unknown'
                    var skipName = (att['property'] && att['property']['name']) || ''

                    if (skipType === 'knowledgeGraph') {
                        _mlist.push(att)
                        _domList.push(null)
                        console.log('[知行] 保留 knowledgeGraph 任务点: ' + (skipName || '知识图谱'))
                    } else {
                        console.log('[知行] 跳过无DOM对应的附件: type=' + skipType + (skipName ? ', name=' + skipName : ''))
                    }
                }
            }

            if (_mlist.length === 0 && rawList.length > 0 && allDomNodes.length > 0) {
                console.log('[知行] 精确匹配未命中，回退到索引对应模式')
                _mlist = rawList
                _domList = []
                for (var fi = 0; fi < allDomNodes.length; fi++) {
                    _domList.push(allDomNodes[fi].iframe)
                }
            }
            gptRunGate(function () { missonStart(); });
        });
    }
} else if (_l.pathname.includes('/exam/test/reVersionTestStartNew')) {
    showBox()
    waitForJQueryElement('.mark_table .whiteDiv', 30000).then(function (found) { if (found) gptRunGate(function () { missonExam(); }); else logger('考试页等待超时（30s），未找到题目容器', 'red'); });
} else if (_l.pathname.includes('/mooc2/exam/preview')) {
    showBox()
    waitForJQueryElement('.mark_table .questionLi', 30000).then(function (found) { if (found) gptRunGate(function () { missonExamPreview(); }); else logger('整卷预览页等待超时（30s），未找到题目列表', 'red'); });
} else if (_l.pathname.includes('/mooc2/work/dowork')) {
    showBox()
    waitForJQueryElement('.mark_table form', 30000).then(function (found) { if (found) gptRunGate(function () { missonHomeWork(); }); else logger('作业页等待超时（30s），未找到作业表单', 'red'); });
} else if (_l.pathname.includes('/work/phone/doHomeWork')) {
    var _oldal = _w.alert
    _w.alert = function (msg) {
        if (msg == '保存成功') {
            return;
        }
        return _oldal(msg)
    }
    var _oldcf = _w.confirm
    _w.confirm = function (msg) {
        if (msg.includes('确认提交') || msg.includes('未做完')) {
            return true
        }
        return _oldcf(msg)
    }
} else if (_l.pathname.includes('/page/quiz/stu/answerQuestion')) {
    showBox()
    waitForJQueryElement('.question-item', 30000).then(function (found) {
        if (found) gptRunGate(function () { missonQuizPractice(); });
        else logger('随堂练习页等待超时（30s），未找到题目容器', 'red');
    });
} else if (_l.pathname.includes('/mooc2/exam/exam-list')) {

} else if (_l.pathname == '/mycourse/stu') {
    checkBrowser()
} else {

    if (window === top) {
        logger('知行已就绪：进入课程/作业/考试页后，点面板「开始」才动手', 'green');
    }
}

function checkBrowser() {
    var userAgent = navigator.userAgent
    if (userAgent.indexOf('Chrome') == -1 || GM_info.scriptHandler != 'ScriptCat') {

    }
}

function parseUrlParams() {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let _p = {}
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        _p[pair[0]] = pair[1]
    }
    return _p
}

function updateLocalStorage(event) {
    var _cb = event.target;
    if (_cb.id === 'ZhixingSetting.bankOn') {
        try { logger(_cb.checked ? '题库优先：已开启（题干会发送到第三方题库）' : '题库优先：已关闭', 'gray'); } catch (_) { }
    }
    var checkbox = event.target;
    if (checkbox.id === 'ZhixingSetting.goodStudent') {
        localStorage.setItem(checkbox.id, !checkbox.checked);
        return;
    }
    localStorage.setItem(checkbox.id, checkbox.checked);
}

function isRedoMode() {
    var stored = localStorage.getItem('ZhixingSetting.redo');
    if (stored !== null) return stored === 'true';
    return !!setting.redo;
}

function isFuzzyMatchEnabled() {
    return true;
}

function gptNorm(s) {
    return String(s == null ? "" : s)
        .replace(/\\left|\\right|\\,|\\;|\\!|\\ /g, "")
        .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
        .replace(/\\pi/g, "π")
        .replace(/\\[a-zA-Z]+/g, "")
        .replace(/\$/g, "")
        .replace(/[−–—]/g, "-")
        .replace(/[×·⋅]/g, "*")
        .replace(/[（]/g, "(").replace(/[）]/g, ")")
        .replace(/[［]/g, "[").replace(/[］]/g, "]")
        .replace(/\(s\.?i\.?\)\.?$/i, "")
        .replace(/\s+/g, "")
        .toLowerCase();
}

function stringSimilarity(s1, s2) {
    if (!s1 && !s2) return 1;
    if (!s1 || !s2) return 0;

    s1 = gptNorm(s1);
    s2 = gptNorm(s2);
    if (s1 === s2) return 1;
    var len1 = s1.length, len2 = s2.length;
    if (len1 === 0 || len2 === 0) return 0;

    var prev = [], curr = [];
    for (let j = 0; j <= len2; j++) prev[j] = j;
    for (let i = 1; i <= len1; i++) {
        curr[0] = i;
        for (let j = 1; j <= len2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
            }
        }
        var tmp = prev; prev = curr; curr = tmp;
    }
    var maxLen = Math.max(len1, len2);
    return 1 - prev[len2] / maxLen;
}

function gptFuzzyThreshold() {
    try { var v = parseFloat(localStorage.getItem('ZhixingSetting.fuzzyThreshold')); if (isFinite(v) && v > 0 && v <= 1) return v; } catch (_) { }
    return 0.65;
}
function gptFuzzyMargin() {
    try { var v = parseFloat(localStorage.getItem('ZhixingSetting.fuzzyMargin')); if (isFinite(v) && v >= 0 && v <= 1) return v; } catch (_) { }
    return 0.12;
}
function gptUpdateFailChip() {
    try {
        var n = (window.__gptFails || []).length;
        var $c = $('#ne21FailChip');
        if (!$c.length) return;
        if (n > 0) { $c.text('未答 ' + n).show(); } else { $c.hide(); }
    } catch (_) { }
}
function gptRecordFail(msg) {
    try {
        window.__gptFails = window.__gptFails || [];
        window.__gptFails.push({ t: Date.now(), msg: String(msg || '') });
        gptUpdateFailChip();
    } catch (_) { }
    try { logger(msg, 'red'); } catch (_) { }
}
function gptRedoAll() {
    try {
        try { localStorage.setItem('ZhixingSetting.isPaused', 'false'); } catch (_) { }
        try { window.__gptFails = []; gptUpdateFailChip(); } catch (_) { }
        try { document.documentElement.removeAttribute('data-ne21-quiz-practice'); } catch (_) { }
        try {
            $('[data-ne21-answer-appended]').each(function () {
                var $q = $(this);
                $q.removeAttr('data-ne21-answer-appended');
                $q.find('.question-name p').filter(function () { return /^答案：/.test($(this).text()); }).remove();
            });
        } catch (_) { }
        var _p = String((typeof location !== 'undefined' && location.pathname) || '');
        var _redoMode = false;
        try { _redoMode = (typeof isRedoMode === 'function') ? isRedoMode() : false; } catch (_) { }
        logger('从头扫描：从第 1 题重新开始（不刷新页面）· ' + (_redoMode ? '覆盖已答' : '只补未答'), 'blue');
        if (!_redoMode) { try { logger('提示：当前只补未答，已答的会跳过；要连已答一起重做，请勾选「覆盖已答题」', 'orange'); } catch (_) { } }
        if (_p.indexOf('/mooc2/work/dowork') !== -1 || _p.indexOf('/work/phone/doHomeWork') !== -1) { missonHomeWork(); return; }
        if (_p.indexOf('/mooc2/exam/preview') !== -1) { missonExamPreview(); return; }
        if (_p.indexOf('/exam/test/') !== -1) { missonExam(); return; }
        if ($('.question-item').length) { missonQuizPractice(); return; }
        if ($('.mark_table .questionLi').length) { missonHomeWork(); return; }
        logger('当前页面没找到可重做的题目', 'orange');
    } catch (e) {
        logger('重做失败：' + (e && e.message ? e.message : e), 'red');
    }
}
try { window.__zhixingRedo = gptRedoAll; } catch (_) { }

function gptSummarizeFails() {
    try {
        var n = (window.__gptFails || []).length;
        if (n > 0) logger('本次共 ' + n + ' 题未作答/未确定，已逐题跳过；请按上面的红色日志手动补，本次不会自动提交', 'red');
    } catch (_) { }
}

function gptPurgeLetters(aiAnswer) {
    var tail = String(aiAnswer == null ? "" : aiAnswer)
        .replace(/[。.、,，;；:：\s]/g, "")
        .toUpperCase();
    var mm = tail.match(/([A-H]{1,4})$/);
    if (!mm) return "";
    if (tail.length - mm[1].length > 4) return "";
    return mm[1];
}

function findBestFuzzyMatch(optionTexts, aiAnswer, threshold) {
    if (!isFuzzyMatchEnabled()) return -1;
    if (!aiAnswer || !optionTexts || optionTexts.length === 0) return -1;
    var _letters = gptPurgeLetters(aiAnswer);
    if (_letters.length === 1) {
        var _ix = _letters.charCodeAt(0) - 65;
        if (_ix >= 0 && _ix < optionTexts.length) {
            logger("模型用选项字母作答：" + _letters + "，直接定位第 " + (_ix + 1) + " 项", "blue");
            return _ix;
        }
    }
    var th = (typeof threshold === 'number') ? threshold : gptFuzzyThreshold();
    if (!gptNorm(aiAnswer)) {
        logger('答案里没有有效内容（只有单位或符号），跳过本题', 'orange');
        return -1;
    }
    var bestIndex = -1, bestScore = 0, second = 0;
    for (var i = 0; i < optionTexts.length; i++) {
        var score = stringSimilarity(optionTexts[i], aiAnswer);
        if (score > bestScore) { second = bestScore; bestScore = score; bestIndex = i; }
        else if (score > second) { second = score; }
    }
    var pct = function (x) { return (x * 100).toFixed(1) + '%'; };
    if (bestScore >= 0.999) {
        logger("归一化后与选项 " + String.fromCharCode(65 + bestIndex) + " 完全一致，直接选它", "blue");
        return bestIndex;
    }
    if (bestScore < th) {
        logger('相似度最高仅 ' + pct(bestScore) + '（阈值 ' + Math.round(th * 100) + '%），不猜，跳过本题', 'orange');
        var _optEmpty = true;
        for (var _oi2 = 0; _oi2 < optionTexts.length; _oi2++) {
            if (gptNorm(optionTexts[_oi2])) { _optEmpty = false; break; }
        }
        if (_optEmpty) logger('参考答案：' + aiAnswer, 'orange');
        return -1;
    }
    var margin = gptFuzzyMargin();
    if (optionTexts.length > 1 && (bestScore - second) < margin) {
        logger('两个选项太接近（' + pct(bestScore) + ' vs ' + pct(second) + '，仅差 ' + pct(bestScore - second) + '），为避免选错，跳过本题', 'orange');
        return -1;
    }
    logger('相似度匹配: 最佳匹配项[' + bestIndex + '] 相似度=' + pct(bestScore), 'blue');
    return bestIndex;
}

function findFuzzyMatchMultiple(optionTexts, aiAnswer, threshold) {
    if (!isFuzzyMatchEnabled()) return [];
    if (!aiAnswer || !optionTexts || optionTexts.length === 0) return [];
    var _ml = gptPurgeLetters(aiAnswer);
    if (_ml.length > 1) {
        var _mi = [];
        for (var _k = 0; _k < _ml.length; _k++) {
            var _x = _ml.charCodeAt(_k) - 65;
            if (_x >= 0 && _x < optionTexts.length && _mi.indexOf(_x) === -1) _mi.push(_x);
        }
        if (_mi.length) {
            logger("模型用选项字母作答：" + _ml + "，直接定位 " + _mi.join(","), "blue");
            return _mi;
        }
    }
    threshold = (threshold !== undefined) ? threshold : gptFuzzyThreshold();
    var parts = aiAnswer.split('|');
    var matched = [];
    for (var p = 0; p < parts.length; p++) {
        var part = parts[p].trim();
        if (!part) continue;
        var bestIndex = -1, bestScore = 0;
        for (var i = 0; i < optionTexts.length; i++) {
            var score = stringSimilarity(optionTexts[i], part);
            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }
        if (bestScore >= threshold && matched.indexOf(bestIndex) === -1) {
            matched.push(bestIndex);
            logger('相似度匹配(多选): "' + part + '" → 选项[' + bestIndex + '] 相似度=' + (bestScore * 100).toFixed(1) + '%', 'blue');
        }
    }
    return matched;
}

function normalizeChoiceText(text) {
    return String(text == null ? '' : text)
        .replace(/^[A-Z]\s*[\.、．:：)]?\s*/i, '')
        .replace(/\s+/g, '')
        .trim();
}

function getAnswerLetterIndexes(answer, optionCount) {
    var s = String(answer == null ? '' : answer).toUpperCase();
    var result = [];
    var letterPattern = /(?:^|[^A-Z])([A-Z])(?=$|[^A-Z])/g;
    var m;
    while ((m = letterPattern.exec(s)) !== null) {
        var idx = m[1].charCodeAt(0) - 65;
        if (idx >= 0 && idx < optionCount && result.indexOf(idx) === -1) result.push(idx);
    }
    if (result.length === 0 && /^[A-Z]+$/.test(s.trim())) {
        for (var i = 0; i < s.trim().length; i++) {
            var charIdx = s.trim().charCodeAt(i) - 65;
            if (charIdx >= 0 && charIdx < optionCount && result.indexOf(charIdx) === -1) result.push(charIdx);
        }
    }
    return result;
}

function splitAiAnswers(answer) {
    return String(answer == null ? '' : answer)
        .split(/[|#;；、,，\n]+/)
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
}

function findVideoQuizMatchIndexes(optionTexts, aiAnswer, isMultiple) {
    var result = getAnswerLetterIndexes(aiAnswer, optionTexts.length);
    if (result.length > 0) return isMultiple ? result : [result[0]];

    var normalizedOptions = optionTexts.map(normalizeChoiceText);
    var parts = splitAiAnswers(aiAnswer);
    if (parts.length === 0 && aiAnswer) parts = [String(aiAnswer).trim()];

    for (var p = 0; p < parts.length; p++) {
        var normalizedAnswer = normalizeChoiceText(parts[p]);
        if (!normalizedAnswer) continue;
        for (var i = 0; i < normalizedOptions.length; i++) {
            if (result.indexOf(i) !== -1) continue;
            if (normalizedOptions[i] === normalizedAnswer ||
                normalizedOptions[i].indexOf(normalizedAnswer) !== -1 ||
                normalizedAnswer.indexOf(normalizedOptions[i]) !== -1) {
                result.push(i);
                break;
            }
        }
    }

    if (result.length === 0) {
        result = isMultiple ? findFuzzyMatchMultiple(normalizedOptions, aiAnswer, 0.45) : [findBestFuzzyMatch(normalizedOptions, aiAnswer, 0.45)];
        result = result.filter(function (idx) { return idx >= 0; });
    }
    return isMultiple ? result : result.slice(0, 1);
}

function getVideoQuizText(container, optionNodes) {
    var title = container.querySelector('.tkItem_title, .ans-videoquiz-title, .ans-videoquiz-subject, .ans-videoquiz-question, .videoquiz-title, .videoquiz-question');
    if (title) return (title.innerText || title.textContent || '').replace(/\s+/g, ' ').trim();

    var clone = container.cloneNode(true);
    try {
        Array.prototype.forEach.call(clone.querySelectorAll('.ans-videoquiz-opt, .tkTopic_numbar, .tkTopic_title, .tkTopic_oper, .tkParsing, .rightInfo, .spanNot, .spanNotBack, [id^="videoquiz-"], #knowledgeBack, #viewAnalysis, [id^="ascrail"], [hidden], [aria-hidden="true"], button, input, label'), function (node) {
            if (node.parentNode) node.parentNode.removeChild(node);
        });
    } catch (_) {}
    var text = (clone.innerText || clone.textContent || '').trim();
    (optionNodes || []).forEach(function (label) {
        var optText = (label.innerText || label.textContent || '').trim();
        if (optText) text = text.replace(optText, '');
    });
    return text.replace(/\s+/g, ' ').trim();
}

function isVideoQuizNodeVisible(node) {
    if (!node || !node.isConnected) return false;
    var view = node.ownerDocument.defaultView;
    for (var el = node; el && el.nodeType === 1; el = el.parentElement) {
        if (el.hidden || el.getAttribute('aria-hidden') === 'true') return false;
        var style = view.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
    }
    return true;
}

function getVisibleVideoQuizNode(container, selector) {
    return Array.prototype.slice.call(container.querySelectorAll(selector)).find(isVideoQuizNodeVisible);
}

function getVideoQuizResult(container) {
    if (getVisibleVideoQuizNode(container, '#videoquiz-submitting')) return 'pending';
    var wrong = getVisibleVideoQuizNode(container, '#spanNot, #spanNotBack, #spanNotBackPoint, .spanNot, .spanNotBack');
    if (wrong && /真遗憾|回答错误|答错/.test(wrong.textContent || '')) return 'wrong';
    var right = getVisibleVideoQuizNode(container, '#spanHas, .rightInfo');
    if (right && /答对|回答正确/.test(right.textContent || '')) return 'correct';
    if (getVisibleVideoQuizNode(container, '#videoquiz-continue, .ans-videoquiz-continue')) return 'correct';
    return 'pending';
}

function getVideoQuizInput(label) {
    var option = label.closest('.ans-videoquiz-opt');
    return label.control || label.querySelector('input') || (option && option.querySelector('input'));
}

function getVideoQuizFallbackIndexes(record, optionCount, isMultiple) {
    if (record.triedAnswers.length >= 16) return [];
    if (!isMultiple) {
        for (var i = 0; i < optionCount; i++) {
            if (record.triedAnswers.indexOf(String(i)) === -1) return [i];
        }
        return [];
    }

    var selected = record.aiIndexes.slice();
    var findCombination = function (start, remaining) {
        if (remaining === 0) {
            var indexes = selected.slice().sort(function (a, b) { return a - b; });
            return indexes.length && record.triedAnswers.indexOf(indexes.join(',')) === -1 ? indexes : null;
        }
        for (var idx = start; idx <= optionCount - remaining; idx++) {
            var pos = selected.indexOf(idx);
            if (pos === -1) selected.push(idx);
            else selected.splice(pos, 1);
            var found = findCombination(idx + 1, remaining - 1);
            if (pos === -1) selected.splice(selected.indexOf(idx), 1);
            else selected.push(idx);
            if (found) return found;
        }
        return null;
    };

    for (var distance = 1; distance <= optionCount; distance++) {
        var next = findCombination(0, distance);
        if (next) return next;
    }
    return [];
}

function handleVideoQuiz(doc, media, taskName) {
    if (!setting.work || localStorage.getItem('ZhixingSetting.isPaused') === 'true') return false;
    var container = getVisibleVideoQuizNode(doc, '.ans-videoquiz');
    if (!container || !media) return false;
    var result = getVideoQuizResult(container);
    var optionNodes = Array.prototype.slice.call(container.querySelectorAll('.ans-videoquiz-opt label'));
    if (optionNodes.length === 0) optionNodes = Array.prototype.slice.call(container.querySelectorAll('label'));
    var optionTexts = optionNodes.map(function (label) { return (label.innerText || label.textContent || '').trim(); });
    var inputs = optionNodes.map(getVideoQuizInput);
    var typeNode = container.querySelector('.tkTopic_title');
    var typeText = typeNode ? typeNode.textContent : '';
    var isMultiple = /多选|多项/.test(typeText) || inputs.some(function (input) { return input && input.type === 'checkbox'; });
    var isJudge = !isMultiple && (/判断/.test(typeText) || (optionTexts.length === 2 && optionTexts.every(function (t) {
        return /^(正确|错误|对|错|是|否|true|false|√|×)$/i.test(normalizeChoiceText(t));
    })));
    var question = getVideoQuizText(container, optionNodes);
    var typeName = isMultiple ? '多选题' : (isJudge ? '判断题' : '单选题');
    var quizKey = JSON.stringify([media.currentSrc || media.src || taskName, typeName, question, optionTexts]);
    media._ne21VideoQuizRecords = media._ne21VideoQuizRecords || Object.create(null);
    var record = media._ne21VideoQuizRecords[quizKey];
    if (!record) record = media._ne21VideoQuizRecords[quizKey] = { phase: 'idle', triedAnswers: [], aiIndexes: [], pendingIndexes: [] };

    if (result === 'correct') {
        record.phase = 'solved';
        record.solvedIndexes = [];
        inputs.forEach(function (input, idx) { if (input && input.checked) record.solvedIndexes.push(idx); });
        if (!record.solvedIndexes.length) record.solvedIndexes = record.pendingIndexes.slice();
        if (container.getAttribute('data-ne21-status') === 'done') return true;
        container.setAttribute('data-ne21-status', 'done');
        logger('弹题已答对，尝试点击“继续学习”并清理弹窗', 'green');
        var completedQuestion = getVideoQuizText(container);
        var btn = getVisibleVideoQuizNode(container, '#videoquiz-continue, .ans-videoquiz-continue');
        if (btn) try { btn.click(); } catch (_) {}
        setTimeout(function () {
            try {
                if (container.isConnected && getVideoQuizText(container) === completedQuestion && getVideoQuizResult(container) === 'correct') {
                    container.remove();
                }
                if (!getVisibleVideoQuizNode(doc, '.ans-videoquiz') && media.isConnected && media.paused && !media.ended && localStorage.getItem('ZhixingSetting.isPaused') !== 'true') {
                    var play = media.play();
                    if (play && play.catch) play.catch(function () {});
                }
            } catch (_) {}
        }, 800);
        return true;
    }

    if (optionNodes.length === 0) return false;

    try { media.pause(); } catch (_) {}

    var waitForManual = function (message) {
        record.phase = 'manual';
        container.setAttribute('data-ne21-status', 'manual');
        logger(message + '，已停止自动重试，请手动处理', 'orange');
    };
    if (record.phase === 'manual' || record.phase === 'requesting' || record.phase === 'selecting') return true;
    if (!question) { waitForManual('视频弹题未能提取题干'); return true; }
    var submitBtn = getVisibleVideoQuizNode(container, '#videoquiz-submit');

    if (record.phase === 'submitted') {
        if (result === 'wrong') record.phase = 'retry';
        else {
            if (Date.now() - record.submittedAt >= 15000) waitForManual('视频弹题提交结果未确认');
            return true;
        }
    }
    if (record.phase === 'retry' && !getVideoQuizFallbackIndexes(record, optionTexts.length, isMultiple).length) {
        waitForManual('视频弹题已尝试可用答案或达到 16 次上限');
        return true;
    }
    if (result === 'wrong' && !submitBtn) {
        if (!record.replayRequestedAt) {
            var back = getVisibleVideoQuizNode(container, '#knowledgeBack, .ans-videoquiz-back');
            if (!back) { waitForManual('视频弹题答错后无法恢复答题'); return true; }
            record.replayRequestedAt = Date.now();
            logger('视频弹题回答错误，先回看知识点再重试', 'orange');
            try { back.click(); } catch (_) { waitForManual('视频弹题回看失败'); }
        } else if (Date.now() - record.replayRequestedAt >= 15000) {
            waitForManual('视频弹题未能恢复答题');
        }
        return true;
    }
    if (!submitBtn || submitBtn.disabled) return true;
    record.replayRequestedAt = 0;

    var isCurrentQuiz = function () {
        return media.isConnected && isVideoQuizNodeVisible(container) && getVideoQuizText(container, optionNodes) === question && optionNodes.every(function (label) {
            return label.isConnected && container.contains(label);
        });
    };
    var doSubmit = function (indexes) {
        record.pendingIndexes = indexes.slice().sort(function (a, b) { return a - b; });
        record.phase = 'ready';
        if (localStorage.getItem('ZhixingSetting.isPaused') === 'true' || !isCurrentQuiz()) return;
        indexes.forEach(function (idx) {
            var label = optionNodes[idx];
            if (!label) return;
            label.style.fontWeight = 'bold';
            label.style.color = '#dc2626';
        });
        if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
            waitForManual('视频弹题答案已加粗，当前为好学生模式');
            return;
        }
        try {
            optionNodes.forEach(function (label, idx) {
                var wanted = indexes.indexOf(idx) !== -1;
                var input = inputs[idx];
                if (input ? input.checked !== wanted && (isMultiple || wanted) : wanted) label.click();
            });
            if (inputs.some(function (input, idx) { return input && input.checked !== (indexes.indexOf(idx) !== -1); })) {
                waitForManual('视频弹题选项未能正确勾选');
                return;
            }
        } catch (_) { waitForManual('视频弹题选项点击失败'); return; }

        record.phase = 'selecting';
        container.setAttribute('data-ne21-status', 'processing');
        setTimeout(function () {
            record.phase = 'ready';
            if (localStorage.getItem('ZhixingSetting.isPaused') === 'true' || !isCurrentQuiz()) return;
            if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') { waitForManual('当前为好学生模式'); return; }
            if (!isVideoQuizNodeVisible(submitBtn) || submitBtn.disabled) { waitForManual('视频弹题提交按钮不可用'); return; }
            if (inputs.some(function (input, idx) { return input && input.checked !== (record.pendingIndexes.indexOf(idx) !== -1); })) {
                waitForManual('视频弹题勾选状态已变化');
                return;
            }
            record.phase = 'submitted';
            record.submittedAt = Date.now();
            record.triedAnswers.push(record.pendingIndexes.join(','));
            try {
                submitBtn.click();
                logger('视频弹题已提交，等待答题结果', 'green');
            } catch (_) { waitForManual('视频弹题提交失败'); }
        }, 600);
    };

    if (record.phase === 'solved') {
        if (!record.solvedIndexes.length || record.triedAnswers.length >= 16) { waitForManual('视频弹题重复出现次数过多或已验证答案不可用'); return true; }
        logger('视频弹题重复出现，沿用已验证答案', 'orange');
        doSubmit(record.solvedIndexes);
    } else if (record.phase === 'ready') {
        doSubmit(record.pendingIndexes);
    } else if (record.phase === 'retry') {
        var nextIndexes = getVideoQuizFallbackIndexes(record, optionTexts.length, isMultiple);
        if (!nextIndexes.length) { waitForManual('视频弹题已尝试可用答案或达到 16 次上限'); return true; }
        logger('视频弹题上一答案错误，尝试未提交过的' + (isMultiple ? '组合: ' : '选项: ') + nextIndexes.map(function (i) { return optionTexts[i]; }).join(','), 'orange');
        doSubmit(nextIndexes);
    } else {
        record.phase = 'requesting';
        container.setAttribute('data-ne21-status', 'processing');
        var prompt = buildPrompt({
            type: typeName,
            question: question,
            options: optionTexts,
            answer_format: isMultiple ? "用'|'分割多个答案，或回答选项字母" : (isJudge ? '只回答正确或错误，或回答选项字母' : '只回答一个选项字母或选项内容')
        });

        logger('检测到视频中题目，开始处理：' + (taskName || ''), 'purple');
        getAnswer(isMultiple ? 1 : (isJudge ? 3 : 0), prompt).then(function (answer) {
            if (record.phase !== 'requesting') return;
            var indexes;
            if (isJudge) {
                var parsed = parseJudgeAnswer(answer);
                if (parsed) {
                    indexes = [];
                    optionTexts.forEach(function (text, idx) {
                        var norm = normalizeChoiceText(text);
                        if (parsed === 'true' && /正确|对|是|true|√/i.test(norm)) indexes.push(idx);
                        if (parsed === 'false' && /错误|错|否|false|×/i.test(norm)) indexes.push(idx);
                    });
                }
            }
            if (!indexes || indexes.length === 0) {
                indexes = findVideoQuizMatchIndexes(optionTexts, answer, isMultiple);
            }

            if (indexes.length === 0) {
                waitForManual('视频弹题未能匹配到选项');
                return;
            }

            record.aiIndexes = indexes.slice();
            doSubmit(indexes);
        }).catch(function () {
            if (record.phase === 'requesting') waitForManual('视频弹题 AI 作答失败');
        });
    }
    return true;
}

function getRate() {
    var stored = localStorage.getItem('ZhixingSetting.rate');
    var n = stored !== null ? parseFloat(stored) : (setting.rate || 1);
    if (!isFinite(n) || n <= 0) n = 1;
    if (n > 16) n = 16;
    return n;
}

function parseJudgeAnswer(agrs) {
    if (!agrs) return null;
    var s = agrs.replace(/[。，.,!！\s]/g, '').toLowerCase();
    var trueWords = ['正确', '是', '对', '√', 't', 'true', 'ri', 'right', 'yes'];
    var falseWords = ['错误', '否', '错', '×', 'f', 'false', 'wr', 'wrong', 'no'];

    for (let i = 0; i < trueWords.length; i++) {
        if (s === trueWords[i]) return 'true';
    }
    for (let i = 0; i < falseWords.length; i++) {
        if (s === falseWords[i]) return 'false';
    }

    for (let i = 0; i < falseWords.length; i++) {
        if (s.indexOf(falseWords[i]) !== -1) return 'false';
    }
    for (let i = 0; i < trueWords.length; i++) {
        if (s.indexOf(trueWords[i]) !== -1) return 'true';
    }
    return null;
}

function findJudgeOptionIndex(optionTexts, isTrue) {
    var trueWords = ['正确', '是', '对', '√', 'T', 'ri'];
    var falseWords = ['错误', '否', '错', '×', 'F', 'wr'];
    var words = isTrue ? trueWords : falseWords;
    for (var i = 0; i < optionTexts.length; i++) {
        var t = optionTexts[i];
        for (var j = 0; j < words.length; j++) {
            if (t.indexOf(words[j]) !== -1) return i;
        }
    }
    return -1;
}

function findAnswerTextareas($container) {
    if (!$container || $container.length === 0) return $();

    var $eles = $container.find('textarea[name^="answerEditor"]');
    if ($eles.length > 0) return $eles;

    $eles = $container.find('.subEditor textarea, .Answer .divText textarea, .stem_answer textarea, .edui-editor textarea');
    if ($eles.length > 0) return $eles;

    return $container.find('textarea');
}

function getPanelDocument() {
    var current = window;
    try {
        while (true) {
            if (current.document.querySelector('#ne-21box')) return current.document;
            if (current === current.parent) break;
            current = current.parent;
        }
    } catch (_) {}
    return document;
}

function showBox() {

    if (setting.showBox && getPanelDocument().querySelector('#ne-21notice') == undefined) {

        if (!document.getElementById('ne-21style')) {
            var styleEl = document.createElement('style');
            styleEl.id = 'ne-21style';
            styleEl.textContent = `
            /* === Liquid Glass UI (iOS 26 style, neutral light glass) === */
            #ne-21box{position:fixed;top:5%;right:16%;width:340px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-size:13px;color:rgba(15,23,42,.86);background:linear-gradient(180deg,rgba(255,255,255,.62) 0%,rgba(241,245,249,.55) 100%);backdrop-filter:blur(22px) saturate(180%) brightness(1.04);-webkit-backdrop-filter:blur(22px) saturate(180%) brightness(1.04);border:1px solid rgba(255,255,255,.65);border-radius:22px;box-shadow:0 0 0 1px rgba(15,23,42,.09),0 24px 48px -12px rgba(15,23,42,.45),0 10px 26px -8px rgba(15,23,42,.3),inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(15,23,42,.06);overflow:hidden;transition:opacity .25s ease,transform .25s ease;animation:ne21-in .4s cubic-bezier(.2,.9,.3,1) both;}
            @keyframes ne21-in{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:none}}
            #ne-21box .ne21-header{position:relative;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(180deg,rgba(255,255,255,.72) 0%,rgba(248,250,252,.35) 100%);color:rgba(15,23,42,.92);border-bottom:1px solid rgba(15,23,42,.07);cursor:move;user-select:none;}
            #ne-21box .ne21-header::after{content:'';position:absolute;left:14px;right:14px;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent);pointer-events:none;}
            #ne-21box.ne21-collapsed .ne21-body{display:none;}
            #ne-21box.ne21-collapsed .ne21-header{border-bottom:none;}
            #ne-21box.ne21-collapsed .ne21-header::after{display:none;}
                        /* 手机：悬浮球 + 全宽面板 */
            #ne21Ball{position:fixed;right:10px;bottom:22%;width:46px;height:46px;border-radius:50%;z-index:100000;display:none;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:#fff;background:linear-gradient(160deg,#60a5fa,#2563eb);box-shadow:0 8px 20px rgba(37,99,235,.38);cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;}
            #ne21Ball:active{transform:scale(.93);}
            @media (max-width:520px){
                #ne-21box{top:8px;right:8px;left:8px;width:auto;max-height:calc(100vh - 16px);border-radius:16px;}
                #ne-21box .ne21-btn{min-height:36px;}
                #ne-21box .ne21-header{padding:12px 14px;}
                #ne21Ball{display:flex;}
            }
            #ne21DragHandle{display:inline-flex;align-items:center;justify-content:center;width:14px;height:22px;margin-right:1px;color:rgba(15,23,42,.34);cursor:grab;touch-action:none;font-size:13px;line-height:1;user-select:none;-webkit-user-select:none;}
            #ne21DragHandle:active{cursor:grabbing;color:rgba(15,23,42,.6);}
            #ne-21box .ne21-header{touch-action:none;}
            #ne-21box.ne21-dragging{transition:none!important;box-shadow:0 18px 40px rgba(15,23,42,.22);}
            /* 手机：触屏设备按类名走全宽布局（超星页面常带桌面 viewport，媒体查询不生效） */
            #ne-21box.ne21-mobile{top:8px;right:8px;left:8px;width:auto;max-height:calc(100vh - 16px);border-radius:16px;}
            #ne-21box.ne21-mobile .ne21-btn{min-height:36px;}
            #ne-21box.ne21-mobile .ne21-header{padding:12px 14px;}
            #ne-21box .ne21-title{display:flex;align-items:center;gap:7px;font-weight:600;font-size:14px;letter-spacing:.2px;margin:0;color:inherit;flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
            #ne-21box .ne21-dot{width:9px;height:9px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.98),rgba(255,255,255,.5) 55%,rgba(15,23,42,.18) 100%);box-shadow:0 0 0 0 rgba(255,255,255,.7),inset 0 1px 1px rgba(255,255,255,.95);animation:ne21-pulse 2s infinite;flex-shrink:0;}
            @keyframes ne21-pulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7),inset 0 1px 1px rgba(255,255,255,.95)}70%{box-shadow:0 0 0 8px rgba(255,255,255,0),inset 0 1px 1px rgba(255,255,255,.95)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0),inset 0 1px 1px rgba(255,255,255,.95)}}
            #ne-21box #ne-21close, #ne-21box #ne-21pause{margin:0;width:24px;height:24px;padding:0;display:inline-flex;align-items:center;justify-content:center;font-size:0;line-height:1;color:rgba(15,23,42,.7);cursor:pointer;border:1px solid rgba(255,255,255,.65);border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.8),0 1px 2px rgba(15,23,42,.08);transition:background .2s,color .2s,transform .15s;user-select:none;}
            #ne-21box #ne-21close:hover, #ne-21box #ne-21pause:hover{background:rgba(255,255,255,.78);color:rgba(15,23,42,.92);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.9),0 1px 2px rgba(15,23,42,.1);}
            #ne-21box #ne-21close:active, #ne-21box #ne-21pause:active{transform:scale(.92);}
            #ne-21box #ne-21box .ne21-actions{display:flex;align-items:center;gap:6px;flex-shrink:0;}
            #ne-21box .ne21-kbd{display:inline-flex;align-items:center;gap:3px;padding:2px 6px;font-size:10px;font-weight:500;letter-spacing:.2px;color:rgba(15,23,42,.66);background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.72);border-radius:8px;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.85),0 1px 2px rgba(15,23,42,.06);user-select:none;cursor:default;font-family:"SF Mono","Cascadia Code",Consolas,Menlo,monospace;line-height:1;white-space:nowrap;}
            #ne-21box .ne21-kbd b{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;font-weight:600;color:rgba(15,23,42,.78);}
            #ne-21box .ne21-body{padding:14px 16px 16px;}
            #ne-21box #ne-21notice{border-top:none!important;margin:0 0 6px!important;overflow:visible;}
            #ne-21box .ne21-uid{display:flex;align-items:center;gap:6px;color:rgba(15,23,42,.62);font-size:12px;margin-bottom:10px;padding:8px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75),0 1px 2px rgba(15,23,42,.05);}
            #ne-21box .ne21-uid b{color:rgba(15,23,42,.92);font-weight:600;}
            #ne-21box .ne21-uid-missing{flex-direction:column;align-items:flex-start;gap:4px;line-height:1.6;}
            #ne-21box .ne21-row{display:flex;gap:8px;align-items:center;}
            #ne-21box .ne21-btn{display:inline-flex;align-items:center;justify-content:center;padding:7px 14px;font-size:12px;font-weight:500;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,.7);transition:transform .15s,box-shadow .2s,background .2s,color .2s;white-space:nowrap;}
            #ne-21box .ne21-btn-primary{color:rgba(15,23,42,.92);background:rgba(255,255,255,.72);box-shadow:0 0 0 1px rgba(15,23,42,.07),inset 0 1px 0 rgba(255,255,255,.95),inset 0 -6px 12px -6px rgba(15,23,42,.08),0 4px 10px -2px rgba(15,23,42,.22);}
            #ne-21box .ne21-btn-primary:hover{transform:translateY(-1px);background:rgba(255,255,255,.88);box-shadow:0 0 0 1px rgba(15,23,42,.09),inset 0 1px 0 rgba(255,255,255,1),inset 0 -6px 12px -6px rgba(15,23,42,.1),0 6px 14px -2px rgba(15,23,42,.28);}
            #ne-21box .ne21-btn-secondary{color:rgba(15,23,42,.78);background:rgba(255,255,255,.45);box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.75),0 1px 2px rgba(15,23,42,.06);}
            #ne-21box .ne21-btn-secondary:hover{background:rgba(255,255,255,.65);color:rgba(15,23,42,.92);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.85),0 2px 4px rgba(15,23,42,.08);}
            #ne-21box .ne21-btn:active{transform:translateY(0) scale(.98);}
            #ne-21box .ne21-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
            #ne-21box #modelSelect{flex:1;min-width:0;padding:7px 10px;font-size:12px;border-radius:14px;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.55);color:rgba(15,23,42,.86);cursor:pointer;outline:none;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.8);transition:background .2s,box-shadow .2s;}
            #ne-21box #modelSelect:hover{background:rgba(255,255,255,.7);}
            #ne-21box #modelSelect:focus{background:rgba(255,255,255,.75);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.85),0 0 0 4px rgba(15,23,42,.1);}
            #ne-21box .ne21-select{padding:5px 8px;font-size:12px;border-radius:10px;border:1px solid rgba(255,255,255,.65);background:rgba(255,255,255,.5);color:rgba(15,23,42,.86);cursor:pointer;outline:none;min-width:80px;flex-shrink:0;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75);transition:background .2s,box-shadow .2s;}
            #ne-21box .ne21-select:hover{background:rgba(255,255,255,.7);}
            #ne-21box .ne21-select:focus{background:rgba(255,255,255,.72);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.82),0 0 0 3px rgba(15,23,42,.06);}
            #ne-21box #userInfo{margin:10px 0 0;padding:10px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75);font-size:12px;color:rgba(15,23,42,.66);line-height:1.6;overflow:hidden;}
            #ne-21box #userInfo:empty{display:none!important;}
            #ne-21box #userInfo b{color:rgba(15,23,42,.9);font-weight:600;}
            #ne-21box #moreSettings{padding:4px 14px;background:rgba(255,255,255,.42);border:1px solid rgba(255,255,255,.65);border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.7);margin:10px 0 0;}
            #ne-21box #moreSettings label{display:flex;flex-direction:row-reverse;align-items:center;justify-content:space-between;margin:0;padding:8px 2px;font-size:12px;color:rgba(15,23,42,.78);cursor:pointer;user-select:none;line-height:1.4;}
            #ne-21box #moreSettings label + label{border-top:1px dashed rgba(15,23,42,.1);}
#ne-21box #moreSettings .ne21-group{display:flex;align-items:center;gap:8px;margin:10px 0 2px;font-size:11px;color:rgba(15,23,42,.42);letter-spacing:.4px;}
#ne-21box #moreSettings .ne21-group::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(148,163,184,.35),transparent);}
            #ne-21box #moreSettings input[type=checkbox]{appearance:none;-webkit-appearance:none;width:34px;height:20px;border:1px solid rgba(15,23,42,.08);border-radius:20px;cursor:pointer;position:relative;transition:background .25s,box-shadow .25s;background:rgba(15,23,42,.16);box-shadow:inset 0 1px 2px rgba(15,23,42,.12);margin:0 0 0 10px;flex-shrink:0;}
            #ne-21box #moreSettings input[type=checkbox]::before{content:'';position:absolute;top:1px;left:1px;width:16px;height:16px;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,1),rgba(255,255,255,.85));box-shadow:0 1px 3px rgba(15,23,42,.25),inset 0 1px 0 rgba(255,255,255,1);transition:transform .25s cubic-bezier(.2,.9,.3,1);}
            #ne-21box #moreSettings input[type=checkbox]:hover{background:rgba(15,23,42,.24);}
            #ne-21box #moreSettings input[type=checkbox]:checked{background:rgba(255,255,255,.78);border-color:rgba(15,23,42,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -2px 4px rgba(15,23,42,.08),0 0 0 1px rgba(15,23,42,.06);}
            #ne-21box #moreSettings input[type=checkbox]:checked:hover{background:rgba(255,255,255,.92);}
            #ne-21box #moreSettings input[type=checkbox]:checked::before{transform:translateX(14px);}
            #ne-21box #moreSettings p{display:none;}
            #ne-21box #ne-21thinking{display:none!important;}
            @keyframes ne21-spin{to{transform:rotate(360deg)}}
            @keyframes ne21-dot{0%,80%,100%{transform:scale(.5);opacity:.4}40%{transform:scale(1);opacity:1}}
            #ne-21box #ne-21log .ne21-log-spinner{display:inline-block;width:9px;height:9px;margin-right:5px;border:1.5px solid rgba(15,23,42,.18);border-top-color:rgba(15,23,42,.7);border-radius:50%;vertical-align:-1px;animation:ne21-spin .8s linear infinite;}
            #ne-21box #ne-21log .ne21-log-dots{display:inline-flex;gap:2px;margin-left:3px;vertical-align:1px;}
            #ne-21box #ne-21log .ne21-log-dots i{width:3px;height:3px;border-radius:50%;background:currentColor;opacity:.65;animation:ne21-dot 1.2s infinite ease-in-out both;}
            #ne-21box #ne-21log .ne21-log-dots i:nth-child(2){animation-delay:.16s;}
            #ne-21box #ne-21log .ne21-log-dots i:nth-child(3){animation-delay:.32s;}
            #ne-21box #ne-21log{max-height:140px;overflow-y:auto;margin:12px 0 0;padding:10px 12px;background:rgba(15,23,42,.06);border:1px solid rgba(255,255,255,.55);border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 16px rgba(15,23,42,.06);font-family:"SF Mono","Cascadia Code",Consolas,Menlo,monospace;font-size:11px;line-height:1.6;color:rgba(15,23,42,.78);}
            #ne-21box #ne-21log:empty{display:none;}
            #ne-21box #ne-21log::-webkit-scrollbar{width:5px;}
            #ne-21box #ne-21log::-webkit-scrollbar-thumb{background:rgba(15,23,42,.2);border-radius:4px;}
            #ne-21box #ne-21log::-webkit-scrollbar-thumb:hover{background:rgba(15,23,42,.32);}
            #ne-21box #ne-21log p{margin:0;padding:2px 0;word-break:break-all;}
            #ne-21box #ne-21log hr{display:none;}
            #ne-21box #ne-21log .ne21-time{color:rgba(15,23,42,.4);margin-right:6px;}
            #ne-21box{max-height:calc(100vh - 24px);display:flex;flex-direction:column;}
            #ne-21box .ne21-header{flex-shrink:0;}
            #ne-21box .ne21-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;}
            #ne-21box .ne21-body::-webkit-scrollbar{width:6px;}
            #ne-21box .ne21-body::-webkit-scrollbar-thumb{background:rgba(15,23,42,.18);border-radius:4px;}
            #ne-21box #ne21ApiBox label{display:flex;align-items:center;justify-content:flex-start;flex-direction:row;gap:6px;margin:2px 0 10px;font-size:11.5px;color:rgba(15,23,42,.7);}
            #ne-21box #ne21ApiBox .ne21-btn{flex:1 1 auto;}
            #ne-21box #ne21ApiBox #ne21ApiShow{flex:0 0 auto;}
            #ne-21box #ne21ApiState{flex:1 1 auto;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;color:rgba(15,23,42,.55);}
            /* 面板内的开关样式会把复选框画成胶囊，这里单独还原成方块（2 个 id 提升优先级） */
            #ne-21box #moreSettings #ne21ApiVision{appearance:auto;-webkit-appearance:auto;width:14px;height:14px;min-width:14px;max-width:14px;margin:0;padding:0;flex:0 0 14px;position:static;border:0;border-radius:0;background:none;box-shadow:none;accent-color:#2563eb;cursor:pointer;}
            #ne-21box #moreSettings #ne21ApiVision::before{content:none;display:none;background:none;box-shadow:none;}
            `;
            document.head.appendChild(styleEl);
        }
        var box_html = `
            <div id="ne-21box">
                <div class="ne21-header" title="按住标题栏可拖动 / 按 Alt+Z 显示或隐藏面板 / 点击右侧按钮收起">
                    <span id="ne21DragHandle" title="按住拖动面板" aria-label="拖动">⠿</span>
                    <h3 class="ne21-title"><span class="ne21-dot"></span>知行 · 网课助手</h3>
                    <div class="ne21-actions">
                        <span id="ne21FailChip" class="ne21-kbd" style="display:none;color:#dc2626;" title="本次被跳过、建议手动补的题目数"></span>
                        <span class="ne21-kbd" title="按 Alt+Z 显示/隐藏整个面板">Alt+Z</span>
                        <button id="ne-21pause" type="button" aria-label="暂停/继续" style="margin-right:4px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg></button>
                        <button id="ne-21close" type="button" aria-label="收起"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
                    </div>
                </div>
                <div class="ne21-body">
                    <div id="ne-21notice"></div>
                    <div id="userInfo"></div>
                    <div id="moreSettings" style="display:none;">
                        <label title="倍速过高可能导致异常"><select id="ZhixingSetting.rate" class="ne21-select"><option value="1">1×</option><option value="1.5">1.5×</option><option value="2">2×</option><option value="3">3×</option><option value="4">4×</option><option value="6">6×</option><option value="8">8×</option><option value="16">16×</option></select>视频/音频倍速</label>
                        <label title="题目作答间隔与 AI 搜题节流间隔（秒），默认 2.5 秒">
                            <input type="number" id="ZhixingSetting.time" class="ne21-select" min="0" max="60" step="0.5" style="min-width:56px;width:56px;padding:5px 8px;">答题间隔 (秒)
                        </label>
                        <div class="ne21-group">随堂练习</div>
                        <label title="随堂练习答完后自动点提交"><input type="checkbox" id="ZhixingSetting.sub">自动交卷</label>
                        <label title="有没答出的题时也提交"><input type="checkbox" id="ZhixingSetting.force">漏题交卷</label>
                        <label title="勾选＝真的点选选项；不勾＝只把正确项加粗"><input type="checkbox" id="ZhixingSetting.goodStudent">自动选择</label>
                        <label title="在题目下方写一行「答案：…」"><input type="checkbox" id="ZhixingSetting.alterTitle">答案附注</label>
                        <div class="ne21-group">考试</div>
                        <label title="正式考试答完自动点下一题（不含整卷预览）"><input type="checkbox" id="ZhixingSetting.examTurn">考试跳题</label>
                        <div class="ne21-group">整卷预览</div>
                        <label title="整卷预览答完自动下一题"><input type="checkbox" id="ZhixingSetting.previewTurn">预览跳题</label>
                        <div class="ne21-group">题库</div>
                        <label title="先查第三方题库，查不到再用 AI；题干会发送到题库服务器"><input type="checkbox" id="ZhixingSetting.bankOn">题库优先</label>
                        <div class="ne21-group">重做</div>
                        <label title="勾选后，从头扫描时连已答的题一起重做"><input type="checkbox" id="ZhixingSetting.redo">覆盖已答题</label>
                    </div>
                    <div id="ne-21thinking">
                        <div class="ne21-thinking-spinner"></div>
                        <span class="ne21-thinking-text">AI 思考中<span class="ne21-thinking-dots"><i></i><i></i><i></i></span></span>
                    </div>
                    <div id="ne-21log"></div>
                </div>
            </div>
        `;
        $(box_html).appendTo('body');
        try { if (isMobileUI()) { $('#ne-21box').addClass('ne21-mobile'); } } catch (_) { }
        try { $(document).off('click.ne21redo').on('click.ne21redo', '#ne21RedoBtn', function (e) { e.preventDefault(); e.stopPropagation(); gptRedoAll(); }); } catch (_) { }

        (function () {
            var $box = $('#ne-21box');

            try {
                var savedPos = localStorage.getItem('ZhixingSetting.boxPosition');
                if (savedPos) {
                    var pos = JSON.parse(savedPos);
                    if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
                        var vw = window.innerWidth, vh = window.innerHeight;
                        var w = $box.outerWidth() || 340;

                        var nx = Math.max(40 - w, Math.min(pos.left, vw - 40));
                        var ny = Math.max(0, Math.min(pos.top, vh - 40));
                        $box.css({ left: nx + 'px', top: ny + 'px', right: 'auto' });
                    }
                }
            } catch (_) {}

            if (localStorage.getItem('ZhixingSetting.boxCollapsed') === 'true') {
                $box.addClass('ne21-collapsed');
                $('#ne-21close').html('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>').attr('aria-label', '展开');
            }

            if (localStorage.getItem('ZhixingSetting.showBox') === 'hide') {
                $box.css('display', 'none');
            }
        })();

        function gptRefreshPauseBtn() {
            var _started = window.__gptRunStarted === true || window.__gptWantStart === true || !gptManualStartOn();
            var _paused = localStorage.getItem('ZhixingSetting.isPaused') === 'true';
            var $b = $('#ne-21pause');
            if (!_started) {
                $b.html('<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="margin-left:1px"><path d="M7 4v16l13-8z"/></svg>');
                $b.attr('title', '点击开始处理当前页面');
            } else if (_paused) {
                $b.html('<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="margin-left:1px"><path d="M7 4v16l13-8z"/></svg>');
                $b.attr('title', '已暂停，点击继续');
            } else {
                $b.html('<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>');
                $b.attr('title', '运行中，点击暂停');
            }
        }
        $('#ne-21box').on('mousedown', '#ne-21pause', function (e) {
            e.stopPropagation();
        }).on('click', '#ne-21pause', function (e) {
            e.stopPropagation();
            var _started = window.__gptRunStarted === true || window.__gptWantStart === true || !gptManualStartOn();
            if (!_started) {
                if (!window.__gptPendingStart) {
                    window.__gptWantStart = true;
                    try { logger('已按下开始：页面任务就绪后会自动动手', 'green'); } catch (_) { }
                    try { gptRefreshPauseBtn(); } catch (_) { }
                    return;
                }
                var _fn = window.__gptPendingStart;
                window.__gptPendingStart = null;
                window.__gptRunStarted = true;
                try { if (typeof gptTouchAutoRun === 'function') gptTouchAutoRun(); } catch (_) { }
                try { logger('开始处理当前页面', 'green'); } catch (_) { }
                try { _fn(); } catch (err) { try { logger('启动失败：' + (err && err.message ? err.message : err), 'red'); } catch (_) { } }
                try { gptRefreshPauseBtn(); } catch (_) { }
                return;
            }
            var isPaused = localStorage.getItem('ZhixingSetting.isPaused') === 'true';
            isPaused = !isPaused;
            localStorage.setItem('ZhixingSetting.isPaused', isPaused);
            try { gptRefreshPauseBtn(); } catch (_) { }
            if (isPaused) {
                try { logger('脚本已暂停运行', 'orange'); } catch (_) { }
            } else {
                try { logger('脚本已恢复运行', 'green'); } catch (_) { }
            }
        });

        try { gptRefreshPauseBtn(); } catch (_) { }

        $('#ne-21close').on('mousedown', function (e) {
            e.stopPropagation();
        }).on('click', function (e) {
            e.stopPropagation();
            var collapsed = $('#ne-21box').toggleClass('ne21-collapsed').hasClass('ne21-collapsed');
            $(this).html(collapsed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg>');
            $(this).attr('aria-label', collapsed ? '展开' : '收起');

            try { localStorage.setItem('ZhixingSetting.boxCollapsed', collapsed ? 'true' : 'false'); } catch (_) {}
        });

        (function () {
            var $box = $('#ne-21box');
            var $header = $box.find('.ne21-header');
            var dragging = false, sx = 0, sy = 0, sl = 0, st = 0, pw = 0;

            function startDrag(e) {
                var pe = e.originalEvent || e;
                if (pe.button !== undefined && pe.button !== 0 && pe.pointerType !== "touch") return;
                if ($(pe.target).closest('button, a, input, select, textarea').length) return;
                var el = $box[0];
                if (!el) return;
                var rect = el.getBoundingClientRect();
                dragging = true;
                sx = pe.clientX; sy = pe.clientY;
                sl = rect.left; st = rect.top; pw = rect.width;
                $box.addClass('ne21-dragging').css({ left: sl + 'px', top: st + 'px', right: 'auto', width: pw + 'px' });
                try { $("body").css("user-select", "none"); } catch (_) { }
                if (e.preventDefault) e.preventDefault();
            }

            function moveDrag(e) {
                if (!dragging) return;
                var pe = e.originalEvent || e;
                var nx = sl + (pe.clientX - sx);
                var ny = st + (pe.clientY - sy);
                var vw = window.innerWidth, vh = window.innerHeight;
                nx = Math.max(56 - pw, Math.min(nx, vw - 56));
                ny = Math.max(0, Math.min(ny, vh - 44));
                $box.css({ left: nx + 'px', top: ny + 'px' });
                if (e.preventDefault) e.preventDefault();
            }

            function endDrag() {
                if (!dragging) return;
                dragging = false;
                $box.removeClass('ne21-dragging');
                try { $("body").css("user-select", ""); } catch (_) { }
                try {
                    var r = $box[0].getBoundingClientRect();
                    localStorage.setItem('ZhixingSetting.boxPosition', JSON.stringify({ left: r.left, top: r.top }));
                } catch (_) { }
            }

            if (window.PointerEvent) {
                $header.on('pointerdown', startDrag);
                $(document).on('pointermove.ne21drag', moveDrag);
                $(document).on('pointerup.ne21drag pointercancel.ne21drag', endDrag);
            } else {
                $header.on('touchstart', function (e) { startDrag(e); });
                $(document).on('touchmove.ne21drag', moveDrag);
                $(document).on('touchend.ne21drag touchcancel.ne21drag', endDrag);
                $header.on('mousedown', startDrag);
                $(document).on('mousemove.ne21drag', moveDrag);
                $(document).on('mouseup.ne21drag', endDrag);
            }
        })();

        (function () {
            var moreSettings = document.getElementById('moreSettings');
            var userInfo = document.getElementById('userInfo');
            if (!moreSettings || !userInfo) return;

            var isSettingsVisible = false;
            $('#ne-21box').on('click', '#moreSettingsBtn', function () {
                userInfo.style.display = isSettingsVisible ? 'block' : 'none';
                moreSettings.style.display = isSettingsVisible ? 'none' : 'block';
                this.textContent = isSettingsVisible ? '设置' : '返回';
                isSettingsVisible = !isSettingsVisible;
            });

            if (localStorage.getItem('ZhixingSetting.alterTitle') === null) {
                localStorage.setItem('ZhixingSetting.alterTitle', 'true');
            }

            if (localStorage.getItem('ZhixingSetting.fuzzyMatch') === null) {
                localStorage.setItem('ZhixingSetting.fuzzyMatch', 'true');
            }

            if (localStorage.getItem('ZhixingSetting.safeDefaultV2') !== 'true') {
                localStorage.setItem('ZhixingSetting.showBox', 'show');
                localStorage.setItem('ZhixingSetting.safeDefaultV2', 'true');
            }
            if (localStorage.getItem('ZhixingSetting.safeDefaultV1') !== 'true') {
                localStorage.setItem('ZhixingSetting.sub', 'false');
                localStorage.setItem('ZhixingSetting.safeDefaultV1', 'true');
                try { console.warn('[知行] 安全起见已把「自动交卷」默认关闭，需要时在设置里手动打开'); } catch (_) { }
            }

            ['sub', 'force', 'examTurn', 'previewTurn', 'bankOn', 'goodStudent', 'alterTitle', 'redo', 'fuzzyMatch'].forEach(function (settingId) {
                var checkbox = document.getElementById('ZhixingSetting.' + settingId);
                if (!checkbox) return;
                checkbox.addEventListener('change', updateLocalStorage);
                var _sv = localStorage.getItem('ZhixingSetting.' + settingId);
                if (settingId === 'goodStudent') {
                    checkbox.checked = _sv === null ? !setting.goodStudent : _sv !== 'true';
                } else {
                    checkbox.checked = _sv === null ? !!setting[settingId] : _sv === 'true';
                }
            });

            var rateSelect = document.getElementById('ZhixingSetting.rate');
            if (rateSelect) {
                rateSelect.value = localStorage.getItem('ZhixingSetting.rate') || '1';
                rateSelect.addEventListener('change', function () {
                    localStorage.setItem('ZhixingSetting.rate', rateSelect.value);
                });
            }

            var timeInput = document.getElementById('ZhixingSetting.time');
            if (timeInput) {
                var savedTime = localStorage.getItem('ZhixingSetting.time');
                timeInput.value = (savedTime !== null && isFinite(parseFloat(savedTime)))
                    ? savedTime
                    : String((setting.time || 2500) / 1000);
                timeInput.addEventListener('change', function () {
                    var v = parseFloat(timeInput.value);
                    if (!isFinite(v) || v < 0) v = 0;
                    if (v > 60) v = 60;
                    timeInput.value = String(v);
                    localStorage.setItem('ZhixingSetting.time', String(v));
                    setting.time = v * 1000;
                });
            }
        })();
    } else {
        $('#ne-21log', getPanelDocument()).html('')
    }
    let _u = [getCk('_uid'), getCk('UID')].find(value => /^\d+$/.test(value || '') && Number(value) > 0 && Number(value) <= 2147483647) || '';

    $('#ne-21notice').html(`
        <div class="ne21-uid${_u ? '' : ' ne21-uid-missing'}">${_u ? '学习通账号 UID：<b>' + _u + '</b>' : '<b>未获取到学习通 UID</b><span>仍可点击充值前往充值页，页内有客服联系方式。</span>'}</div>
        <div class="ne21-row">
            <button id="ne21RechargeBtn" class="ne21-btn ne21-btn-primary" onclick="window.open('${_host}${_u ? '?uid=' + _u : ''}', '_blank', 'noopener,noreferrer')" title="前往充值页，可联系客服">充值</button>
            <select id="modelSelect">
                <option value="GPT-3.5">GPT-4.1 (普通｜低价)</option>
                <option value="ERNIE-Bot-4.0">GPT-5 (最新)</option>
                <option value="GPT-4">DeepSeek-R1 (思考｜推荐)</option>
                <option value="GPT-4-All">DeepSeek-R1 (联网｜高价)</option>
            </select>
            <button id="moreSettingsBtn" class="ne21-btn ne21-btn-secondary">设置</button>
            <button id="ne21RedoBtn" class="ne21-btn ne21-btn-secondary" title="从第 1 题开始重新扫描（不刷新页面）">从头扫描</button>
        </div>
    `);

    var CACHE_KEY_MODELS = 'ZhixingSetting.cachedModels';
    var cachedModels = localStorage.getItem(CACHE_KEY_MODELS);
    if (cachedModels) {
        $('#modelSelect').html(cachedModels);
    }

    var lastSelectedModel = localStorage.getItem('ZhixingSetting.model');
    if (lastSelectedModel) {
        $('#modelSelect').val(lastSelectedModel);
    }

    $('#modelSelect').off('change.gptjsModel').on('change.gptjsModel', function () {
        localStorage.setItem('ZhixingSetting.model', $(this).val());
    });

    if (typeof OWN_API !== "undefined" && OWN_API && OWN_API.enabled) {
        try {
            $("#ne21RechargeBtn").remove();
            var $ownModelSelect = $("#modelSelect");
            var ownModelList = (OWN_API.models && OWN_API.models.length) ? OWN_API.models.slice(0) : [];
            if (ownModelList.indexOf(OWN_API.model) === -1) ownModelList.unshift(OWN_API.model);
            $ownModelSelect.empty();
            ownModelList.forEach(function (m) {
                $ownModelSelect.append($("<option>").attr("value", m).text(m));
            });
            $ownModelSelect.val(OWN_API.model);
            $ownModelSelect.on("change.gptjsOwnModel", function () {
                OWN_API.model = $(this).val();
                try { gptFillModelSelect(OWN_API.availableModels || OWN_API.models, OWN_API.model); } catch (_) { }
                try { logger("已切换模型：" + OWN_API.model, "blue"); } catch (_) {}
            });
        } catch (_) {}
    }

    if (window === top) { try { ownApiSelfTest(); } catch (_) { } }

    /* ---- 面板内 API 设置（保存到 GM 存储，无需改文件） ---- */
    try {
        var _apiBoxHtml = ''
            + '<div id="ne21ApiBox" style="margin:0 0 10px;padding:10px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75);">'
            + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">'
            + '<b style="font-size:12px;color:rgba(15,23,42,.92);">API 设置</b>'
            + '<span id="ne21ApiState" style="flex:1 1 auto;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;color:rgba(15,23,42,.55);"></span>'
            + '</div>'
            + '<input id="ne21ApiBase" class="ne21-select" style="width:100%;margin-bottom:6px;" placeholder="https://api.deepseek.com/v1" spellcheck="false">'
            + '<input id="ne21ApiKey" class="ne21-select" type="password" style="width:100%;margin-bottom:6px;" placeholder="sk-..." spellcheck="false">'
            + '<select id="ne21ApiModelSel" class="ne21-select" style="width:100%;margin-bottom:6px;"></select><input id="ne21ApiModel" class="ne21-select" style="width:100%;margin-bottom:8px;display:none;" placeholder="自定义模型名" spellcheck="false">'
            + '<select id="ne21ApiAuth" class="ne21-select" style="width:100%;margin-bottom:8px;">'
            + '<option value="bearer">Bearer（默认）</option>'
            + '<option value="x-api-key">x-api-key</option>'
            + '<option value="api-key">api-key（Azure）</option>'
            + '<option value="none">无需认证（本地）</option>'
            + '</select>'
            + '<select id="ne21ApiEffort" class="ne21-select" style="width:100%;margin-bottom:8px;">'
            + '<option value="low">思考强度：低</option>'
            + '<option value="high">思考强度：高</option>'
            + '</select>'
            + '<div id="ne21ApiEffortHint" style="font-size:11px;color:rgba(15,23,42,.52);margin:-4px 0 8px;line-height:1.5;"></div>'
            + '<label style="display:flex;align-items:center;gap:6px;margin:2px 0 10px;font-size:11.5px;color:rgba(15,23,42,.7);"><input type="checkbox" id="ne21ApiVision"> 发送图片（读图）</label>'
            + '<div style="display:flex;gap:8px;">'
            + '<button id="ne21ApiSave" type="button" class="ne21-btn ne21-btn-primary" style="flex:1;">保存并测试</button>'
            + '<button id="ne21ApiShow" type="button" class="ne21-btn ne21-btn-secondary">显示</button>'
            + '</div>'
            + '</div>'
            + '<div style="height:1px;background:rgba(15,23,42,.08);margin:2px 0 10px;"></div>';
        var $more = $('#moreSettings');
        if ($more.length && !$('#ne21ApiBox').length) {
            $more.prepend(_apiBoxHtml);
            $('#ne21ApiBase').val(OWN_API.baseUrl || '');
            $('#ne21ApiKey').val(String(OWN_API.apiKey || '').indexOf('REPLACE') !== -1 ? '' : (OWN_API.apiKey || ''));
            try {
                var _initModels = (Object.prototype.toString.call(OWN_API.availableModels) === '[object Array]' && OWN_API.availableModels.length)
                    ? OWN_API.availableModels
                    : ((Object.prototype.toString.call(OWN_API.models) === '[object Array]' && OWN_API.models.length) ? OWN_API.models : (OWN_API.model ? [OWN_API.model] : []));
                gptFillModelSelect(_initModels, OWN_API.model);
            } catch (_) { }

            $('#ne21ApiModelSel').on('change.gptModelSel', function () {
                var v = $(this).val();
                var $i = $('#ne21ApiModel');
                if (v === '__custom__') { $i.show().focus(); return; }
                $i.hide().val(v);
                OWN_API.model = v;
            });
            $('#ne21ApiAuth').val(OWN_API.authStyle || 'bearer');
            try {
                var _e0 = (String(OWN_API.effort || 'low').toLowerCase() === 'high') ? 'high' : 'low';
                $('#ne21ApiEffort').val(_e0);
                var _effHint = function () {
                    var _v = $('#ne21ApiEffort').val() || 'low';
                    $('#ne21ApiEffortHint').text(_v === 'high' ? '思考更充分、更准，但更慢、更贵' : '更快、更省 token；选择与判断题基本够用');
                };
                _effHint();
                $('#ne21ApiEffort').on('change.gptEffort', _effHint);
            } catch (_) { }
            $('#ne21ApiVision').prop('checked', OWN_API.vision !== false);
            gptApiState(OWN_API.enabled ? '已启用' : '已关闭');
            $('#ne21ApiShow').on('click', function () {
                var $k = $('#ne21ApiKey');
                var show = $k.attr('type') === 'password';
                $k.attr('type', show ? 'text' : 'password');
                $(this).text(show ? '隐藏' : '显示');
            });
            $('#ne21ApiSave').on('click', function () {
                var base = String($('#ne21ApiBase').val() || '').trim().replace(/\/+$/, '');
                var key = String($('#ne21ApiKey').val() || '').trim();
                var _selModel = String($('#ne21ApiModelSel').val() || '').trim();
                var model = (_selModel && _selModel !== '__custom__') ? _selModel : String($('#ne21ApiModel').val() || '').trim();
                if (!base || !/^https?:\/\//i.test(base)) { $('#ne21ApiState').text('地址需以 http(s):// 开头'); return; }
                var _authStyle = String($('#ne21ApiAuth').val() || 'bearer');
                if (!key && _authStyle !== 'none') { $('#ne21ApiState').text('Key 不能为空（无需认证请把鉴权选成 none）'); return; }
                if (!model) { $('#ne21ApiState').text('模型不能为空'); return; }
                OWN_API.baseUrl = base;
                OWN_API.apiKey = key;
                OWN_API.model = model;
                OWN_API.authStyle = _authStyle;
                OWN_API.effort = String($('#ne21ApiEffort').val() || 'low');
                OWN_API.vision = $('#ne21ApiVision').is(':checked') ? 'auto' : false;
                OWN_API.models = [model];
                OWN_API.enabled = true;
                try { GM_setValue('OWN_API_CONFIG', { baseUrl: base, apiKey: key, model: model, models: (Object.prototype.toString.call(OWN_API.availableModels) === '[object Array]' && OWN_API.availableModels.length) ? OWN_API.availableModels : [model], enabled: true, authStyle: OWN_API.authStyle, vision: OWN_API.vision, effort: OWN_API.effort }); } catch (_) { }
                try {
                    var $ms = $('#modelSelect');
                    if ($ms.length) { $ms.empty().append($('<option>').attr('value', model).text(model)).val(model); }
                } catch (_) { }
                gptApiState('正在测试…');
                window.__gptOwnApiTested = false;
                try { ownApiSelfTest(); } catch (_) { }
                try { logger('API 配置已保存：' + base + ' / ' + model, 'green'); } catch (_) { }
            });
        }
    } catch (_apiErr) { console.warn('[知行] API 设置面板渲染失败', _apiErr); }

    updateAuthPanel(cachedModels);
}

var LEARNING_ACCOUNT_STORAGE_KEY = 'ZhixingSetting.lastLearningAccount';

function getLearningAccountId() {
    return [getCk('_uid'), getCk('UID')].find(function (value) {
        return /^\d+$/.test(value || '') && Number(value) > 0 && Number(value) <= 2147483647;
    }) || '';
}

function openRechargePage(learningAccountId) {
    var url = _host + (learningAccountId ? '?uid=' + encodeURIComponent(learningAccountId) : '');
    window.open(url, '_blank', 'noopener,noreferrer');
}

function showLearningAccountChangeNotice(learningAccountId) {
    var message = '检测到您已更换学习通账号，积分是根据学习通账号同步的。如有疑问，请前往充值页联系售后。';
    if (Swal && typeof Swal.fire === 'function') {
        Swal.fire({
            icon: 'info',
            title: '学习通账号已更换',
            text: message,
            confirmButtonText: '前往充值页',
            showCancelButton: true,
            cancelButtonText: '知道了',
            confirmButtonColor: '#0071e3',
            reverseButtons: true
        }).then(function (result) {
            if (result.isConfirmed) openRechargePage(learningAccountId);
        });
        return;
    }
    if (window.confirm(message + '\n\n是否前往充值页？')) openRechargePage(learningAccountId);
}

function checkLearningAccountChange(learningAccountId) {
    if (!learningAccountId) return;
    var previousLearningAccountId = String(GM_getValue(LEARNING_ACCOUNT_STORAGE_KEY, '') || '');
    if (previousLearningAccountId === learningAccountId) return;
    GM_setValue(LEARNING_ACCOUNT_STORAGE_KEY, learningAccountId);
    if (previousLearningAccountId) showLearningAccountChangeNotice(learningAccountId);
}

function updateAuthPanel(cachedModels) {
    var CACHE_KEY_MODELS = 'ZhixingSetting.cachedModels';

    if (_authPromise) {
        _authPromise.then(function (res) {
            var obj = {};
            try { obj = $.parseJSON(res.response) || {}; } catch (e) {}
            var data = obj.data || {};
            var notice = data.notice || '';
            var score = (data.score !== undefined && data.score !== null) ? data.score : '-';
            checkLearningAccountChange(res.learningAccountId);
            $('#userInfo').html(notice || '');
            if (!notice) { $('#userInfo').hide(); } else { $('#userInfo').show(); }

            if (data.models && data.models !== cachedModels) {
                localStorage.setItem(CACHE_KEY_MODELS, data.models);

                var selectedValue = localStorage.getItem('ZhixingSetting.model') || $('#modelSelect').val();
                $('#modelSelect').html(data.models);
                if (selectedValue) {
                    $('#modelSelect').val(selectedValue);
                }
            }
        }).catch(function (error) {
            var body = GptRequestGuard.errorBody(error);
            var message = body.message || error.message || '暂时无法获取账号信息，请稍后重试。';
            var $retry = $('<button type="button" class="ne21-btn ne21-btn-secondary">重新验证</button>').css({ marginTop: '8px' });
            $('#userInfo').empty().append($('<div>').text(message)).append($retry);
            $retry.on('click', function () {
                $retry.prop('disabled', true);
                _authPromise = requestAuth(_host);
                updateAuthPanel(cachedModels);
            });
        });
    }
}

var _ne21LogColorMap = {
    red: '#dc2626', green: '#059669', blue: '#2563eb',
    yellow: '#ca8a04', orange: '#ea580c', purple: '#7c3aed',
    pink: '#db2777', gray: '#64748b', grey: '#64748b'
}
function logger(str, color) {
    var _time = new Date().toLocaleTimeString()
    var c = (_ne21LogColorMap || {})[color] || color || '#334155'
    var $p = $('<p><span class="ne21-time">[' + _time + ']</span><span class="ne21-msg" style="color:' + c + ';">' + str + '</span></p>')
    var $log = $('#ne-21log', getPanelDocument())
    var _el = $log.length ? $log[0] : null
    var _stick = true
    if (_el) _stick = (_el.scrollHeight - _el.scrollTop - _el.clientHeight) < 32
    $log.append($p)
    if (_el && _stick) { try { _el.scrollTop = _el.scrollHeight } catch (_) { } }
    return $p
}

function updateLogEntry($p, str, color) {
    if (!$p || !$p.length) return
    var c = _ne21LogColorMap[color] || color || '#334155'
    $p.find('.ne21-msg').css('color', c).html(str)
}

function getStr(str, start, end) {
    let res = str.match(new RegExp(`${start}(.*?)${end}`))
    return res ? res[1] : null
}

function getTaskParams(doc) {
    try {
        var _iframeScripts = (doc || _d).scripts,
            _p = null;
        for (let i = 0; i < _iframeScripts.length; i++) {
            if (_iframeScripts[i].innerHTML.indexOf('mArg = "";') != -1 && _iframeScripts[i].innerHTML.indexOf('==UserScript==') == -1) {
                _p = getStr(_iframeScripts[i].innerHTML.replace(/\s/g, ""), 'try{mArg=', ';}catch');
                return _p
            }
        }
        return _p
    } catch (e) {
        return null
    }

}

function getCk(name) {
    return document.cookie.match(`[;\\s+]?${name}=([^;]*)`)?.pop();
}

function autoLogin() {
    logger('用户已设置自动登录', 'green')
    if (setting.phone.length <= 0 || setting.password.length <= 0) {
        logger('用户未设置登录信息', 'red')
        return
    }
    setTimeout(() => {
        $('#phone').val(setting.phone)
        $('#pwd').val(setting.password)
        $('#loginBtn').click()
    }, 3000)
}

function getStudyWindow() {
    var current = _w;
    try {
        while (current) {
            if (current.location.pathname.includes('/mycourse/studentstudy')) return current;
            if (current === current.parent) break;
            current = current.parent;
        }
    } catch (_) {}
    return _w.top;
}

function getStudyCardsDocument(studyWindow) {
    try {
        if (studyWindow.location.pathname.includes('/knowledge/cards')) return studyWindow.document;
        for (var i = 0; i < studyWindow.frames.length; i++) {
            var doc = getStudyCardsDocument(studyWindow.frames[i]);
            if (doc) return doc;
        }
    } catch (_) {}
    return null;
}

function isEmptyStudyPage(doc) {
    if (!doc || doc.readyState !== 'complete') return false;
    var params = getTaskParams(doc);
    try {
        var parsed = JSON.parse(params);
        if (parsed && Array.isArray(parsed.attachments)) {
            return parsed.attachments.length === 0;
        }
    } catch (_) {}
    return !!doc.querySelector('.ans-cc') &&
        !doc.querySelector('.ans-attach-ct, .ans-job-ct, .chapter-item');
}

function scheduleStudyNavigation(studyWindow, navigate) {
    var doc = studyWindow.document;
    var cardsDoc = getStudyCardsDocument(studyWindow);

    var chapterId = doc.querySelector('.posCatalog_active')?.id || '';
    var tabSelector = '#prev_tab > li.active, .prev_ul > li.active, #prevTabBox > li.active, span.currents';
    var activeTab = doc.querySelector(tabSelector);
    var pending = studyWindow._gptJsNextPagePending;
    if (pending && pending.cardsDoc === cardsDoc && pending.chapterId === chapterId && pending.activeTab === activeTab) return;
    pending = { cardsDoc: cardsDoc, chapterId: chapterId, activeTab: activeTab };
    studyWindow._gptJsNextPagePending = pending;

    function release() {
        if (studyWindow._gptJsNextPagePending === pending) studyWindow._gptJsNextPagePending = null;
    }
    studyWindow.setTimeout(function run() {
        if (studyWindow.document !== doc || getStudyCardsDocument(studyWindow) !== cardsDoc ||
            (doc.querySelector('.posCatalog_active')?.id || '') !== chapterId || doc.querySelector(tabSelector) !== activeTab) {
            release();
            return;
        }
        if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
            studyWindow.setTimeout(run, 1000);
            return;
        }
        try {
            if (!navigate()) release();
        } catch (error) {
            release();
            logger('自动切换失败：' + error.message, 'red');
        }
    }, 2000);
}

function toNext(noTasks) {
    if (typeof gptRunAllowed === 'function' && !gptRunAllowed() && !window.__gptWantStart) {
        window.__gptPendingStart = window.__gptPendingStart || function () { toNext(noTasks); };
        return;
    }
    try { if (typeof gptTouchAutoRun === 'function') gptTouchAutoRun(); } catch (_) { }
    var studyWindow = getStudyWindow();

    if (_l.pathname.includes('/knowledge/cards') && getStudyCardsDocument(studyWindow) !== _d) return;
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(function () { toNext(noTasks); }, 3000);
        return;
    }

    var courseList = noTasks === true || setting.review || !setting.work ? Promise.resolve(null) : refreshCourseList().catch(function (error) {
        logger(error.message + '，使用页面目录继续处理', 'orange');
        return studyWindow.document.querySelector('#coursetree');
    });
    courseList.then((res) => {

        if (_l.pathname.includes('/knowledge/cards') && getStudyCardsDocument(studyWindow) !== _d) return;

        function detectSubTabPosition() {
            try {

                var selectors = ['#prev_tab > li', '.prev_ul > li', '#prevTabBox > li'];
                for (var i = 0; i < selectors.length; i++) {
                    var nodes = studyWindow.document.querySelectorAll(selectors[i]);
                    if (!nodes || nodes.length === 0) continue;
                    var tabs = Array.prototype.slice.call(nodes);
                    var activeIdx = -1;
                    for (var j = 0; j < tabs.length; j++) {
                        if (tabs[j].classList && tabs[j].classList.contains('active')) {
                            activeIdx = j;
                            break;
                        }
                    }
                    if (activeIdx === -1) continue;
                    return {
                        activeIndex: activeIdx,
                        total: tabs.length,
                        hasNext: activeIdx < tabs.length - 1,
                        tabs: tabs
                    };
                }

                var currents = studyWindow.document.querySelector('span.currents');
                if (currents) {
                    var nextSibs = [];
                    var sib = currents.nextElementSibling;
                    while (sib) {
                        if (sib.tagName === 'SPAN') nextSibs.push(sib);
                        sib = sib.nextElementSibling;
                    }
                    if (nextSibs.length > 0) {
                        return { activeIndex: 0, total: nextSibs.length + 1, hasNext: true, tabs: [currents].concat(nextSibs) };
                    }
                }
            } catch (e) {}
            return null;
        }

        function clickNextPageBtn() {
            $('#ne-21log', getPanelDocument()).html('')
            try { studyWindow._gptJsJumpAllowed = true; } catch (_) {}
            var nextBtn = studyWindow.document.querySelector('#mainid .prev_next.next')
            if (nextBtn) { nextBtn.click(); return true }
            var sub = detectSubTabPosition();
            if (sub && sub.hasNext && sub.tabs) {
                sub.tabs[sub.activeIndex + 1].click();
                return true;
            }
            logger('未找到本课时下一页入口，等待页面加载', 'orange');
            return false
        }

        function clickNextChapterBtn() {
            $('#ne-21log', getPanelDocument()).html('')
            try { studyWindow._gptJsJumpAllowed = true; } catch (_) {}
            var nextBtn = studyWindow.document.querySelector('#mainid .prev_next.next')
            if (nextBtn) { nextBtn.click(); return true }
            var focusBtn = studyWindow.document.querySelector('#prevNextFocusNext')
            if (focusBtn) { focusBtn.click(); return true }
            logger('未找到下一章节入口，本次不切换', 'orange');
            return false
        }

        var sub = detectSubTabPosition()
        if (sub && sub.hasNext) {
            logger('当前课时存在未完成页面（' + (sub.activeIndex + 1) + '/' + sub.total + '），准备切换到下一页', 'blue')
            scheduleStudyNavigation(studyWindow, clickNextPageBtn)
            return
        }

        if (noTasks === true || setting.review || !setting.work) {
            logger(noTasks === true ? '当前页面无任务点，准备切换到下一章节' : '本课时已无未完成页面，准备切换到下一章节', 'blue')
            scheduleStudyNavigation(studyWindow, clickNextChapterBtn)
            return
        }
        let _t = []
        $.each($(res).find('li'), (_, t) => {
            let curid = $(t).find('.posCatalog_select').attr('id'),
                status = $(t).find('.prevHoverTips').text(),
                name = $(t).find('.posCatalog_name').attr('title');
            if (curid && curid.indexOf('cur') != -1) {
                _t.push({ 'curid': curid, 'status': status, 'name': name })
            }
        })

        let _curChaterId = $('#coursetree', studyWindow.document).find('.posCatalog_active').attr('id')
        let _curIndex = _t.findIndex((item) => item['curid'] == _curChaterId)
        if (_curIndex < 0) {
            logger('课程目录未能定位当前章节，尝试页面下一节入口', 'orange')
            scheduleStudyNavigation(studyWindow, clickNextChapterBtn)
            return
        }
        for (_curIndex; _curIndex < _t.length - 1; _curIndex++) {

            if (_t[_curIndex]['status'].indexOf('待完成') != -1) {
                var subAgain = detectSubTabPosition()
                if (subAgain && subAgain.hasNext) {
                    logger('兜底检测到本课时仍有未完成页面（' + (subAgain.activeIndex + 1) + '/' + subAgain.total + '），切换到下一页', 'blue')
                    scheduleStudyNavigation(studyWindow, clickNextPageBtn)
                    return
                }
            }
            let t = _t[_curIndex + 1]
            if (t['status'].indexOf('待完成') != -1) {
                scheduleStudyNavigation(studyWindow, function () {
                    var clicked = clickNextChapterBtn()
                    showBox()
                    return clicked
                })
                return
            } else if (t['status'].indexOf('闯关') != -1) {
                logger('当前为闯关模式，存在未完成任务点，脚本已暂停运行，请手动完成并点击下一章节', 'red')
                return
            } else if (t['status'].indexOf('开放') != -1) {
                logger('章节未开放', 'red')
                return
            } else {

            }
        }
        logger('此课程处理完毕', 'green')
        return
    }).catch(function (error) {
        logger('自动切换失败：' + error.message, 'red');
    })
}

function missonStart() {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(missonStart, 3000);
        return;
    }
    if (_mlist.length <= 0) {
        logger('此页面任务处理完毕，准备跳转页面', 'green')
        return toNext()
    }
    let _type = _mlist[0]['type'],
        _dom = _domList[0],
        _task = _mlist[0];
    if (_type == undefined) {
        _type = _mlist[0]['property']["module"]
    }
    switch (_type) {
        case "video":
            if (_mlist[0]['property']['module'] == 'insertvideo') {
                logger('开始处理视频', 'purple')
                missonVideo(_dom, _task)
                break
            } else if (_mlist[0]['property']['module'] == 'insertaudio') {
                logger('开始处理音频', 'purple')
                missonVideo(_dom, _task)
                break
            } else {
                logger('未知类型任务，请联系作者，跳过', 'red')
                switchMission()
                break
            }
        case "workid":
            logger('开始处理测验', 'purple')
            missonWork(_dom, _task)
            break
        case "document":
            logger('开始处理文档', 'purple')
            missonDoucument(_dom, _task)
            break
        case "read":
            logger('开始处理阅读', 'purple')
            missonRead(_dom, _task)
            break
        case "insertbook":
            logger('开始处理读书', 'purple')
            missonBook(_dom, _task)
            break
        case "knowledgeGraph":
            logger('开始处理知识图谱', 'purple')
            missonKnowledgeGraph(_task)
            break
        default: {

            let GarbageTasks = ['insertimage', 'insertanswerquestion', 'insertshare', 'insertquestion', 'insertdiscuss', 'insertsubject']
            if (GarbageTasks.indexOf(_type) != -1) {
                logger('发现无需处理任务（' + _type + '），跳过。', 'red')
                switchMission()
            } else {
                logger('暂不支持处理此类型:' + _type + '，跳过。', 'red')
                switchMission()
            }
        }
    }
}

async function playMedia(playFunction) {
    const tryPlayMedia = () => {
        return new Promise((resolve, reject) => {
            try {
                const playRes = playFunction();
                if (playRes) {
                    playRes.then(resolve).catch(reject);
                } else {
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        });
    };
    try {
        await tryPlayMedia();
        return true;
    } catch (err) {
        console.error(err);
        if (String(err).includes("failed because the user didn't interact with the document first")) {
            return new Promise((resolve) => {
                const content = "播放音视频失败，由于浏览器的用户隐私保护措施，如果要播放带有音量的视频，或者某些无法自动播放音视频的网站，您必须先点击一次页面上的任意位置脚本才能进行音视频的播放，后续无需重新点击。";
                if (typeof Swal !== 'undefined' && Swal.fire) {
                    Swal.fire({
                        title: "提示",
                        text: content,
                        icon: "warning",
                        confirmButtonText: "确定"
                    }).then(async () => {
                        try {
                            await tryPlayMedia();
                            resolve(true);
                        } catch (e) {
                            console.error(e);
                            resolve(false);
                        }
                    });
                } else {
                    alert(content);
                    tryPlayMedia().then(() => resolve(true)).catch(() => resolve(false));
                }
            });
        } else if (String(err).includes("The element has no supported sources")) {
            logger("当前视频无法播放。", "red");
        } else if (String(err).includes("background media was paused to save power") || String(err).includes("interrupted because video-only") || String(err).includes("interrupted by a call to pause")) {
            console.log("[知行] 忽略浏览器播放中断:", err);
        } else {
            logger("播放视频时发生未知错误：" + String(err), "red");
        }
        return false;
    }
}

function missonVideo(dom, obj) {
    const { isPassed, otherInfo, property } = obj;
    const { _jobid: jobId, name, objectid: objectId, module } = property;

    const isAudioTask = module === 'insertaudio';
    const taskLabel = isAudioTask ? '音频' : '视频';

    if (isAudioTask ? !setting.audio : !setting.video) {
        logger(`用户设置不处理${taskLabel}任务，准备开始下一个任务。`, 'red');
        return setTimeout(switchMission, 3000);
    }

    if (!setting.review && isPassed === true) {
        logger(`${taskLabel}：${name} 检测已完成，准备处理下一个任务`, 'green');
        return switchMission();
    }

    let mediaType = isAudioTask ? 'audio' : 'video';

    logger(`处理${taskLabel}：${name}，正在解析`);
    let executed = false;
    let _parseDebugLogged = false;

    const PARSE_TIMEOUT_MS = 60 * 1000;
    const parseStartTime = Date.now();

    function searchIframesForMedia(iframes) {
        for (var fi = 0; fi < iframes.length; fi++) {
            var frame = iframes[fi];
            var frameDoc;
            try {
                frameDoc = frame.contentDocument || frame.contentWindow.document;
            } catch (_) { continue; }
            if (!frameDoc) continue;

            var m = frameDoc.querySelector('video') || frameDoc.querySelector('audio');
            if (m) {
                if (m.tagName.toLowerCase() === 'audio') mediaType = 'audio';
                return { media: m, doc: frameDoc };
            }

            try {
                var nested = frameDoc.querySelectorAll('iframe');
                for (var ni = 0; ni < nested.length; ni++) {
                    var nDoc;
                    try { nDoc = nested[ni].contentDocument || nested[ni].contentWindow.document; } catch (_) { continue; }
                    if (!nDoc) continue;
                    m = nDoc.querySelector('video') || nDoc.querySelector('audio');
                    if (m) {
                        if (m.tagName.toLowerCase() === 'audio') mediaType = 'audio';
                        return { media: m, doc: nDoc };
                    }
                }
            } catch (_) {}
        }
        return null;
    }

    const intervalId = setInterval(() => {
        if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') return;

        if (!executed && Date.now() - parseStartTime > PARSE_TIMEOUT_MS) {
            clearInterval(intervalId);
            var _reloadKey = "ZhixingSetting.reloadCount:" + (name || "");
            var _reloadCount = parseInt(localStorage.getItem(_reloadKey) || "0", 10) || 0;
            if (_reloadCount >= 3) {
                logger(`${taskLabel}：${name} 已连续 ${_reloadCount} 次解析超时，停止自动刷新，请手动检查这个任务点`, "red");
                return;
            }
            localStorage.setItem(_reloadKey, String(_reloadCount + 1));
            logger(`${taskLabel}：${name} 解析超时（超过60秒未加载），第 ${_reloadCount + 1}/3 次刷新重试`, 'red');
            setTimeout(() => { location.reload(); }, 2000);
            return;
        }

        var result = dom && dom.length > 0 ? searchIframesForMedia(dom) : null;

        if (!result) {
            try {
                var allIframes = _d.querySelectorAll('.ans-attach-ct iframe');
                if (allIframes.length > 0) {
                    result = searchIframesForMedia(allIframes);
                }
            } catch (_) {}
        }

        if (!_parseDebugLogged) {
            _parseDebugLogged = true;
            var domSrcs = [];
            if (dom && dom.length > 0) {
                for (var di = 0; di < dom.length; di++) domSrcs.push(dom[di].src || '(无src)');
            }
            console.log('[知行 Debug] dom iframes:', domSrcs, '| 找到媒体:', !!result);
        }

        if (result && !executed) {
            executed = true;
            clearInterval(intervalId);
            try { localStorage.removeItem("ZhixingSetting.reloadCount:" + (name || "")); } catch (_) {}

            var media = result.media;
            var doc = result.doc;

            const userRate = getRate();
            const finalRate = userRate;
            if (mediaType === 'video' && isPlaybackRateDisabled(doc) && userRate > 1) {
                logger(`${name} 超星倍速菜单不可用，已改用脚本强制倍速：${userRate}×`, 'orange');
            } else if (userRate > 1) {
                logger(`已开启倍速：${userRate}×（高倍速可能被超星判定异常）`, 'orange');
            }

            logger(`${name} - ${mediaType} 播放成功，开始控制播放（${finalRate}×）`);

            const runPlayback = () => {
                return new Promise((resolve, reject) => {

                    const reloadInterval = setInterval(() => {
                        const errorDiv = doc.querySelector(".vjs-modal-dialog-content");
                        if (["视频文件损坏", "网络错误导致视频下载中途失败", "视频因格式不支持", "网络的问题无法加载"].some(
                            (s) => errorDiv && errorDiv.innerText.includes(s)
                        )) {
                            logger("检测到视频/音频加载失败，即将跳过。", "red");
                            clearInterval(reloadInterval);
                            if (quizIntervalId) clearInterval(quizIntervalId);
                            setTimeout(resolve, 3000);
                        }
                    }, 3000);

                    const quizIntervalId = mediaType === 'video' ? setInterval(function () {
                        handleVideoQuiz(doc, media, name);
                    }, 1500) : null;

                    const playFunction = async () => {
                        if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') return;
                        if (mediaType === 'video' && doc.querySelector('.ans-videoquiz')) return;
                        if (media.ended === false) {
                            await new Promise(r => setTimeout(r, 1000));
                            if (media.paused && media.ended === false) {
                                media.muted = true;
                                try {
                                    media.play().then(() => {
                                        hookMediaRate(media, finalRate);
                                    }).catch(async (e) => {
                                        console.log('[知行] 后台恢复播放失败，尝试静音并重新播放:', e);
                                        media.muted = true;
                                        await playMedia(() => media.play());
                                        hookMediaRate(media, finalRate);
                                    });
                                } catch (err) {
                                    console.error(err);
                                }
                            }
                        }
                    };

                    media.addEventListener("pause", playFunction);

                    let rateRestored = finalRate <= 1;
                    const onTimeUpdate = () => {
                        if (!rateRestored && isFinite(media.duration) && media.duration - media.currentTime < 10) {
                            rateRestored = true;
                            try { delete media.playbackRate; } catch (_) {}
                            hookMediaRate(media, 1);
                            media.removeEventListener('timeupdate', onTimeUpdate);
                        }
                    };
                    if (!rateRestored) {
                        media.addEventListener('timeupdate', onTimeUpdate);
                    }

                    let _playbackResolved = false;
                    const _doResolve = (reason) => {
                        if (_playbackResolved) return;
                        _playbackResolved = true;
                        logger(`${name} - ${mediaType} ${reason || '已播放完成'}`);
                        media.removeEventListener("pause", playFunction);
                        media.removeEventListener('timeupdate', onTimeUpdate);
                        if (quizIntervalId) clearInterval(quizIntervalId);
                        clearInterval(reloadInterval);
                        clearInterval(_stallCheckId);
                        resolve();
                    };
                    media.addEventListener("ended", () => { _doResolve('已播放完成'); });

                    let _lastProgressTime = -1;
                    let _stalledMs = 0;
                    const _STALL_LIMIT_MS = 5 * 60 * 1000;
                    const _stallCheckId = setInterval(() => {

                        if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
                            _lastProgressTime = media.currentTime;
                            _stalledMs = 0;
                            return;
                        }
                        if (mediaType === 'video' && doc.querySelector('.ans-videoquiz')) {
                            _lastProgressTime = media.currentTime;
                            _stalledMs = 0;
                            return;
                        }
                        if (Math.abs(media.currentTime - _lastProgressTime) > 0.5) {
                            _lastProgressTime = media.currentTime;
                            _stalledMs = 0;
                        } else {
                            _stalledMs += 30 * 1000;
                            if (_stalledMs >= _STALL_LIMIT_MS) {
                                _doResolve('播放长时间无进度（疑似卡死），自动跳过');
                            }
                        }
                    }, 30 * 1000);

                    media.muted = true;
                    media.currentTime = 0;
                    setTimeout(() => {
                        playMedia(() => media.play()).then(() => {
                            hookMediaRate(media, finalRate);
                        }).catch(reject);
                    }, 200);
                });
            };

            runPlayback().then(() => {
                setTimeout(switchMission, 1000);
            }).catch(err => {
                logger(`${name} - 播放异常: ${err}，即将切换下一任务`, 'red');
                setTimeout(switchMission, 1000);
            });
        }
    }, 2500);
}

function hookMediaRate(media, rate) {
    try { media.playbackRate = rate; } catch (_) {}
    try {
        Object.defineProperty(media, 'playbackRate', {
            configurable: true,
            get: function () { return rate; },
            set: function () {}
        });
    } catch (_) {
        try {
            media.addEventListener('ratechange', function () {
                if (media.playbackRate !== rate) {
                    try { media.playbackRate = rate; } catch (__) {}
                }
            });
        } catch (___) {}
    }
}

function isPlaybackRateDisabled(iframeDocument) {
    try {
        var items = iframeDocument.querySelectorAll('.vjs-playback-rate .vjs-menu-content .vjs-menu-item');
        return items.length === 0;
    } catch (_) {
        return false;
    }
}

function missonBook(dom, obj) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { missonBook(dom, obj) }, 3000);
        return;
    }
    if (setting.task) {
        if (obj['jobid'] == undefined) {
            logger("当前只处理任务点任务,跳过", 'red')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['bookname'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger('读书：' + name + '检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger('读书：' + name + res.msg + ',准备执行下一个任务。', 'green')
            } else {
                logger('读书：' + name + '处理异常,跳过。', 'red')
            }
            switchMission()
            return
        },
    })
}

function missonDoucument(dom, obj) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { missonDoucument(dom, obj) }, 3000);
        return;
    }
    if (setting.task) {
        if (obj['jobid'] == undefined) {
            logger("当前只处理任务点任务,跳过", 'red')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['name'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger('文档：' + name + '检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job/document?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger('文档：' + name + res.msg + ',准备执行下一个任务。', 'green')
            } else {
                logger('文档：' + name + '处理异常,跳过。', 'red')
            }
            switchMission()
            return
        },
    })

}

function missonRead(dom, obj) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { missonRead(dom, obj) }, 3000);
        return;
    }
    if (setting.task) {
        if (obj['jobid'] == undefined) {
            logger("当前只处理任务点任务,跳过", 'red')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['title'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger('阅读：' + name + ',检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job/readv2?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger('阅读：' + name + res.msg + ',准备执行下一个任务。', 'green')
            } else {
                logger('阅读：' + name + '处理异常,跳过。', 'red')
            }
            switchMission()
            return
        }
    })
}

function missonKnowledgeGraph(obj) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(function () { missonKnowledgeGraph(obj) }, 3000);
        return;
    }
    var taskName = (obj['property'] && obj['property']['name']) || '知识图谱';

    if (obj['job'] == undefined) {
        logger('知识图谱：' + taskName + '，检测已完成，准备执行下一个任务。', 'green')
        switchMission()
        return
    }

    var clicked = false;
    try {
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                var iframeDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
                if (!iframeDoc) continue;
                var packBtn = iframeDoc.querySelector('#graphPackBtn');
                if (packBtn) {

                    if (!packBtn.classList.contains('active')) {
                        packBtn.click();
                        logger('知识图谱：' + taskName + '，已点击展开按钮', 'green');
                    } else {
                        logger('知识图谱：' + taskName + '，已是展开状态', 'green');
                    }
                    clicked = true;
                    break;
                }
            } catch (e) {

            }
        }
    } catch (e) {
        console.log('[知行] 查找知识图谱 iframe 异常:', e);
    }
    if (!clicked) {
        logger('知识图谱：' + taskName + '，未找到展开按钮，可能已完成或不在当前页面，跳过', 'orange');
    }

    setTimeout(function () { switchMission() }, 3000);
}

function missonWork(dom, obj) {
    if (!setting.work) {
        logger('用户设置不自动处理测验，准备处理下一个任务', 'green')
        switchMission()
        return
    }
    let isDo;
    if (setting.task) {
        logger("当前只处理任务点任务", 'red')
        if (obj['jobid'] == undefined ? false : true) {
            isDo = true
        } else {
            isDo = false
        }
    } else {
        logger("当前默认处理所有任务（包括非任务点任务）", 'red')
        isDo = true
    }
    if (isDo) {
        if (obj['jobid'] !== undefined) {
            var phoneWeb = _l.protocol + '//' + _l.host + '/work/phone/work?workId=' + obj['jobid'].replace('work-', '') + '&courseId=' + _defaults['courseid'] + '&clazzId=' + _defaults['clazzId'] + '&knowledgeId=' + _defaults['knowledgeid'] + '&jobId=' + obj['jobid'] + '&enc=' + obj['enc']

            setTimeout(() => { startDoPhoneCyWork(0, dom, phoneWeb) }, 3000)
        } else {
            setTimeout(() => { startDoCyWork(0, dom) }, 3000)
        }

    } else {
        logger('用户设置只处理属于任务点的任务，准备处理下一个任务', 'green')
        switchMission()
        return
    }
}

function doPhoneWork($dom) {
    let $cy = $dom.find('.Wrappadding form')
    $subBtn = $cy.find('.zquestions .zsubmit .btn-ok-bottom')
    $okBtn = $dom.find('#okBtn')
    $saveBtn = $cy.find('.zquestions .zsubmit .btn-save')
    let TimuList = $cy.find('.zquestions .Py-mian1')
    startDoPhoneTimu(0, TimuList)
}

function startDoPhoneTimu(index, TimuList) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { startDoPhoneTimu(index, TimuList) }, 3000);
        return;
    }
    if (index == TimuList.length) {
        if (localStorage.getItem('ZhixingSetting.sub') === 'true') {
            logger('测验处理完成，准备自动提交。', 'green')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $okBtn.click()
                    logger('提交成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        } else if (localStorage.getItem('ZhixingSetting.force') === 'true') {
            logger('测验处理完成，存在无答案题目,由于用户设置了强制提交，准备自动提交。', 'red')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $okBtn.click()
                    logger('提交成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        } else {
            logger('测验处理完成，存在无答案题目或用户设置不自动提交，自动保存！', 'green')
            setTimeout(() => {
                $saveBtn.click()
                setTimeout(() => {
                    logger('保存成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        }
        return
    }

    let contextWindow = TimuList[index] ? (TimuList[index].ownerDocument.defaultView || unsafeWindow) : unsafeWindow;
    let questionFull = $(TimuList[index]).find('.Py-m1-title').html()
    let _question = tidyQuestion(questionFull).replace(/.*?\[.*?题\]\s*\n\s*/, '').trim()
    let typeName = questionFull.match(/.*?\[(.*?)]|$/)[1];
    let _type = ({
        单选题: 0, 单项选择题: 0, 单选: 0, 选择题: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    let _a = []
    let _answerTmpArr
    var check_answer_flag = 0;

    if (_type === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        let singleChoiceList = $(TimuList[index]).find('.answerList.singleChoice li');
        let multiChoiceList = $(TimuList[index]).find('.answerList.multiChoice li');

        if (singleChoiceList && singleChoiceList.length > 0) {
            _type = 0;
            logger('自动识别为单选题', 'green');
        } else if (multiChoiceList && multiChoiceList.length > 0) {
            _type = 1;
            logger('自动识别为多选题', 'green');
        } else {

            let tkList = $(TimuList[index]).find('.blankList2 input');
            if (tkList && tkList.length > 0) {
                _type = 2;
                logger('自动识别为填空题', 'green');
            } else {

                let panduanList = $(TimuList[index]).find('.answerList.panduan li');
                if (panduanList && panduanList.length > 0) {
                    _type = 3;
                    logger('自动识别为判断题', 'green');
                } else {

                    let textareaList = $(TimuList[index]).find('textarea');
                    let editorList = $(TimuList[index]).find('.edui-editor');

                    if ((textareaList && textareaList.length > 0) || (editorList && editorList.length > 0)) {
                        _type = 4;
                        logger('自动识别为简答题或材料题', 'green');
                    }
                }
            }
        }
    }

    _currentQuestionMeta = { index: index, total: TimuList.length, typeName: typeName }
    switch (_type) {
        case 0: {

            _answerTmpArr = $(TimuList[index]).find('.answerList.singleChoice li')
            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");

            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，按「覆盖已答题」重新作答', 'blue')

                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    _answerTmpArr = $(TimuList[index]).find('.answerList.singleChoice li')
                    $.each(_answerTmpArr, (i, t) => {
                        _a.push(tidyStr($(t).html()).replace(/^[A-Z]\s*\n\s*/, '').trim())
                    })
                    let _i = _a.findIndex((item) => item == agrs)
                    if (_i == -1) {

                        _i = findBestFuzzyMatch(_a, agrs)
                    }
                    if (_i == -1) {
                        gptRecordFail("AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题")

                        localStorage.setItem('ZhixingSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    } else {
                        $(_answerTmpArr[_i]).click()
                        logger('自动答题成功，准备切换下一题', 'green')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 1: {

            _answerTmpArr = $(TimuList[index]).find('.answerList.multiChoice li')
            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，按「覆盖已答题」重新作答', 'blue')

                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        gptRecordFail("AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题")

                        localStorage.setItem('ZhixingSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    } else {
                        _answerTmpArr = $(TimuList[index]).find('.answerList.multiChoice li')
                        let _multiOptions = []
                        $.each(_answerTmpArr, (i, t) => {
                            _multiOptions.push(tidyStr($(t).html()).replace(/^[A-Z]\s*\n\s*/, '').trim())
                        })
                        let _matchedAny = false
                        $.each(_answerTmpArr, (i, t) => {
                            if (agrs.indexOf(_multiOptions[i]) != -1) {
                                _matchedAny = true
                                setTimeout(() => { $(_answerTmpArr[i]).click() }, 300)
                            }
                        })

                        if (!_matchedAny) {
                            let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                            for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                                (function (idx) {
                                    setTimeout(function () { $(_answerTmpArr[idx]).click() }, 300)
                                })(fuzzyIndices[fi])
                            }
                        }
                        let check = 0
                        setTimeout(() => {
                            $.each(_answerTmpArr, (i, t) => {
                                if (($(_answerTmpArr[i]).attr('class') || '').indexOf('cur') != -1) {
                                    check = 1
                                }
                            })
                            if (check) {
                                logger('自动答题成功，准备切换下一题', 'green')
                            } else {
                                logger('未能正确选择答案，请手动选择，跳过此题', 'red')

                                localStorage.setItem('ZhixingSetting.sub', false)
                            }
                            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        }, 1000)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 2: {

            let tkList = $(TimuList[index]).find('.blankList2 input')

            let tkEditorBlocks = $(TimuList[index]).find('[data-editorindex]')

            if (tkEditorBlocks && tkEditorBlocks.length > 0) {
                let firstTextarea = $(TimuList[index]).find('textarea[name^="answer"]')
                if (firstTextarea.length > 0 && $(firstTextarea[0]).val() && $(firstTextarea[0]).val().trim() !== '' && !isRedoMode()) {
                    logger("此题已作答,跳过", "green");
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30);
                    break
                }

                _question = buildPrompt({ type: '填空题', question: _question, answer_format: "多个填空用'|'分隔" })
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        gptRecordFail("AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题")
                        localStorage.setItem('ZhixingSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let answers = agrs.split('|')
                    let editorBlocks = $(TimuList[index]).find('[data-editorindex]')

                    $.each(editorBlocks, (i, block) => {
                        let editorIndex = $(block).attr('data-editorindex')
                        let itemId = $(block).attr('data-itemid')
                        let answerContent = answers[i] || answers[0] || agrs

                        setTimeout(() => {
                            try {
                                let ueditor = null

                                if (contextWindow.editors && contextWindow.editors[editorIndex]) {
                                    ueditor = contextWindow.editors[editorIndex].ueditor
                                }

                                if (!ueditor && contextWindow.UE && contextWindow.UE.instants) {
                                    let instantKey = 'ueditorInstant' + editorIndex
                                    ueditor = contextWindow.UE.instants[instantKey]
                                }

                                if (!ueditor && itemId && contextWindow.UE && contextWindow.UE.getEditor) {
                                    ueditor = contextWindow.UE.getEditor('ananas-editor-answer' + itemId)
                                }

                                if (ueditor) {
                                    ueditor.setContent(answerContent)
                                    logger(`填空题第${i + 1}空已填入 (Index: ${editorIndex})`, 'green')
                                } else {
                                    logger(`填空题第${i + 1}空未找到编辑器实例 (Index: ${editorIndex}, ItemId: ${itemId})`, 'yellow')
                                }

                                if (itemId) {
                                    let textarea = $('#answer' + itemId)
                                    if (textarea.length > 0) {
                                        textarea.val(answerContent)
                                        try {
                                            if (textarea[0].value === answerContent) {
                                                textarea[0].dispatchEvent(new Event('change'))
                                                textarea[0].dispatchEvent(new Event('input'))
                                            }
                                        } catch (e) {}
                                    }
                                }
                            } catch (e) {
                                logger('填空题填入详情失败：' + e.message, 'red')
                            }
                        }, 500 * (i + 1))
                    })

                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time + 300 * editorBlocks.length)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            } else if (tkList && tkList.length > 0) {

                if ($(tkList[0]).val() && $(tkList[0]).val().trim() !== '' && !isRedoMode()) {
                    logger("此题已作答,跳过", "green");
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30);
                    break
                }
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        gptRecordFail("AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题")
                        localStorage.setItem('ZhixingSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let answers = agrs.split('|')
                    let inputList = $(TimuList[index]).find('.blankList2 input')
                    $.each(inputList, (i, t) => {
                        setTimeout(() => {
                            $(t).val(answers[i] || answers[0] || agrs)

                            $(t).trigger('input').trigger('change')
                        }, 200)
                    })
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            } else {
                gptRecordFail("未找到填空题输入区域，跳过此题")
                localStorage.setItem('ZhixingSetting.sub', false)
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }
            break
        }
        case 3: {
            _answerTmpArr = $(TimuList[index]).find('.answerList.panduan li')
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，按「覆盖已答题」重新作答', 'blue')

                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
                getAnswer(_type, _question).then((agrs) => {
                    let judgeResult = parseJudgeAnswer(agrs)
                    if (judgeResult === null) {
                        logger('答案匹配出错，准备切换下一题', 'red')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                    if (_i === -1) {
                        gptRecordFail("未匹配到正确选项，跳过")
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    setTimeout(() => {
                        $(_answerTmpArr[_i]).click()
                        logger('自动答题成功，准备切换下一题', 'green')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }, 300)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
            break
        }
        case 4: {
            _question = buildPrompt({ type: '简答题或材料题', question: _question })

            let jdEditorBlocks = $(TimuList[index]).find('[data-editorindex]')
            let jdTextareas = $(TimuList[index]).find('textarea[name^="answer"]')

            let jdIsAnswered = false

            if (jdEditorBlocks && jdEditorBlocks.length > 0) {
                if (jdTextareas.length > 0 && $(jdTextareas[0]).val() && $(jdTextareas[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(index + 1 + '简答题已作答，准备切换下一题', 'green')
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    break
                }

                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        gptRecordFail("AI无法匹配答案，请手动完成")
                        localStorage.setItem('ZhixingSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }

                    let firstBlock = jdEditorBlocks.first()
                    if (firstBlock.length > 0) {
                        let editorIndex = firstBlock.attr('data-editorindex')
                        let itemId = firstBlock.attr('data-itemid')

                        if (!itemId && jdTextareas.length > 0) {
                            let tid = $(jdTextareas[0]).attr('id')
                            if (tid) itemId = tid.replace('answer', '')
                        }

                        setTimeout(() => {
                            try {
                                let ueditor = null

                                if (contextWindow.editors && contextWindow.editors[editorIndex]) {
                                    ueditor = contextWindow.editors[editorIndex].ueditor
                                }

                                if (!ueditor && contextWindow.UE && contextWindow.UE.instants) {
                                    let instantKey = 'ueditorInstant' + editorIndex
                                    ueditor = contextWindow.UE.instants[instantKey]
                                }

                                if (!ueditor && itemId && contextWindow.UE && contextWindow.UE.getEditor) {
                                    ueditor = contextWindow.UE.getEditor('ananas-editor-answer' + itemId)
                                }

                                if (ueditor) {
                                    ueditor.setContent(agrs)
                                    logger(`简答题已填入 (Index: ${editorIndex})`, 'green')
                                } else {
                                    logger(`简答题未找到编辑器实例 (Index: ${editorIndex}, ItemId: ${itemId})`, 'yellow')
                                }

                                if (jdTextareas.length > 0) {
                                    let ta = $(jdTextareas[0])
                                    ta.val(agrs)

                                    try {
                                        ta[0].dispatchEvent(new Event('change'))
                                        ta[0].dispatchEvent(new Event('input'))
                                    } catch (e) {}
                                }
                            } catch (e) {
                                logger('简答题填入失败：' + e.message, 'red')

                                if (jdTextareas.length > 0) {
                                    $(jdTextareas[0]).val(agrs)
                                    logger('简答题通过textarea填入答案', 'blue')
                                }
                            }
                        }, 500)
                    } else {

                        if (jdTextareas.length > 0) {
                            $(jdTextareas[0]).val(agrs)
                            logger('简答题通过textarea填入答案', 'blue')
                        }
                    }

                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }

            else if (jdTextareas && jdTextareas.length > 0) {

                if ($(jdTextareas[0]).val() && $(jdTextareas[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(index + 1 + '简答题已作答，准备切换下一题', 'green')
                    jdIsAnswered = true
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                } else {
                    getAnswer(_type, _question).then((agrs) => {
                        if (agrs == '暂无答案') {
                            gptRecordFail("AI无法匹配答案，请手动完成")
                            localStorage.setItem('ZhixingSetting.sub', false)
                        } else {
                            $(jdTextareas[0]).val(agrs)
                            $(jdTextareas[0]).trigger('input').trigger('change')
                            logger('简答题自动答题成功，准备切换下一题', 'green')
                        }
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }).catch((agrs) => {
                        if (agrs && agrs['c'] == 0) {
                            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        }
                    })
                }
            }

            else {
                gptRecordFail("无法找到简答题输入区域，请手动完成")
                localStorage.setItem('ZhixingSetting.sub', false)
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }
            break
        }
        case 5: {
            getAnswer(_type, _question).then((agrs) => {

                localStorage.setItem('ZhixingSetting.sub', false)
                logger('此类型题目无法区分单/多选，请手动选择答案', 'red')
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }
            })
            break
        }
        default:
            logger('暂不支持处理此类型题目：' + questionFull.match(/.*?\[(.*?)]|$/)[1] + '，跳过！请手动作答。', 'red')

            localStorage.setItem('ZhixingSetting.sub', false)
            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            break
    }
}

function pollForElement(iframeDom, selector, interval, maxAttempts) {
    interval = interval || 2000;
    maxAttempts = (typeof maxAttempts === 'number' && maxAttempts > 0) ? maxAttempts : 60;
    return new Promise(function (resolve) {
        var attempts = 0;
        var check = function () {
            try {
                var doc = $(iframeDom).contents()[0];
                if (doc) {
                    var el = doc.querySelector(selector);
                    if (el) return resolve(el);
                }
            } catch (e) {}
            attempts++;
            if (attempts >= maxAttempts) {
                logger('框架等待超时（' + Math.round(attempts * interval / 1000) + 's），上层将重试或跳过', 'red');
                return resolve(null);
            }
            if (attempts % 15 === 0) {
                logger('框架仍在加载中，已等待' + (attempts * interval / 1000) + '秒...请耐心等待', 'orange');
            }
            setTimeout(check, interval);
        };
        check();
    });
}

var _ne21AntiSleepStarted = false;
function setupAntiSleep() {
    if (_ne21AntiSleepStarted) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    function tryStart() {
        if (_ne21AntiSleepStarted) return;
        try {
            var ac = new AC();
            var osc = ac.createOscillator();
            var gain = ac.createGain();
            gain.gain.value = 0;
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start();
            _ne21AntiSleepStarted = true;

            document.addEventListener('visibilitychange', function () {
                try { if (ac.state === 'suspended') ac.resume(); } catch (_) {}
            });
        } catch (_) {}
    }
    tryStart();
    if (!_ne21AntiSleepStarted) {
        var onUserGesture = function () {
            tryStart();
            if (_ne21AntiSleepStarted) {
                document.removeEventListener('click', onUserGesture, true);
                document.removeEventListener('keydown', onUserGesture, true);
                document.removeEventListener('touchstart', onUserGesture, true);
            }
        };
        document.addEventListener('click', onUserGesture, true);
        document.addEventListener('keydown', onUserGesture, true);
        document.addEventListener('touchstart', onUserGesture, true);
    }
}

function setupAutoRefresh() {
    var stored = localStorage.getItem('ZhixingSetting.autoRefresh');
    var enabled = stored !== null ? (stored === 'true') : false;
    if (!enabled) return;
    var minutes = parseInt(localStorage.getItem('ZhixingSetting.autoRefreshMinutes'), 10);
    if (!isFinite(minutes) || minutes < 5) minutes = 30;
    setTimeout(function () {
        logger('已达到自动刷新时间（' + minutes + '分钟），3 秒后刷新页面...', 'orange');
        setTimeout(function () { try { window.location.reload(); } catch (_) {} }, 3000);
    }, minutes * 60 * 1000);
}

function startDoPhoneCyWork(index, doms, phoneWeb) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { startDoPhoneCyWork(index, doms, phoneWeb) }, 3000);
        return;
    }
    if (index == doms.length) {
        logger('此页面全部测验已处理完毕！准备进行下一项任务')
        setTimeout(missonStart, 5000)
        return
    }
    logger('等待测验框架加载...', 'purple')
    pollForElement(doms[index], 'iframe').then(element => {
        let workIframe = element
        if (!workIframe) {
            setTimeout(() => { startDoPhoneCyWork(index, doms, phoneWeb) }, 5000)
            return
        }
        let workStatus = $(workIframe).contents().find('.newTestCon .newTestTitle .testTit_status').text().trim()
        if (!workStatus) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            setTimeout(missonStart, 2000)
            return
        }
        if (isRedoMode() && workStatus.indexOf("已完成") != -1) {
            logger('测验：' + (index + 1) + '，按「覆盖已答题」重新处理已完成测验', 'blue')
            $(workIframe).attr('src', phoneWeb)
            getElement($(doms[index]).contents()[0], 'iframe[src="' + phoneWeb + '"]', 60000).then((element) => {
                if (!element) { logger('测验框架加载超时（60s），跳过此测验', 'red'); setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 3000); return; }
                setTimeout(() => { doPhoneWork($(element).contents()) }, 3000)
            })
        } else if (workStatus.indexOf("待做") != -1 || workStatus.indexOf("待完成") != -1 || workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1) {
            var isRedoStatus = workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1
            logger('测验：' + (index + 1) + (isRedoStatus ? ',未达到及格线,准备重做...' : ',准备处理此测验...'), 'purple')
            $(workIframe).attr('src', phoneWeb)
            getElement($(doms[index]).contents()[0], 'iframe[src="' + phoneWeb + '"]', 60000).then((element) => {
                if (!element) { logger('测验框架加载超时（60s），跳过此测验', 'red'); setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 3000); return; }
                setTimeout(() => { doPhoneWork($(element).contents()) }, 3000)
            })
        } else if (workStatus.indexOf('待批阅') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',测验待批阅,跳过', 'red')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        } else if (workStatus.indexOf('已完成') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',已完成,跳过', 'green')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        } else {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',未知状态[' + workStatus + '],跳过', 'red')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        }
    })
}

function startDoCyWork(index, doms) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { startDoCyWork(index, doms) }, 3000);
        return;
    }
    if (index == doms.length) {
        logger('此页面全部测验已处理完毕！准备进行下一项任务')
        setTimeout(missonStart, 5000)
        return
    }
    logger('等待测验框架加载...', 'purple')
    pollForElement(doms[index], 'iframe').then(element => {
        let workIframe = element
        if (!workIframe) {
            setTimeout(() => { startDoCyWork(index, doms) }, 5000)
            return
        }
        let workStatus = $(workIframe).contents().find(".newTestCon .newTestTitle .testTit_status").text().trim()
        if (!workStatus) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            setTimeout(missonStart, 2000)
            return
        }
        if (isRedoMode() && workStatus.indexOf("已完成") != -1) {
            logger('测验：' + (index + 1) + '，按「覆盖已答题」重新处理已完成测验', 'blue')
            setTimeout(() => { doWork(index, doms, workIframe) }, 5000)
        } else if (workStatus.indexOf("待做") != -1 || workStatus.indexOf("待完成") != -1 || workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1) {
            var isRedoStatus = workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1
            logger('测验：' + (index + 1) + (isRedoStatus ? ',未达到及格线,准备重做...' : ',准备处理此测验...'), 'purple')
            setTimeout(() => { doWork(index, doms, workIframe) }, 5000)
        } else if (workStatus.indexOf('待批阅') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',测验待批阅,跳过', 'red')
            setTimeout(() => { startDoCyWork(index + 1, doms) }, 5000)
        } else if (workStatus.indexOf('已完成') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',已完成,跳过', 'green')
            setTimeout(() => { startDoCyWork(index + 1, doms) }, 5000)
        } else {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger('测验：' + (index + 1) + ',未知状态[' + workStatus + '],跳过', 'red')
            setTimeout(() => { startDoCyWork(index + 1, doms) }, 5000)
        }
    })
}

function getElement(parent, selector, timeout = 0) {
    return new Promise(resolve => {
        var result = parent.querySelector(selector);
        if (result) return resolve(result);
        var timer;
        const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
        if (mutationObserver) {
            const observer = new mutationObserver(mutations => {
                for (var mutation of mutations) {
                    for (var addedNode of mutation.addedNodes) {
                        if (addedNode instanceof Element) {
                            result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
                            if (result) {
                                observer.disconnect();
                                timer && clearTimeout(timer);
                                return resolve(result);
                            }
                        }
                    }
                }
            });
            observer.observe(parent, {
                childList: true,
                subtree: true
            });
            if (timeout > 0) {
                timer = setTimeout(() => {
                    observer.disconnect();
                    return resolve(null);
                }, timeout);
            }
        } else {
            const listener = e => {
                if (e.target instanceof Element) {
                    result = e.target.matches(selector) ? e.target : e.target.querySelector(selector);
                    if (result) {
                        parent.removeEventListener('DOMNodeInserted', listener, true);
                        timer && clearTimeout(timer);
                        return resolve(result);
                    }
                }
            };
            parent.addEventListener('DOMNodeInserted', listener, true);
            if (timeout > 0) {
                timer = setTimeout(() => {
                    parent.removeEventListener('DOMNodeInserted', listener, true);
                    return resolve(null);
                }, timeout);
            }
        }
    });
}

function getQuizPracticeType($item) {
    var typeText = ($item.find('.grey-text').first().text() || '').replace(/\s+/g, '')
    var className = String($item.attr('class') || '')
    if (typeText.indexOf('多选') !== -1 || className.indexOf('multiple-choice') !== -1) {
        return { type: 1, name: '多选题' }
    }
    if (typeText.indexOf('判断') !== -1) {
        return { type: 3, name: '判断题' }
    }
    if (typeText.indexOf('填空') !== -1 || $item.find('.option-fill-list').length > 0) {
        return { type: 2, name: '填空题' }
    }
    if (/(简答|问答|论述|名词解释|计算题|材料题|写作|翻译)/.test(typeText) || $item.find('.short-answer-textarea').length > 0) {
        return { type: 4, name: typeText.replace(/^\[|\]$/g, '') || '简答题' }
    }
    if (typeText.indexOf('单选') !== -1 || className.indexOf('single-choice') !== -1) {
        return { type: 0, name: '单选题' }
    }
    return { type: -1, name: typeText || '未知题型' }
}

function getQuizPracticeQuestionText($item) {
    var $name = $item.find('.question-name').first().clone()
    $name.find('.grey-text').remove()
    var text = ($name.text() || '').replace(/\s+/g, ' ').trim()
    return tidyQuestion(text) || '随堂练习题'
}

function getQuizPracticeOptions($item) {
    return $item.find('.option-list > li').map(function () {
        var $option = $(this)
        var $clone = $option.clone()
        $clone.find('.option-letter').remove()
        return tidyStr($clone.text()) || ''
    }).get()
}

function getQuizPracticeFillInputs($item) {
    return $item.find('input.ofl-ipt, .option-fill-list input, .option-fill-list textarea').filter(function () {
        return !this.disabled
    })
}

function getQuizPracticeTextarea($item) {
    var $textarea = $item.find('.short-answer-textarea textarea').first()
    if ($textarea.length === 0) $textarea = $item.find('textarea').first()
    return $textarea
}

function isQuizPracticeAnswered($item, type) {
    if (type === 0 || type === 1 || type === 3) {
        return $item.find('.option-list > li.active, .option-list > li.selected, .option-list > li.checked').length > 0
    }
    if (type === 2) {
        var $inputs = getQuizPracticeFillInputs($item)
        var hasFill = false
        $inputs.each(function () {
            if ($.trim($(this).val() || '')) hasFill = true
        })
        return hasFill
    }
    if (type === 4) {
        return $.trim(getQuizPracticeTextarea($item).val() || '') !== ''
    }
    return false
}

function setQuizPracticeValue($element, value) {
    var element = $element.get(0)
    if (!element) return
    var text = value == null ? '' : String(value)
    try {
        var prototype = element.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
        var descriptor = Object.getOwnPropertyDescriptor(prototype, 'value')
        if (descriptor && descriptor.set) descriptor.set.call(element, text)
        else element.value = text
    } catch (_) {
        element.value = text
    }
    try {
        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
        element.dispatchEvent(new Event('blur', { bubbles: true }))
    } catch (_) {}
}

function isQuizPracticeGoodStudent() {
    var stored = localStorage.getItem('ZhixingSetting.goodStudent')
    return stored === null ? !!setting.goodStudent : stored === 'true'
}

function setQuizPracticeOptionState($options, selectedIndexes) {
    var selected = {}
    selectedIndexes.forEach(function (index) { selected[index] = true })
    $options.each(function (index) {
        var $option = $(this)
        var shouldSelect = !!selected[index]
        if (isQuizPracticeGoodStudent()) {
            if (shouldSelect) $option.find('.option-letter, .option-result').css('font-weight', 'bold')
            return
        }
        var isSelected = $option.hasClass('active') || $option.hasClass('selected') || $option.hasClass('checked')
        if (shouldSelect !== isSelected) {
            try {
                this.click()
            } catch (_) {
                $option.trigger('click')
            }
        }
    })
}

function appendQuizPracticeAnswer($item, answer) {
    var alterTitle = localStorage.getItem('ZhixingSetting.alterTitle')
    var shouldAlter = alterTitle === null ? !!setting.alterTitle : alterTitle === 'true'
    if (!shouldAlter || !answer || $item.attr('data-ne21-answer-appended') === 'true') return
    var $name = $item.find('.question-name').first()
    if ($name.length === 0) return
    $('<p></p>').css('font-weight', 'bold').text('答案：' + answer).appendTo($name)
    $item.attr('data-ne21-answer-appended', 'true')
}

function getQuizPracticeSubmitButton() {
    var candidates = $('button, input[type="button"], input[type="submit"], .van-button, .submit-btn, .submit, [role="button"]').filter(function () {
        if (this.disabled) return false
        if (!$(this).is(':visible')) return false
        var text = ($(this).text() || $(this).val() || '').replace(/\s+/g, '')
        var className = typeof this.className === 'string' ? this.className : ''
        if (text === '提交' || (text.indexOf('提交') !== -1 && text.length <= 8)) return true
        return /(?:^|[-_\s])submit(?:$|[-_\s])/i.test(' ' + className + ' ')
    })
    return candidates.last()
}

function continueQuizPractice(index, questions, state) {
    var wait = Number(setting.time)
    if (!isFinite(wait) || wait < 300) wait = 2500
    wait += Math.floor(Math.random() * 350)
    setTimeout(function () {
        doQuizPractice(index, questions, state)
    }, wait)
}

function finishQuizPractice(state) {
    try { gptSummarizeFails(); } catch (_) { }
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(function () { finishQuizPractice(state) }, 3000)
        return
    }
    logger('随堂练习处理完成，共 ' + state.total + ' 题，已作答 ' + state.answered + ' 题，失败 ' + state.failed + ' 题', state.failed ? 'orange' : 'green')
    if (state.failed > 0) localStorage.setItem('ZhixingSetting.sub', false)

    var storedSub = localStorage.getItem('ZhixingSetting.sub')
    var autoSubmit = storedSub === null ? !!setting.sub : storedSub === 'true'
    var storedForce = localStorage.getItem('ZhixingSetting.force')
    var forceSubmit = storedForce === null ? !!setting.force : storedForce === 'true'
    if (!autoSubmit && !forceSubmit) {
        logger('随堂练习未开启自动提交，已保留当前作答', 'blue')
        return
    }
    if (state.failed > 0 && !forceSubmit) {
        logger('存在未完成题目，已停止提交；如需强制提交请开启“测验强制提交”', 'orange')
        return
    }

    var $submit = getQuizPracticeSubmitButton()
    if ($submit.length === 0) {
        logger('未找到随堂练习提交按钮，请手动提交', 'red')
        return
    }
    try {
        $submit.get(0).click()
        logger('已提交随堂练习', 'green')
    } catch (_) {
        logger('随堂练习提交按钮点击失败，请手动提交', 'red')
    }
}

function doQuizPractice(index, questions, state) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(function () { doQuizPractice(index, questions, state) }, 3000)
        return
    }
    if (index >= questions.length) {
        setTimeout(function () { finishQuizPractice(state) }, 500)
        return
    }

    var $item = $(questions[index])
    if ($item.length === 0) {
        state.failed++
        continueQuizPractice(index + 1, questions, state)
        return
    }
    var typeInfo = getQuizPracticeType($item)
    _currentQuestionMeta = { index: index, total: questions.length, typeName: typeInfo.name }
    if (typeInfo.type < 0) {
        state.failed++
        logger('第' + (index + 1) + '题题型未识别，已跳过', 'red')
        continueQuizPractice(index + 1, questions, state)
        return
    }
    if (!isRedoMode() && isQuizPracticeAnswered($item, typeInfo.type)) {
        state.answered++
        logger('第' + (index + 1) + '题已作答，已跳过', 'blue')
        continueQuizPractice(index + 1, questions, state)
        return
    }

    var question = getQuizPracticeQuestionText($item)
    var options = getQuizPracticeOptions($item)
    var prompt
    if (typeInfo.type === 0) {
        if (options.length === 0) {
            state.failed++
            logger('第' + (index + 1) + '题未找到选项，已跳过', 'red')
            continueQuizPractice(index + 1, questions, state)
            return
        }
        prompt = buildPrompt({ type: '单选题', question: question, options: options, answer_format: "只回答一个选项字母或选项内容" })
    } else if (typeInfo.type === 1) {
        if (options.length === 0) {
            state.failed++
            logger('第' + (index + 1) + '题未找到选项，已跳过', 'red')
            continueQuizPractice(index + 1, questions, state)
            return
        }
        prompt = buildPrompt({ type: '多选题', question: question, options: options, answer_format: "用'|'分割多个答案，或回答选项字母" })
    } else if (typeInfo.type === 3) {
        if (options.length === 0) {
            state.failed++
            logger('第' + (index + 1) + '题未找到选项，已跳过', 'red')
            continueQuizPractice(index + 1, questions, state)
            return
        }
        prompt = buildPrompt({ type: '判断题', question: question, options: options, answer_format: "只回答正确或错误，或回答选项字母" })
    } else if (typeInfo.type === 2) {
        prompt = buildPrompt({ type: '填空题', question: question, answer_format: "多个填空内容用'|'分隔" })
    } else {
        prompt = buildPrompt({ type: '简答题', question: question })
    }

    getAnswer(typeInfo.type, prompt).then(function (answer) {
        appendQuizPracticeAnswer($item, answer)
        var applied = false

        if (typeInfo.type === 0 || typeInfo.type === 1 || typeInfo.type === 3) {
            var indexes = []
            if (typeInfo.type === 3) {
                var judgeAnswer = parseJudgeAnswer(answer)
                var judgeIndex = judgeAnswer === null ? -1 : findJudgeOptionIndex(options, judgeAnswer === 'true')
                if (judgeIndex !== -1) indexes = [judgeIndex]
            }
            if (indexes.length === 0) {
                indexes = findVideoQuizMatchIndexes(options, answer, typeInfo.type === 1)
            }
            if (typeInfo.type !== 1) indexes = indexes.slice(0, 1)
            if (indexes.length === 0) {
                state.failed++
                logger('第' + (index + 1) + '题未能匹配到选项，已跳过', 'red')
            } else {
                var $options = $item.find('.option-list > li')
                setQuizPracticeOptionState($options, indexes)
                applied = true
                state.answered++
            }
        } else if (typeInfo.type === 2) {
            var $inputs = getQuizPracticeFillInputs($item)
            var parts = $inputs.length === 1 ? [String(answer || '').trim()] : splitAiAnswers(answer)
            if (parts.length === 0 && answer) parts = [String(answer).trim()]
            if ($inputs.length > 1 && parts.length < $inputs.length) {
                var whitespaceParts = String(answer || '').split(/\s+/).filter(Boolean)
                if (whitespaceParts.length >= $inputs.length) parts = whitespaceParts
            }
            if ($inputs.length === 0) {
                state.failed++
                logger('第' + (index + 1) + '题未找到填空输入框，已跳过', 'red')
            } else {
                $inputs.each(function (inputIndex) {
                    var value = parts[inputIndex] != null ? parts[inputIndex] : (parts.length === 1 ? parts[0] : '')
                    setQuizPracticeValue($(this), value)
                })
                applied = true
                state.answered++
            }
        } else {
            var $textarea = getQuizPracticeTextarea($item)
            if ($textarea.length === 0) {
                state.failed++
                logger('第' + (index + 1) + '题未找到作答输入框，已跳过', 'red')
            } else {
                setQuizPracticeValue($textarea, answer)
                applied = true
                state.answered++
            }
        }

        if (applied) logger('第' + (index + 1) + '题作答完成', 'green')
        continueQuizPractice(index + 1, questions, state)
    }).catch(function () {
        state.failed++
        localStorage.setItem('ZhixingSetting.sub', false)
        continueQuizPractice(index + 1, questions, state)
    })
}

function missonQuizPractice() {
    if (document.documentElement.getAttribute('data-ne21-quiz-practice') === 'running') return
    var questions = $('.question-item').toArray()
    if (questions.length === 0) {
        logger('未找到随堂练习题目', 'red')
        return
    }
    document.documentElement.setAttribute('data-ne21-quiz-practice', 'running')
    var state = { total: questions.length, answered: 0, failed: 0 }
    logger('检测到随堂练习，共 ' + questions.length + ' 题，开始处理', 'green')
    doQuizPractice(0, questions, state)
}

function missonHomeWork() {
    logger('开始处理作业', 'green')
    let $_homeworktable = $('.mark_table').find('form')
    let TimuList = $_homeworktable.find('.questionLi')
    doHomeWork(0, TimuList)
}

function doHomeWork(index, TiMuList) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { doHomeWork(index, TiMuList) }, 3000);
        return;
    }
    if (index == TiMuList.length) {
        logger('作业题目已全部完成', 'green')
        return
    }

    let $subQuestions = $(TiMuList[index]).find('.reading_answer');
    if ($subQuestions && $subQuestions.length > 0) {
        logger('检测到复合大题（含有 ' + $subQuestions.length + ' 个子题），开始处理子题...', 'blue');
        let parentQuestion = tidyQuestion($(TiMuList[index]).find('h3.mark_name').html() || '');
        let currentTypeName = $(TiMuList[index]).attr('typename') || '阅读理解';
        _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: currentTypeName };
        processSubQuestions(0, $subQuestions, parentQuestion, () => setting.time, () => { doHomeWork(index + 1, TiMuList) });
        return;
    }

    function handleNormalTextarea(textareaList, jdt, index, TiMuList) {
        if (!textareaList || textareaList.length === 0) {
            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
            return;
        }
        getAnswer(4, jdt).then((agrs) => {
            $.each(textareaList, (i, t) => {
                let _id = $(t).attr('id') || $(t).attr('name');
                setTimeout(() => {
                    try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                }, 300 + i * 200);
            });
            logger('自动答题成功，准备切换下一题', 'green');
            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * textareaList.length);
        }).catch((agrs) => {
            if (agrs && agrs['c'] == 0) {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
            }
        });
    }

    let typeName = $(TiMuList[index]).attr('typename');
    let _type = ({
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: typeName }
    let _questionFull = $(TiMuList[index]).find('.mark_name').html()
    let _question = tidyQuestion(_questionFull).replace(/^[(].*?[)]/, '').trim()
    let _a = []
    let _answerTmpArr, _textareaList
    var check_answer_flag = 0;

    if (_type === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
        if (_answerTmpArr && _answerTmpArr.length > 0) {
            _type = 0;

            let multiChoiceCheck = $(TiMuList[index]).find('.stem_answer input[type="checkbox"]');
            if (multiChoiceCheck && multiChoiceCheck.length > 0) {
                _type = 1;
                logger('自动识别为多选题', 'green');
            } else {
                logger('自动识别为单选题', 'green');
            }
        }

        else {
            _textareaList = $(TiMuList[index]).find('.stem_answer').find('.subEditor textarea, .Answer .divText textarea, .Answer .divText .textDIV textarea, textarea[name^="answerEditor"], .edui-editor textarea');
            if (_textareaList && _textareaList.length > 0) {
                _type = 4;
                logger('自动识别为简答题', 'green');
            }
        }
    }

    switch (_type) {
        case 0: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                } else {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，按「覆盖已答题」重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    $.each(_answerTmpArr, (i, t) => {
                        _a.push(tidyStr($(t).html()))
                    })
                    if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                        let timuele = $(TiMuList[index]).find('.mark_name')

                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let _i = _a.findIndex((item) => item == agrs)

                    if (_i == -1) {

                        _i = findBestFuzzyMatch(_a, agrs)
                    }
                    if (_i == -1) {
                        gptRecordFail("AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题")
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    } else {
                        setTimeout(() => {
                            let check = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                            if (check.indexOf('check_answer') == -1) {
                                $(_answerTmpArr[_i]).parent().click()
                            }
                            logger('自动答题成功，准备切换下一题', 'green')
                            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        }, 300)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
        }
            break

        case 1: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                } else {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                        break
                    } else {
                        logger(index + 1 + '此题已作答，按「覆盖已答题」取消旧答案', 'blue')
                        $(_answerTmpArr[i]).parent().click()

                    }
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                        let timuele = $(TiMuList[index]).find('.mark_name')

                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let _multiOptions = []
                    $.each(_answerTmpArr, (i, t) => {
                        _multiOptions.push(tidyStr($(t).html()))
                    })
                    let _matchedAny = false
                    $.each(_answerTmpArr, (i, t) => {
                        if (agrs.indexOf(_multiOptions[i]) != -1) {
                            _matchedAny = true
                            setTimeout(() => {
                                let check = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                                if (check.indexOf('check_answer_dx') == -1) {
                                    $(_answerTmpArr[i]).parent().click()
                                }
                            }, 300)
                        }
                    });

                    if (!_matchedAny) {
                        let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                        for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                            (function (idx) {
                                setTimeout(function () {
                                    let check = $(_answerTmpArr[idx]).parent().find('span').attr('class') || ''
                                    if (check.indexOf('check_answer_dx') == -1) {
                                        $(_answerTmpArr[idx]).parent().click()
                                    }
                                }, 300)
                            })(fuzzyIndices[fi])
                        }
                    }
                    logger('自动答题成功，准备切换下一题', 'green')
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 2: {
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "用'|'分割多个答案" });
            _textareaList = findAnswerTextareas($(TiMuList[index]));
            if (!_textareaList || _textareaList.length === 0) {
                gptRecordFail("未找到填空题输入区域，跳过此题");
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                break
            }

            let _id = $(_textareaList[0]).attr('id') || $(_textareaList[0]).attr('name');
            let firstAnswered = false;
            try {
                if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') firstAnswered = true;
            } catch (e) { firstAnswered = false; }
            if (firstAnswered && !isRedoMode()) {
                logger(index + 1 + '此题已作答，准备切换下一题', 'green');
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30);
            } else {
                getAnswer(_type, _question).then((agrs) => {
                    let _answerTmpArr = (agrs || '').split('|');
                    $.each(_textareaList, (i, t) => {
                        let _currentId = $(t).attr('id') || $(t).attr('name');
                        let val = _answerTmpArr[i] !== undefined ? _answerTmpArr[i] : (_answerTmpArr[0] || agrs);
                        setTimeout(() => {
                            try { UE.getEditor(_currentId).setContent(val) } catch (e) {}
                        }, 300 + i * 200);
                    });
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _textareaList.length);
                    logger('自动答题成功，准备切换下一题', 'green');
                }).catch((agrs) => {
                    if (agrs && agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                    }
                });
            }
            break
        }
        case 3: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })

            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                } else {
                    if (!isRedoMode()) {
                        logger(index + 1 + '此题已作答，准备切换下一题', 'green')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                    } else {
                        logger(index + 1 + '此题已作答，按「覆盖已答题」重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
                getAnswer(_type, _question).then((agrs) => {
                    if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                        let timuele = $(TiMuList[index]).find('.mark_name')
                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let judgeResult = parseJudgeAnswer(agrs)
                    if (judgeResult === null) {
                        logger('答案匹配出错，准备切换下一题', 'red')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        return
                    }
                    let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                    if (_i === -1) {
                        gptRecordFail("未匹配到正确选项，跳过")
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        return
                    }
                    setTimeout(() => {
                        let check = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                        if (check.indexOf('check_answer') == -1) {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }, 300)
                    logger('自动答题成功，准备切换下一题', 'green')
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle || _answerEle.length === 0) {
                logger((index + 1) + ' 未找到文本作答区域，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }
            let _isAnswered4 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered4 = true } catch (e) {}
            })
            if (_isAnswered4 && !isRedoMode()) {
                logger((index + 1) + ' 此题已作答，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_type, jdt).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                logger('自动答题成功，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        case 5: {
            let _answerEle5 = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle5 || _answerEle5.length === 0) {
                logger((index + 1) + ' 未找到写作题文本框，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }

            let _isAnswered5 = false
            $.each(_answerEle5, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered5 = true } catch (e) {}
            })
            if (_isAnswered5 && !isRedoMode()) {
                logger((index + 1) + ' 此题已作答，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt5 = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_type, jdt5).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle5, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                logger('自动答题成功，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle5.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        case 6: {
            let _answerEle6 = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle6 || _answerEle6.length === 0) {
                logger((index + 1) + ' 未找到翻译题文本框，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }

            let _isAnswered6 = false
            $.each(_answerEle6, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered6 = true } catch (e) {}
            })
            if (_isAnswered6 && !isRedoMode()) {
                logger((index + 1) + ' 此题已作答，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt6 = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_type, jdt6).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle6, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                logger('自动答题成功，准备切换下一题', 'green')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle6.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        default: {
            if (_type === undefined) {
                logger('无法识别题型：' + typeName + '，跳过此题', 'red')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            } else {

                _textareaList = $(TiMuList[index]).find('.stem_answer').find('textarea, .subEditor textarea, .divText textarea, .eidtDiv textarea, .divText .edui-editor, textarea[name^="answerEditor"]');
                if (_textareaList && _textareaList.length > 0) {
                    logger('检测到文本输入区域，尝试回答', 'green');
                    let jdt = buildPrompt({ type: typeName || '未知题型', question: _question, answer_format: "请根据题目作答" })

                    let editorTextareas = $(TiMuList[index]).find('.stem_answer textarea[name^="answerEditor"]');
                    if (editorTextareas && editorTextareas.length > 0) {

                        let editorId = $(editorTextareas[0]).attr('id');
                        if (editorId) {
                            getAnswer(_type || 4, jdt).then((agrs) => {
                                setTimeout(() => { UE.getEditor(editorId).setContent(agrs) }, 300);
                                logger('使用富文本编辑器ID回答成功，准备切换下一题', 'green');
                                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                            }).catch((agrs) => {
                                if (agrs['c'] == 0) {
                                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                                }
                            });
                        } else {
                            logger('找到富文本编辑器但无法获取ID，改用普通方法', 'yellow');

                            handleNormalTextarea(_textareaList, jdt, index, TiMuList);
                        }
                    } else {

                        handleNormalTextarea(_textareaList, jdt, index, TiMuList);
                    }

                } else {
                    logger('无法处理此题型：' + typeName + '，跳过此题', 'red');
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                }
            }
        }
    }
}

function missonExam() {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(missonExam, 3000);
        return;
    }
    let $_examtable = $('.mark_table').find('.whiteDiv')
    let _questionFull = tidyStr($_examtable.find('h3.mark_name').html().trim())
    let typeName = _questionFull.match(/[(](.*?),.*?分[)]|$/)[1];
    let _qType = ({
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]

    let _examCurIdx = null
    try {
        let $curLi = $('.mark_table .mark_li_list li.active, .mark_table .mark_li_list li.current')
        if ($curLi.length) _examCurIdx = parseInt($curLi.text().trim()) - 1
    } catch (_) {}
    _currentQuestionMeta = { index: isFinite(_examCurIdx) ? _examCurIdx : null, total: null, typeName: typeName }
    let _question = tidyQuestion(_questionFull.replace(/[(].*?分[)]/, '').replace(/^\s*/, ''))
    let $_ansdom = $_examtable.find('#submitTest').find('.stem_answer')

    let $subQuestions = $_ansdom.find('.reading_answer');
    if ($subQuestions && $subQuestions.length > 0) {
        logger('检测到复合大题（含有 ' + $subQuestions.length + ' 个子题），开始处理子题...', 'blue');
        let parentQuestion = tidyQuestion($_examtable.find('h3.mark_name').html() || '');
        _currentQuestionMeta = { index: _examCurIdx, total: null, typeName: typeName || '阅读理解' };
        processSubQuestions(0, $subQuestions, parentQuestion, () => setting.time, () => { toNextExam() });
        return;
    }

    let _answerTmpArr;
    let _a = []

    function handleStandardExamTextarea(standardTextareas, _question) {
        logger('检测到标准文本输入区域，尝试回答', 'green');
        let jdt = buildPrompt({ type: typeName || '未知题型', question: _question, answer_format: "请根据题目作答" })
        getAnswer(4, jdt).then((agrs) => {
            $.each(standardTextareas, (i, t) => {
                let _id = $(t).attr('id')
                setTimeout(() => { UE.getEditor(_id).setContent(agrs) }, 300)
            })
            logger('自动答题成功，准备切换下一题', 'green')
            toNextExam()
        }).catch((agrs) => {
            if (agrs['c'] == 0) {
                toNextExam()
            }
        })
    }

    if (_qType === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p');
        if (_answerTmpArr && _answerTmpArr.length > 0) {
            _qType = 0;

            let multiChoiceCheck = $_ansdom.find('.clearfix.answerBg input[type="checkbox"]');
            if (multiChoiceCheck && multiChoiceCheck.length > 0) {
                _qType = 1;
                logger('自动识别为多选题', 'green');
            } else {
                logger('自动识别为单选题', 'green');
            }
        }

        else {
            let _textareaList = $_ansdom.find('.Answer .divText .subEditor textarea, .Answer .divText .edui-editor, .Answer .divText textarea, textarea[name^="answerEditor"]');
            if (_textareaList && _textareaList.length > 0) {
                _qType = 4;
                logger('自动识别为简答题', 'green');
            }
        }
    }

    switch (_qType) {
        case 0: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')

            let _answeredIdxE0 = -1
            for (let _ai = 0; _ai < _answerTmpArr.length; _ai++) {
                let _cls = $(_answerTmpArr[_ai]).parent().find('span').attr('class') || ''
                if (_cls.indexOf('check_answer') !== -1) { _answeredIdxE0 = _ai; break }
            }
            if (_answeredIdxE0 !== -1 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_answeredIdxE0 !== -1 && isRedoMode()) {
                logger('此题已作答，按「覆盖已答题」重新作答', 'blue')
                $(_answerTmpArr[_answeredIdxE0]).parent().click()
            }

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })
            getAnswer(_qType, _question).then((agrs) => {
                $.each(_answerTmpArr, (i, t) => {
                    _a.push(tidyStr($(t).html()))
                })
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $_examtable.find('h3.mark_name')

                    timuele.html(timuele.html() + agrs)
                }

                let _i = _a.findIndex((item) => item == agrs)
                if (_i == -1) {

                    _i = findBestFuzzyMatch(_a, agrs)
                }
                if (_i == -1) {
                    gptRecordFail("AI未能完美匹配正确答案，请尝试更换更高级模型或手动选择，跳过此题")
                    setTimeout(toNextExam, 5000)
                } else {
                    setTimeout(() => {
                        if (($(_answerTmpArr[_i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                            if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold');
                            } else {
                                setTimeout(() => { $(_answerTmpArr[_i]).parent().click() }, 300)
                            }
                            logger('自动答题成功，准备切换下一题', 'green')
                            toNextExam()
                        } else {
                            logger('此题已作答，准备切换下一题', 'green')
                            toNextExam()
                        }
                    }, 300)
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
        }
            break
        case 1: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')

            let _alreadyAnsweredE1 = $_ansdom.find('.clearfix.answerBg span.check_answer_dx, .clearfix.answerBg span.check_answer').length > 0
            if (_alreadyAnsweredE1 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_alreadyAnsweredE1 && isRedoMode()) {
                logger('此题已作答，按「覆盖已答题」重新作答', 'blue')
                $.each(_answerTmpArr, function (_i2, _t2) {
                    var _cls2 = $(_t2).parent().find('span').attr('class') || ''
                    if (_cls2.indexOf('check_answer') !== -1) {
                        $(_t2).parent().click()
                    }
                })
            }

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })
            getAnswer(_qType, _question).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $_examtable.find('h3.mark_name')

                    timuele.html(timuele.html() + agrs)
                }

                {
                    let _multiOptions = []
                    $.each(_answerTmpArr, (i, t) => {
                        _multiOptions.push(tidyStr($(t).html()))
                    })
                    let _matchedAny = false
                    $.each(_answerTmpArr, (i, t) => {
                        if (agrs.indexOf(_multiOptions[i]) != -1) {
                            _matchedAny = true

                            if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[i]).parent().find('span').css('font-weight', 'bold');
                            } else {
                                setTimeout(() => { $(_answerTmpArr[i]).parent().click() }, 300)
                            }
                        }
                    });

                    if (!_matchedAny) {
                        let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                        for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                            (function (idx) {
                                if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                                    $(_answerTmpArr[idx]).parent().find('span').css('font-weight', 'bold');
                                } else {
                                    setTimeout(function () { $(_answerTmpArr[idx]).parent().click() }, 300)
                                }
                            })(fuzzyIndices[fi])
                        }
                    }
                    logger('自动答题成功，准备切换下一题', 'green')
                    toNextExam()
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
        }
            break
        case 2: {
            let _textareaList = $_ansdom.find('.Answer .divText .subEditor textarea')

            let _alreadyAnsweredE2 = false
            $.each(_textareaList, function (_i2, _t2) {
                let _eid = $(_t2).attr('id')
                try {
                    if (_eid && typeof UE !== 'undefined' && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') {
                        _alreadyAnsweredE2 = true
                    }
                } catch (_e) {}
            })
            if (_alreadyAnsweredE2 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_alreadyAnsweredE2 && isRedoMode()) {
                logger('此题已作答，按「覆盖已答题」重新作答', 'blue')
                $.each(_textareaList, function (_i2, _t2) {
                    let _eid = $(_t2).attr('id')
                    try { if (_eid && UE.getEditor(_eid)) UE.getEditor(_eid).setContent('') } catch (_e) {}
                })
            }
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "用'|'分割多个答案" });

            getAnswer(_qType, _question).then((agrs) => {
                let _answerTmpArr = agrs.split('|')
                $.each(_textareaList, (i, t) => {
                    let _id = $(t).attr('id')
                    setTimeout(() => { UE.getEditor(_id).setContent(_answerTmpArr[i]) }, 300)
                })
                logger('自动答题成功，准备切换下一题', 'green')
                toNextExam()
            }).catch((agrs) => {
                if (agrs && agrs['c'] == 0) { toNextExam() }
            })
            break
        }
        case 3: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')

            let _answeredIdxE3 = -1
            for (let _ai = 0; _ai < _answerTmpArr.length; _ai++) {
                let _cls = $(_answerTmpArr[_ai]).parent().find('span').attr('class') || ''
                if (_cls.indexOf('check_answer') !== -1) { _answeredIdxE3 = _ai; break }
            }
            if (_answeredIdxE3 !== -1 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            if (_answeredIdxE3 !== -1 && isRedoMode()) {
                logger('此题已作答，按「覆盖已答题」重新作答', 'blue')
                $(_answerTmpArr[_answeredIdxE3]).parent().click()
            }
            _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" });
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })
            getAnswer(_qType, _question).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }

                let judgeResult = parseJudgeAnswer(agrs)
                if (judgeResult === null) {
                    logger('答案匹配出错，准备切换下一题', 'red')
                    toNextExam()
                    return
                }
                let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                if (_i === -1) {
                    gptRecordFail("未匹配到正确选项，跳过")
                    toNextExam()
                    return
                }
                if (($(_answerTmpArr[_i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {

                    if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                        setTimeout(() => { $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold'); }, 300)
                    } else {
                        $(_answerTmpArr[_i]).parent().click()
                    }
                    logger('自动答题成功，准备切换下一题', 'green')
                    toNextExam()
                } else {
                    logger('此题已作答，准备切换下一题', 'green')
                    toNextExam()
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }

            let _isAnsweredE4 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE4 = true } catch (e) {}
            })
            if (_isAnsweredE4 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        case 5: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }

            let _isAnsweredE5 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE5 = true } catch (e) {}
            })
            if (_isAnsweredE5 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        case 6: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }

            let _isAnsweredE6 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE6 = true } catch (e) {}
            })
            if (_isAnsweredE6 && !isRedoMode()) {
                logger('此题已作答，准备切换下一题', 'green')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        default: {
            if (_qType === undefined) {
                logger('无法识别题型：' + typeName + '，跳过此题', 'red')
                toNextExam()
            } else {

                let standardTextareas = $_ansdom.find('.Answer .divText .subEditor textarea');
                let richEditors = $_ansdom.find('.Answer .divText .edui-editor');

                let editorTextareas = $_ansdom.find('textarea[name^="answerEditor"]');

                if (editorTextareas && editorTextareas.length > 0) {
                    logger('检测到材料题富文本编辑器，尝试回答', 'green');
                    let editorId = $(editorTextareas[0]).attr('id');
                    if (editorId) {
                        let jdt = buildPrompt({ type: '材料题', question: _question, answer_format: "请根据材料详细回答" })
                        getAnswer(4, jdt).then((agrs) => {
                            setTimeout(() => { UE.getEditor(editorId).setContent(agrs) }, 300);
                            logger('材料题自动答题成功，准备切换下一题', 'green');
                            toNextExam();
                        }).catch((agrs) => {
                            if (agrs['c'] == 0) {
                                toNextExam();
                            }
                        });
                    } else {
                        logger('找到材料题编辑器但无法获取ID，尝试其他方法', 'yellow');
                        handleStandardExamTextarea(standardTextareas, _question);
                    }
                }

                else if (standardTextareas && standardTextareas.length > 0) {
                    handleStandardExamTextarea(standardTextareas, _question);
                }

                else if (richEditors && richEditors.length > 0) {
                    logger('检测到富文本编辑器，尝试查找编辑器ID', 'green');

                    let editorScripts = $('script:contains("UE.getEditor")');
                    let editorIdMatch = null;

                    if (editorScripts && editorScripts.length > 0) {

                        let scriptContent = editorScripts.text();
                        let matches = scriptContent.match(/UE\.getEditor\(['"](.*?)['"]/);
                        if (matches && matches.length > 1) {
                            editorIdMatch = matches[1];
                            logger('从脚本中发现编辑器ID: ' + editorIdMatch, 'green');
                        }
                    }

                    if (editorIdMatch) {
                        let jdt = buildPrompt({ type: '材料题', question: _question, answer_format: "请根据材料详细回答" })
                        getAnswer(4, jdt).then((agrs) => {
                            setTimeout(() => { UE.getEditor(editorIdMatch).setContent(agrs) }, 300);
                            logger('使用脚本找到的编辑器ID回答成功，准备切换下一题', 'green');
                            toNextExam();
                        }).catch((agrs) => {
                            if (agrs['c'] == 0) {
                                toNextExam();
                            }
                        });
                    } else {
                        gptRecordFail("无法找到有效的编辑器ID，跳过此题");
                        toNextExam();
                    }
                }
                else {
                    logger('无法处理此题型：' + typeName + '，跳过此题', 'red');
                    toNextExam();
                }

            }
        }
    }
}

function toNextExam() {
    if (localStorage.getItem('ZhixingSetting.examTurn') === 'true') {
        let $_examtable = $('.mark_table').find('.whiteDiv')
        let $nextbtn = $_examtable.find('.nextDiv a.jb_btn')
        setTimeout(() => {
            $nextbtn.click()
        }, setting.examTurnTime ? 2000 + (Math.floor(Math.random() * 5 + 1) * 1000) : 2000)
    } else {
        logger('用户设置不自动跳转下一题，请手动点击', 'blue')
    }
}

function missonExamPreview() {
    logger('进入整卷预览页面，开始处理考试', 'green')
    let TiMuList = $('.mark_table').find('.questionLi')
    if (!TiMuList || TiMuList.length === 0) {
        logger('未解析到题目，请确认页面已渲染', 'red')
        return
    }
    logger('共解析到 ' + TiMuList.length + ' 道题', 'blue')
    doExamPreview(0, TiMuList)
}

function getExamPreviewDelay() {
    let base = (setting && setting.time) ? setting.time : 2500
    return base + Math.floor(Math.random() * 1500)
}

function getExamPreviewType($timu) {
    let typeMap = {
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    }
    let typeName = $timu.attr('typename')
    if (typeName && typeMap[typeName] !== undefined) {
        return { type: typeMap[typeName], typeName: typeName }
    }
    let prefixText = $timu.find('.colorShallow').text() || $timu.find('.mark_name').text() || ''
    let m = prefixText.match(/(单选题|多选题|填空题|判断题|简答题|论述题|写作题|翻译题)/)
    if (m && typeMap[m[1]] !== undefined) {
        return { type: typeMap[m[1]], typeName: m[1] }
    }
    let qid = $timu.attr('data') || $timu.find('.questionId').val() || $timu.find('input.questionId').val()
    if (qid) {
        let typeVal = $('[name="type' + qid + '"]').val()
        if (typeVal !== undefined && typeVal !== null && typeVal !== '') {
            let n = parseInt(typeVal)
            if (!isNaN(n) && n >= 0 && n <= 6) {
                return { type: n, typeName: typeName || ('类型' + n) }
            }
        }
    }
    let $opts = $timu.find('.answerBg .answer_p')
    if ($opts && $opts.length > 0) {
        let hasCheckbox = $timu.find('.answerBg input[type="checkbox"]').length > 0
        return { type: hasCheckbox ? 1 : 0, typeName: typeName || (hasCheckbox ? '多选题' : '单选题') }
    }
    let $textareas = $timu.find('textarea[name^="answerEditor"], .subEditor textarea')
    if ($textareas && $textareas.length > 0) {
        return { type: 4, typeName: typeName || '简答题' }
    }
    return { type: undefined, typeName: typeName || '未知' }
}

function doExamPreview(index, TiMuList) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { doExamPreview(index, TiMuList) }, 3000);
        return;
    }
    if (index >= TiMuList.length) {
        gptSummarizeFails();
    logger('整卷预览答题已完成，请人工核对后手动交卷', 'green')
        return
    }

    let $subQuestions = $(TiMuList[index]).find('.reading_answer');
    if ($subQuestions && $subQuestions.length > 0) {
        logger('检测到复合大题（含有 ' + $subQuestions.length + ' 个子题），开始处理子题...', 'blue');
        let parentQuestion = tidyQuestion($(TiMuList[index]).find('h3.mark_name').html() || '');
        let currentTypeName = $(TiMuList[index]).attr('typename') || '阅读理解';
        _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: currentTypeName };
        processSubQuestions(0, $subQuestions, parentQuestion, getExamPreviewDelay, () => { doExamPreview(index + 1, TiMuList) });
        return;
    }
    let $timu = $(TiMuList[index])
    let typeInfo = getExamPreviewType($timu)
    let _type = typeInfo.type
    let typeName = typeInfo.typeName
    let _questionFull = $timu.find('.mark_name').html() || ''
    let _question = tidyQuestion(_questionFull).replace(/^[(].*?[)]/, '').trim()
    let _a = []
    let _answerTmpArr, _textareaList
    let alreadyAnswered = 0
    let prefix = '第' + (index + 1) + '题: '

    function isPreviewTurnOn() {
        var _pv = localStorage.getItem('ZhixingSetting.previewTurn')
        return _pv === null ? !!setting.previewTurn : _pv === 'true'
    }
    function nextSoon() {
        if (!isPreviewTurnOn()) { logger(prefix + '已暂停自动下一题（预览跳题已关闭）', 'blue'); return }
        setTimeout(function () { doExamPreview(index + 1, TiMuList) }, getExamPreviewDelay())
    }
    function nextFast() {
        if (!isPreviewTurnOn()) { logger(prefix + '已暂停自动下一题（预览跳题已关闭）', 'blue'); return }
        setTimeout(function () { doExamPreview(index + 1, TiMuList) }, 30)
    }

    _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: typeName }

    if (_type === undefined) {
        logger(prefix + '无法识别题型(' + typeName + ')，跳过此题', 'red')
        return nextSoon()
    }

    switch (_type) {
        case 0: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(prefix + '未找到选项，跳过', 'red')
                return nextSoon()
            }
            let mergedAnswers = []
            _answerTmpArr.each(function () {
                mergedAnswers.push($(this).text().replace(/[ABCD]/g, '').trim())
            })
            let prompt = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(prefix + '已作答，跳过', 'green')
                        alreadyAnswered = 1
                    } else {
                        logger(prefix + '已作答，按「覆盖已答题」重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (alreadyAnswered) return nextFast()
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerTmpArr, function (i, t) { _a.push(tidyStr($(t).html())) })
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let _i = _a.findIndex(function (item) { return item === agrs })
                if (_i === -1) {

                    _i = findBestFuzzyMatch(_a, agrs)
                }
                if (_i === -1) {
                    logger(prefix + 'AI无法完美匹配正确答案，请手动选择', 'red')
                    return nextSoon()
                }
                setTimeout(function () {
                    let cls = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                    if (cls.indexOf('check_answer') === -1) {
                        if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }
                    logger(prefix + '自动答题成功', 'green')
                    nextSoon()
                }, 300)
            }).catch(function () { nextSoon() })
            break
        }
        case 1: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(prefix + '未找到选项，跳过', 'red')
                return nextSoon()
            }
            let mergedAnswers = []
            _answerTmpArr.each(function () {
                mergedAnswers.push($(this).text().replace(/[ABCD]/g, '').trim())
            })
            let prompt = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers, answer_format: "用'|'分割多个答案" })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(prefix + '已作答，跳过', 'green')
                        alreadyAnswered = 1
                        break
                    } else {
                        logger(prefix + '已作答，按「覆盖已答题」取消旧答案', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                }
            }
            if (alreadyAnswered) return nextFast()
            getAnswer(_type, prompt).then(function (agrs) {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let _multiOptions = []
                $.each(_answerTmpArr, function (i, t) {
                    _multiOptions.push(tidyStr($(t).html()))
                })
                let _matchedAny = false
                $.each(_answerTmpArr, function (i, t) {
                    if (agrs.indexOf(_multiOptions[i]) !== -1) {
                        _matchedAny = true
                        if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                            if (cls.indexOf('check_answer_dx') === -1) {
                                setTimeout(function () { $(_answerTmpArr[i]).parent().click() }, 300)
                            }
                        }
                    }
                })

                if (!_matchedAny) {
                    let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                    for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                        (function (idx) {
                            if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[idx]).parent().find('span').css('font-weight', 'bold')
                            } else {
                                let cls = $(_answerTmpArr[idx]).parent().find('span').attr('class') || ''
                                if (cls.indexOf('check_answer_dx') === -1) {
                                    setTimeout(function () { $(_answerTmpArr[idx]).parent().click() }, 300)
                                }
                            }
                        })(fuzzyIndices[fi])
                    }
                }
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 2: {
            _textareaList = $timu.find('textarea[name^="answerEditor"]')
            if (!_textareaList || _textareaList.length === 0) {
                _textareaList = $timu.find('.subEditor textarea')
            }
            if (!_textareaList || _textareaList.length === 0) {
                logger(prefix + '未找到填空文本框，跳过', 'red')
                return nextSoon()
            }
            let isAnswered = false
            $.each(_textareaList, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered = true
                    }
                } catch (e) {}
            })
            if (isAnswered && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: '填空题', question: _question, answer_format: "用'|'分割多个答案" })
            getAnswer(_type, prompt).then(function (agrs) {
                let parts = (agrs || '').split('|')
                $.each(_textareaList, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    let val = parts[i] !== undefined ? parts[i] : (parts[parts.length - 1] || '')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(val) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 3: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(prefix + '未找到判断选项，跳过', 'red')
                return nextSoon()
            }
            $.each(_answerTmpArr, function (i, t) { _a.push($(t).text().trim()) })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(prefix + '已作答，跳过', 'green')
                        alreadyAnswered = 1
                    } else {
                        logger(prefix + '已作答，按「覆盖已答题」重新作答', 'blue')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (alreadyAnswered) return nextFast()
            let prompt = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
            getAnswer(_type, prompt).then(function (agrs) {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let judgeResult = parseJudgeAnswer(agrs)
                let _i = judgeResult !== null ? findJudgeOptionIndex(_a, judgeResult === 'true') : -1
                if (_i === -1) {
                    logger(prefix + '答案匹配出错，跳过', 'red')
                    return nextSoon()
                }
                setTimeout(function () {
                    let cls = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                    if (cls.indexOf('check_answer') === -1) {
                        if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }
                    logger(prefix + '自动答题成功', 'green')
                    nextSoon()
                }, 300)
            }).catch(function () { nextSoon() })
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(prefix + '未找到答题文本框，跳过', 'red')
                return nextSoon()
            }
            let isAnswered = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered = true
                    }
                } catch (e) {}
            })
            if (isAnswered && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 5: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(prefix + '未找到答题文本框，跳过', 'red')
                return nextSoon()
            }

            let isAnswered5 = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered5 = true
                    }
                } catch (e) {}
            })
            if (isAnswered5 && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 6: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(prefix + '未找到答题文本框，跳过', 'red')
                return nextSoon()
            }

            let isAnswered6 = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered6 = true
                    }
                } catch (e) {}
            })
            if (isAnswered6 && !isRedoMode()) {
                logger(prefix + '已作答，跳过', 'green')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) {}
                    }, 300 + i * 200)
                })
                logger(prefix + '自动答题成功', 'green')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        default: {
            logger(prefix + '无法处理此题型: ' + typeName + '，跳过', 'red')
            nextSoon()
        }
    }
}

function refreshCourseList() {
    let _p = parseUrlParams()
    return new Promise((resolve, reject) => {
        $.ajax({
            url: _l.protocol + '//' + _l.host + '/mycourse/studentstudycourselist?courseId=' + _p['courseid'] + '&chapterId=' + _p['knowledgeid'] + '&clazzid=' + _p['clazzid'] + '&mooc2=1',
            type: 'GET',
            dataType: 'html',
            timeout: 10000,
            success: function (res) {
                resolve(res)
            },
            error: function (xhr, status) {
                reject(new Error(status === 'timeout' ? '课程目录请求超时（10秒）' : '课程目录请求失败（' + (xhr.status || status) + '）'))
            }
        })
    })

}

var _ne21ThinkingCount = 0;
function showThinking() {
    _ne21ThinkingCount++;
    if (_ne21ThinkingCount === 1) {
        $('#ne-21thinking', getPanelDocument()).addClass('ne21-active');
    }
}
function hideThinking() {
    if (_ne21ThinkingCount > 0) _ne21ThinkingCount--;
    if (_ne21ThinkingCount === 0) {
        $('#ne-21thinking', getPanelDocument()).removeClass('ne21-active');
    }
}

function buildPrompt(opts) {
    opts = opts || {}
    let q = opts.question != null ? String(opts.question) : ''
    let payloadObj = {}
    if (opts.type) payloadObj.type = String(opts.type)
    if (opts.answer_format) payloadObj.answer_format = String(opts.answer_format)
    payloadObj.question = q
    if (Array.isArray(opts.options) && opts.options.length > 0) {
        payloadObj.options = opts.options.map(function (s) { return String(s == null ? '' : s).trim() })
    }
    let payload = JSON.stringify(payloadObj, null, 2)
    let display = q
    if (payloadObj.options && payloadObj.options.length) {
        display += '\n' + payloadObj.options.map(function (o) {
            var t = String(o == null ? '' : o).trim();
            return t ? t : '[公式/图片]';
        }).join(' | ')
    }
    return { payload: payload, display: display }
}

function processSubQuestions(subIndex, $subQuestions, parentQuestion, getDelay, onComplete) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { processSubQuestions(subIndex, $subQuestions, parentQuestion, getDelay, onComplete) }, 3000);
        return;
    }
    let delay = typeof getDelay === 'function' ? getDelay() : (setting.time || 2500);
    if (subIndex === $subQuestions.length) {
        logger('该大题所有子题已处理完毕，准备切换下一题', 'green');
        setTimeout(onComplete, delay);
        return;
    }

    let $subQ = $($subQuestions[subIndex]);
    let subQuestionText = $subQ.find('.reader_answer_tit').text().replace(/^\(\d+\)\s*/, '').trim();
    let fullQuestion = "[大题背景]\n" + parentQuestion + "\n\n[小题]\n" + subQuestionText;

    let subTypeVal = parseInt($subQ.attr('qtype'));
    let readTypeText = $subQ.find('.read_type').text().trim();
    let subType = undefined;
    if (!isNaN(subTypeVal)) {
        subType = subTypeVal;
    } else if (readTypeText.indexOf('单选') !== -1) {
        subType = 0;
    } else if (readTypeText.indexOf('多选') !== -1) {
        subType = 1;
    } else if (readTypeText.indexOf('填空') !== -1) {
        subType = 2;
    } else if (readTypeText.indexOf('判断') !== -1) {
        subType = 3;
    } else if (readTypeText.indexOf('简答') !== -1 || readTypeText.indexOf('问答') !== -1 || readTypeText.indexOf('论述') !== -1) {
        subType = 4;
    }

    if (subType === undefined) {
        logger('子题 ' + (subIndex + 1) + ' 题型未知，跳过', 'red');
        setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
        return;
    }

    let $options = $subQ.find('.answerBg .answer_p');
    if ($options.length === 0) $options = $subQ.find('.stem_answer .answer_p');

    let hasAnswered = false;
    if (subType === 0 || subType === 1 || subType === 3) {
        for (let i = 0; i < $options.length; i++) {
            let cls = $($options[i]).parent().find('span').attr('class') || '';
            if (cls.indexOf('check_answer') !== -1) {
                hasAnswered = true;
                break;
            }
        }
    } else {
        let $subTextareas = $subQ.find('textarea, .subEditor textarea, .divText textarea, textarea[name^="answerEditor"]');
        $.each($subTextareas, function (i, t) {
            let eid = $(t).attr('id') || $(t).attr('name');
            try {
                if (eid && UE.getEditor(eid) && UE.getEditor(eid).getContent && UE.getEditor(eid).getContent() !== '') {
                    hasAnswered = true;
                }
            } catch (e) {
                if ($(t).val() && $(t).val().trim() !== '') {
                    hasAnswered = true;
                }
            }
        });
    }

    if (hasAnswered && !isRedoMode()) {
        logger('子题 ' + (subIndex + 1) + ' 已作答，跳过', 'green');
        setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, 30);
        return;
    }

    function clickOption($opt) {
        if (localStorage.getItem('ZhixingSetting.goodStudent') === 'true') {
            $opt.parent().find('span').css('font-weight', 'bold');
        } else {
            $opt.parent().click();
        }
    }

    let currentTypeName = $subQuestions.parent().parent().attr('typename') || '阅读理解';
    _currentQuestionMeta = { index: _currentQuestionMeta ? _currentQuestionMeta.index : null, total: _currentQuestionMeta ? _currentQuestionMeta.total : null, typeName: currentTypeName + ' 第' + (subIndex + 1) + '小题' };

    if (subType === 0 || subType === 3) {
        let optionTexts = [];
        $options.each(function () {
            optionTexts.push($(this).text().replace(/[ABCD]/g, '').trim());
        });
        let typeStr = subType === 0 ? '单选题' : '判断题';
        let answer_format = subType === 0 ? undefined : '只回答正确或错误';
        let prompt = buildPrompt({ type: typeStr, question: fullQuestion, options: subType === 0 ? optionTexts : undefined, answer_format: answer_format });

        getAnswer(subType, prompt).then(agrs => {
            let _a = [];
            $options.each((i, t) => {
                _a.push(tidyStr($(t).html()));
            });

            let _i = -1;
            if (subType === 3) {
                let judgeResult = parseJudgeAnswer(agrs);
                if (judgeResult !== null) {
                    _i = findJudgeOptionIndex(_a, judgeResult === 'true');
                }
            } else {
                _i = _a.findIndex(item => item == agrs);
                if (_i === -1) {
                    _i = findBestFuzzyMatch(_a, agrs);
                }
            }

            if (_i === -1) {
                gptRecordFail("AI未能匹配到正确选项，请手动选择");
            } else {
                clickOption($($options[_i]));
                logger('子题 ' + (subIndex + 1) + ' 答题成功', 'green');
            }
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
        }).catch(() => {
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
        });
    } else if (subType === 1) {
        let optionTexts = [];
        $options.each(function () {
            optionTexts.push($(this).text().replace(/[ABCD]/g, '').trim());
        });
        let prompt = buildPrompt({ type: '多选题', question: fullQuestion, options: optionTexts, answer_format: "用'|'分割多个答案" });

        getAnswer(1, prompt).then(agrs => {
            let _multiOptions = [];
            $options.each((i, t) => {
                _multiOptions.push(tidyStr($(t).html()));
            });
            let _matchedAny = false;
            $options.each((i, t) => {
                if (agrs.indexOf(_multiOptions[i]) != -1) {
                    _matchedAny = true;
                    let check = $(t).parent().find('span').attr('class') || '';
                    if (check.indexOf('check_answer_dx') == -1) {
                        clickOption($(t));
                    }
                }
            });
            if (!_matchedAny) {
                let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs);
                fuzzyIndices.forEach(idx => {
                    let check = $($options[idx]).parent().find('span').attr('class') || '';
                    if (check.indexOf('check_answer_dx') == -1) {
                        clickOption($($options[idx]));
                    }
                });
            }
            logger('子题 ' + (subIndex + 1) + ' 答题成功', 'green');
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
        }).catch(() => {
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
        });
    } else if (subType === 2 || subType === 4) {
        let $subTextareas = $subQ.find('textarea, .subEditor textarea, .divText textarea, textarea[name^="answerEditor"]');
        if ($subTextareas.length === 0) {
            gptRecordFail("未找到该小题的填空/文本输入框，跳过");
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
            return;
        }

        let typeStr = subType === 2 ? '填空题' : '简答题';
        let answer_format = subType === 2 ? "用'|'分割多个答案" : "用50字简要回答";
        let prompt = buildPrompt({ type: typeStr, question: fullQuestion, answer_format: answer_format });

        getAnswer(subType, prompt).then(agrs => {
            let parts = subType === 2 ? (agrs || '').split('|') : [agrs];
            $.each($subTextareas, (i, t) => {
                let _currentId = $(t).attr('id') || $(t).attr('name');
                let val = parts[i] !== undefined ? parts[i] : (parts[0] || agrs);
                setTimeout(() => {
                    try {
                        if (_currentId && UE.getEditor(_currentId)) {
                            UE.getEditor(_currentId).setContent(val);
                        } else {
                            $(t).val(val);
                        }
                    } catch (e) {
                        $(t).val(val);
                    }
                }, 300 + i * 200);
            });
            logger('子题 ' + (subIndex + 1) + ' 答题成功', 'green');
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay + 200 * $subTextareas.length);
        }).catch(() => {
            setTimeout(() => { processSubQuestions(subIndex + 1, $subQuestions, parentQuestion, getDelay, onComplete) }, delay);
        });
    }
}

var _ne21NextBankAt = 0;
function gptApiConfigured() {
    try {
        if (!OWN_API || !OWN_API.enabled) return false;
        var eps = ownApiEndpoints();
        if (!eps.length) return false;
        if (String(OWN_API.apiKey || '').indexOf('REPLACE') !== -1) return false;
        if (!String(OWN_API.model || '').trim()) return false;
        return true;
    } catch (_) { return false; }
}
function isBankOn() {
    try {
        var v = localStorage.getItem('ZhixingSetting.bankOn');
        return v === null ? !!setting.bankOn : v === 'true';
    } catch (_) { return false; }
}
function bankTypeCode(typeName) {
    var t = String(typeName || '');
    if (t.indexOf('多选') !== -1) return 1;
    if (t.indexOf('判断') !== -1) return 3;
    if (t.indexOf('填空') !== -1) return 4;
    if (t.indexOf('简答') !== -1) return 5;
    return 0;
}
function gptBankList() {
    try {
        var raw = localStorage.getItem('ZhixingSetting.bankList');
        if (raw) {
            var arr = JSON.parse(raw);
            if (Object.prototype.toString.call(arr) === '[object Array]') {
                var out = arr.filter(function (u) { return typeof u === "string" && u; });
                if (out.length) return out;
            }
        }
    } catch (_) { }
    var one = '';
    try { one = localStorage.getItem('ZhixingSetting.bankUrl') || ''; } catch (_) { }
    return [one || 'https://cx.icodef.com/wyn-nb?v=4'];
}
function bankHost(u) {
    try { return new URL(u).host; } catch (_) { return String(u).slice(0, 24); }
}
function normalizeBankAnswer(data, typeName) {
    var s = String(data || '').replace(/\s*\((?:si|SI)\)\.?$/, '').trim();
    if (s.indexOf('#') === -1) return s;
    var parts = s.split('#').map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    if (!parts.length) return s;
    var t = String(typeName || '');
    if (t.indexOf('多选') !== -1) return parts.join('|');
    return parts[0];
}
function gptBankQuery(url, q, type, attempt, cb) {
    var now = Date.now();
    var wait = Math.max(0, _ne21NextBankAt - now);
    _ne21NextBankAt = Math.max(now, _ne21NextBankAt) + 1200;
    setTimeout(function () {
        var finished = false;
        function done(ans, reason) { if (finished) return; finished = true; cb(ans, reason); }
        try {
            GM_xmlhttpRequest({
                method: 'POST',
                url: url,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: 'question=' + encodeURIComponent(q) + '&type=' + bankTypeCode(type) + '&id=0',
                timeout: 6000,
                onload: function (xhr) {
                    var j = null;
                    try { j = JSON.parse(xhr.responseText); } catch (_) { }
                    if (!j) { done(null, '返回不是 JSON'); return; }
                    var code = Number(j.code);
                    var data = j.data == null ? '' : String(j.data).trim();
                    if (code === 1 && data) {
                        if (/^https?:\/\//i.test(data)) {
                            var _imgUrl = data.replace(/\s*\((?:si|SI)\)\.?$/, '').trim();
                            try {
                                if (/^https:\/\/p\.ananas\.chaoxing\.com\//i.test(_imgUrl)) {
                                    logger('[题库] 返回图片答案，点图可放大：<a href="' + _imgUrl + '" target="_blank" rel="noopener"><img src="' + _imgUrl + '" style="display:block;max-width:180px;max-height:120px;margin-top:6px;border-radius:6px;border:1px solid rgba(15,23,42,.12)"></a>', 'blue');
                                } else {
                                    logger('[题库] 返回图片答案：' + _imgUrl, 'blue');
                                }
                            } catch (_) { }
                            done(null, null);
                            return;
                        }
                        done(normalizeBankAnswer(data, type));
                        return;
                    }
                    if (code === -2 && attempt < 1) {
                        finished = true;
                        setTimeout(function () { gptBankQuery(url, q, type, attempt + 1, cb); }, 1600);
                        return;
                    }
                    done(null, code === -1 ? '未命中' : ('code=' + code));
                },
                onerror: function () { done(null, '连接失败'); },
                ontimeout: function () { done(null, '超时'); }
            });
        } catch (_) { done(null, '调用异常'); }
    }, wait);
}
function gptBankAnswer(p) {
    return new Promise(function (resolve) {
        var q = '';
        try { q = ownApiStripMedia(p.question || '').trim(); } catch (_) { q = String(p.question || '').trim(); }
        if (!q) { resolve(null); return; }
        var list = gptBankList();
        function tryNext(i) {
            if (i >= list.length) { resolve(null); return; }
            var url = list[i];
            var host = bankHost(url);
            gptBankQuery(url, q, p.type, 0, function (ans, reason) {
                if (ans) {
                    try { logger('[题库] ' + host + ' 命中', 'green'); } catch (_) { }
                    resolve(ans);
                    return;
                }
                if (reason) {
                    try { logger('[题库] ' + host + '：' + reason, 'orange'); } catch (_) { }
                }
                tryNext(i + 1);
            });
        }
        tryNext(0);
    });
}

function getAnswer(_t, _q, retryCount = 0, _skipBank) {

    let _payload, _display
    if (_q && typeof _q === 'object' && (_q.payload != null || _q.display != null)) {
        _payload = _q.payload != null ? String(_q.payload) : ''
        _display = _q.display != null ? String(_q.display) : _payload
    } else {
        _payload = _q == null ? '' : String(_q)
        _display = _payload
    }
    let _qPrefix = ''
    if (_currentQuestionMeta) {
        var _m = _currentQuestionMeta
        _qPrefix = '第' + ((_m.index != null ? _m.index : -1) + 1)
        if (_m.total) _qPrefix += '/' + _m.total
        _qPrefix += '题 [' + (_m.typeName || '未知') + '] '
    }
    var _dispShort = String(_display).replace(/<img[^>]*>/gi, '[图]').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (_dispShort.length > 300) _dispShort = _dispShort.slice(0, 300) + '…';

    /* 题库优先：命中直接返回，未命中回落 AI */
    if (!_skipBank && isBankOn()) {
        var _bp = null;
        try { _bp = ownApiParsePayload(_payload); } catch (_) { }
        if (_bp) {
            logger(_qPrefix + '题目:' + _dispShort, 'pink');
            return gptBankAnswer(_bp).then(function (bankAns) {
                if (bankAns) {
                    logger(_qPrefix + '[题库] 命中：' + bankAns, 'green');
                    return bankAns;
                }
                logger(_qPrefix + '[题库] 未命中，改用 AI', 'orange');
                if (!OWN_API.enabled) {
                    logger(_qPrefix + '[题库] 未命中，且未配置 AI 接口，已跳过', 'orange');
                    return Promise.reject({ c: 0 });
                }
                return getAnswer(_t, _q, retryCount, true);
            }).catch(function (_e) {
                if (_e && _e.c === 0) throw _e;
                try { logger(_qPrefix + '[题库] 查询异常：' + (_e && _e.message ? _e.message : _e) + '，改用 AI', 'orange'); } catch (_) { }
                if (!OWN_API.enabled) { try { logger(_qPrefix + '[题库] 查询异常，且未配置 AI 接口，已跳过', 'orange'); } catch (_) { } throw { c: 0 }; }
                return getAnswer(_t, _q, retryCount, true);
            });
        }
    }
    logger(_qPrefix + '题目:' + _dispShort, 'pink')

    let _thinkingHtml = '<span class="ne21-log-spinner"></span>AI 思考中<span class="ne21-log-dots"><i></i><i></i><i></i></span>' + (retryCount > 0 ? '（第' + (retryCount + 1) + '次）' : '')
    let $thinkingLog = logger(_thinkingHtml, 'gray')
    return new Promise((resolve, reject) => {
        let _u = getCk('_uid') || getCk('UID')
        let requestCompleted = false;
        let longWaitTimer = null;

        let _intervalMs = Math.min(60000, setting.time !== undefined ? setting.time : 2500)
        let _nowTs = Date.now()
        let _waitMs = Math.max(0, _ne21NextAiAllowedAt - _nowTs)

        _ne21NextAiAllowedAt = Math.max(_nowTs, _ne21NextAiAllowedAt) + _intervalMs
        if (_waitMs > 0) {
            updateLogEntry($thinkingLog, '搜题间隔限制，等待 ' + Math.round(_waitMs / 1000) + 's 后发起请求...', 'gray')
        }

        var _maxRetries = 3;
        longWaitTimer = setTimeout(() => {
            if (!requestCompleted) {
                requestCompleted = true;
                if (retryCount >= _maxRetries) {
                    updateLogEntry($thinkingLog, '已重试' + _maxRetries + '次仍未响应，请刷新页面重试', 'red')
                    reject({ 'c': 666 })
                    return;
                }

                updateLogEntry($thinkingLog, '请求超过2.5分钟未响应，正在重新发起请求...（第' + (retryCount + 1) + '次重试）', 'orange')

                getAnswer(_t, _q, retryCount + 1, _skipBank).then(resolve).catch(reject)
            }
        }, 150000 + _waitMs);

        setTimeout(function () {
            if (requestCompleted) return;

            if (_waitMs > 0) {
                let _resumeHtml = '<span class="ne21-log-spinner"></span>AI 思考中<span class="ne21-log-dots"><i></i><i></i><i></i></span>' + (retryCount > 0 ? '（第' + (retryCount + 1) + '次）' : '')
                updateLogEntry($thinkingLog, _resumeHtml, 'gray')
            }

            /* ---- 没配置 API：题库也没命中时直接跳过，不报错 ---- */
            if (!gptApiConfigured()) {
                requestCompleted = true;
                clearTimeout(longWaitTimer);
                updateLogEntry($thinkingLog, '未配置模型接口，已跳过本题（可在设置里填 API，或打开「题库优先」）', 'orange');
                reject({ c: 0 });
                return;
            }

            /* ---- 自建 API 分支 ---- */
            if (OWN_API.enabled) {
                ownApiAnswer(_payload).then(function (ownAnswer) {
                    if (requestCompleted) return;
                    requestCompleted = true;
                    clearTimeout(longWaitTimer);
                    updateLogEntry($thinkingLog, "答案:" + ownAnswer, "purple");
                    resolve(ownAnswer);
                }).catch(function (ownErr) {
                    if (requestCompleted) return;
                    requestCompleted = true;
                    clearTimeout(longWaitTimer);
                    updateLogEntry($thinkingLog, "接口出错：" + (ownErr && ownErr.message ? ownErr.message : ownErr), "red");
                    if (retryCount >= _maxRetries) { reject({ "c": 666 }); return; }
                    getAnswer(_t, _q, retryCount + 1, _skipBank).then(resolve).catch(reject);
                });
                return;
            }

            GM_xmlhttpRequest({
                method: 'POST',
                url: _host + '/api/v1/cx?v=' + GM_info['script']['version'],
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': ''
                },
                data: 'question=' + encodeURIComponent(_payload) + '&u=' + _u + '&model=' + (localStorage.getItem('ZhixingSetting.model') || $('#modelSelect').val() || 'GPT-3.5'),
                timeout: 135000,
                onload: function (xhr) {

                    if (requestCompleted) {
                        logger('收到已超时请求的响应，已忽略', 'gray')
                        return;
                    }

                    requestCompleted = true;
                    clearTimeout(longWaitTimer);

                    if (xhr.status == 200) {
                        let obj = $.parseJSON(xhr.responseText) || {};

                        if (!obj.data || typeof obj.data.answer !== 'string') {
                            updateLogEntry($thinkingLog, obj.msg || '服务器返回数据异常', 'red')
                            localStorage.setItem('ZhixingSetting.sub', false)
                            reject({ 'c': 0 })
                            return;
                        }

                        let _answer = obj.data.answer.replace(/。$/, '');

                        if (obj.code == 200 && _answer) {
                            updateLogEntry($thinkingLog, "答案:" + _answer, 'purple')
                            resolve(_answer.replace(/^[A-Z]\s*\n\s*/, '').trim())
                        } else if (obj.msg && _answer != '') {
                            updateLogEntry($thinkingLog, obj.msg, 'red')

                            localStorage.setItem('ZhixingSetting.sub', false)
                            reject({ 'c': 0 })
                        } else {
                            updateLogEntry($thinkingLog, '暂无答案', 'red')

                            localStorage.setItem('ZhixingSetting.sub', false)
                            reject({ 'c': 0 })
                        }
                    } else if (xhr.status == 403) {
                        updateLogEntry($thinkingLog, '请求过于频繁，请稍后再试', 'red')
                        reject({ 'c': 403 })
                    } else if (xhr.status == 500) {
                        updateLogEntry($thinkingLog, 'ChatGPT官方服务器压力过大,请先保存答案后刷新重试', 'red')
                        reject({ 'c': 500 })
                    } else if (xhr.status == 444) {
                        updateLogEntry($thinkingLog, 'IP异常，已被拉入服务器黑名单，请过几个小时再试', 'red')
                        reject({ 'c': 444 })
                    } else if (xhr.status == 400) {
                        let obj = $.parseJSON(xhr.responseText) || {};
                        updateLogEntry($thinkingLog, obj.msg, 'red')
                        reject({ 'c': 400 })
                    } else if (xhr.status == 222) {
                        let obj = $.parseJSON(xhr.responseText) || {};
                        updateLogEntry($thinkingLog, "账户余额不足!", 'red')
                        reject({ 'c': 222 })
                    } else {
                        updateLogEntry($thinkingLog, '请求异常...,请先保存答案后刷新重试,仍然失败请尝试更换模型或联系售后', 'red')
                        reject({ 'c': 555 })
                    }
                },
                ontimeout: function () {

                    if (requestCompleted) {
                        return;
                    }

                    requestCompleted = true;
                    clearTimeout(longWaitTimer);

                    if (retryCount >= _maxRetries) {
                        updateLogEntry($thinkingLog, '已重试' + _maxRetries + '次仍超时，请刷新页面重试', 'red')
                        reject({ 'c': 666 })
                        return;
                    }
                    updateLogEntry($thinkingLog, '请求超时，正在自动重试...（第' + (retryCount + 1) + '次重试）', 'orange')
                    getAnswer(_t, _q, retryCount + 1, _skipBank).then(resolve).catch(reject)
                }
            });
        }, _waitMs);
    })
}

function doWork(index, doms, dom) {
    $frame_c = $(dom).contents();
    let $CyHtml = $frame_c.find('.CeYan')
    let TiMuList = $CyHtml.find('.TiMu')
    $subBtn = $frame_c.find(".ZY_sub").find(".btnSubmit");
    $saveBtn = $frame_c.find(".ZY_sub").find(".btnSave");
    startDoWork(index, doms, 0, TiMuList)
}

function startDoWork(index, doms, c, TiMuList) {
    if (localStorage.getItem('ZhixingSetting.isPaused') === 'true') {
        setTimeout(() => { startDoWork(index, doms, c, TiMuList) }, 3000);
        return;
    }
    if (c == TiMuList.length) {
        try { gptSummarizeFails(); } catch (_) { }
        if (localStorage.getItem('ZhixingSetting.sub') === 'true') {
            logger('测验处理完成，准备自动提交。', 'green')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $frame_c.find('#confirmSubWin > div > div > a.bluebtn').click()
                    logger('提交成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { startDoCyWork(index + 1, doms) }, 3000)
                }, 3000)
            }, 5000)
        } else if (localStorage.getItem('ZhixingSetting.force') === 'true') {
            logger('测验处理完成，存在无答案题目,由于用户设置了强制提交，准备自动提交。', 'red')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $frame_c.find('#confirmSubWin > div > div > a.bluebtn').click()
                    logger('提交成功，准备切换下一个任务。', 'green')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { startDoCyWork(index + 1, doms) }, 3000)
                }, 3000)
            }, 5000)
        } else {
            logger('测验处理完成，存在无答案题目或者用户设置不提交，正在保存当前作答。', 'red')
            setTimeout(() => {
                if ($saveBtn && $saveBtn.length) {
                    $saveBtn.click()
                    logger('已点击“保存”，下次进入可继续作答。', 'green')
                }
            }, 3000)
        }
        return
    }
    let questionFull = $(TiMuList[c]).find('.Zy_TItle.clearfix > div').html()
    questionFull = tidyQuestion(questionFull).replace("/<span.*?>.*?</span>/", "");
    let _question = tidyQuestion(questionFull)
    let typeName = questionFull.match(/^【(.*?)】|$/)[1];
    let _TimuType = {
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4
    }[typeName]
    _currentQuestionMeta = { index: c, total: TiMuList.length, typeName: typeName }
    let _a = []
    let _answerTmpArr

    if (_TimuType === undefined) {
        logger('未知题型: ' + typeName + '，尝试自动识别', 'blue');

        let choiceList = $(TiMuList[c]).find('.Zy_ulTop li');
        if (choiceList && choiceList.length > 0) {

            if (choiceList.length === 2 &&
                ($(choiceList[0]).text().includes('对') || $(choiceList[0]).text().includes('√')) &&
                ($(choiceList[1]).text().includes('错') || $(choiceList[1]).text().includes('×'))) {
                _TimuType = 3;
                logger('自动识别为判断题', 'green');
            }

            else {

                _TimuType = 0;
                logger('自动识别为单选题', 'green');
            }
        }

        else {
            let fillBlankList = $(TiMuList[c]).find('.Zy_ulTk .XztiHover1');
            if (fillBlankList && fillBlankList.length > 0) {
                _TimuType = 2;
                logger('自动识别为填空题', 'green');
            } else {

                let editorList = $(TiMuList[c]).find('.edui-editor');
                if (editorList && editorList.length > 0) {
                    _TimuType = 4;
                    logger('检测到富文本编辑器，识别为简答题', 'green');
                } else {

                    _TimuType = 4;
                    logger('无法准确判断题型，按简答题处理', 'blue');
                }
            }
        }
    }

    switch (_TimuType) {
        case 0: {
            _answerTmpArr = $(TiMuList[c]).find('.Zy_ulTop li').find('a')

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })
            $.each(_answerTmpArr, (i, t) => {
                _a.push(tidyStr($(t).html()))
            })
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                let _i = _a.findIndex((item) => item == agrs)
                if (_i == -1) {

                    _i = findBestFuzzyMatch(_a, agrs)
                }
                if (_i == -1) {
                    gptRecordFail("AI无法完美匹配正确答案,请手动选择，跳过")
                    localStorage.setItem('ZhixingSetting.sub', false)
                } else {
                    $(_answerTmpArr[_i]).parent().click();
                }
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
        case 1: {
            _answerTmpArr = $(TiMuList[c]).find('.Zy_ulTop li').find('a')

            let mergedAnswers = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
            });
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                let _multiOptions = []
                $.each(_answerTmpArr, (i, t) => {
                    _multiOptions.push(tidyStr($(t).html()))
                })
                let _matchedAny = false
                $.each(_answerTmpArr, (i, t) => {
                    if (agrs.indexOf(_multiOptions[i]) != -1) {
                        _matchedAny = true
                        $(_answerTmpArr[i]).parent().click();
                        _a.push(['A', 'B', 'C', 'D', 'E', 'F', 'G'][i])
                    }
                })

                if (!_matchedAny) {
                    let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                    for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                        $(_answerTmpArr[fuzzyIndices[fi]]).parent().click();
                        _a.push(['A', 'B', 'C', 'D', 'E', 'F', 'G'][fuzzyIndices[fi]])
                    }
                }
                let id = getStr($(TiMuList[c]).find('.Zy_ulTop li:nth-child(1)').attr('onclick'), 'addcheck(', ');').replace('(', '').replace(')', '')
                if (_a.length <= 0) {
                    gptRecordFail("AI无法完美匹配正确答案,请手动选择，跳过")

                    localStorage.setItem('ZhixingSetting.sub', false)
                } else {
                    $(TiMuList[c]).find('.Zy_ulTop').parent().find('#answer' + id).val(_a.join(""))
                }
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
        case 2: {
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "多个填空用'|'分隔" })
            let _textareaList = $(TiMuList[c]).find('.Zy_ulTk .XztiHover1')
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                let _answerList = agrs.split("|")
                $.each(_textareaList, (i, t) => {
                    setTimeout(() => {
                        $(t).find('#ueditor_' + i).contents().find('.view p').html(_answerList[i]);
                        $(t).find('textarea').html('<p>' + _answerList[i] + '</p>')
                    }, 300)
                })
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
        case 3: {
            _answerTmpArr = $(TiMuList[c]).find(".Zy_ulTop li").find("a");
            let _true = "正确|是|对|√|T|ri";
            $.each(_answerTmpArr, (i, t) => {
                _a.push(tidyStr($(t).html()));
            });
            _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('ZhixingSetting.alterTitle') === 'true') {

                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                var _judge = parseJudgeAnswer(agrs);
                var _i = -1;
                if (_judge !== null) { _i = findJudgeOptionIndex(_a, _judge === "true"); }
                if (_i === -1) { _i = _a.findIndex(function (item) { return item == agrs; }); }
                if (_i == -1) {

                    _i = findBestFuzzyMatch(_a, agrs)
                }
                if (_i == -1) {
                    logger("未匹配到正确答案，跳过", "red");
                    localStorage.setItem('ZhixingSetting.sub', false)
                } else {
                    $(_answerTmpArr[_i]).parent().click();
                }
                setTimeout(() => {
                    startDoWork(index, doms, c + 1, TiMuList);
                }, setting.time);
            }).catch((agrs) => {
                setTimeout(() => {
                    startDoWork(index, doms, c + 1, TiMuList);
                }, setting.time);
            });
            break;
        }
        case 4: {
            let _textareaLista = $(TiMuList[c]).find('.Zy_ulTk .XztiHover1')
            getAnswer(_TimuType, _question).then((agrs) => {
                if (agrs == '暂无答案') {

                    localStorage.setItem('ZhixingSetting.sub', false)
                }
                let _answerList = agrs.split("#")
                $.each(_textareaLista, (i, t) => {
                    setTimeout(() => {
                        $(t).find('#ueditor_' + i).contents().find('.view p').html(_answerList[i]);
                        $(t).find('textarea').html('<p>' + _answerList[i] + '</p>')
                    }, 300)
                })
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
    }
}

function switchMission() {
    _mlist.splice(0, 1)
    _domList.splice(0, 1)
    setTimeout(missonStart, 5000)
}

function tidyStr(s) {
    if (s) {
        let str = String(s)
            .replace(/<svg[\s\S]*?<title[^>]*>([\s\S]*?)<\/title>[\s\S]*?<\/svg>/gi, ' $1 ')
            .replace(/<annotation[^>]*>([\s\S]*?)<\/annotation>/gi, ' $1 ')
            .replace(/<script[^>]*type=["']math\/tex[^"']*["'][^>]*>([\s\S]*?)<\/script>/gi, ' $1 ')
            .replace(/<img[^>]*\balt=["']([^"']*)["'][^>]*>/gi, ' $1 ')
            .replace(/<(?!img).*?>/g, "").replace(/^【.*?】\s*/, '').replace(/\s*（\d+\.\d+分）$/, '').trim().replace(/&nbsp;/g, '').replace(new RegExp("&nbsp;", ("gm")), '').replace(/^\s+/, '').replace(/\s+$/, '');
        return str
    } else {
        return null
    }
}

function tidyQuestion(s) {
    if (s) {
        let str = s.replace(/<(?!img).*?>/g, "").replace(/^【.*?】\s*/, '').replace(/\s*（\d+\.\d+分）$/, '').replace(/^\d+[.、]/, '').trim().replace(/&nbsp;/g, '').replace('javascript:void(0);', '').replace(new RegExp("&nbsp;", ("gm")), '').replace(/^\s+/, '').replace(/\s+$/, '');
        return str
    } else {
        return null
    }
}

var ZX_FONT_TABLE_GZ = "";
if (!window.__zxFontTable || !window.__zxFontTable.__ok) { window.__zxFontTable = null; }

function gptFontTable() {
    if (window.__zxFontTable) return Promise.resolve(window.__zxFontTable);
    var raw = null;
    try { raw = GM_getResourceText('Table'); } catch (_) { }
    if (raw) {
        try { window.__zxFontTable = JSON.parse(raw); return Promise.resolve(window.__zxFontTable); } catch (_) { }
    }
    return new Promise(function (resolve) {
        try {
            if (typeof DecompressionStream === 'undefined') { resolve(null); return; }
            var bin = atob(ZX_FONT_TABLE_GZ);
            var buf = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
            var stream = new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"));
            new Response(stream).text().then(function (txt) {
                try { window.__zxFontTable = JSON.parse(txt); } catch (_) { window.__zxFontTable = null; }
                resolve(window.__zxFontTable);
            }).catch(function () { resolve(null); });
        } catch (_) { resolve(null); }
    });
}

function decryptFont() {
    var $tip = $('style:contains(font-cxsecret)');
    if (!$tip.length) return Promise.resolve(false);
    var m = $tip.text().match(/base64,([wW]+?)'/);
    if (!m) return Promise.resolve(false);
    var font = m[1];
    if (typeof Typr === 'undefined' || !Typr.parse) { console.warn('[知行] Typr 未就绪，跳过字体解密'); return Promise.resolve(false); }
    try { font = Typr.parse(base64ToUint8Array(font))[0]; } catch (_) { return Promise.resolve(false); }
    return gptFontTable().then(function (table) {
        if (!table) {
            console.warn('[知行] 字体解密表不可用，跳过（题目可能是乱码）');
            return false;
        }
        var match = {};
        for (var i = 19968; i < 40870; i++) {
            var gid = Typr.U.codeToGlyph(font, i);
            if (!gid) continue;
            var path = Typr.U.glyphToPath(font, gid);
            var key = md5(JSON.stringify(path)).slice(24);
            if (table[key] !== undefined) match[i] = table[key];
        }
        $('.font-cxsecret').html(function (index, html) {
            $.each(match, function (k, v) {
                html = html.replace(new RegExp(String.fromCharCode(k), "g"), String.fromCharCode(v));
            });
            return html;
        }).removeClass('font-cxsecret');
        return true;
    });
}

function base64ToUint8Array(base64) {
    var data = window.atob(base64);
    var buffer = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
        buffer[i] = data.charCodeAt(i);
    }
    return buffer;
}

/* ==== 面板看门狗：有的页面加载后会把 body 重建，导致面板被冲掉 ==== */
(function () {
    if (typeof window === 'undefined' || window !== top) return;
    function ensurePanel() {
        try {
            if (typeof ensureBall === 'function') { try { ensureBall(); } catch (_) { } }
            if (document.getElementById('ne-21box')) return;
            if (typeof showBox !== 'function') return;
            showBox();
        } catch (_) { }
    }
    setInterval(ensurePanel, 2000);
    try { window.addEventListener('load', function () { setTimeout(ensurePanel, 300); }); } catch (_) { }
    try { document.addEventListener('visibilitychange', function () { if (!document.hidden) setTimeout(ensurePanel, 500); }); } catch (_) { }
    try { window.addEventListener('focus', function () { setTimeout(ensurePanel, 300); }); } catch (_) { }
})();
