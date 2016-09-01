function nicolasInitializeComponentLayoutCard(t){var e=t.firstElementChild;Object.defineProperties(t,{activeIndex:{set:function(t){var n=e.children;t>=0&&t<n.length&&(this.dataset.nicolasAttrActiveIndex=t,n[t].radioCls("nicolas-component-layout-card-activate"))},get:function(){return Number(this.getAttribute("data-nicolas-attr-active-index"))||0}}}),t.addEventListener2("ready",function(){t.activeIndex=t.activeIndex})}function nicolasInitializeComponentViewport(t){}window.OS={},~function(){var t=navigator.userAgent;Object.defineProperties(this,{isIOS:{get:function(){return/iPhone|iPad/.test(t)}},isAndroid:{get:function(){return/Android/.test(t)}},isMac:{get:function(){return/Mac/.test(t)&&!this.isIOS}},isWindows:{get:function(){return/Windows/.test(t)}}})}.call(OS),window.Feature={},~function(){var t=this;Object.defineProperties(t,{isTouch:{get:function(){return OS.isIOS||OS.isAndroid}}}),t.getSupportedPropertyName=function(t,e){var n="-webkit-"+e;return e in t?e:n in t?n:void 0}}.call(Feature),~function(){function t(t){t.preventDefault()}window.addEventListener("DOMContentLoaded",function(){var e=document.body;Feature.isTouch?e.addEventListener("touchmove",t):e.addEventListener("contextmenu",t)})}(),~function(){function t(t,e){Array.push(t,e)}function e(t,e){t.indexOf(e)===-1&&t.push(e)}function n(t,e){Array.push(t,e)}function r(t,e){Array.remove(t,e)}"isArray"in Array||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),"from"in Array||(Array.from=function(t){for(var e=0,n=t.length,r=[];e<n;++e)r.push(t[e]);return r}),Array.forEach=function(t,e){var n,r,i=0,a=t.length,o=Array.from(arguments);for(o.splice(0,2),o.splice(n=o.length,0,1,2,3);i<a;++i)if(o[n]=t[i],o[n+1]=i,o[n+2]=t,r=e.apply(void 0,o),void 0!==r)return r},Array.join=function(){var e=[];return Array.forEach(arguments,t,e),e},Array.unique=function(t){var n=[];return Array.forEach(t,e,n),n},Array.push=function(t,e){if(e instanceof Array){var r=t.length;if(Array.forEach(e,n,t),t.length>r)return!0}else if(t.indexOf(e)===-1)return t.push(e),!0;return!1},Array.remove=function(t,e){if(e instanceof Array){var n=t.length;return Array.forEach(e,r,t),t.length<n}for(var i,a=!1;(i=t.indexOf(e))!==-1;)t.splice(i,1),a=!0;return a},Array.removeAll=function(t){return!!t.length&&(t.length=0,!0)}}(),~function(){var t=Function.prototype;"bind"in t||(t.bind=function(t){var e=this,n=Array.from(arguments).slice(1);return void 0!==t&&null!==t||(t=window),function(){var r=Array.from(arguments);r.unshift(0),r.unshift(n.length),Array.prototype.splice.apply(n,r),e.apply(t,n)}})}(),~function(){function t(t,e,n){var r,i;"object"==typeof n?(r=n.from,i=n.to):(r=n,i=n),t[i]=e[r]}function e(t,e,n){t.hasOwnProperty(n)||(t[n]=e[n])}function n(t,e){Object.applyTo(t,e)}function r(t,e){var n=e.split("=");t[decodeURIComponent(n[0])]=decodeURIComponent(n[1])}function i(t,e,n){"object"==typeof n&&n instanceof Date&&(n=n.getTime()),"object"!=typeof n&&null!==n&&void 0!==n&&t.push(encodeURIComponent(e)+"="+encodeURIComponent(String(n)))}Object.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},Object.forEach=function(t,e){var n,r,i,a=Array.from(arguments);a.splice(0,2),a.splice(r=a.length,0,1,2,3);for(n in t)if(t.hasOwnProperty(n)&&(a[r]=n,a[r+1]=t[n],a[r+2]=t,i=e.apply(void 0,a),void 0!==i))return i},Object.copyTo=function(e,n,r){return r=r||Object.keys(n),Array.forEach(r,t,e,n),e},Object.applyTo=function(t,n){return Array.forEach(Object.keys(n),e,t,n),t},Object.join=function(){var t={};return Array.forEach(arguments,n,t),t},Object.fromQueryString=function(t){var e=t.split("&"),n={};return t&&Array.forEach(e,r,n),n},Object.toQueryString=function(t){var e=[];return Object.forEach(t,i,e),e.join("&")}}(),~function(){function t(t,e,n){var r=[];return Array.forEach(t.split(e),n,r),r}function e(t,e,n){0!==n&&(e=String.capitalize(e)),t.push(e)}function n(t,e,n){0!==n&&(e=e.toLowerCase()),t.push(e)}var r=/-/,i=/[A-Z]/g,a=/\./,o="-$&",s="",c="-",u=".";String.capitalize=function(t){return t.charAt(0).toUpperCase()+t.substr(1)},String.join=function(){var t=Array.from(arguments);return Array.remove(t,void 0),Array.remove(t,null),t.join(s)},String.split=function(t,e,n){var r=t.split(e,n);return Array.remove(r,""),r},String.hyphen2CamelCase=function(n){return t(n,r,e).join(s)},String.camelCase2Hyphen=function(e){return t(e.replace(i,o),r,n).join(c)},String.dot2CamelCase=function(n){return t(n,a,e).join(s)},String.camelCase2Dot=function(e){var a=t(e.replace(i,o),r,n),s=a.length-1;return a[s]=String.capitalize(a[s]),a.join(u)},String.urlAppend=function(t,e){var n=Object.toQueryString(e);return""===n?t:t+(t.indexOf("?")===-1?"?":"&")+n}}(),~function(){function t(e,r,i){var a,o=r.shift();return 0===r.length?void(e[o]=i):(a=e[o],Array.isArray(a)||Object.isObject(a)||(a=n.test(r[0])?e[o]=[]:e[o]={}),void t(a,r,i))}var e=/\./,n=/^\d+$/;JSON.getPathValue=function(t,n){for(var r=String.split(n,e),i=0,a=r.length,o=t;i<a&&(o=o[r[i]],null!==o&&void 0!==o);++i);return o},JSON.setPathValue=function(n,r,i){return t(n,String.split(r,e),i),n}}(),~function(){var t=this,e=/\/([^\/]+)$/;Object.defineProperties(t,{page:{get:function(){return this.href.match(e)[1]}},params:{get:function(){return Object.fromQueryString(this.search.replace(/^\?/,""))}}})}.call(location),window.SPAStorage={},~function(){var t,e=this;Object.defineProperties(e,{data:{get:function(){return t||(t=sessionStorage.getItem(location.page),t=t?JSON.parse(t):{index:-1,pages:[],params:[]}),t}},index:{set:function(t){var e=this,n=e.length,r=e.data;r.index!==-1&&(t<0?r.index=0:t>=n?r.index=n-1:r.index=t)},get:function(){return this.data.index}},page:{get:function(){var t=this.data;return t.pages[t.index]||""}},params:{get:function(){var t=this.data;return t.params[t.index]||{}}},length:{get:function(){return this.data.pages.length}}}),e.addData=function(t,e){var n=this.data,r=n.index,i=n.pages,a=n.params,o=i.length;i.splice(r+1,o-r),i.push(t||""),a.splice(r+1,o-r),a.push(e||{}),++n.index},window.addEventListener("unload",function(){sessionStorage.setItem(location.page,JSON.stringify(e.data))})}.call(SPAStorage),~function(){var t=Math.abs,e=Math.pow,n=Math.PI;Math.distance=function(n,r){return Math.sqrt(e(t(n),2)+e(t(r),2))},Math.distance2=function(t,e){return Math.distance(e[0]-t[0],e[1]-t[1])},Math.angle2radian=function(t){return t*n/180},Math.radian2angle=function(t){return 180*t/n},Math.angle=function(t,e){return Math.radian2angle(Math.atan2(e,t))},Math.angle2=function(t,e){return Math.angle(e[0]-t[0],e[1]-t[1])},Math.absAngle=function(t){var e=t%360;return 0===e?t<=0?e:360:(e<0&&(e+=360),e)}}(),~function(){Math.circleXY=function(t,e,n,r,i){var a=Math.angle2radian(r+(i||0));return[t+n*Math.sin(a),e-n*Math.cos(a)]},Math.sector=function(t,e,n,r,i,a){var o,s;return r=Math.absAngle(r),i=Math.absAngle(i),o=Math.circleXY(t,e,n,r,a),s=Math.circleXY(t,e,n,i,a),["M",t,e,"L",o[0],o[1],"A",n,n,0,Math.abs(r-i)>=180?1:0,r<i?1:0,s[0],s[1],"Z"].join(" ")},Math.ring=function(t,e,n,r,i,a,o){var s,c,u,d;return i=Math.absAngle(i),a=Math.absAngle(a),s=Math.circleXY(t,e,n,i,o),c=Math.circleXY(t,e,n,a,o),u=Math.circleXY(t,e,r,i,o),d=Math.circleXY(t,e,r,a,o),["M",s[0],s[1],"A",n,n,0,Math.abs(i-a)>=180?1:0,i<a?1:0,c[0],c[1],"L",d[0],d[1],"A",r,r,0,Math.abs(i-a)>=180?1:0,i<a?0:1,u[0],u[1],"Z"].join(" ")}}(),window.IDGenerator={},~function(){function t(t,r){var i=String.join(e,r,n++);return t===!0&&document.getElementById(i)?i(!0,r):i}var e="nicolas-",n=1;this.id=function(e,n){return e?(""===e.id&&(e.id=t(!0,n)),e.id):t(!1,n)}}.call(IDGenerator),window.Observer=function(){},~function(){function t(t,n,r){Array.forEach(r,e,t,n)}function e(t,e,n){t.removeEventListener(e,n)}function n(t,e,n){if(n&&n.apply(t,e)===!1)return!1}var r=this;r.addEventListener=function(t,e){var n=this,r=n.$listeners;r||(r={}),r.hasOwnProperty(t)||(r[t]=[]),Array.push(r[t],e),n.$listeners=r},r.removeEventListener=function(t,e){var n=this.$listeners;if(n&&(n=n[t])){var r=n.indexOf(e);r!==-1&&(n[r]=void 0)}},r.hasEventListener=function(t){var e=this.$listeners;return!!e&&e.hasOwnProperty(t)},r.dispatchEvent=function(t){var e=this,r=e.$listeners;if(r&&(r=r[t])){var i=Array.from(arguments);if(i[0]=e,e.$suspendEvents!==!0&&Array.forEach(r,n,e,i)===!1)return!1;Array.remove(r,void 0)}},r.clearEventListeners=function(){var e=this;Object.forEach(e.$listeners||{},t,e),e.resumeEvents(),delete e.$listeners},r.suspendEvents=function(){this.$suspendEvents=!0},r.resumeEvents=function(){delete this.$suspendEvents}}.call(Observer.prototype),window.ObserverHelper={},~function(){this.process=function(t,e){if(Feature.isTouch){var n,r=e===!0?t.changedTouches:t.touches;1===r.length&&(n=r[0],t.pageX2=n.pageX,t.pageY2=n.pageY)}else t.pageX2=t.pageX,t.pageY2=t.pageY;return t}}.call(ObserverHelper),window.Ajax={},~function(){this.request=function(t,e){var n=new XMLHttpRequest;e=e||{},e.hasOwnProperty("query")&&(t=String.urlAppend(t,e.query)),n.open(e.method||"POST",String.urlAppend(t,{_dc:new Date}),!0),e.json===!0?(n.setRequestHeader("Accept","application/json"),n.setRequestHeader("Content-Type","application/json; charset=UTF-8")):n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),n.addEventListener("readystatechange",function(){if(4===n.readyState&&200===n.status&&e.hasOwnProperty("callback")){var t=n.responseText;try{t=JSON.parse(t)}catch(t){}e.callback(t)}}),e.hasOwnProperty("params")?e.json===!0?n.send(JSON.stringify(e.params)):n.send(Object.toQueryString(e.params)):e.json===!0?n.send(JSON.stringify({})):n.send()}}.call(Ajax),window.AnimationFrame={},~function(){var t=this,e={};!1 in window&&(window.requestAnimationFrame=window.webkitRequestAnimationFrame,window.cancelAnimationFrame=window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame),t.stop=function(t){cancelAnimationFrame(e[t]),delete e[t]},t.run=function(n,r){var i,a=r?n.bind(r):n,o=function(){a()!==!1?e[i]=requestAnimationFrame(arguments.callee):t.stop(i)};return e[i=IDGenerator.id()]=requestAnimationFrame(o),i}}.call(AnimationFrame),window.Easing=function(){},~function(){function t(){var t=this,e=t.isEnded();if(t.callback(t.getValue(),e),e)return t.reset(),!1}var e=this;e.startValue=0,Object.defineProperties(e,{startTime:{set:function(t){this.$startTime=t},get:function(){var t=this;return t.$startTime||(t.$startTime=Date.now())}},callback:{set:function(t){this.$func=t},get:function(){var t=this;return t.$func||(t.$func=function(){})}}}),e.setConfig=function(t){var e,n=this;for(e in t)t.hasOwnProperty(e)&&(n[e]=t[e])},e.run=function(){var e=this;e.$animationFrameId=AnimationFrame.run(t,e)},e.stop=function(){var t=this;t.reset(),AnimationFrame.stop(t.$animationFrameId)},e.isEnded=function(){return!0},e.getValue=function(){},e.reset=function(){}}.call(Easing.prototype),window.EaseOutEasing=function(){},EaseOutEasing.prototype.__proto__=Easing.prototype,~function(){var t=this;t.exponent=4,t.duration=1500,Object.defineProperties(t,{distance:{get:function(){var t=this;return t.endValue-t.startValue}}}),t.isEnded=function(){var t=this;return Date.now()-t.startTime>t.duration},t.getValue=function(){var t=this,e=t.startValue+(1-Math.pow(1-(Date.now()-t.startTime)/t.duration,t.exponent))*t.distance;return t.isEnded()?t.endValue:e}}.call(EaseOutEasing.prototype),window.BounceEasing=function(){},BounceEasing.prototype.__proto__=Easing.prototype,~function(){var t=this;t.springTension=.3,t.acceleration=30,t.startVelocity=0,t.getValue=function(){var t=this,e=(Date.now()-t.startTime)/t.acceleration;return t.startValue-t.startVelocity*e*Math.pow(Math.E,-t.springTension*e)}}.call(BounceEasing.prototype),window.MomentumEasing=function(){},MomentumEasing.prototype.__proto__=Easing.prototype,~function(){var t=this;Object.defineProperties(t,{friction:{set:function(t){var e=this,n=Math.log(1-t/10);e.$theta=n,e.$alpha=n/e.acceleration,e.$friction=t},get:function(){return this.$friction}},acceleration:{set:function(t){var e=this;e.$velocity=e.startVelocity*t,e.$alpha=e.$theta/t,e.$acceleration=t},get:function(){return this.$acceleration}},startVelocity:{set:function(t){var e=this;e.$velocity=t*e.acceleration},get:function(){return this.$velocity}},frictionFactor:{get:function(){var t=this;return Math.exp((Date.now()-t.startTime)*t.$alpha)}},velocity:{get:function(){var t=this;return t.frictionFactor*t.startVelocity}}}),t.$alpha=0,t.acceleration=30,t.friction=0,t.startVelocity=0,t.getValue=function(){var t=this;return t.startValue+t.startVelocity*(1-t.frictionFactor)/t.$theta}}.call(MomentumEasing.prototype),window.BoundMomentumEasing=function(){var t=this;t.momentum=new MomentumEasing,t.bounce=new BounceEasing},BoundMomentumEasing.prototype.__proto__=Easing.prototype,~function(){var t=this;t.minVelocity=.01,t.minMomentumValue=0,t.maxMomentumValue=0,t.setStartTime=function(t){var e=this;e.momentum.startTime=t,e.startTime=t},t.isEnded=function(){var t=this,e=t.momentum;return!t.isOutOfBound&&Math.abs(e.velocity)<t.minVelocity||!(!t.isBouncingBack||Math.round(t.bounce.getValue())!==(e.startVelocity>0?t.minMomentumValue:t.maxMomentumValue))},t.reset=function(){var t=this;t.lastValue=null,t.isBouncingBack=!1,t.isOutOfBound=!1},t.getValue=function(){var t,e,n=this,r=n.momentum,i=n.bounce,a=r.startVelocity,o=a>0?1:-1,s=n.minMomentumValue,c=n.maxMomentumValue,u=1==o?s:c,d=n.lastValue;if(0===a)return n.startValue;if(!n.isOutOfBound){if(t=r.getValue(),e=r.velocity,void 0===c&&t>s)return t;if(t>=s&&t<=c)return t;n.isOutOfBound=!0,i.startTime=Date.now(),i.startVelocity=e,i.startValue=u}return t=i.getValue(),n.isEnded()||n.isBouncingBack||null!==d&&(1==o&&t<d||o==-1&&t>d)&&(n.isBouncingBack=!0),n.lastValue=t,t}}.call(BoundMomentumEasing.prototype),~function(){function t(t,e){(e instanceof SVGElement||e instanceof HTMLElement)&&t.push(e)}var e=SVGElement.prototype;"children"in e||Object.defineProperties(e,{children:{get:function(){var e=[];return Array.forEach(this.childNodes,t,e),e}}})}(),~function(){var t=this;t.is=function(t){for(var e,n=this,r=n;e=r.parentElement;){if(Array.from(e.querySelectorAll(t)).indexOf(n)!==-1)return!0;r=e}return!1},t.findParent=function(t,e){var n=this;do{if(n.is(t))return n;if(n===e)break;n=n.parentElement}while(n);return null}}.call(HTMLElement.prototype),~function(){function t(e,n,r){r=r.trim(),a.test(r)?Array.forEach(r.split(a),t,e,n):e.classList[n](r)}function e(t,e){if(t.hasCls(e)===!1)return!1}function n(t,e){t.toggleCls(e)}function r(t,e,n){n===e?n.addCls(t):n.removeCls(t)}var i=this,a=/\s+/;i.addCls=function(e){t(this,"add",e)},i.removeCls=function(e){t(this,"remove",e)},i.hasCls=function(t){var n=this;return t=t.trim(),a.test(t)?Array.forEach(t.split(a),e,n)!==!1:n.classList.contains(t)},i.toggleCls=function(t){var e=this;t=t.trim(),a.test(t)?Array.forEach(t.split(a),n,e):e.hasCls(t)?e.removeCls(t):e.addCls(t)},i.radioCls=function(t){var e=this,n=e.parentElement.children;Array.forEach(n,r,t,e)}}.call(HTMLElement.prototype),~function(){var t=this;t.setStyle=function(t,e){var n=this.style;n.setProperty(Feature.getSupportedPropertyName(n,t),e)},t.getStyle=function(t){var e=this.style;return e.getPropertyValue(Feature.getSupportedPropertyName(e,t))||""},t.getComputedStyle=function(t){var e=this;return getComputedStyle(e,"")[Feature.getSupportedPropertyName(e.style,t)]},t.isStyle=function(t,e){return this.getComputedStyle(t)===e}}.call(HTMLElement.prototype),~function(){var t=/px$/;Object.defineProperties(this,{width:{set:function(t){this.setStyle("width",t+"px")},get:function(){var e=this;return Number(e.getStyle("width").replace(t,""))||e.offsetWidth}},height:{set:function(t){this.setStyle("height",t+"px")},get:function(){var e=this;return Number(e.getStyle("height").replace(t,""))||e.offsetHeight}},offsetLeft2:{get:function(){var t=this,e=t.offsetParent;return e?t.offsetLeft+e.offsetLeft2:t.offsetLeft}},offsetTop2:{get:function(){var t=this,e=t.offsetParent;return e?t.offsetTop+e.offsetTop2:t.offsetTop}}})}.call(HTMLElement.prototype),~function(){function t(t){return r.hasOwnProperty(t)?r[t]:r[t]=new RegExp(t+"\\((-?\\d+(?:\\.\\d+)?(?:e[+-]\\d+)?)(?:px|deg)?\\)")}function e(e,n,r){var i=t(n),a=e.getStyle("transform"),o=n+"("+r+")";i.test(a)?e.setStyle("transform",a.replace(i,o)):e.setStyle("transform",a+o)}function n(e,n){var r=e.getStyle("transform").match(t(n));return r?r[1]:void 0}var r={};Object.defineProperties(this,{translateX:{set:function(t){e(this,"translateX",t+"px")},get:function(){return Number(n(this,"translateX"))||0}},translateY:{set:function(t){e(this,"translateY",t+"px")},get:function(){return Number(n(this,"translateY"))||0}},scale:{set:function(t){e(this,"scale",t)},get:function(){var t=n(this,"scale");return void 0!==t?Number(t):1}},rotate:{set:function(t){e(this,"rotate",t+"deg")},get:function(){return Number(n(this,"rotate"))||0}},rotateX:{set:function(t){e(this,"rotateX",t+"deg")},get:function(){return Number(n(this,"rotateX"))||0}}})}.call(HTMLElement.prototype),~function(){function t(t){var e=Array.from(t.querySelectorAll("[data-nicolas-data]"))||[];return t.hasAttribute("data-nicolas-data")&&e.unshift(t),e}function e(t,e,n,r){r=String.split(r,a),n?t[r[0]]=JSON.getPathValue(e,r[1])||"":JSON.setPathValue(e,r[1],t[r[0]]||"")}function n(t,n,r){Array.forEach(String.split(r.dataset.nicolasData,i),e,r,t,n)}var r=this,i=/\s+/,a=/::/;Object.defineProperties(r,{mappingData:{set:function(e){Array.forEach(t(this),n,e,!0)},get:function(){var e={};return Array.forEach(t(this),n,e,!1),e}}})}.call(HTMLElement.prototype),~function(){function t(t,e){return a.hasOwnProperty(e)&&Feature.getSupportedPropertyName(t.style,n)!==n?a[e]:!Feature.isTouch&&o.hasOwnProperty(e)?o[e]:e}function e(e){var n=e.addEventListener,a=e.removeEventListener;e.addEventListener=function(e,r){var i=this,a=Array.from(arguments);a[0]=e=t(i,e),n.apply(i,a),s.addEventListener.call(i,e,r)},e.removeEventListener=function(e,n){var r=this,i=Array.from(arguments);i[0]=e=t(r,e),a.apply(r,i),s.removeEventListener.call(r,e,n)},Object.copyTo(e,s,[{from:"dispatchEvent",to:"dispatchEvent2"},"hasEventListener","clearEventListeners","suspendEvents","resumeEvents"]),e.addEventListener2=function(t,e){var n=this;n.hasEventListener(t)||t===r||t===i||window.dispatchEvent2(r,n,t),s.addEventListener.call(n,t,e)},e.removeEventListener2=function(t,e){var n=this;s.removeEventListener.call(n,t,e),n.hasEventListener(t)||t===r||t===i||window.dispatchEvent2(i,n,t)}}var n="transition-property",r="AddExtendedEventListener",i="RemoveExtendedEventListener",a={animationiteration:"webkitAnimationIteration",animationstart:"webkitAnimationStart",animationend:"webkitAnimationEnd",transitionend:"webkitTransitionEnd"},o={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"},s=Observer.prototype;e(HTMLElement.prototype),e(window)}(),~function(){function t(t){var r=this;ObserverHelper.process(t),r.$nicolasTapStartPoint=[t.pageX2,t.pageY2],r.addEventListener("touchmove",e),r.addEventListener("touchend",n)}function e(t){var e,n,i=this;ObserverHelper.process(t),e=t.pageX2,n=t.pageY2,(n<0||e>=screen.width-2)&&OS.isIOS&&(r(i),i.dispatchEvent2("tap",t)),Math.distance2(i.$nicolasTapStartPoint,[e,n])>=a&&r(i)}function n(t){var e=this;r(e),e.dispatchEvent2("tap",ObserverHelper.process(t,!0))}function r(t){t.removeEventListener("touchmove",e),t.removeEventListener("touchend",n),delete t.$nicolasTapStartPoint}function i(t){this.dispatchEvent2("tap",ObserverHelper.process(t))}var a=8;window.addEventListener2("AddExtendedEventListener",function(e,n,r){"tap"===r&&(Feature.isTouch?n.addEventListener("touchstart",t):n.addEventListener("click",i))}),window.addEventListener2("RemoveExtendedEventListener",function(e,n,r){"tap"===r&&(Feature.isTouch?n.removeEventListener("touchstart",t):n.removeEventListener("click",i))})}(),~function(){function t(t){var r=this;ObserverHelper.process(t),r.$nicolasDragStartPoint=[t.pageX2,t.pageY2],r.addEventListener("touchmove",e),r.addEventListener("touchend",n)}function e(t){var e,n,i=this;ObserverHelper.process(t),e=t.pageX2,n=t.pageY2,(n<0||e>=screen.width-2)&&OS.isIOS&&i.dispatchEvent2("touchend"),Math.distance2([e,n],i.$nicolasDragStartPoint)>=u&&(r(i),a.call(i,t))}function n(){r(this)}function r(t){t.removeEventListener("touchmove",e),t.removeEventListener("touchend",n),delete t.$nicolasDragStartPoint}function i(t,e){var n=t.$nicolasDragStartPoint,r=t.$nicolasDragPreviousPoint,i=e.pageX2,a=e.pageY2;e.deltaX=i-n[0],e.deltaY=a-n[1],e.deltaX2=i-r[0],e.deltaY2=a-r[1],e.$nicolasPreviousTime=t.$nicolasDragPreviousTime}function a(t){var e=this;e.$nicolasDragEvent=t,e.dispatchEvent2("dragstart",t),e.$nicolasDragStartPoint=[t.pageX2,t.pageY2],e.$nicolasDragPreviousPoint=[t.pageX2,t.pageY2],e.$nicolasDragPreviousTime=Date.now(),i(e,t),e.addEventListener("touchmove",o),e.addEventListener("touchend",s)}function o(t){var e,n,r,a=this;ObserverHelper.process(t),a.$nicolasDragEvent=t,e=t.pageX2,n=t.pageY2,i(a,t),(n<0||e>=screen.width-2)&&OS.isIOS?a.dispatchEvent2("touchend"):(a.dispatchEvent2("drag",t),r=a.$nicolasDragPreviousPoint,r[0]=e,r[1]=n,a.$nicolasDragPreviousTime=Date.now())}function s(){var t=this,e=t.$nicolasDragEvent,n=Date.now()-e.$nicolasPreviousTime;n>0&&n<50?(e.velocityX=e.deltaX2/n,e.velocityY=e.deltaY2/n):(e.velocityX=0,e.velocityY=0),c(t),t.dispatchEvent2("dragend",e),delete t.$nicolasDragEvent}function c(t){t.removeEventListener("touchmove",o),t.removeEventListener("touchend",s),delete t.$nicolasDragStartPoint,delete t.$nicolasDragPreviousPoint,delete t.$nicolasDragPreviousTime}var u=8;window.addEventListener2("AddExtendedEventListener",function(e,n,r){"dragstart"!==r&&"drag"!==r&&"dragend"!==r||n.hasEventListener("dragstart")||n.hasEventListener("drag")||n.hasEventListener("dragend")||n.addEventListener("touchstart",t)}),window.addEventListener2("RemoveExtendedEventListener",function(e,n,r){"dragstart"!==r&&"drag"!==r&&"dragend"!==r||n.hasEventListener("dragstart")||n.hasEventListener("drag")||n.hasEventListener("dragend")||n.removeEventListener("touchstart",t)})}(),~function(){function t(t){r(this,t)}function e(t,e){clearTimeout(t.$nicolasActiveId),t.$nicolasActiveId=setTimeout(function(){i(t,e)},a)}function n(t,e){clearTimeout(t.$nicolasActiveId),i(t,e)}function r(t,e){t.$nicolasActivated!==!0&&(t.$nicolasActivated=!0,t.dispatchEvent2("activatestart",e))}function i(t,e){t.$nicolasActivated===!0&&(t.dispatchEvent2("activateend",e),delete t.$nicolasActivated)}var a=300;window.addEventListener2("AddExtendedEventListener",function(r,i,a){"activatestart"!==a&&"activateend"!==a||(i.addEventListener("touchstart",t),i.addEventListener2("tap",e),i.addEventListener2("dragstart",n))}),window.removeEventListener2("RemoveExtendedEventListener",function(r,i,a){"activatestart"!==a&&"activateend"!==a||(i.removeEventListener("touchstart",t),i.removeEventListener2("tap",e),i.removeEventListener2("dragstart",n))})}(),window.NICOLAS={},~function(){function t(e){if(e.$initialized!==!0&&!(e instanceof SVGElement)){if(e.hasAttribute(i)){var n=a+String.capitalize(String.dot2CamelCase(e.dataset.nicolasComponent));window[n](e)}e.$initialized=!0,Array.forEach(e.children,t)}}function e(t){t.$readied!==!0&&(t instanceof SVGElement||(Array.forEach(t.children,e),t.hasAttribute(i)&&t.dispatchEvent2("ready"),t.$readied=!0))}function n(t){t instanceof SVGElement||(t.clearEventListeners(),Array.forEach(t.children,n))}var r=this,i="data-nicolas-component",a="nicolasInitializeComponent";r.initialize=function(e){t(e||document.body)},r.ready=function(t){e(t||document.body)},r.destroy=function(t){n(t||document.body)}}.call(NICOLAS),~function(){var t;window.addEventListener("DOMContentLoaded",function(){NICOLAS.initialize(),t=document.querySelector('body > div[data-nicolas-component="Viewport"]')}),window.addEventListener("load",function(){NICOLAS.ready(),window.dispatchEvent2("ready"),t&&t.addCls("nicolas-ready")}),window.addEventListener("unload",function(){NICOLAS.destroy()})}(),window.PickerHelper={},~function(){function t(t){return t=t.toString(),(1===t.length?"0":"")+t}function e(t,e,n,r,i){var a="data"+e,o="maxScrollValue"+e,s="scrollValue"+e,c=1;for(t[a]=n,t[o]=18*(i-1),t[s]+=1;c<i+1;c+=5){if(r<c+5){t[s]+=18*(r-c);break}t[s]+=90}t[s]-=1}var n=this,r=["周日","周一","周二","周三","周四","周五","周六"],i=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];n.initDateTimePicker=function(n){function a(t,e){for(var n,i,a,o,s=[],c=0;c<=l;++c)n=new Date(t),n.setDate(n.getDate()+c),i=n.getMonth()+1,a=n.getDate(),o=n.getDay(),s.push({key:{year:n.getFullYear(),month:i,date:a,day:o},value:0===c&&t.getDate()===e.getDate()?"今天":i+"月"+a+"日&nbsp;"+r[o]});return s}function o(){for(var e=[],n=0;n<24;++n)e.push({key:n,value:t(n)});return e}function s(){for(var e=[],n=0;n<12;++n)e.push({key:5*n,value:t(5*n)});return e}var c=n.picker,u=n.receiver,d=n.name||"",l=Number(n.days)||3;if(c&&u){var f=new Date,v=new Date(f);v.setSeconds(0),v.setMinutes(v.getMinutes()+20),v.setMinutes(10*Math.floor(v.getMinutes()/10));var h=v.getHours(),p=v.getMinutes(),m=a(v,f),g=o(),y=s();c.onRequestData1=function(t,e){for(var n,r=[],i=t*e;i<e&&(n=m[i],n);++i)r.push(n);return r},c.onRequestData2=function(t,e){for(var n,r=[],i=t*e;i<e&&(n=g[i],n);++i)r.push(n);return r},c.onRequestData3=function(t,e){for(var n,r=[],i=t*e;i<e&&(n=y[i],n);++i)r.push(n);return r},e(c,2,c.onRequestData2(0,15),h+1,24),e(c,3,c.onRequestData3(0,15),p/5+1,12),c.onValueChange=function(t,e,n){var r=e.key,a=n.key,o=t.key,s=new Date(o.year,o.month-1,o.date,r,a);s<v&&(r<h&&(c.value2=h),a<p&&(c.value3=p)),u[d]=o.year+"年"+o.month+"月"+o.date+"日&nbsp;"+i[o.day]+"&nbsp;"+e.value+":"+n.value}}}}.call(PickerHelper),~function(){window.addEventListener2("ready",function(){var t=document.querySelector("#cardEl"),e=document.querySelector("#footerEl"),n=Array.from(e.children);e.addEventListener2("tap",function(e,r){var i=r.target.findParent("button");i&&(t.activeIndex=n.indexOf(i))})})}();