'use strict';

const doT = require('dot');

class doTCompiler {
  constructor(config) {

    this.config = config && config.plugins && config.plugins.doT;
  }
  compile(params) {
    console.log('ok');
    const data = params.data;
    const path = params.path;

    const options = clone(this.options);
    options.filename = path;

    return new Promise((resolve, reject) => {
          let result, error;
    try {
      let compiled = doT.process({ path: "./views"});
      result = umd(compiled);
    } catch (_error) {
      error = _error;
    } finally {
      if (error) return reject(error);
      resolve(result);
    }
  });
  }
}

doTCompiler.prototype.brunchPlugin = true;
doTCompiler.prototype.type = 'template';
doTCompiler.prototype.extension = 'jst';

module.exports = doTCompiler;
