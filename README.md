# ply

ply is a modernized, ratio based css framework built using flex-box. think of ply as the metric system for your grid-based layouts.

the purpose of ply is to provide front-end developers with an immediately understandable framework based on a ratio based grid system, versus arbitrary column based grid systems.

# Using ply
You can use ply one of two ways:

## Install via NPM

```sh
$ cd /your-app-path/
$ npm install plygrid --save
```

## Install via Github

```sh
$ cd /your-app-path/
$ git clone https://github.com/thatgibbyguy/ply.git
```

# ply versus foundation

An offset, three column layout in ply:  
```html
<section class="units-row">
    <div class="unit-25">
        <!-- A column of 25% width -->
    </div>
    <div class="unit-50">
        <!-- A column of 50% width -->
    </div>
    <div class="unit-25">
        <!-- A column of 25% width -->
    </div>
</section>
```

An offset, three column layout in foundation:  
```html
<div class="row">
    <div class="large-3 columns">
        <!-- A column of ~25% width -->
    </div>
    <div class="large-6 columns">
        <!-- A column of ~50% width -->
    </div>
    <div class="large-3 columns">
        <!-- A column of ~25% width -->
    </div>
</div>
```

## Documentation 

[ply documentation] is now live. 

ply is a framework which aims to simplify the development process by allowing developers to think in rational, base-10, math versus arbitrary and ancient column based layouts.

built on top of flexbox, ply allows developers to ply their craft and focus on executing without worry about structure.

### Version
ply v 0.7.14

 - changes in this version: adding small-desktop-unit-XX for added breakpoints.

### Tech
ply utilizes following technologies:

* [SCSS]
* [smacss]
* [Gulp]

### Linking ply in your document head
After cloning ply into your application, you will be able to link ply into your app by linking to it using the following code:

```html
<link rel="stylesheet" type="text/css" href="/dist/css/ply.min.css">
<link rel="stylesheet" type="text/css" href="your-normal-css.css">
```
Importing ply this way will allow you to code CSS the way you always have, with ply providing you a base framework for your elements. Make sure that your css file(s) comes after the ply import so that your styles will extend ply functionality.

### Using [Gulp]
ply comes with a predefined gulp file for you. To code continuously with gulp simply run:

```sh
$ npm install
$ gulp
```
This task will watch the file located at `/src/scss/styles.scss`. Each time you save this file, gulp will automatically compile, prefix and minify your code. This code is outputted to `/dist/css/styles.css` and `/dist/css/styles.min.css`. 

To use these styles in your webapp, use the following code:

```html
<link rel="stylesheet" type="text/css" href="/dist/css/styles.min.css">
```

### Additional [Gulp] functions
Included with this gulp file are the following commands:  

`gulp styles` `gulp stylesMin` `gulp ply` `gulp plyMin`

Each of these gulp commands will output to the `/dist/css/` directory and you may use them as you see fit. 

# Development

Want to contribute? Great! Simply fork this repo and create a Pull Request with your added features!

### Roadmap

 - Style all form elements
 - Add slideout rollover component seen on plygrid.com
 - Complete documentation

License
----

MIT

Special thanks to [imperavi] for creating the css framework I could only invision at the time and special thanks to [dillinger.io] for their awesome readme generator.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [ply documentation]: <https://plygrid.com>
   [thatgibbyguy]: <https://twitter.com/thatgibbyguy>
   [SCSS]: <http://sass-lang.com/>
   [git-repo-url]: <https://github.com/thatgibbyguy/ply.git>
   [smacss]: <https://smacss.com>
   [gulp]: <http://gulpjs.com/>
   [dillinger.io]: <http://dillinger.io/>
   [imperavi]: <https://imperavi.com/>


