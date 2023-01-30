<img src="https://raw.githubusercontent.com/Vectorized/Aris/master/logo.svg" width="246" height="128">

![NPM](https://img.shields.io/npm/l/aris)
![npm](https://img.shields.io/npm/v/aris)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/aris)
![Dependencies](https://img.shields.io/badge/dependencies-0-success)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/aris)

# Aris - Write HTML in JS easily.

Aris is a simple library that allows you to write HTML in JS easily.

*If you know HTML and JS, you already know Aris.* 

## Usage 

**Browser / CDN:**  
```html
<script src="https://cdn.jsdelivr.net/npm/aris/aris.min.js"></script>
```

**NPM:**  
```bash
npm i aris
```

Or you can clone/download this GitHub repository.

## Converter

[Convert HTML to Aris.](https://bkys.io/aris/converter.html)

## The Idea

Imagine you want to write the following shit:

```javascript
var dropdownHTML = '';
for (var i = 0; i < dropdownValues.length; ++i) {
  dropdownHTML += '<a class="dropdown-item">' + dropdownValues[i] + '</a>';
}
el.innerHTML = '<div class="dropdown">' +
  '<button class="btn dropdown-toggle" ' +
  'type="button" ' +
  'id="dropdownMenuButton" ' +
  'data-toggle="dropdown" ' +
  'aria-haspopup="true" ' +
  'aria-expanded="false" ' +
  (dropdownDisabled ? 'disabled' : '') +
  '>' +
    dropdown.text +
  '</button>' +
  '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
    dropdownHTML +
  '</div>' +
'</div>';
```

Wouldn't it be better to write it like:

```javascript
el.innerHTML = HTML(['div', {class: 'dropdown'},
  ['button', dropdown.text, {
    class: 'btn dropdown-toggle', 
    type: 'button', 
    id: 'dropdownMenuButton', 
    dataToggle: 'dropdown', 
    ariaHaspopup: true, 
    ariaExpanded: false,
    disabled: [dropdownDisabled]
  }],
  ['div', {class: 'dropdown-menu', ariaLabelledby: 'dropdownMenuButton'},
    dropdownValues, function (x) { 
      return ['a', {class: 'dropdown-item'}, x]
    }
  ]
]);
```

Wow! Such syntax. Much clean.  

## Functions

### HTML

- `HTML(context)`  
Creates a HTML string with the context.

#### Example:

```javascript
HTML(["div", {id: "y", class: "a b", style: {color: "red"}, ariaLabel: "x"}, 
    "Text",
    ["a", {href: "example.com", target: "_blank"}, "link"],
    {style: {width: 1, opacity: 0.5}, class: "c", pos: 1},
    ['A', 'B', 'C'], function (x) { return ["div", x] }, 
    [ [0, 1, 2], function (x) { return ["span", x] } ]
])
```

**Turns into:**

```HTML
<div id="y" class="a b c" style="color: red; width: 1px; opacity: 0.5"
  ariaLabel="x" aria-label="x" aria_label="x" pos="1">
    Text
    <a href="example.com" target="_blank">link</a>
    <div>A</div><div>B</div><div>C</div>
    <span>0</span><span>1</span><span>2</span>
</div>
```

Explanation (skip if you can figure out from the example):

- If the starting element is a string, it is treated as a tag name.   
     `['div', 'Text']`    &#8594;    `<div>Text</div>`

- Attributes are added via objects.   
  The object can be anywhere in the array except for the starting element.   
  You can use any preferred style:  
     `['div', {id: 'x'}, 'a', 'b', 'c']`  OR 
     `['div', 'a', 'b', 'c', {id: 'x'}]`  
  This allows you to specialize contexts by pushing classes onto them.

- Attributes can be defined via camelCase or snake_case.   
  They will automatically converted to camelCase, kebab-case and snake_case.  
  This is so that you can avoid using quotes on the keys.  
     `{ariaLabel: "x"}`    &#8594;    `aria-label="x"`
  
- If the starting element is an array, the contents of the entire  
  array will be converted to HTML and joined.   
     `[['div', 0], ['div', 1]]`    &#8594;    `<div>0</div><div>1</div>`
     
- Inline CSS can be defined via objects or strings.  
  They will be combined in sequential order.  
  Repeated CSS properties will be replaced.  
  The CSS will be **auto-magically** prefixed.   
  For numerical properties, `px` will be automatically added if where applicable. (similar to jQuery).  
     `['div', {style: {opacity: 0, width: 2}}, 'x', {style: "opacity: 1; filter: grayscale(100%)"}]`    &#8594;    
     `<div style="opacity: 1; width: 2px; -webkit-filter: grayscale(100%); filter: grayscale(100%)">x</div>`

- Classes are joined with spaces if repeated in an object.  
     `['div', {class: 'a'}, 'x', {class: 'b'}]`    &#8594;    `<div class="a b">x</div>`

- Other attributes are replaced if repeated in an object.  
     `['div', {id: 'a'}, 'x', {id: 'b'}]`    &#8594;    `<div id="b">x</div>`

- If an element is an array, and the next element is a function,   
  the array will be automatically mapped to the function.   
     `['div', [1,2,3], function (x) { return x*2 }]`    &#8594;    `<div>246</div>`   
     `['div', [[1,2,3], function (x) { return x*2 }] ]`    &#8594;    `<div>246</div>`

### Escaping HTML special characters

- `HTML.escape(text)`  
  Returns the chunk of text with special HTML characters (`<>?"'`) escaped.  

  To allow HTML to be used in text, Aris does not auto-escape special HTML characters.  
  Please use this function to manually escape the characters where intended.

### HTML Boolean Attributes

- `['button', {disabled: [true]}]`    &#8594;    `<button disabled></button>`    
  `['button', {disabled: [false]}]`    &#8594;    `<button></button>`    
  For a boolean attribute, wrap it in an array. A truthy value denotes its presence.

### HTML Output Key Order and Hash

- `HTML(['a', {href: 'x.com', id: 'link'}, 'x'])`    &#8594;    `<a href="x.com" id="link">x</a>`    
  `HTML(['a', 'x', {id: 'link', href: 'x.com'}])`    &#8594;    `<a href="x.com" id="link">x</a>`    
  The HTML output is deterministic, with attribute keys sorted in ascending order.

- `HTML.hash(['a', {href: 'x.com', id: 'link'}, 'x'])`    &#8594;    `841135124`    
  `HTML.hash(['a', 'x', {id: 'link', href: 'x.com'}])`    &#8594;    `841135124`    
  `HTML.hash(HTML(['a', 'x', {id: 'link', href: 'x.com'}]))`    &#8594;    `841135124`    
  `HTML.hash('some string')`    &#8594;    `-984100687`    
  HTML contexts and strings can be hashed to 32-bit integers for compact storage and quick comparison.

## Why use Aris? 

- No dependencies.  
- No tooling.  
- No bloat.  
- No brainer.  
- No time wasted.  
- It just works.  
- Fast.  

If you think something else is better, feel free to try it and do your own comparisons.   

## Support

Aris is actively maintained and constantly tested against all major browsers (even IE).   

If you have any suggestions, questions, or bug reports, please raise an issue.  

## FAQ

- **How does Aris help me create high-performance user interfaces?**

  Aris is just plain old Javascript, all HTML generation is close to the metal.  

  Use Aris to generate complex HTML and update the only the elements you need.   

  This minimizes reflows and you will have a snappy user interface.
  
- **What does Aris stands for?**
  
  Aris stands for "A Revolution In Syntax".
  
  We initially wanted to name our library `html.js`, but the name was taken on npm.  
  
  If there is a namespace collision, you can use `aris` instead of `HTML`.  
  `HTML` &#8594; `aris`  
  `HTML.SVG` &#8594; `aris.svg`  
  `HTML.SVG.Path` &#8594; `aris.svg.path`  

## Bonus Features

### SVG

For the artsy coders.

- `HTML.SVG(width, height, ...context)`  
  Creates a SVG string, with common boilerplate attributes automatically-filled.  

- `HTML.SVG.Path(...context).<command>(...).<command>(...)`  
  Creates an SVG Path string.  
  See \(<https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths>\)  
  for an overview on the path commands.  

#### Example:

```javascript
var SVG = HTML.SVG, P = HTML.SVG.Path;
HTML(SVG(30, 30, 
   ['circle', {class: 'frame', cx: 15, cy: 15, r: 12}],
   P({class: 'hand hour'}).M(15,15).L(20,15),
   P({class: 'hand minute'}).M(15,15).L(15,2),
   P().M(0,0).L(1,1),
   P.M(0,0).L(1,1), // Path can be also be called without args!
))
```

**Is equivalent to:**

```javascript
HTML(['svg', {xmlns: 'http://www.w3.org/2000/svg',
  width: '30px', height: '30px', viewBox: '0 0 30 30'},
    ['circle', {class: 'frame', cx: 15, cy: 15, r: 12}],
    ['path', {class: 'hand hour', d: 'M15,15 L20,15'}],
    ['path', {class: 'hand minute', d: 'M15,15 L15,2'}],
    ['path', {d: 'M0,0 L1,1'}],
    ['path', {d: 'M0,0 L1,1'}],
])
```

**Which turns into:**

```HTML
<svg xmlns="http://www.w3.org/2000/svg"
  width="30px" height="30px" viewBox="0 0 30 30">
    <circle class="frame" cx="15" cy="15" r="12"></circle>
    <path class="hand hour" d="M15,15 L20,15"></path>
    <path class="hand minute" d="M15,15 L15,2"></path>
    <path d="M0,0 L1,1"></path>
    <path d="M0,0 L1,1"></path>
</svg>
```

You can even use this to create complex animated SVGs. ;)

### Lazy Loading

This is just a bonus feature to make making single-page-apps easier.   

- `HTML.load(file0, file1, ...).done(fn)`  
  Loads (.js, .css) files, then execute the done function `fn` (optionally).   
  The files are downloaded asynchronously in parallel, but attached to the webpage in the specified order.   
  Each file will be only loaded **once**.   
  The done function is **always executed once per load call**,   
  *irregardless* of whether the files have been loaded previously.

  The files are treated accordingly with their file extension.  
  To force a file to be treated as a JS or CSS file, prefix the url with (`js:` or `css:`):  
  `js: js/main` (whitespace around the `:` is ignored)

  CSS files will be **auto-magically** prefixed.

  Lazily loaded JS can be [debugged easily](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Debug_eval_sources) in modern browsers,  
  as we auto-prepend the sourceURL directive to the JS files.

### Hash Routing

This is just a bonus feature to make making single-page-apps easier.   

- `HTML.route("path/to/page/anchor", fn)`  
  Attaches the function `fn` to `#path/to/page/anchor`.  

- `HTML.route.go("path/to/page/anchor")`  
  Executes the function attached to `#path/to/page/anchor`.  

- `HTML.route.go("path/to/page/:anchor")`  
  Attemps to execute the function attached to the path.   
  The prefix `:` on the path component denotes that it is is default option.  
  If the visitor has visited `#path/to/page/one`, or if the address bar points to `#path/to/page/one`, it will execute the function attached to `#path/to/page/one`.  
  Otherwise, it will execute the function attached to `#path/to/page/anchor`.  

- `HTML.route.go(":path/:to/:page")`  
  You can prefix any path component with ":" to mark it as the default option.  

- `HTML.route.go()`  
  Attempts to execute the function attached to the path in the address bar.   
  (i.e. `window.location.hash`)  

## License

MIT