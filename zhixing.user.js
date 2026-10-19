// ==UserScript==
// @name                知行 · 网课助手
// @namespace           zhixing.local
// @downloadURL      https://cdn.jsdelivr.net/gh/GuanYunMao/zhixing@main/zhixing.user.js
// @updateURL        https://cdn.jsdelivr.net/gh/GuanYunMao/zhixing@main/zhixing.user.js
// @version             4.0.0
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
        gptApiState("未配置", "red");
        try { logger("知行还没配置模型接口：请在「设置 → API 设置」里填地址和 Key", "red"); } catch (_) { }
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

var ZX_FONT_TABLE_GZ = "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";
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
