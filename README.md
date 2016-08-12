# Gulp Helpers

Gulp helper functions for a Laravel application/package which are much faster than Laravel Elixir.

## Installation

```
npm install --save-dev gulp git+https://github.com/mzur/gulp-helpers.git
```

## Usage

```js
var gulp = require('gulp');
var h = require('gulp-helpers');

// get the publish function for a Laravel package
var publish = h.publish('Your\\Package\\Namespace\\ServiceProvider');

// change the sass and js source paths
// default are 'resources/assets/{sass,js}/'
h.paths.sass = 'src/resources/assets/sass/';
h.paths.js = 'src/resources/assets/js/';

// change the public/destination path
// default is 'public/assets/'
h.paths.public = 'src/public/assets/';

// change the Laravel artisan location
// default is '../../../artisan'
h.paths.artisan = '../../../artisan'

// build sass
gulp.task('sass', function () {
   // source: 'src/resources/assets/sass/main.scss'
   // destination 'src/public/assets/styles/main.css'
   h.sass('main.scss', 'main.css');
   // You can use @imports relative to the node_modules directory
   // in your SASS files, too!
});

// build js/angular
gulp.task('js', function (cb) {
	// source: 'src/resources/assets/js/**/*.js'
	// destination 'src/public/assets/scripts/main.js'
   h.angular('**/*.js', 'main.js', cb);
});

gulp.task('watch', function () {
    gulp.watch(h.paths.sass + '**/*.scss', ['sass']);
    gulp.watch(h.paths.js + '**/*.js', ['js']);
    gulp.watch(h.paths.public + '**/*', publish);
});

gulp.task('default', ['sass', 'js'], publish)
```

With this example you can run `gulp` to build your assets and `gulp watch` to start the watcher. To minify the assets, run `gulp --production`.

After each build the publish task is run which will call the command:

```
'php ../../../artisan vendor:publish --provider="Your\\Package\\Namespace\\ServiceProvider" --force'
```

You can just as well omit the publish task if you work with the application itself and not a package installed in `vendor/`.
