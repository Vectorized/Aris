/*!
 * Aris JavaScript Library v1.0.8
 * @author Benjamin Kang Yue Sheng
 * MIT license
 * 
 * Includes PrefixFree v1.0.7 
 * https://leaverou.github.io/prefixfree
 */

/**
 * Functions
 * =========
 * 
 * HTML writing functions
 * ----------------------
 * 
 * - HTML(context)
 *     Creates a HTML string.
 *
 * Lazy Loading functions
 * ----------------------
 * 
 * - HTML.load(file0, file1, ...).done(fn)
 * 
 *     Loads (.js, .css) files in sequence, then execute the done function.
 *     The files are downloaded asyncronously.
 *     Each file is only loaded once.
 *     The done function is executed once per load call, 
 *     irregardless of whether the files are already loaded.
 *
 *     The files are treated accordingly by their file extension.   
 *     To force a file to be treated like a file extension, prefix it with  
 *     `js:` or `css:` (whitespace is around the `:` is ignored):
 *
 *     `js: http://website.com/files?name=mainjs`
 *
 * Hash routing functions
 * ----------------------
 * 
 * - HTML.route("#path/to/page/anchor", fn)
 * 
 *     Attaches the function to "#path/to/page/anchor".
 *
 * - HTML.route.go(#path/to/page/anchor")
 * 
 *     Executes the function attached to "#path/to/page/anchor".
 *
 * - HTML.route.go(#path/to/page/:anchor")
 * 
 *     Attemps to execute the function attached to the path.
 *     If the visitor has visited "#path/to/page/one",
 *     or the address bar points to "#path/to/page/one",
 *     it will execute the function attached to "#path/to/page/one".
 *     Otherwise, it will execute the function attached to 
 *     "#path/to/page/anchor".
 *
 * - HTML.route.go("#:path/:to/:page")
 * 
 *     You can prefix any path component with ":" to mark it 
 *     as the default fallback.
 *
 * - HTML.route.go()
 * 
 *     Attempts to execute the function attached to the path in
 *     the address bar.
 *
 * HTML context example
 * ====================
 * 
 * HTML(["div", {id: "y", class: "a b", style: {color: "red"}, ariaLabel: "x"}, 
 *     "Text",
 *     ["a", {href: "example.com", target: "_blank"}, "link"],
 *     {style: {width: 1, opacity: 0.5}, class: "c", pos: 1},
 *     [["div", 0], ["div", 1]]
 * ])
 *
 *      Turns into:
 *
 * <div id="y" class="a b c" style="color: red; width: 1px; opacity: 0.5"
 *   ariaLabel="x" aria-label="x" aria_label="x" pos="1">
 *     Text
 *     <a href="example.com" target="_blank">link</a>
 *     <div>0</div><div>1</div>
 * </div>
 *
 * - If the starting element is a string, it is treated as a tag name.
 * 
 *      ['div', 'Text']    =>    <div>Text</div>
 * 
 * - Attributes are added via objects. 
 *   The object can be anywhere in the array except for 
 *   the starting element. 
 *   You can use any preferred style:
 *   
 *      ['div', {id: 'x'}, 'a', 'b', 'c']  OR 
 *      ['div', 'a', 'b', 'c', {id: 'x'}]
 *     
 * - Attributes can be defined via camelCase. 
 *   They will automatically converted to kebab-case and snake_case.
 *   This is so that you can avoid using quotes on the keys.
 *   
 *      {ariaLabel: "x"}    =>    aria-label="x"
 *   
 * - If the starting element is an array, the contents of the entire
 *   array will be converted to HTML and joined.
 *   
 *      [['div', 0], ['div', 1]]    =>    <div>0</div><div>1</div>
 *
 * - Inline css can be defined via objects. 
 *   They will be combined in sequential order.
 *   CSS will be auto-prefixed. 
 *   For applicable numericl units, 'px' will be automatically added
 *   if a number is given. (similar to jQuery).
 *
 * Tips
 * ====
 *
 * - You can make functions to return html contexts, 
 *   enabling you to reuse common html. Write less, do more!
 *
 * - You can add attributes or children to contexts to 
 *   specialize them.
 *
 * - HTML contexts are syntax-highlighted by most js editors 
 *   without addons. Helps you code easily and make lesser errors.
 *   
 * - HTML contexts are efficiently parsed by js engines.
 *   Minimal processing overhead compared to conventional templates.
 *
 * - Syntax errors are automatically detected by js engines
 *   when the js is compiled.
 *   Check the console for the line of the error if your page
 *   has display errors.
 *
 * - No need for transpilers and complicated build tools.
 *   A browser and text editor is all you need.
 *   Get up to speed quick!
 *
 * - Think of HTML.js as a simple, well-made kitchen knife:
 *   Barebones, lightweight, flexible.
 *
 *   With a little practice, 
 *   you'll find that it is often more than capable of 
 *   doing stuff the big frameworks can do.
 *
 *   Less than 5kb minified + gzipped, 
 *   but gives you the power to create complex Single-Page-Apps 
 *   in a clean and efficient manner.
 *   
 *   As long you are clear on which parts of the DOM to modify directly,
 *   you should be good to go.
 *
 * SVG
 * ===
 * 
 * SVG writing functions
 * ---------------------
 * 
 * - HTML.SVG(width, height, ...context)
 *     Creates a HTML SVG string, 
 *     with common boilerplate attributes automatically-filled.
 *     
 * - HTML.SVG.Path(...context)
 *   .<command>(...)
 *   .<command>(...)
 *     Creates an HTML SVG Path string.
 *     See (https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
 *     for a tutorial on the path commands.
 *     
 * SVG context example
 * -------------------
 * 
 *   var SVG = HTML.SVG, P = HTML.SVG.Path;
 *   HTML(SVG(30, 30, 
 *      ['circle', {class:'frame', cx: 15, cy: 15, r: 12}],
 *      P({class: 'hand hour'}).M(15,15).L(20,15),
 *      P({class: 'hand minute'}).M(15,15).L(15,2),
 *      P().M(0,0).L(1,1)
 *      P.M(0,0).L(1,1) // path can be also be called without args 
 *   ))
 *       =>  
 *       
 *   HTML(['svg', {xmlns:'http://www.w3.org/2000/svg',
 *     width:'30px', height:'30px', viewBox:'0 0 30 30'},
 *       ['circle', {class:'frame', cx:15, cy:15, r:12}],
 *       ['path' {class:'hand hour', d:'M15,15 L20,15'}],
 *       ['path' {class:'hand minute', d:'M15,15 L15,2'}],
 *       ['path' {d:'M0,0 L1,1'}],
 *       ['path' {d:'M0,0 L1,1'}],
 *   ])
 *       =>
 *         
 *   <svg xmlns="http://www.w3.org/2000/svg"
 *     width="30px" height="30px" viewBox="0 0 30 30">
 *       <circle class="frame" cx="15" cy="15" r="12"></circle>
 *       <path class="hand hour" d="M15,15 L20,15"></path>
 *       <path class="hand minute" d="M15,15 L15,2"></path>
 *       <path d="M0,0 L1,1"></path>
 *       <path d="M0,0 L1,1"></path>
 *   </svg>
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = factory(global, 1);
	} else {
		factory(global);
	}

} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	"use strict";

	var document = window.document;
	var gcs = window.getComputedStyle;
	var isUndefined = function (x) { return typeof(x) == 'undefined'; };

	var noBrowser = isUndefined(document) || isUndefined(gcs);

	var toSet = function (s) {
		for (var d = {}, i = (s = s.split(',')).length; i--;) d[s[i]] = 1;
		return d;
	};
	var cssNumber = toSet('column-count,fill-opacity,font-weight,line-height,opacity,orphans,widows,z-index,zoom');
	var emptyTags = toSet('area,base,br,col,embed,hr,img,input,keygen,link,meta,param,source,track,wbr');

	var cssBracketRe = /((?:\\.|("|')(?:\\.|.)*?\2|[^{}])*)([{}])/g;
	var cssPropRe = /(?:^|\{|\s|;)([A-Za-z0-9\-]+)\s*\:\s*?((?:\\.|("|')(?:\\.|.)*?\3|[^;}])*)/g;
	var cssUrlRe = /url\(\s*?["']?(.*?)["']?\s*?\)/g;
	var cssCommentRe = /\/\*[\s\S]*?\*\//g;
	var fileExtRe = /\.([A-Za-z0-9]+)(?:[\?#]|$)/;
	var filePreExtRe = /^(?:\s*?(js|css)\s*?\:)?\s*?(\S[\S\s]*)/i;
	var stringTrimRe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	var splitWordsRe = /(?:(?:^|[A-Z])[a-z]+|[0-9]+|[A-Za-z]+)/g;

	var noop = function (x) { return x; };
	var head = noBrowser ? noop : document.head;

	var splitWords = function (s) {
		for (var a = [], m; m = splitWordsRe.exec(s);) a.push(m[0]);
		return a;
	};
	var populateCaseVariations = function (o) {	
		var d = {}, k, w, v;
		for (k in o) {
			w = splitWords(k), v = o[k];
			if (w.length > 1) { 
				d[lc(w.join('-'))] = v;
				d[lc(w.join('_'))] = v;
			}
			d[k] = v;
		}
		return d;
	};
	var ce = function (x) { return document.createElement(x); };
	var hasKey = function (o, k) { return o.hasOwnProperty(k); };
	var isT = function (s) { return (function (x) { return x && Object.prototype.toString.call(x) == '[object '+s+']' }) };
	var isArray = isT('Array');
	var isObject = isT('Object');
	var isFunction = isT('Function');
	var lc = function (s) { return s.toLowerCase(); };
	var uc = function (s) { return s.toUpperCase(); };
	var trim = function (s) { return String.prototype.trim ? s.trim() : s.replace(stringTrimRe, ''); };


	var styles = noBrowser ? [] : gcs(document.documentElement, null);
	var cssTester = noBrowser ? [] : ce('div').style;
	var cssPropsList = [];
	var cssProps = {}, bestPrefix = '', bestPrefixCount = 0;

	// CSS Prefixing via PrefixFree. (https://leaverou.github.io/prefixfree)

	// Modifications:
	// 
	// Instead of a whitelist of stuff to prefix, we just blacklist 
	// all the css props that we know that doesn't need prefixing. 
	// This makes a safer approach that enables stuff like 
	// -webikit-filter to work in old Safari.
	// 
	// We also parse the css bracket by bracket, instead of using 
	// single regex replace. 
	// This is for selectors like i:hover which can be confused as a property.

	// NOTE: CSS prefixing is by default OFF for non browser environments (e.g. node).
	// To turn it on, change the following line.
	// Currently, only prefixing properties with all prefixes is supported
	// for non-browser environments.

	var prefixWithoutBrowser = false;
	var cssPrefixes = toSet('-webkit-,-moz-,-ms-,-o-');
	if (!prefixWithoutBrowser && noBrowser)
		cssPrefixes = {};
	
	if (styles && styles.length > 0) {
		cssPropsList = styles;
	} else {
		var re = /[A-Z]/g, p, f = function(x) { return '-' + lc(x) };
		for (p in styles) cssPropsList.push(p.replace(re, f));
	}
	for (var j = 0, i, p, s, o, pf; j < 2; ++j) {
		for (i = cssPropsList.length; i--;) {
			p = cssPropsList[i].split('-');
			if (j < 1 && p[0] != '') {
				for (; p.length >= 1; p.pop()) {
					for (s = p[0], o = 1; o < p.length; ++o) 
						s += uc(p[o][0]) + p[o].substring(1); 
					if (s in cssTester) cssProps[p.join('-')] = 1;
				}
			} else if (j < 2 && p[0] == '') {
				pf = '-'+p[1]+'-';
				if (cssPrefixes[pf]) {
					for (p = p.slice(2); p.length >= 1; p.pop()) {
						delete cssProps[p.join('-')];
					}
					cssPrefixes[pf]++;
				}
			}
		}
	}
	for (var pf in cssPrefixes) {
		if (cssPrefixes[pf] > bestPrefixCount) {
			bestPrefixCount = cssPrefixes[pf];
			bestPrefix = pf;
		}
	}

	var getCSSFixer = function (what, before, after, replacement) {
		var re = RegExp(before + '(' + what.join('|') + ')' + after, 'g');
		return function (css) {
			return what.length ? css.replace(re, replacement) : css;
		}
	};

	var fixCSSFunctions = noBrowser ? noop : (function () {
		var bgi = 'backgroundImage', gradient = '-gradient'; // for better compression lol
		var cu = 'cursor', di = 'display', wi = 'width';
		var functions = [], keywords = [], t;

		var functionsTests = {
			'calc': [wi, '1px + 5%'],
			'element': [bgi, '#foo'],
			'cross-fade': [bgi, 'url(a.png), url(b.png), 50%'],
			'image-set': [bgi, 'url(a.png) 1x, url(b.png) 2x']
		};
		functionsTests['repeating-linear'+gradient] =
		functionsTests['repeating-radial'+gradient] =
		functionsTests['radial'+gradient] =
		functionsTests['linear'+gradient] = [bgi, 'red, teal'];

		var supported = function (value, property) {
			cssTester[property] = '';
			cssTester[property] = value;
			return !!cssTester[property];
		};

		for (t in functionsTests) {
			var test = functionsTests[t], property = test[0], value = t + '(' + test[1] + ')';
			if (!supported(value, property) && supported(bestPrefix + value, property)) { 
				// It's supported, but with a prefix
				functions.push(t);
			}
		}
		var functionsFix = getCSSFixer(functions, '(\\s|:|,)', '\\s*\\(', '$1' + bestPrefix + '$2(');

		var keywordsTests = {
			'initial': 'color',
			'grab': cu,
			'grabbing': cu,
			'zoom-in': cu,
			'zoom-out': cu,
			'box': di,
			'flexbox': di,
			'inline-flexbox': di,
			'flex': di,
			'inline-flex': di,
			'grid': di,
			'inline-grid': di,
			'max-content': wi,
			'min-content': wi,
			'fit-content': wi,
			'fill-available': wi,
			'contain-floats': wi
		};
		for (t in keywordsTests) {
			var property = keywordsTests[t];
			if (!supported(t, property) && supported(bestPrefix + t, property)) {
				// It's supported, but with a prefix
				keywords.push(t);
			}
		}
		var keywordsFix = getCSSFixer(keywords, '(\\s|:)', '(\\s|;|\\}|$)', '$1' + bestPrefix + '$2$3');

		return function (css) { 
			if (functions.length) {
				if (functions.indexOf('linear-gradient') > -1) {
					// Gradients are supported with a prefix, convert angles to legacy
					css = css.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, 
						function ($0, delim, repeating, deg) {
							return delim + (repeating || '') + 'linear-gradient(' + (90-deg) + 'deg';
						});
				}
			}
			css = functionsFix(css);
			css = keywordsFix(css);
			return css;
		};
	})();

	var fixCSSSelectors = noBrowser ? noop : (function () {
		var selectors = [], atrules = [];

		var selectorsTests = {
			':any-link': 0,
			'::backdrop': 0,
			':fullscreen': 0,
			':full-screen': ':fullscreen',
			//sigh
			'::placeholder': 0,
			':placeholder': ':placeholder-shown',
			'::input-placeholder': '::placeholder',
			':input-placeholder': ':placeholder-shown',
			':read-only': 0,
			':read-write': 0,
			'::selection': 0
		};
		var atrulesTests = {
			'keyframes': 'name',
			'viewport': 0,
			'document': 'regexp(".")'
		};

		var selectorMap = {}, t, test;
		var style = head.appendChild(ce('style'));

		var supported = function (selector) {
			style.textContent = selector + '{}';  // Safari 4 has issues with style.innerHTML
			return !!style.sheet.cssRules.length;
		};


		for (t in selectorsTests) {
			var standard = selectorsTests[t] || t;
			var prefixed = t.replace(/::?/, function($0) { return $0 + bestPrefix })
			if(!supported(standard) && supported(prefixed)) {
				selectors.push(standard);
				selectorMap[standard] = prefixed;
			}
		}

		for (t in atrulesTests) {
			test = t + ' ' + (atrulesTests[t] || '');
			if(!supported('@' + test) && supported('@' + bestPrefix + test)) {
				atrules.push(t);
			}
		}
		var selectorsFix = getCSSFixer(selectors, '', '\\b', function (selector) {
			return selectorMap[selector] || selector;
		});
		var atrulesFix = getCSSFixer(atrules, '@', '\\b', '@' + bestPrefix + '$1');

		head.removeChild(style);

		return function (css) {
			return atrulesFix(selectorsFix(css));
		};
	})();
	
	var autoFixCSS = function (css) {
		
		var af, k, v, r = '', sc = 0, mSub, m, pf, k, af;
		if (isObject(css)) {
			af = {};
			for (k in css) if (hasKey(css, k)) {
				v = css[k];
				k = trim(k);
				if (typeof(v) == 'number' && !cssNumber[k]) {
					v += 'px';
				}
				v = fixCSSFunctions(v);
				if (!(cssProps[k])) {
					for (pf in cssPrefixes) {
						af[pf + k] = v;
					}
				}
				af[k] = v;
			}
			return af;
		}

		css = css.replace(cssCommentRe, '');
		// Yup, we parse it bracket to bracket!
		while (m = cssBracketRe.exec(css)) {
			var padding = '', prettify = 0, b = m[3], j;
			if (prettify) for (j = sc; j--;) padding += '\t';
			if (b == '{') {
				r += (prettify ? '\n' + padding : '') + m[1] + (prettify ? ' ' : '') + b;
				++sc;
			} else if (b == '}') {
				if (prettify) padding = padding.substring(1); 
				af = {};
				while (mSub = cssPropRe.exec(m[1])) {
					if (!(cssProps[mSub[1]])) {
						for (pf in cssPrefixes) {
							af[pf + mSub[1]] = mSub[2];
						}
					}
					af[mSub[1]] = mSub[2];
				}
				for (k in af) {
					r += (prettify ? '\n' + padding + '\t' : '') + k + ':' + af[k] + ';';
				}
				r += (prettify ? '\n' + padding : '') + b + (prettify ? '\n' : '');
				sc = sc > 0 ? sc - 1 : 0;
			}
		}
		return fixCSSSelectors(fixCSSFunctions(r));
	};

	var loadedFiles = {};

	var fixCSSRelUrls = function (url, css) {
		url = trim(url);
		var chopLastRe = /\/[^/]*$/;
		if (url[0] != '/') {
			url = window.location.pathname.replace(chopLastRe, '') + '/' + url;
		}
		url = url.replace(chopLastRe, '');

		return css.replace(cssUrlRe, function (x, g) {
			var p = g.indexOf('//');
			if (g.indexOf('data:') == 0 || (p > -1 && p < 9)) return x;
			var urlComps = url.split('/'), cssURLComps = g.split('/'), i;
			for (i = 0; i < cssURLComps.length; ++i) {
				if (cssURLComps[i] == '..') urlComps.pop();
				else urlComps.push(cssURLComps[i]);
			}
			return 'url(\'' + urlComps.join('/') + '\')';
		});
	}
	
	var fileReadyChecker = function (xhr, i, urlMatch, ctl) {
		return function() {
			if (xhr.readyState == 4) {
				var status = xhr.status, responseText = '';
				if (status == 200 || status == 0) {
					loadedFiles[urlMatch[0]] = 1;
					responseText = xhr.responseText;
				} 
				ctl.push([i, urlMatch, responseText]);
			}
			ctl.c();
		};
	};
	var imageReadyChecker = function (img, i, urlMatch, ctl) {
		return function () {
			var x = [i, urlMatch, ''];
			if (img.naturalWidth) {
				ctl.push(x);
				ctl.c();
			} else {
				setTimeout(function() {
					ctl.push(x);
					ctl.c();
				}, 100);
			}
		};
	};

	var loadFiles = function (urls) {
		var required = [], i, r, s, xhr, m, t, img,
		ctl = [], ctlWrap = {
			done: function (f) {
				ctl.d = f;
				return ctlWrap;
			}
		}, imageExtensions = toSet('png,bmp,gif,jpg,jpeg,svg,webp');
		ctl.c = function () {
			if (ctl.length == ctl.n && ctl.n > 0) {
				ctl.n = 0;
				ctl.sort(function (a, b) { return a[0] - b[0]; });
				var j, r, m, el, t, url;
				for (j = 0; j < ctl.length; ++j) {
					r = ctl[j], t = r[1][1], url = r[1][2];
					if (!t && (m = url.match(fileExtRe))) 
						t = lc(m[1]);
					if (t == 'css') {
						el = ce('style');
						el.type = 'text/css';
						el.innerText = autoFixCSS(fixCSSRelUrls(url, r[2]).replace(/[\r\n]/g, ''));
						head.appendChild(el);
					}
					if (t == 'js') {
						el = ce('script');
						// Allows easier debugging.
						el.text = '//# sourceURL=' + url + '\n' + r[2];
						head.appendChild(el).parentNode.removeChild(el);
					}
				}
				
				if (isFunction(ctl.d))
					ctl.d();
			}
		};
		for (i = 0; i < urls.length; ++i) {
			m = filePreExtRe.exec(urls[i]);
			m[0] = (isUndefined(m[1]) ? '' : m[1]) + ':' + m[2];
			if (!(m[0] in loadedFiles)) 
				required.push(m);
		}
		ctl.n = required.length;
		for (i = 0; i < ctl.n; ++i) {
			r = required[i];
			if (lc(''+r[1]) == 'img' || 
				((m = (''+r[2]).match(fileExtRe)) && imageExtensions[lc(m[1])])) {
				img = new Image();
				img.onload = img.onerror = imageReadyChecker(img, i, r, ctl);
				img.src = r[2];
			} else {
				xhr = new XMLHttpRequest();
				xhr.onreadystatechange = fileReadyChecker(xhr, i, r, ctl);
				s = r[2].indexOf('?') > -1 ? '&' : '?';
				xhr.open('GET', r[2] + s + Math.random(), 1);
				xhr.responseType = 'text';
				xhr.send();
			}
		}
		if (ctl.n < 1) {
			setTimeout(function() {
				if (isFunction(ctl.d))
					ctl.d();
			}, 10);
		}
		return ctlWrap;
	};

	var collectLeafs = function (a, collected) {
		for (var i = 0; i < a.length; i++) {
			if (isArray(a[i])) {
				collectLeafs(a[i], collected)
			} else {
				collected.push(a[i]);
			}
		}
	};

	var load = function () {
		var urls = [];
		collectLeafs(arguments, urls);
		return loadFiles(urls);
	};

	var mapNext = function (context, i) {
		var v = context[i].slice(), j, o = i + 1, n = v.length, r = '';
		for (o = i + 1; isFunction(context[o]); ++o) 
			for (j = 0; j < n; ++j) 
				v[j] = context[o](v[j]);
		for (j = 0; j < n; ++j) 
			r += HTML(v[j]);
		return {r: r, i: o - 1};
	};

	var HTML = function(context) {

		var a = arguments, n = context.length;
		if (a.length > 1) return HTML(a);

		var r, i, obj, k, k2, t, v, css, mSub, j, mn,
		tag = context[0], content = '', attrs = {}, concats = [];; 
		
		if (!isArray(context)) return '' + context;
		if (isArray(context[0]) && n) {
			for (r = '', i = 0; i < n; i++) {
				if (isFunction(context[i+1])) {
					mn = mapNext(context, i);
					r += mn.r;
					i = mn.i;
				} else {
					r += HTML(context[i]); 	
				}
				
			}
			return r;
		}
		if (n < 1) return '';

		for (i = 1; i < n; i++) if (context[i] !== null) {
			obj = context[i];
			if (isArray(obj)) {
				if (isFunction(context[i+1])) {
					mn = mapNext(context, i);
					content += mn.r;
					i = mn.i;
				} else {
					content += HTML(obj); 
				}
			} else if (isObject(obj)) {
				for (k in obj) {
					v = obj[k];
					t = lc(trim(k));
					if (t == 'style' && !isObject(v)) {
						v += '';
						css = {};
						while (mSub = cssPropRe.exec(v)) 
							css[mSub[1]] = mSub[2];
						v = css;
					}
					if (hasKey(obj, k) && v != null) {
						if (isObject(v)) {
							if (!hasKey(attrs, k) || !isObject(attrs[k])) 
								attrs[k] = {};
							for (k2 in v) if (hasKey(v, k2)) 
								attrs[k][k2] = v[k2];
						} else {
							if (t != 'class' || !hasKey(attrs, k)) 
								attrs[k] = v;
							else
								attrs[k] += ' ' + v;
						}
					}
				}
			} else content += obj;
		}
		r = '<' + tag;
		attrs = populateCaseVariations(attrs);
		for (k in attrs) {
			t = '';
			if (isObject(attrs[k])) { // css case
				css = autoFixCSS(attrs[k]);
				for (k2 in css)
					t += k2 + ':' + css[k2] + ';';
			} else {
				t += attrs[k];
			}
			r += ' ' + k + '="' + HTML.escape(t) + '"';
		}
		
		if (emptyTags[lc(trim(tag))] && !content.length)
			r += '>';
		else
			r += '>' + content + '</' + tag + '>';
		return r;
	};

	HTML.bool = function (name, isTrue) {
		var attrs = {};
		if (isTrue) attrs[name] = name;
		return attrs;
	};

	var htmlEscapeChars = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	}, 
	htmlEscapeRe = /[&<>"']/g, 
	htmlEscapeFunc = function(m) { return htmlEscapeChars[m] };

	HTML.escape = function(text) {
		return text.replace(htmlEscapeRe, htmlEscapeFunc);
	};

	HTML.SVG = function(width, height) { 
		var a = arguments, s = ['svg', {
			width: width + 'px', 
			height: height + 'px', 
			viewBox: '0 0 ' + width + ' ' + height,
			xmlns: 'http://www.w3.org/2000/svg'}], i;
		for (i = 2; i < a.length; i++) {
			s.push(a[i]);
		}
		return s;
	};

	var svgCmds = 'mlhvcsqtaz';
	svgCmds = toSet((svgCmds + uc(svgCmds)).split('').join(','));

	HTML.SVG.Path = function () {
		var attrs = {d:''}, path = ['path', attrs], a = arguments, i, p, k, 
		P = function (command) {
			return function() {
				attrs.d += command;
				for (var a = arguments, j = 0; j < a.length; ++j) 
					attrs.d += a[j] + ', '[j&1];
				return path;
			};
		};
		for (i = 0; i < a.length; i++) {
			if (isObject(a[i])) {
				p = {};
				for (k in a[i]) {
					if (k == 'd') {
						attrs.d += a[i][k] + ' '; 
					} else {
						p[k] = a[i][k];
					}
				}
				path.push(p);
			} else {
				path.push(a[i]);	
			}
		}
		for (k in svgCmds) 
			path[k] = P(k);
		return path
	};
	var svgPathAppender = function (c) {
		return function () { return HTML.SVG.Path()[c].apply(null, arguments); };
	};
	for (var c in svgCmds) 
		HTML.SVG.Path[c] = svgPathAppender(c);
	
	var routes, savedRoutes, routesInited = 0, refreshable = 0, refreshEls = [];

	var hashComps = function (h) {
		if (!isUndefined(h) && isArray(h)) {
			var comps = [], i, s;
			for (i = 0; i < h.length; ++i) {
				if (h[i].length) {
					s = trim(h[i]);
					if (s[0] == '#') s = s.substring(1);
					comps.push(s);
				}
			}
			return comps;
		} else {
			return hashComps(('' + h).split('/'));
		}
	};

	var execRoute = function (h, s) {
		var comps, p = '', e, c, i;
		if (!isUndefined(h) && isArray(h)) {
			comps = h;
		} else {
			comps = hashComps(h);
		}
		for (i = 0; i < comps.length; ++i) {
			if (i) p += '/';
			c = comps[i];
			if (c[0] == ':') {
				c = trim(c.substring(1));
				if (p in savedRoutes) {
					c = savedRoutes[p];	
				}
			}
			if (!s) savedRoutes[p] = c;
			p += c;
		}
		if (!s) (routes[p] || noop)();
		return p;
	};

	var wlh = function () { return window.location.hash; };

	var setupHashChange = function () {
		if (routesInited) return;
		routes = {};
		savedRoutes = {};
		routesInited = 1;
		var comps = hashComps(wlh()), p = '', c, i;
		for (i = 0; i < comps.length; ++i) {
			if (i) p += '/';
			c = comps[i];
			savedRoutes[p] = c;
			p += c;
		}

		if ('onhashchange' in window) { 
			window.addEventListener('hashchange', function () {
				execRoute(wlh());
			});
		} else { 
			var storedHash = wlh();
			setInterval(function () {
				var h = wlh();
				if (h != storedHash) {
					storedHash = h;
					execRoute(storedHash);
				}
			}, 100);
		}	
	};

	if (!noBrowser) {
		HTML.autoFixCSS = autoFixCSS;
		HTML.load = load;
		HTML.route = function (r, fn) {
			setupHashChange();
			var h = hashComps(r).join('/');
			if (!isUndefined(r) && isFunction(fn)) {
				routes[h] = fn;
				// return HTML so that we can chain 
				// HTML.route('a', fn).route('b', fn)
				return HTML; 
			} else if (!isUndefined(r) && isUndefined(fn)) {
				return routes[execRoute(h, 1)];
			} else {
				// If no args are provided, 
				// return the window.location.hash splitted.
				return hashComps(wlh());
			}
		};

		HTML.route.path = function (r) {
			return isUndefined(r) ? hashComps(wlh()).join('/') : execRoute(r, 1);
		}

		HTML.route.go = function (r) {
			setupHashChange();
			r = execRoute(isUndefined(r) ? wlh() : r);
			return routes[r] ? r : !!0;
		};

		HTML.route.refreshable = function (v) {
			var rr = function (el, h) {
				return (h = ('' + el.getAttribute('href')).match('#(.*)')) 
					&& execRoute(h = h[1], 1);
			};
			setupHashChange();
			if (isUndefined(v)) return !!refreshable;
			if (refreshable != v && (refreshable = v)) {
				var links = document.getElementsByTagName('a'), i, j, h, l, t, r;
				for (i = 0; i < links.length; ++i) if (routes[rr(l = links[i])]) {
					for (t = 1, j = 0; t && j < refreshEls.length; ++j)
						if (refreshEls[j] === l) t = 0;
					if (t) {
						l.addEventListener('click', function () {
							if (refreshable && (r = rr(this)) == execRoute(wlh(), 1) 
								&& (r = routes[r])) r();
						})
					}
				}
			}
			return HTML;
		};
	}
	
	if (!noGlobal) {
		if (isUndefined(window.HTML))
			window.HTML = HTML;
		var aris = HTML;
		aris.svg = aris.SVG;
		aris.svg.path = aris.svg.path;
		window.aris = aris;
	}
	return HTML;
});