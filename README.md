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
tgggrid v 0.0.1

### Tech
tgggrid utilizes following technologies:

* [SCSS]
* [jQuery]
* [smacss]

# Using tgggrid
tgggrid makes no assumptions on your app's directory structure, your task runner, or how you markup your HTML. To use tgggrid, simply clone this repo into your project directory. 

```sh
$ cd /your-app-path/
$ git clone https://github.com/thatgibbyguy/tgggrid.git
```

Because tgggrid utilizes [SCSS], you will need to use any of the following to compile your code. A gulp file is currently included to help you get started.

* [Gulp]
* [Grunt]

### Development

Want to contribute? Great! Simply fork this repo and create a Pull Request with your added features!

### Roadmap

 - Add in additional mixins
 - Convert base layout to flexbox
 - Add PostCSS and Webpack support
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


