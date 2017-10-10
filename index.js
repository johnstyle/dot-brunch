'use strict';

const doT = require('dot');

class doTCompiler {
    constructor(config) {
        this.config = config && config.plugins && config.plugins.dot;
        if ('function' !== typeof this.config.pathName) {
            this.config.pathName = function (path) {
                return path;
            }
        }
    }
    compile(params) {
        const data = params.data;
        const path = params.path;
        return new Promise((resolve, reject) => {
            let result, error;
        try {
            result = "if ('undefined' === typeof JST) {var JST = {};}JST['" + this.config.pathName(path) + "'] = " + doT.template(data.toString('utf8')).toString() + ";";
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
