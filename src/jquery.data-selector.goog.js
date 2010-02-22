/*!
 * Data Selector [VERSION]
 * [DATE]
 * Corey Hart http://www.codenothing.com
 *
 * Inspiration from Pim Jager @ http://jqueryplugins.blogspot.com/search/label/jQuery%20plugin
 * Credit RegExp trick to James Padolsey @ http://james.padolsey.com/javascript/extending-jquerys-selector-capabilities/
 */ 
(function(j){var m,c,a,b,f,g,h={},k={};function o(e){f=e;if(h[f]){c=h[f].name;a=h[f].value;b=h[f].condition;g=h[f].eqIndex;return true}g=e.indexOf("=");if(g!==-1){c=e.substring(0,g);a=e.substring(g+1)||null}else{c=e;a=null}b=c.charAt(c.length-1);if(b=="!"||b=="^"||b=="$"||b=="*"||b=="<"||b==">"||b=="~")c=c.substring(0,c.length-1);else if(b=="]"){b=/\[(.*?)\]$/.exec(c)[1];c=c.replace(/\[(.*?)\]$/,"")}if(a&&(b=="<"||b==">")&&a.charAt(0)==="="){a=a.substring(1);b+="="}else if(b=="~")a=new RegExp(a.substr(1,
a.lastIndexOf("/")-1),a.split("/").pop());c=c.split(".");h[f]={name:c,value:a,condition:b,eqIndex:g}}j.expr[":"].data=function(e,n,i,p){if(e===m||!i[3]||i[3]=="")return false;else f!==i[3]&&o(i[3]);var d,l;for(l in c)if(c.hasOwnProperty(l)&&(d=d===m?j(e).data(c[l]):d[c[l]])===m)return false;if(g===-1)return true;switch(b){case "!":return d.toString()!==a;case "^":return d.toString().indexOf(a)==0;case "$":return d.toString().substr(d.length-a.length)===a;case "*":return d.toString().indexOf(a)!=-1;
case ">":return d>a;case ">=":return d>=a;case "<":return d<a;case "<=":return d<=a;case "~":return a.test(d.toString());default:return k[b]?k[b].call(e,d,a,n,i,p):d.toString()===a}};j.dataSelector=function(e,n){if(typeof e!=="object")k[e]=n;else j.extend(k,e||{})}})(jQuery);
