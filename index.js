/* global hexo */

'use strict';

var renderer = require('./lib/renderer');

hexo.extend.renderer.register('swig', 'html', renderer, true);
