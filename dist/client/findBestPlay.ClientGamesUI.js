/*! For license information please see findBestPlay.ClientGamesUI.js.LICENSE.txt */
(window.webpackChunk_warren_bank_scrabble=window.webpackChunk_warren_bank_scrabble||[]).push([["findBestPlay"],{"./src/game/findBestPlay.js":function(t,r,e){e.r(r),e.d(r,{findBestPlay:function(){return k}});var n,i,a,o,l,f=e("./src/game/loadDictionary.js"),s=e("./src/game/Edition.js"),u=e("./src/game/Tile.js"),c=e("./src/game/Move.js");function v(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=function(t,r){if(!t)return;if("string"==typeof t)return d(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return d(t,r)}(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,l=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return o=t.done,t},e:function(t){l=!0,a=t},f:function(){try{o||null==e.return||e.return()}finally{if(l)throw a}}}}function d(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function h(t,r){return t.filter((function(t){return r.indexOf(t)>=0}))}var y=0;function p(t,r){return!o.at(t,r).isEmpty()&&(t>0&&o.at(t-1,r).isEmpty()||t<o.cols-1&&o.at(t+1,r).isEmpty()||r>0&&o.at(t,r-1).isEmpty()||r<o.rows-1&&o.at(t,r+1).isEmpty())}function m(t){for(var r=[],e=0;e<o.cols;e++){var i=[];r.push(i);for(var l=0;l<o.rows;l++){var f=[[],[]];if(i[l]=f,o.at(e,l).tile)f[0].push(o.at(e,l).tile.letter),f[1].push(o.at(e,l).tile.letter);else{for(var s="",u=l-1;u>=0&&o.at(e,u).tile;)s=o.at(e,u).tile.letter+s,u--;var c="";for(u=l+1;u<o.rows&&o.at(e,u).tile;)c+=o.at(e,u).tile.letter,u++;for(var d="",h=e-1;h>=0&&o.at(h,l).tile;)d=o.at(h,l).tile.letter+d,h--;var y="";for(h=e+1;h!=o.cols&&o.at(h,l).tile;)y+=o.at(h,l).tile.letter,h++;var p,m=v(t);try{for(m.s();!(p=m.n()).done;){var w=p.value,g=d+w+y,b=1===g.length||n.hasWord(g),k=b||e>0&&n.hasSequence(g),B=s+w+c,E=1===B.length||n.hasWord(B),j=E||l>0&&n.hasSequence(B);b&&j&&f[0].push(w),E&&k&&f[1].push(w)}}catch(t){m.e(t)}finally{m.f()}}}}a=r}function w(t,r,e,n,f,s,d,p){var m,g=t+e,b=r+n;if(d.isEndOfWord&&p.length>=2&&s>0&&(g==o.cols||b==o.rows||!o.at(g,b).tile)){var k=[],B=o.scorePlay(t,r,e,n,p,k)+i.calculateBonus(s);B>y&&(y=B,l(new c.Move({placements:p.filter((function(t){return!o.at(t.col,t.row).tile})),words:k,score:B})))}var E=0;if(g<o.cols&&b<o.rows)if(o.at(g,b).isEmpty()){var j=f.find((function(t){return t.isBlank})),S=a[g][b][e];m=h(d.postLetters,j?S:h(f.map((function(t){return t.letter})),S)),E=1}else m=[o.at(g,b).tile.letter];else m=[];var A,P=v(m);try{var M=function(){var t=A.value,r=f;if(E>0){var i=r.find((function(r){return r.letter===t}))||r.find((function(t){return t.isBlank}));p.push(new u.Tile({letter:t,isBlank:i.isBlank,score:i.score,col:g,row:b})),r=r.filter((function(t){return t!==i}))}else p.push(o.at(g,b).tile);var a,l=v(d.postNodes);try{for(l.s();!(a=l.n()).done;){var c=a.value;c.letter===t&&w(g,b,e,n,r,s+E,c,p)}}catch(t){l.e(t)}finally{l.f()}p.pop()};for(P.s();!(A=P.n()).done;)M()}catch(t){P.e(t)}finally{P.f()}}function g(t,r,e,n,i,l,f,s,c){var d,y=t-e,p=r-n,m=0;if(y>=0&&p>=0)if(o.at(y,p).isEmpty()){var b=i.find((function(t){return t.isBlank})),k=a[y][p][e];d=h(s.preLetters,b?k:h(i.map((function(t){return t.letter})),k)),m=1}else d=[o.at(y,p).tile.letter];else d=[];var B,E=v(d);try{var j=function(){var t=B.value,r=i;if(m>0){var a=r.find((function(r){return r.letter===t}))||r.find((function(t){return t.isBlank}));c.unshift(new u.Tile({letter:t,isBlank:a.isBlank,score:a.score,col:y,row:p})),r=r.filter((function(t){return t!==a}))}else c.unshift(o.at(y,p).tile);var d,h=v(s.preNodes);try{for(h.s();!(d=h.n()).done;){var w=d.value;w.letter===t&&g(y,p,e,n,r,l+m,f,w,c)}}catch(t){h.e(t)}finally{h.f()}c.shift()};for(E.s();!(B=E.n()).done;)j()}catch(t){E.e(t)}finally{E.f()}0==s.preNodes.length&&(p<0||y<0||o.at(y,p).isEmpty())&&w(t+e*(c.length-1),r+n*(c.length-1),e,n,i,l,f,c)}function b(t){var r=t.sort((function(t,r){return t.letter<r.letter?-1:t.score>r.score?1:0})).reverse();l("Finding best play for rack "+t.map((function(t){return t.stringify()})).join(",")),l("with dictionary ".concat(n.name)),l("in edition ".concat(i.name)),l("on\n"+o.stringify()),assert(i instanceof s.Edition,"Setup failure"),l("Starting findBestPlay computation for "+r.map((function(t){return t.stringify()})).join(",")+" on "+o.stringify()),y=0;for(var e=!1,a=0;a<o.cols;a++)for(var f=0;f<o.rows;f++)if(p(a,f)){if(!e)m(r.find((function(t){return t.isBlank}))?i.alphabet:r.filter((function(t){return!t.isBlank})).map((function(t){return t.letter}))),e=!0;var d,h=o.at(a,f).tile,w=v(n.getSequenceRoots(h.letter));try{for(w.s();!(d=w.n()).done;){var b=d.value;g(a,f,1,0,r,0,b,b,[h]),g(a,f,0,1,r,0,b,b,[h])}}catch(t){w.e(t)}finally{w.f()}}e||function(t){var r=t.map((function(t){return t.letter?t.letter:" "})).join(""),e=n.findAnagrams(r),a=Math.round(Math.random()),f=(a+1)%2,s=0===f;for(var d in y=0,e){var h,p=[],m=t,w=v(d.split(""));try{var g=function(){var t=h.value,r=m.find((function(r){return r.letter===t}))||m.find((function(t){return t.isBlank}));assert(r,"Can't do this with the available tiles"),p.push(new u.Tile({letter:t,isBlank:r.isBlank,score:r.score})),m=m.filter((function(t){return t!==r}))};for(w.s();!(h=w.n()).done;)g()}catch(t){w.e(t)}finally{w.f()}for(var b=s?o.midcol:o.midrow,k=b;k<b+d.length;k++){var B=s?b:k,E=s?k:b,j=o.scorePlay(B,E,f,a,p)+i.calculateBonus(p.length);if(j>y){y=j;for(var S=0;S<p.length;S++){var A=k-p.length+S+1;p[S].col=0==f?o.midcol:A*f,p[S].row=0==a?o.midrow:A*a}l(new c.Move({placements:p,words:[{word:d,score:j}],score:j}))}}}}(r)}function k(t,r,e,a){return l=e,o=t.board,Promise.all([(0,f.loadDictionary)(a).then((function(t){return n=t})),s.Edition.load(t.edition).then((function(t){return i=t}))]).then((function(){return b(r)}))}}}]);
//# sourceMappingURL=findBestPlay.ClientGamesUI.js.map