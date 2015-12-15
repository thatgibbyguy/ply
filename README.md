# tgggrid

tgggrid (pronounced tig*grid) is a ratio based CSS Framework written in SCSS, and is currently a fork of [Kube v 4.0.2] that was converted to SCSS by me, [thatgibbyguy]. The purpose of tgggrid is to provide Front End developers with an immediately understandable framework based on a ratio based grid system, versus arbitrary column based grid systems.

## tgggrid versus foundation

An offset, three column layout in tgggrid:
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

tgggrid is currently a simple fork of [Kube v 4.0.2]. Documentation on that is currently available at the [legacy Kube example page]. An updated tgggrid example page will be available once work on the tgggrid roadmap has begun.

### Version
Kube v 4.0.2  
tgggrid v 0.0.3

### Tech
tgggrid utilizes following technologies:

* [SCSS]
* [jQuery]
* [smacss]

# Using tgggrid
To begin using tgggrid, run the following commands.

```sh
$ cd /your-app-path/
$ git clone https://github.com/thatgibbyguy/tgggrid.git
```

### Linking tgggrid in your document head
After cloning tgggrid into your application, you will be able to link tgggrid into your app by linking to it using the following code:

```html
<link rel="stylesheet" type="text/css" href="/tgggrid/css/tgggrid.min.css">
<link rel="stylesheet" type="text/css" href="your-normal-css.css">
```
Importing tgggrid this way will allow you to code CSS the way you always have, with tgggrid providing you a base framework for your elements. Make sure that your css file(s) comes after the tgggrid import so that your styles will extend tgggrid functionality.

### Using [Gulp]
tgggrid comes with a predefined gulp file for you. To code continuously with gulp simply run:

```sh
$ npm install
$ gulp
```
This task will watch the file located at `/scss/styles.scss`. Each time you save this file, gulp will automatically compile, prefix and minify your code. This code is outputted to `/css/styles.css` and `/css/styles.min.css`. 

To use these styles in your webapp, use the following code:

```html
<link rel="stylesheet" type="text/css" href="/tgggrid/css/styles.min.css">
```

### Additional [Gulp] functions
Included with this gulp file are the following commands:  

`gulp styles` `gulp stylesMin` `gulp tgggrid` `gulp tgggridMin`

Each of these gulp commands will output to the `/css/` directory and you may use them as you see fit. 

# Development

Want to contribute? Great! Simply fork this repo and create a Pull Request with your added features!

### Roadmap

 - Add in additional mixins
 - Convert base layout to flexbox
 - Add Webpack support
 - Add gulp-rev for revision tracking
 - Create project as npm module
 - Create project as meteor package

License
----

MIT

Special thanks to [imperavi] for creating the css framework I could only invision at the time and special thanks to [dillinger.io] for their awesome readme generator.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Kube v 4.0.2]: <https://github.com/imperavi/kube>
   [thatgibbyguy]: <https://twitter.com/thatgibbyguy>
   [legacy Kube example page]: <http://k1.imperavi.com/>
   [SCSS]: <http://sass-lang.com/>
   [git-repo-url]: <https://github.com/thatgibbyguy/tgggrid.git>
   [smacss]: <https://smacss.com>
   [gulp]: <http://gulpjs.com/>
   [grunt]: <http://gruntjs.com/>
   [jQuery]: <http://jquery.com>
   [dillinger.io]: <http://dillinger.io/>
   [imperavi]: <https://imperavi.com/>


