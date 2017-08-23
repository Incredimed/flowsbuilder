!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t,n){var o=e.docs[t];o?n(S(e,o)):e.options.getFile?e.options.getFile(t,n):n(null)}function n(e,t,n){for(var o in e.docs){var i=e.docs[o];if(i.doc==t)return i}if(!n)for(var r=0;;++r)if(o="[doc"+(r||"")+"]",!e.docs[o]){n=o;break}return e.addDoc(n,t)}function o(t,o){return"string"==typeof o?t.docs[o]:(o instanceof e&&(o=o.getDoc()),o instanceof e.Doc?n(t,o):void 0)}function i(e,t,o){var i=n(e,t),s=e.cachedArgHints;s&&s.doc==t&&R(s.start,o.to)>=0&&(e.cachedArgHints=null);var a=i.changed;null==a&&(i.changed=a={from:o.from.line,to:o.from.line});var c=o.from.line+(o.text.length-1);o.from.line<a.to&&(a.to=a.to-(o.to.line-c)),c>=a.to&&(a.to=c+1),a.from>o.from.line&&(a.from=o.from.line),t.lineCount()>L&&o.to-a.from>100&&setTimeout(function(){i.changed&&i.changed.to-i.changed.from>100&&r(e,i)},200)}function r(e,t){e.server.request({files:[{type:"full",name:t.name,text:S(e,t)}]},function(e){e?window.console.error(e):t.changed=null})}function s(t,n,o){t.request(n,{type:"completions",types:!0,docs:!0,urls:!0},function(i,r){if(i)return q(t,n,i);var s=[],c="",l=r.start,u=r.end;'["'==n.getRange(M(l.line,l.ch-2),l)&&'"]'!=n.getRange(u,M(u.line,u.ch+2))&&(c='"]');for(var f=0;f<r.completions.length;++f){var d=r.completions[f],p=a(d.type);r.guess&&(p+=" "+j+"guess"),s.push({text:d.name+c,displayText:d.displayName||d.name,className:p,data:d})}var h={from:l,to:u,list:s},g=null;e.on(h,"close",function(){A(g)}),e.on(h,"update",function(){A(g)}),e.on(h,"select",function(e,n){A(g);var o=t.options.completionTip?t.options.completionTip(e.data):e.data.doc;o&&(g=D(n.parentNode.getBoundingClientRect().right+window.pageXOffset,n.getBoundingClientRect().top+window.pageYOffset,o),g.className+=" "+j+"hint-doc")}),o(h)})}function a(e){var t;return t="?"==e?"unknown":"number"==e||"string"==e||"bool"==e?e:/^fn\(/.test(e)?"fn":/^\[/.test(e)?"array":"object",j+"completion "+j+"completion-"+t}function c(e,t,n,o,i){e.request(t,o,function(n,o){if(n)return q(e,t,n);if(e.options.typeTip)var r=e.options.typeTip(o);else{var r=w("span",null,w("strong",null,o.type||"not found"));if(o.doc&&r.appendChild(document.createTextNode(" — "+o.doc)),o.url){r.appendChild(document.createTextNode(" "));var s=r.appendChild(w("a",null,"[docs]"));s.href=o.url,s.target="_blank"}}k(t,r,e),i&&i()},n)}function l(t,n){if(H(t),!n.somethingSelected()){var o=n.getTokenAt(n.getCursor()).state,i=e.innerMode(n.getMode(),o);if("javascript"==i.mode.name){var r=i.state.lexical;if("call"==r.info){for(var s,a=r.pos||0,c=n.getOption("tabSize"),l=n.getCursor().line,d=Math.max(0,l-9),p=!1;l>=d;--l){for(var h=n.getLine(l),g=0,m=0;;){var v=h.indexOf("\t",m);if(-1==v)break;g+=c-(v+g)%c-1,m=v+1}if(s=r.column-g,"("==h.charAt(s)){p=!0;break}}if(p){var y=M(l,s),C=t.cachedArgHints;if(C&&C.doc==n.getDoc()&&0==R(y,C.start))return u(t,n,a);t.request(n,{type:"type",preferFunction:!0,end:y},function(e,o){!e&&o.type&&/^fn\(/.test(o.type)&&(t.cachedArgHints={start:y,type:f(o.type),name:o.exprName||o.name||"fn",guess:o.guess,doc:n.getDoc()},u(t,n,a))})}}}}}function u(e,t,n){H(e);for(var o=e.cachedArgHints,i=o.type,r=w("span",o.guess?j+"fhint-guess":null,w("span",j+"fname",o.name),"("),s=0;s<i.args.length;++s){s&&r.appendChild(document.createTextNode(", "));var a=i.args[s];r.appendChild(w("span",j+"farg"+(s==n?" "+j+"farg-current":""),a.name||"?")),"?"!=a.type&&(r.appendChild(document.createTextNode(": ")),r.appendChild(w("span",j+"type",a.type)))}r.appendChild(document.createTextNode(i.rettype?") -> ":")")),i.rettype&&r.appendChild(w("span",j+"type",i.rettype));var c=t.cursorCoords(null,"page");e.activeArgHints=D(c.right+1,c.bottom,r)}function f(e){var t=[],n=3;if(")"!=e.charAt(n))for(;;){var o=e.slice(n).match(/^([^, \(\[\{]+): /);if(o&&(n+=o[0].length,o=o[1]),t.push({name:o,type:function(t){for(var o=0,i=n;;){var r=e.charAt(n);if(t.test(r)&&!o)return e.slice(i,n);/[{\[\(]/.test(r)?++o:/[}\]\)]/.test(r)&&--o,++n}}(/[\),]/)}),")"==e.charAt(n))break;n+=2}var i=e.slice(n).match(/^\) -> (.*)$/);return{args:t,rettype:i&&i[1]}}function d(e,t){function o(o){var i={type:"definition",variable:o||null},r=n(e,t.getDoc());e.server.request(x(e,r,i),function(n,o){if(n)return q(e,t,n);if(!o.file&&o.url)return void window.open(o.url);if(o.file){var i,s=e.docs[o.file];if(s&&(i=g(s.doc,o)))return e.jumpStack.push({file:r.name,start:t.getCursor("from"),end:t.getCursor("to")}),void h(e,r,s,i.start,i.end)}q(e,t,"Could not find a definition.")})}m(t)?o():T(t,"Jump to variable",function(e){e&&o(e)})}function p(e,t){var o=e.jumpStack.pop(),i=o&&e.docs[o.file];i&&h(e,n(e,t.getDoc()),i,o.start,o.end)}function h(e,t,n,o,i){n.doc.setSelection(o,i),t!=n&&e.options.switchToDoc&&(H(e),e.options.switchToDoc(n.name,n.doc))}function g(e,t){for(var n=t.context.slice(0,t.contextOffset).split("\n"),o=t.start.line-(n.length-1),i=M(o,(1==n.length?t.start.ch:e.getLine(o).length)-n[0].length),r=e.getLine(o).slice(i.ch),s=o+1;s<e.lineCount()&&r.length<t.context.length;++s)r+="\n"+e.getLine(s);if(r.slice(0,t.context.length)==t.context)return t;for(var a,c=e.getSearchCursor(t.context,0,!1),l=1/0;c.findNext();){var u=c.from(),f=1e4*Math.abs(u.line-i.line);f||(f=Math.abs(u.ch-i.ch)),f<l&&(a=u,l=f)}if(!a)return null;if(1==n.length?a.ch+=n[0].length:a=M(a.line+(n.length-1),n[n.length-1].length),t.start.line==t.end.line)var d=M(a.line,a.ch+(t.end.ch-t.start.ch));else var d=M(a.line+(t.end.line-t.start.line),t.end.ch);return{start:a,end:d}}function m(e){var t=e.getCursor("end"),n=e.getTokenAt(t);return!(n.start<t.ch&&"comment"==n.type)&&/[\w)\]]/.test(e.getLine(t.line).slice(Math.max(t.ch-1,0),t.ch+1))}function v(e,t){var n=t.getTokenAt(t.getCursor());if(!/\w/.test(n.string))return q(e,t,"Not at a variable");T(t,"New name for "+n.string,function(n){e.request(t,{type:"rename",newName:n,fullDocs:!0},function(n,o){if(n)return q(e,t,n);C(e,o.changes)})})}function y(e,t){var o=n(e,t.doc).name;e.request(t,{type:"refs"},function(n,i){if(n)return q(e,t,n);for(var r=[],s=0,a=t.getCursor(),c=0;c<i.refs.length;c++){var l=i.refs[c];l.file==o&&(r.push({anchor:l.start,head:l.end}),R(a,l.start)>=0&&R(a,l.end)<=0&&(s=r.length-1))}t.setSelections(r,s)})}function C(e,t){for(var n=Object.create(null),o=0;o<t.length;++o){var i=t[o];(n[i.file]||(n[i.file]=[])).push(i)}for(var r in n){var s=e.docs[r],a=n[r];if(s){a.sort(function(e,t){return R(t.start,e.start)});for(var c="*rename"+ ++O,o=0;o<a.length;++o){var i=a[o];s.doc.replaceRange(i.text,i.start,i.end,c)}}}}function x(e,t,n,o){var i=[],r=0,s=!n.fullDocs;s||delete n.fullDocs,"string"==typeof n&&(n={type:n}),n.lineCharPositions=!0,null==n.end&&(n.end=o||t.doc.getCursor("end"),t.doc.somethingSelected()&&(n.start=t.doc.getCursor("start")));var a=n.start||n.end;if(t.changed)if(t.doc.lineCount()>L&&!1!==s&&t.changed.to-t.changed.from<100&&t.changed.from<=a.line&&t.changed.to>n.end.line){i.push(b(t,a,n.end)),n.file="#0";var r=i[0].offsetLines;null!=n.start&&(n.start=M(n.start.line- -r,n.start.ch)),n.end=M(n.end.line-r,n.end.ch)}else i.push({type:"full",name:t.name,text:S(e,t)}),n.file=t.name,t.changed=null;else n.file=t.name;for(var c in e.docs){var l=e.docs[c];l.changed&&l!=t&&(i.push({type:"full",name:l.name,text:S(e,l)}),l.changed=null)}return{query:n,files:i}}function b(t,n,o){for(var i,r=t.doc,s=null,a=null,c=n.line-1,l=Math.max(0,c-50);c>=l;--c){var u=r.getLine(c);if(!(u.search(/\bfunction\b/)<0)){var f=e.countColumn(u,null,4);null!=s&&s<=f||(s=f,a=c)}}null==a&&(a=l);var d=Math.min(r.lastLine(),o.line+20);if(null==s||s==e.countColumn(r.getLine(n.line),null,4))i=d;else for(i=o.line+1;i<d;++i){var f=e.countColumn(r.getLine(i),null,4);if(f<=s)break}var p=M(a,0);return{type:"part",name:t.name,offsetLines:p.line,text:r.getRange(p,M(i,0))}}function w(e,t){var n=document.createElement(e);t&&(n.className=t);for(var o=2;o<arguments.length;++o){var i=arguments[o];"string"==typeof i&&(i=document.createTextNode(i)),n.appendChild(i)}return n}function T(e,t,n){e.openDialog?e.openDialog(t+": <input type=text>",n):n(prompt(t,""))}function k(t,n,o){function i(){l=!0,c||r()}function r(){t.state.ternTooltip=null,a.parentNode&&(t.off("cursorActivity",r),t.off("blur",r),t.off("scroll",r),N(a))}t.state.ternTooltip&&A(t.state.ternTooltip);var s=t.cursorCoords(),a=t.state.ternTooltip=D(s.right+1,s.bottom,n),c=!1,l=!1;e.on(a,"mousemove",function(){c=!0}),e.on(a,"mouseout",function(t){e.contains(a,t.relatedTarget||t.toElement)||(l?r():c=!1)}),setTimeout(i,o.options.hintDelay?o.options.hintDelay:1700),t.on("cursorActivity",r),t.on("blur",r),t.on("scroll",r)}function D(e,t,n){var o=w("div",j+"tooltip",n);return o.style.left=e+"px",o.style.top=t+"px",document.body.appendChild(o),o}function A(e){var t=e&&e.parentNode;t&&t.removeChild(e)}function N(e){e.style.opacity="0",setTimeout(function(){A(e)},1100)}function q(e,t,n){e.options.showError?e.options.showError(t,n):k(t,String(n),e)}function H(e){e.activeArgHints&&(A(e.activeArgHints),e.activeArgHints=null)}function S(e,t){var n=t.doc.getValue();return e.options.fileFilter&&(n=e.options.fileFilter(n,t.name,t.doc)),n}function F(e){function n(e,t){t&&(e.id=++i,r[i]=t),o.postMessage(e)}var o=e.worker=new Worker(e.options.workerScript);o.postMessage({type:"init",defs:e.options.defs,plugins:e.options.plugins,scripts:e.options.workerDeps});var i=0,r={};o.onmessage=function(o){var i=o.data;"getFile"==i.type?t(e,i.name,function(e,t){n({type:"getFile",err:String(e),text:t,id:i.id})}):"debug"==i.type?window.console.log(i.message):i.id&&r[i.id]&&(r[i.id](i.err,i.body),delete r[i.id])},o.onerror=function(e){for(var t in r)r[t](e);r={}},this.addFile=function(e,t){n({type:"add",name:e,text:t})},this.delFile=function(e){n({type:"del",name:e})},this.request=function(e,t){n({type:"req",body:e},t)}}e.TernServer=function(e){var n=this;this.options=e||{};var o=this.options.plugins||(this.options.plugins={});o.doc_comment||(o.doc_comment=!0),this.docs=Object.create(null),this.options.useWorker?this.server=new F(this):this.server=new tern.Server({getFile:function(e,o){return t(n,e,o)},async:!0,defs:this.options.defs||[],plugins:o}),this.trackChange=function(e,t){i(n,e,t)},this.cachedArgHints=null,this.activeArgHints=null,this.jumpStack=[],this.getHint=function(e,t){return s(n,e,t)},this.getHint.async=!0},e.TernServer.prototype={addDoc:function(t,n){var o={doc:n,name:t,changed:null};return this.server.addFile(t,S(this,o)),e.on(n,"change",this.trackChange),this.docs[t]=o},delDoc:function(t){var n=o(this,t);n&&(e.off(n.doc,"change",this.trackChange),delete this.docs[n.name],this.server.delFile(n.name))},hideDoc:function(e){H(this);var t=o(this,e);t&&t.changed&&r(this,t)},complete:function(e){e.showHint({hint:this.getHint})},showType:function(e,t,n){c(this,e,t,"type",n)},showDocs:function(e,t,n){c(this,e,t,"documentation",n)},updateArgHints:function(e){l(this,e)},jumpToDef:function(e){d(this,e)},jumpBack:function(e){p(this,e)},rename:function(e){v(this,e)},selectName:function(e){y(this,e)},request:function(e,t,o,i){var r=this,s=n(this,e.getDoc()),a=x(this,s,t,i),c=a.query&&this.options.queryOptions&&this.options.queryOptions[a.query.type];if(c)for(var l in c)a.query[l]=c[l];this.server.request(a,function(e,n){!e&&r.options.responseFilter&&(n=r.options.responseFilter(s,t,a,e,n)),o(e,n)})},destroy:function(){H(this),this.worker&&(this.worker.terminate(),this.worker=null)}};var M=e.Pos,j="CodeMirror-Tern-",L=250,O=0,R=e.cmpPos});