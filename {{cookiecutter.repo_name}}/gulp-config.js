/* jshint node: true */

/**
 * N.B. trailing slashes on *all* paths
 */
// __dirname is absolute path to cwd since this file is read AFTER gulp calls
// process.cwd() with our --cwd argument
var minimist = require('minimist');
var path     = require('path');
var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'local' }
};
var options = minimist(process.argv.slice(2), knownOptions);

var assetsPath = '{{ cookiecutter.package_name }}/static/';
var isDebugging = process.env.DEBUG == 'True';


module.exports = {
  // environment
  debugging: isDebugging,

  // task paths
  src: '',
  dist: '',
  assets: assetsPath,
  css: {
    glob: '**/*.css',
    dist: assetsPath + 'css/',
  },
  fonts: {
    src: assetsPath + 'fonts/',
    dist: assetsPath + 'fonts/',
    glob: '**/*.{eot,svg,ttf,woff,woff2}'
  },
  html: {
    glob: '**/*.html'
  },
  img: {
    src: assetsPath + 'img/',
    dist: assetsPath + 'img/',
    glob: '**/*.{gif,jpg,jpeg,png,svg,ico}'
  },
  js: {
    src: assetsPath + 'js/',
    dist: assetsPath + 'js/',
    glob: '**/*.js'
  },
  sass: {
    src: assetsPath + 'sass/',
    glob: '**/*.scss'
  },

  // modules
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
  },
  browserify: {
    bundles: [
      {
        entries: './' + assetsPath + 'js/app.js',
        outputName: '{{ cookiecutter.repo_name }}.js',
        dest: assetsPath + 'js/'
      }
    ]
  },
  browserSync: {
    port: 9000
  },
  bower: { // aka main-bower-files
    bowerDirectory: 'bower_components/'
  },
  htmlmin: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  },
  imagemin: {
    progressive: true,
    svgoPlugins: [{convertPathData: false}],
    interlaced: true
  },
  modernizr: {
    'cache' : false,
    'devFile' : assetsPath + 'js/vendor/modernizr.js',
    'options': [
      'html5printshiv',
      'mq',
      'setClasses'
    ]
  },
  nodeSass: {
    errLogToConsole: true,
    includePaths: [
      'bower_components/foundation/scss/',
      'bower_components/'
    ]
  }
};
