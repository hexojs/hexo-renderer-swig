'use strict';

const swig = require('swig-templates');
const extras = require('swig-extras');
const forTag = require('swig-templates/lib/tags/for');

extras.useTag(swig, 'markdown');
extras.useTag(swig, 'switch');
extras.useTag(swig, 'case');

extras.useFilter(swig, 'batch');
extras.useFilter(swig, 'groupby');
extras.useFilter(swig, 'markdown');
extras.useFilter(swig, 'nl2br');
extras.useFilter(swig, 'pluck');
extras.useFilter(swig, 'split');
extras.useFilter(swig, 'trim');
extras.useFilter(swig, 'truncate');

swig.setDefaults({
  cache: false,
  autoescape: false
});

// Hack: Override for tag of Swig
swig.setTag('for', forTag.parse, (...args) => {
  const compile = forTag.compile(...args).split('\n');

  compile.splice(3, 0, '  if (!Array.isArray(__l) && typeof __l.toArray === "function") { __l = __l.toArray(); }');

  return compile.join('\n');
}, forTag.ends, true);

function swigRenderer({ text, path }, locals) {
  return swig.render(text, {
    locals,
    filename: path
  });
}

swigRenderer.compile = ({ text, path }) => swig.compile(text, { filename: path });

module.exports = swigRenderer;
