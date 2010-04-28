/*
 * Data Selector 1.1
 * April 27, 2010
 * Corey Hart http://www.codenothing.com
 */
(function(i,m){function p(e){f=e;if(h[f]){c=h[f].name;a=h[f].value;d=h[f].condition;g=h[f].eqIndex;return true}g=e.indexOf("=");if(g>-1){c=e.substr(0,g);a=e.substr(g+1)||null}else{c=e;a=null}d=c.charAt(c.length-1);if(q[d]===true)c=c.substr(0,c.length-1);else if(d==="]"){d=o.exec(c)[1];c=c.replace(o,"")}if(a&&(d==="<"||d===">")&&a.charAt(0)==="="){a=a.substr(1);d+="="}else if(d==="~")a=new RegExp(a.substr(1,a.lastIndexOf("/")-1),a.split("/").pop());else if(a&&a.substr(0,2)==="=="){d="===";a=a.substr(2)}c=
c.split(".");h[f]={name:c,value:a,condition:d,eqIndex:g}}var c,a,d,f,g,h={},k={},o=/\[(.*?)\]$/,q={$:true,"!":true,"^":true,"*":true,"<":true,">":true,"~":true};i.expr[":"].data=function(e,l,j,r){if(e===m||!j[3]||j[3]=="")return false;else f!==j[3]&&p(j[3]);for(var n=-1,s=c.length,b;++n<s;)if((b=b===m?i.data(e,c[n]):b[c[n]])===m||b===null)return false;if(g===-1)return true;switch(d){case "!":return b.toString()!==a;case "^":return b.toString().indexOf(a)===0;case "$":return b.toString().substr(b.length-
a.length)===a;case "*":return b.toString().indexOf(a)!==-1;case ">":return b>a;case ">=":return b>=a;case "<":return b<a;case "<=":return b<=a;case "===":return b===(a==="false"?false:true);case "~":return a.test(b.toString());default:return k[d]?k[d].call(e,b,a,l,j,r):b&&b.toString()===a}};i.dataSelector=function(e,l){if(i.isFunction(l))k[e]=l;else i.extend(k,e||{})}})(jQuery);
