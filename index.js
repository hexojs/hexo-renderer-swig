/* global hexo */

'use strict';

const renderer = require('./lib/renderer');

hexo.extend.renderer.register('swig', 'html', renderer, true);
