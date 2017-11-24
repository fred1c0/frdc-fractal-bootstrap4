'use strict';

const fractal = module.exports = require('@frctl/fractal').create();

// const functions = require('./utils/functions');
// const filters = require('./utils/filters');
// const commands = require('./utils/commands');

const twig = require('@frctl/twig')({
    // functions: functions,
    // filters: filters
});

fractal.set('project.title', 'fredico Component Library');

fractal.components.set('path', __dirname + '/src/components');

fractal.docs.set('path', __dirname + '/src/docs');

fractal.web.set('static.path', __dirname + '/public');

fractal.components.engine(twig);
fractal.components.set('ext', '.twig');

fractal.components.set('default.preview', '@preview');

fractal.web.set('builder.dest', __dirname + '/build');
