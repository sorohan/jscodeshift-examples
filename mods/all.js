import removeConsoleLogs from './remove-console-logs';
import changeFunctionSignature from './change-function-signature';
import insertWrapperFunction from './insert-wrapper-function';

module.exports = function(file, api, options) {
    const fixes = [removeConsoleLogs, changeFunctionSignature, insertWrapperFunction];
    let src = file.source;
    fixes.forEach(fix => {
      if (typeof(src) === "undefined") { return; }
      const nextSrc = fix({ ...file, source:src }, api, options);

      if (nextSrc) {
        src = nextSrc;
      }
    });
    return src;
};

