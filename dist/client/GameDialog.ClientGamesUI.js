/*! For license information please see GameDialog.ClientGamesUI.js.LICENSE.txt */
(window.webpackChunk_warren_bank_scrabble=window.webpackChunk_warren_bank_scrabble||[]).push([["GameDialog"],{"./src/browser/Dialog.js":function(t,e,n){n.r(e),n.d(e,{Dialog:function(){return a}});var i=n("./node_modules/jquery/dist/jquery.js");function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(r=i.key,a=void 0,a=function(t,e){if("object"!==o(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!==o(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(r,"string"),"symbol"===o(a)?a:String(a)),i)}var r,a}var a=function(){function t(e,n){var o=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e,this.options=n,this.$dlg=i("#".concat(e)),(0===this.$dlg.length?i.get(Platform.getFilePath("html/".concat(n.html||e,".html"))).then((function(t){i("body").append(i(document.createElement("div")).attr("id",e).addClass("dialog").html(t)),o.$dlg=i("#".concat(e))})):Promise.resolve()).then((function(){return o.$dlg.dialog({title:n.title,width:"auto",minWidth:400,modal:!0,open:function(){o.$dlg.data("dialog_created")?o.openDialog():(o.$dlg.data("dialog_created",!0),o.createDialog().then((function(){return o.openDialog()})))}})}))}var e,n,o;return e=t,(n=[{key:"createDialog",value:function(){var t=this;this.$dlg.find("[data-i18n]").i18n(),this.$dlg.find("input[data-i18n-placeholder]").each((function(){i(this).attr("placeholder",i.i18n(i(this).data("i18n-placeholder")))})),this.$dlg.find("label[data-image]").each((function(){i(this).css("background-image",'url("'.concat(i(this).data("image"),'")'))}));var e=this;return this.$dlg.find("select").selectmenu().on("selectmenuchange",(function(){i(this).blur(),e.$dlg.data("this").enableSubmit()})),setTimeout((function(){return t.$dlg.find("select[data-i18n-tooltip] ~ .ui-selectmenu-button").tooltip({items:".ui-selectmenu-button",position:{my:"left+15 center",at:"right center",within:"body"},content:function(){return i.i18n(i(this).prev().data("i18n-tooltip"))}})}),100),this.$dlg.find(".submit").on("click",(function(){return t.submit()})),this.enableSubmit(),console.debug("Created",this.id),Promise.resolve()}},{key:"openDialog",value:function(){return console.debug("Opening",this.id),this.$dlg.data("this",this),Promise.resolve(this)}},{key:"canSubmit",value:function(){return!0}},{key:"enableSubmit",value:function(){this.$dlg.find(".submit").prop("disabled",!this.canSubmit())}},{key:"getFieldValues",value:function(t){return t||(t={}),this.$dlg.find("input[name],select[name],textarea[name]").each((function(){var e,n=i(this).attr("name");if("checkbox"===this.type)e=!!i(this).is(":checked");else if("radio"===this.type){if(!i(this).is(":checked"))return;n=this.id,e=!0}else if("number"===this.type){if(e=parseInt(i(this).val()),isNaN(e))return}else e=i(this).val()||i(this).text();void 0===t[n]?t[n]=e:"string"==typeof t[n]?t[n]=[t[n],e]:t[n].push(e)})),t}},{key:"submit",value:function(t){var e=this;this.$dlg.dialog("close"),t=this.getFieldValues(t),this.options.onSubmit&&this.options.onSubmit(this,t),this.options.postAction&&i.ajax({url:this.options.postAction,type:"POST",contentType:"application/json",data:JSON.stringify(t)}).then((function(t){"function"==typeof e.options.postResult&&e.options.postResult(t)})).catch((function(t){"function"==typeof e.options.error?e.options.error(t):console.error(t.responseText)}))}}])&&r(e.prototype,n),o&&r(e,o),Object.defineProperty(e,"prototype",{writable:!1}),t}()},"./src/browser/GameDialog.js":function(t,e,n){n.r(e),n.d(e,{GameDialog:function(){return h}});var i=n("./src/browser/Dialog.js"),o=n("./node_modules/jquery/dist/jquery.js");function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(o=i.key,a=void 0,a=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!==r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===r(a)?a:String(a)),i)}var o,a}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var i=l(t,e);if(i){var o=Object.getOwnPropertyDescriptor(i,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},s.apply(this,arguments)}function l(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}function u(t,e){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},u(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return d(this,n)}}function d(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function f(t){return f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},f(t)}var h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&u(t,e)}(l,t);var e,n,i,r=c(l);function l(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),r.call(this,"GameDialog",o.extend({title:o.i18n("title-game-dlg",t.game.key)},t))}return e=l,(n=[{key:"createDialog",value:function(){var t=this;return this.$dlg.find("button[name=options]").button().on("click",(function(){var e=t.$dlg.data("this");e.options.ui.gameOptions(e.options.game)})),this.$dlg.find("button[name=observe]").hide().button().on("click",(function(){t.$dlg.dialog("close");var e=t.$dlg.data("this");e.options.ui.observe(e.options.game)})),this.$dlg.find("button[name=join]").hide().button().on("click",(function(){t.$dlg.dialog("close");var e=t.$dlg.data("this");e.options.ui.joinGame(e.options.game)})),this.$dlg.find("button[name=robot]").hide().button().on("click",(function(){var e=t.$dlg.data("this");e.options.ui.addRobot(e.options.game)})),this.$dlg.find("button[name=invite]").hide().button().on("click",(function(){var e=t.$dlg.data("this");e.options.ui.invitePlayers(e.options.game)})),this.$dlg.find("button[name=another]").hide().button().on("click",(function(){var e=t.$dlg.data("this");e.options.ui.anotherGame(e.options.game)})),this.$dlg.find("button[name=delete]").hide().button().on("click",(function(){t.$dlg.dialog("close");var e=t.$dlg.data("this");e.options.ui.deleteGame(e.options.game)})),s(f(l.prototype),"createDialog",this).call(this)}},{key:"populate",value:function(t){var e=this;t?this.options.game=t:t=this.options.game,this.$dlg.attr("name",t.key),this.$dlg.find("button[name=options]").toggle(this.options.ui.session&&0===t.turns.length),this.$dlg.find("div[name=headline]").empty().append("".concat(t.edition," ").concat(t.dictionary||""));var n=this.$dlg.find(".player-table").empty().attr("name",t.key),i=!t.hasEnded();t.getPlayers().forEach((function(o){return n.append(e.options.ui.$player(t,o,i))})),i&&n.find("#player".concat(t.whosTurnKey)).addClass("whosTurn");var r=this.$dlg.find("button[name=join]").hide(),a=this.$dlg.find("button[name=robot]").hide(),s=this.$dlg.find("button[name=invite]").hide(),l=this.$dlg.find("button[name=another]").hide(),u=this.$dlg.find("button[name=observe]").hide(),c=this.$dlg.find("button[name=delete]").hide();this.options.ui.session?(c.show(),i?(!t.getPlayerWithKey(this.options.ui.session.key)&&(0===(t.maxPlayers||0)||t.getPlayers().length<t.maxPlayers)&&r.show().button("option",{label:o.i18n("Join game")}),this.options.ui.getSetting("canEmail")&&s.show(),t.getPlayers().find((function(t){return t.isRobot}))||a.show()):(u.show(),t.nextGameKey||l.show())):u.show()}},{key:"openDialog",value:function(){return this.populate(),s(f(l.prototype),"openDialog",this).call(this)}}])&&a(e.prototype,n),i&&a(e,i),Object.defineProperty(e,"prototype",{writable:!1}),l}(i.Dialog)}}]);
//# sourceMappingURL=GameDialog.ClientGamesUI.js.map