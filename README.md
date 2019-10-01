# Aris - Write HTML in JS easily.

Aris is a simple library \(\< 5kb minified + gzipped\) that:

- Allows you to write HTML in JS in a clean, powerful and extensible manner   
  \(contrary to what many people believe is impossible\).
- Lazily load JS and CSS files \(it also auto-prefixes your CSS\).  
- Does routing with page anchor tags (hash routing, e.g. `href="#path/to/page"`) 

**Just these 3 functions alone** will allow you to easily build frontend web-apps   
(e.g. Single page applications, Progressive web apps) that are [performant and scalable](#Advantages). 

## Download 

Just copy and paste the `aris.min.js` from this repository.  
If you want to read the entire file (it's less than 1k lines), you can look at `aris.js`. 

## The Problem  

Writing HTML in JS is a traditionally *messy* experience.  

You'll have to carefully fiddle with quotes, double quotes, string concatenation, escaping characters, etc.  
This breaks syntax highlighting, causes mistakes, and a LOT of stress.   

It is little wonder why most people resort to backend templating solutions, or use frontend templating frameworks/libraries/transpilers.   

Unfortunately, these solutions are not good enough (even JSX is not good enough by our standards, seriously).   
Their are usually either too complex, clunky, slow, obscure, incomplete, bloated, or inflexible. 

## The Solution

Imagine you want to write the following shit:

```ruby
$('.page').html(['<div class="dropdown">',
  '<button class="btn dropdown-toggle"',
  'type="button"',
  'id="dropdownMenuButton"',
  'data-toggle="dropdown"',
  'aria-haspopup="true"',
  'aria-expanded="false">',
    dropdown.text,
  '</button>',
  '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">',
    $.map(dropdown.values, function (x) {
      return ['<a class="dropdown-item">', x ,'</a>'].join('')
    }).join(''),
  '</div>',
'</div>'].join(''));
```

Wouldn't it be better to write it like:

```ruby
$('.page').html(HTML(['div', {class: 'dropdown'},
  ['button', dropdown.text, {
    class: 'btn dropdown-toggle', 
    type: 'button', 
    id: 'dropdownMenuButton', 
    dataToggle: 'dropdown', 
    ariaHaspopup: true, 
    ariaExpanded: false
  }],
  ['div', {class: 'dropdown-menu', ariaLabelledby: 'dropdownMenuButton'},
    $.map(dropdown.values, function (x) { 
      return ['a', {class: 'dropdown-item'}, x]
    })
  ]
]));
```

Wow! Such syntax. Much highlighting.  

Notice how the HTML is being expressed in an intermediate form with native JS objects and arrays.  
\(We call this intermediate form a HTML *context*\).

This simple change makes **all** the difference, and opens up [a whole new world of possibilities](#Advantages).  

## Functions

### HTML

- `HTML(context)`  
Creates a HTML string with the context.

#### Example:

```ruby
HTML(["div", {id: "y", class: "a b", style: {color: "red"}, ariaLabel: "x"}, 
    "Text",
    ["a", {href: "example.com", target: "_blank"}, "link"],
    {style: {width: 1, opacity: 0.5}, class: "c", pos: 1},
    [["div", 0], ["div", 1]]
])
```

**Turns into:**

```HTML
<div id="y" class="a b c" style="color: red; width: 1px; opacity: 0.5"
  ariaLabel="x" aria-label="x" aria_label="x" pos="1">
    Text
    <a href="example.com" target="_blank">link</a>
    <div>0</div><div>1</div>
</div>
```

- If the starting element is a string, it is treated as a tag name.   
     `['div', 'Text']`    =>    `<div>Text</div>`

- Attributes are added via objects.   
  The object can be anywhere in the array except for the starting element.   
  You can use any preferred style:  
     `['div', {id: 'x'}, 'a', 'b', 'c']`  OR 
     `['div', 'a', 'b', 'c', {id: 'x'}]`  
  This allows you to specialize contexts by pushing classes onto them.

- Attributes can be defined via camelCase or snake_case.   
  They will automatically converted to camelCase, kebab-case and snake_case.  
  This is so that you can avoid using quotes on the keys.  
     `{ariaLabel: "x"}`    =>    `aria-label="x"`
  
- If the starting element is an array, the contents of the entire  
  array will be converted to HTML and joined.   
     `[['div', 0], ['div', 1]]`    =>    `<div>0</div><div>1</div>`
     
- Inline CSS can be defined via objects or strings.  
  They will be combined in sequential order.  
  Repeated CSS properties will be replaced.  
  The CSS will be **auto-magically** prefixed.   
  For numerical properties, `px` will be automatically added if where applicable. (similar to jQuery).  
     `['div', {style: {opacity: 0, width: 2}}, 'x', {style: "opacity: 1; filter: grayscale(100%)"}]`    =>    
     `<div style="opacity: 1; width: 2px; -webkit-filter: grayscale(100%); filter: grayscale(100%)">x</div>`

- Classes are joined with spaces if repeated in an object.  
     `['div', {class: 'a'}, 'x', {class: 'b'}]`    =>    `<div class="a b">x</div>`

- Other attributes are replaced if repeated in an object.  
     `['div', {id: 'a'}, 'x', {id: 'b'}]`    =>    `<div id="b">x</div>`

## Other Functions

### Escaping HTML special characters

- `HTML.escape(text)`  
  Returns the chunk of text with special HTML characters (`<>?"'`) escaped.  

  To allow HTML to be used in text, Aris does not auto-escape special HTML characters.  
  Please use this function to manually escape the characters where intended.

### Lazy Loading

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

- `HTML.route("#path/to/page/anchor", fn)`  
  Attaches the function `fn` to `#path/to/page/anchor`.  

- `HTML.route.go(#path/to/page/anchor")`  
  Executes the function attached to `#path/to/page/anchor`.  

- `HTML.route.go(#path/to/page/:anchor")`  
  Attemps to execute the function attached to the path.   
  The prefix `:` on the path component denotes that it is is default option.  
  If the visitor has visited `#path/to/page/one`, or if the address bar points to `#path/to/page/one`, it will execute the function attached to `#path/to/page/one`.  
  Otherwise, it will execute the function attached to `#path/to/page/anchor`.  

- `HTML.route.go("#:path/:to/:page")`  
  You can prefix any path component with ":" to mark it as the default option.  

- `HTML.route.go()`  
  Attempts to execute the function attached to the path in the address bar.   
  (i.e. `window.location.hash`)  

### SVG (for the artsy coders)

- `HTML.SVG(width, height, ...context)`  
  Creates a SVG string, with common boilerplate attributes automatically-filled.  

- `HTML.SVG.Path(...context).<command>(...).<command>(...)`  
  Creates an SVG Path string.  
  See \(<https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths>\)  
  for an overview on the path commands.  

#### Example:

```ruby
var SVG = HTML.SVG, P = HTML.SVG.Path;
HTML(SVG(30, 30, 
   ['circle', {class: 'frame', cx: 15, cy: 15, r: 12}],
   P({class: 'hand hour'}).M(15,15).L(20,15),
   P({class: 'hand minute'}).M(15,15).L(15,2),
   P().M(0,0).L(1,1),
   P.M(0,0).L(1,1),
   ['text', {x: 0, y: 0}, 'Path can be also be called without args!']
))
```

**Is equivalent to:**

```ruby
HTML(['svg', {xmlns: 'http://www.w3.org/2000/svg',
  width: '30px', height: '30px', viewBox: '0 0 30 30'},
    ['circle', {class: 'frame', cx: 15, cy: 15, r: 12}],
    ['path' {class: 'hand hour', d: 'M15,15 L20,15'}],
    ['path' {class: 'hand minute', d: 'M15,15 L15,2'}],
    ['path' {d: 'M0,0 L1,1'}],
    ['path' {d: 'M0,0 L1,1'}],
    ['text', {x: 0, y: 0}, 'Path can be also be called without args!']
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
    <text x="0" y="0">Path can be also be called without args!</text>
</svg>
```

You can even use this to create complex animated SVGs. ;)

## Advantages

- You can make functions to return HTML contexts, enabling you to reuse common HTML.  
  *"Write less, do more!" - jQuery*
- You can use loops to create contexts (a context is essentially an array).
- You can add attributes or children to contexts to specialize contexts for different use cases. 
- Because our contexts are simply good ol' JS arrays and objects,   
  you can use your favourite utility libraries (e.g. Lodash, Rambda) to create contexts!   
  (other libraries which use prototyped objects or templates do not offer this flexibility)
- Syntax errors are detected by the JS parser when the code is executed.  
  You can check the browser console for the exact line of the error if your page has display errors.
- No more incorrect HTML closing tags! 
- Inline and loaded CSS styles are *auto-magically* prefixed.
- You can easily create complex DOM updates in a single call, resulting in buttery smooth performance.
- Code is automatically syntax highlighted in most text editors without special plugins.
- Code is autocompleted in most text editors (e.g. SublimeText will auto-close braces for you).
- No need for transpilers and complicated build tools. A browser and text editor is all you need.   
  Get up to speed quick!  
- Makes debugging much easier (it's just plain ol' JS). 
- Greatly reduce developer onboarding times (again, it's just plain ol' vanilla JS). 
- Zero dependencies.
- Thoroughly battle-tested for over a decade.   
- Compatible with IE 9+, and practically every other major browser.
- Compatible with other JS frameworks/libraries out of the box. 
- You can do **ALL** your HTML generation on the frontend now, resulting in **MUCH** lower server load.
- Naturally, you'll also have better seperation between data and UX logic.  
- For teams, frontend and backend coders can work in parallel better.  
- A happier life.

We challenge you to find an alternative that gives you all of the above. 

## Performance

Don't worry about it!  

We have heavily optimized and profiled Aris.  
It performs with *so* little overhead, it's *as if* you have written that HTML and CSS in plain text.  
Even tens of megabytes can be processed in a tiny fraction of a second on slow machines.  
You'll hardly notice a thing.

You should *probably be worried* about performance, if you are *not* using Aris. ;)

## Support

Aris is actively maintained and constantly tested against all major browsers.  
If you have any suggestions, questions, or bug reports, we will be very glad to help.  

## FAQ

- **How does Aris help me create high-performance user interfaces?**

  Aris does not do DOM diffing like React.  
  Its approach to blazing-fast speed is very dead simple:  
  by enabling you to create complex HTML easily, with minimal processing overhead.  
  Instead of changing the contents of many DOM elements, one after another,  
  you can simply update them with the combined HTML in one go.  
  
  This minimizes reflows, and if done properly, can be as fast, if not faster than DOM diffing.  

  You must however, know which DOM elements you need to update.  
  This should be easy if you are used to VanillaJS or jQuery.

  Our choice of using plain arrays and objects allows us to leverage the parser of the JS engine,  
  which is already in the form of highly-optimized, compiled, native machine code. 

  This is way faster than using templates based on regex or loop based parsing implemented in JS.

- **Why another JS library/framework? How does this compare to \<insert name here\>?**

  The existing solutions in the JS community are simply **not** good enough.  
  Many of them require you to call functions everywhere and remember to provide the correct arguments in order.  
  Some of them pollute the namespace of short variable names unnecessarily.  
  You also cannot pass around intermediate HTML contexts and specialize them.  

  There are many similar libraries out there.  
  But they all have some areas that could be done better.  
  They are just not as concise, flexible, performant, lightweight and complete as Aris.  

  We adopt a no-compromise approach for Aris. Every part is meticulously and purposefully crafted.    
  We aim for a minimal code size, but not at the cost of completeness and ease of use.  
  Most tiny frameworks out there do not provide CSS prefixing, but Aris does.  
  Because Aris cares for your convenience!  
  (Aris is actually only < 0.2kb minified + gzipped if you only include the core HTML writing function).
  
- **Why the name Aris?**
  
  Aris stands for "A Revolution In Syntax".
  
  We initially wanted to name our library `html.js`.  
  However, when we tried to publicize our library on npm, we found that most of the good short names  
  have been already taken by name-squatters or poor-quality libraries.  

  Hence, have choosen to settle with another short but memorable name! 
  
  If there is a namespace collision, you can use `aris` instead of `HTML`.  
  `HTML` => `aris`  
  `HTML.SVG` => `aris.svg`  
  `HTML.SVG.Path` => `aris.svg.path`  

## Coming Soon

- A simple 3 page web example.
- `HTML.load` for preloading images.

## License

MIT