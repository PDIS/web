webpackJsonp([1,2],{

/***/ 379:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },

/***/ 393:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(668);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(393)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js?sourcemap!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?sourcemap!./detailstyles.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js?sourcemap!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?sourcemap!./detailstyles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 399:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(669);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(393)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js?sourcemap!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?sourcemap!./styles.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js?sourcemap!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?sourcemap!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 668:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(379)();
// imports


// module
exports.push([module.i, "/* font options: Noto Serif, Open Sans Condensed, Slabo 27px */\n.detail-container {\n  margin: 0 0 2.5vw 0; }\n\n.detail-text {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: \"Noto Serif\", Georgia, serif;\n  font-size: 22px;\n  line-height: 35px; }\n  .detail-text p {\n    margin-top: 20px; }\n  .detail-text em img {\n    float: right;\n    width: 450px;\n    height: 300px;\n    margin: 8px 0px 17px 35px; }\n  .detail-text strong img {\n    float: left;\n    width: 450px;\n    height: 300px;\n    margin: 8px 35px 17px 0px; }\n  .detail-text img {\n    margin: 15px 0px 15px 0px; }\n  .detail-text dd {\n    clear: left; }\n  .detail-text blockquote {\n    margin: -95px 0 -74px;\n    border-left: 0px; }\n  .detail-text blockquote::before {\n    content: \"{\";\n    font-family: \"Noto Serif\", Georgia, serif;\n    font-size: 135px;\n    color: #ddd;\n    position: relative;\n    left: -66px;\n    top: 146px; }\n  .detail-text blockquote::after {\n    content: \"}\";\n    font-family: Georgia, serif;\n    font-size: 135px;\n    color: #ddd;\n    position: relative;\n    left: 396px;\n    top: -88px; }\n\n.video-container {\n  margin-bottom: 10px; }\n\n@media screen and (max-width: 1200px) {\n  .detail-text blockquote::after, .detail-text blockquote::before {\n    content: \"}\";\n    font-size: 0px;\n    position: relative;\n    left: 0px;\n    top: 0px; } }\n\n@media screen and (max-width: 991px) {\n  .detail-text img, .detail-text strong img, .detail-text em img {\n    clear: left;\n    top: 10px;\n    width: 90%;\n    height: 90%;\n    border: 0px;\n    margin-left: 17px; }\n  .detail-text span img {\n    width: 40%;\n    height: 40%; }\n  .detail-text p, h2 {\n    margin: 25px 25px 25px 25px;\n    word-break: break-all; }\n  .video-container {\n    padding-top: 65%; }\n  .video-container iframe {\n    position: absolute;\n    top: 10px;\n    left: 5%;\n    width: 80%;\n    height: 80%;\n    border: 0px;\n    margin-left: 17px; } }\n\n@media screen and (min-width: 991px) {\n  .detail-container img {\n    width: 100%;\n    height: 100%;\n    border: 0px; } }\n", ""]);

// exports


/***/ },

/***/ 669:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(379)();
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n/* font options: Noto Serif, Open Sans Condensed, Slabo 27px */\nbody {\n  font-family: \"Noto Serif\", Georgia, serif;\n  background-color: #4B0056;\n  font-size: 16px;\n  color: #111111; }\n\n.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {\n  line-height: normal;\n  margin-bottom: 20px; }\n\na {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  color: #4B0056; }\n\na:hover {\n  color: #D66FE5;\n  border-color: #D66FE5;\n  text-decoration: none; }\n\ntextarea {\n  border: 0; }\n\n.btn-pdis {\n  padding: 12px 25px;\n  background: transparent;\n  border: solid 2px #4B0056;\n  font-family: \"Open Sans Condensed\", sans-serif;\n  color: #4B0056;\n  margin: 0px;\n  display: inline-block;\n  text-transform: uppercase; }\n\n.section-line {\n  margin: 2.5vw 0;\n  height: 1px;\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(left, rgba(214, 111, 229, 0) 10%, #d66fe5 50%, rgba(214, 111, 229, 0) 90%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to right, rgba(214, 111, 229, 0) 10%, #d66fe5 50%, rgba(214, 111, 229, 0) 90%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */ }\n\nhr.section-end {\n  text-align: center;\n  height: 8rem; }\n\nhr.section-end:after {\n  content: \"#\";\n  font-size: 6rem;\n  font-weight: 700;\n  color: #DDDDDD; }\n\nhr.section-dot {\n  text-align: center;\n  height: 6rem; }\n\nhr.section-dot:after {\n  content: \",\";\n  font-size: 8rem;\n  line-height: 0;\n  font-weight: 700;\n  color: #DDDDDD; }\n\n.highlight {\n  color: #D66FE5; }\n\n.main-container {\n  background-color: #EFEFEF;\n  box-shadow: 0 0 10px black;\n  max-width: 1180px;\n  margin: 150px auto 0;\n  padding: 0 2.5vw; }\n\n.slogan-container {\n  text-align: center; }\n\n.slogan {\n  font-family: \"Slabo 27px\";\n  font-size: 5rem;\n  padding: 80px 0; }\n\n@media screen and (max-width: 767px) {\n  .main-container {\n    background-color: #EFEFEF;\n    box-shadow: 0 0 10px black;\n    max-width: 1180px;\n    margin: 90px auto 0;\n    padding: 0 2.5vw; } }\n", ""]);

// exports


/***/ },

/***/ 724:
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(399);
module.exports = __webpack_require__(398);


/***/ }

},[724]);
//# sourceMappingURL=styles.map