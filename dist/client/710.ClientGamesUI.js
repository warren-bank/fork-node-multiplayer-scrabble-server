"use strict";(window.webpackChunk_warren_bank_scrabble=window.webpackChunk_warren_bank_scrabble||[]).push([[710],{206:function(t,r,n){n.r(r),n.d(r,{findBestPlay:function(){return k}});var e,a,i,o,l,f=n(317),u=n(412),s=n(266),c=n(53);function v(t,r){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,r){if(!t)return;if("string"==typeof t)return d(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(t,r)}(t))||r&&t&&"number"==typeof t.length){n&&(t=n);var e=0,a=function(){};return{s:a,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return o=t.done,t},e:function(t){l=!0,i=t},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw i}}}}function d(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function h(t,r){return t.filter((function(t){return r.indexOf(t)>=0}))}var p=0;function y(t,r){return!o.at(t,r).isEmpty()&&(t>0&&o.at(t-1,r).isEmpty()||t<o.cols-1&&o.at(t+1,r).isEmpty()||r>0&&o.at(t,r-1).isEmpty()||r<o.rows-1&&o.at(t,r+1).isEmpty())}function m(t){for(var r=[],n=0;n<o.cols;n++){var a=[];r.push(a);for(var l=0;l<o.rows;l++){var f=[[],[]];if(a[l]=f,o.at(n,l).tile)f[0].push(o.at(n,l).tile.letter),f[1].push(o.at(n,l).tile.letter);else{for(var u="",s=l-1;s>=0&&o.at(n,s).tile;)u=o.at(n,s).tile.letter+u,s--;var c="";for(s=l+1;s<o.rows&&o.at(n,s).tile;)c+=o.at(n,s).tile.letter,s++;for(var d="",h=n-1;h>=0&&o.at(h,l).tile;)d=o.at(h,l).tile.letter+d,h--;var p="";for(h=n+1;h!=o.cols&&o.at(h,l).tile;)p+=o.at(h,l).tile.letter,h++;var y,m=v(t);try{for(m.s();!(y=m.n()).done;){var w=y.value,g=d+w+p,b=1===g.length||e.hasWord(g),k=b||n>0&&e.hasSequence(g),B=u+w+c,E=1===B.length||e.hasWord(B),S=E||l>0&&e.hasSequence(B);b&&S&&f[0].push(w),E&&k&&f[1].push(w)}}catch(t){m.e(t)}finally{m.f()}}}}i=r}function w(t,r,n,e,f,u,d,y){var m,g=t+n,b=r+e;if(d.isEndOfWord&&y.length>=2&&u>0&&(g==o.cols||b==o.rows||!o.at(g,b).tile)){var k=[],B=o.scorePlay(t,r,n,e,y,k)+a.calculateBonus(u);B>p&&(p=B,l(new c.A({placements:y.filter((function(t){return!o.at(t.col,t.row).tile})),words:k,score:B})))}var E=0;if(g<o.cols&&b<o.rows)if(o.at(g,b).isEmpty()){var S=f.find((function(t){return t.isBlank})),A=i[g][b][n];m=h(d.postLetters,S?A:h(f.map((function(t){return t.letter})),A)),E=1}else m=[o.at(g,b).tile.letter];else m=[];var j,_=v(m);try{var P=function(){var t=j.value,r=f;if(E>0){var a=r.find((function(r){return r.letter===t}))||r.find((function(t){return t.isBlank}));y.push(new s.n({letter:t,isBlank:a.isBlank,score:a.score,col:g,row:b})),r=r.filter((function(t){return t!==a}))}else y.push(o.at(g,b).tile);var i,l=v(d.postNodes);try{for(l.s();!(i=l.n()).done;){var c=i.value;c.letter===t&&w(g,b,n,e,r,u+E,c,y)}}catch(t){l.e(t)}finally{l.f()}y.pop()};for(_.s();!(j=_.n()).done;)P()}catch(t){_.e(t)}finally{_.f()}}function g(t,r,n,e,a,l,f,u,c){var d,p=t-n,y=r-e,m=0;if(p>=0&&y>=0)if(o.at(p,y).isEmpty()){var b=a.find((function(t){return t.isBlank})),k=i[p][y][n];d=h(u.preLetters,b?k:h(a.map((function(t){return t.letter})),k)),m=1}else d=[o.at(p,y).tile.letter];else d=[];var B,E=v(d);try{var S=function(){var t=B.value,r=a;if(m>0){var i=r.find((function(r){return r.letter===t}))||r.find((function(t){return t.isBlank}));c.unshift(new s.n({letter:t,isBlank:i.isBlank,score:i.score,col:p,row:y})),r=r.filter((function(t){return t!==i}))}else c.unshift(o.at(p,y).tile);var d,h=v(u.preNodes);try{for(h.s();!(d=h.n()).done;){var w=d.value;w.letter===t&&g(p,y,n,e,r,l+m,f,w,c)}}catch(t){h.e(t)}finally{h.f()}c.shift()};for(E.s();!(B=E.n()).done;)S()}catch(t){E.e(t)}finally{E.f()}0==u.preNodes.length&&(y<0||p<0||o.at(p,y).isEmpty())&&w(t+n*(c.length-1),r+e*(c.length-1),n,e,a,l,f,c)}function b(t){var r=t.sort((function(t,r){return t.letter<r.letter?-1:t.score>r.score?1:0})).reverse();l("Finding best play for rack "+t.map((function(t){return t.stringify()})).join(",")),l("with dictionary ".concat(e.name)),l("in edition ".concat(a.name)),l("on\n"+o.stringify()),assert(a instanceof u.c,"Setup failure"),l("Starting findBestPlay computation for "+r.map((function(t){return t.stringify()})).join(",")+" on "+o.stringify()),p=0;for(var n=!1,i=0;i<o.cols;i++)for(var f=0;f<o.rows;f++)if(y(i,f)){if(!n)m(r.find((function(t){return t.isBlank}))?a.alphabet:r.filter((function(t){return!t.isBlank})).map((function(t){return t.letter}))),n=!0;var d,h=o.at(i,f).tile,w=v(e.getSequenceRoots(h.letter));try{for(w.s();!(d=w.n()).done;){var b=d.value;g(i,f,1,0,r,0,b,b,[h]),g(i,f,0,1,r,0,b,b,[h])}}catch(t){w.e(t)}finally{w.f()}}n||function(t){var r=t.map((function(t){return t.letter?t.letter:" "})).join(""),n=e.findAnagrams(r),i=Math.round(Math.random()),f=(i+1)%2,u=0===f;for(var d in p=0,n){var h,y=[],m=t,w=v(d.split(""));try{var g=function(){var t=h.value,r=m.find((function(r){return r.letter===t}))||m.find((function(t){return t.isBlank}));assert(r,"Can't do this with the available tiles"),y.push(new s.n({letter:t,isBlank:r.isBlank,score:r.score})),m=m.filter((function(t){return t!==r}))};for(w.s();!(h=w.n()).done;)g()}catch(t){w.e(t)}finally{w.f()}for(var b=u?o.midcol:o.midrow,k=b;k<b+d.length;k++){var B=u?b:k,E=u?k:b,S=o.scorePlay(B,E,f,i,y)+a.calculateBonus(y.length);if(S>p){p=S;for(var A=0;A<y.length;A++){var j=k-y.length+A+1;y[A].col=0==f?o.midcol:j*f,y[A].row=0==i?o.midrow:j*i}l(new c.A({placements:y,words:[{word:d,score:S}],score:S}))}}}}(r)}function k(t,r,n,i){return l=n,o=t.board,Promise.all([(0,f.x)(i).then((function(t){return e=t})),u.c.load(t.edition).then((function(t){return a=t}))]).then((function(){return b(r)}))}}}]);