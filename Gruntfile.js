'use strict';

const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

// const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      scss: {
        src: [
          './src/scss/**/*.scss',
          '!./src/scss/**/_*.scss',
          './src/components/**/*.scss',
          '!./src/components/**/_*.scss',
        ],
        dest: './public/css/build.scss'
      },
      js: {
        src: [
          'node_modules/jquery/jquery.js',
          'node_modules/popper.js/dist/umd/popper.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        dest: './public/js/build.js'
      }
    },

    sass: {
      main: {
        options: {
          sourceMap: true,
          includePaths: [
            'node_modules/bootstrap/scss'
          ]
        },
        files: [{
          './public/css/style.css': './public/css/build.scss'
        }]
      },
      components: {
        options: {
          sourceMap: false,
          includePaths: [
            'node_modules',
            'node_modules/bootstrap/scss'
          ]
        },
        files: [
          {
            expand: true,
            src: [
              './src/components/**/*.css'
            ]
          }
        ]
      },
      export_styles: {
        options: {
          sourceMap: false,
          includePaths: [
            'node_modules',
            'node_modules/bootstrap-sass/assets/stylesheets',
            'src/scss'
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            ext: '.css',
            src: [
              './public/css/export/*.css'
            ],
            dest: './public/css/export/'
          },
        ]
      }
    },

    clean: {
      main: {
        files: ['./public/css/build.scss']
      }
    },

    postcss: {
    },

    copy: {
      js: {
        expand: true,
        flatten: true,
        src: [
          'node_modules/jquery/jquery.js',
          'node_modules/popper.js/dist/umd/popper.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        dest: './public/js/dev/',
      }
    },

    eslint: {
      target: ['./src/**/components/**/*.js']
	  },

    stylelint: {
      all: ['./src/scss/**/*.scss', './src/components/**/*.scss']
    },

    watch: {
      sass: {
        files: [
          './src/scss/**/*.scss',
          './src/components/**/*.twig',
          './src/components/**/*.yml',
          './src/components/**/*.json',
          './src/components/**/*.scss'
        ],
        options: {
          livereload: false
        },
        tasks: ['concat:scss', 'sass:main']
      },
      js: {
        files: [
          './src/**/*.js',
        ],
        options: {
          livereload: false
        },
        tasks: ['concat:js']
      }
    }

  });

  grunt.registerTask('dev', [
    'concat:scss',
    'concat:js',
    'sass:main',
    'watch'
  ]);

  grunt.registerTask('prod', [
    'concat:scss',
    'concat:js',
    'sass:main',
    'sass:components'
  ]);

  grunt.registerTask('export', [
    'sass:export_styles'
  ]);

  grunt.registerTask('default', 'dev');
};
