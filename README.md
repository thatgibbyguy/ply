# ply

ply is a modernized, ratio-based CSS framework built using flexbox. Think of ply as the metric system for your grid-based layouts.

The purpose of ply is to provide front-end developers with an immediately understandable framework based on a ratio-based grid system, versus arbitrary column-based grid systems.

## Install

### via NPM

```sh
npm install plygrid
```

### via GitHub

```sh
git clone https://github.com/thatgibbyguy/ply.git
```

## Usage

Link ply in your document head:

```html
<link rel="stylesheet" type="text/css" href="/dist/css/ply.min.css">
<link rel="stylesheet" type="text/css" href="your-normal-css.css">
```

Make sure your CSS comes after the ply import so your styles extend ply.

## ply versus foundation

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

ply lets you think in rational, base-10 math versus arbitrary column-based layouts.

## Development

### Build

```sh
npm install
npm run build
```

This compiles the SCSS source to CSS in `/dist/css/`.

### Watch

```sh
npm run watch
```

Watches for changes and recompiles automatically.

### Lint

```sh
npm run lint
```

Runs stylelint on the SCSS source.

### Tech

- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/) + [Autoprefixer](https://github.com/postcss/autoprefixer)

## Contributing

Want to contribute? Great! Simply fork this repo and create a Pull Request with your added features.

## License

MIT

Special thanks to [imperavi](https://imperavi.com/) for creating the CSS framework I could only envision at the time.
