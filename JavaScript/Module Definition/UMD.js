/*
    UMD - an experimental module format that allows the definition of modules
        that work in both client and server environments with all or most of
        the popular script-loading techniques available at the time of writing.
*/

define(function(require, exports, module) {
    var shuffler = require("lib/shuffle");

    exports.randomize = function(input) {
        return shuffler.shuffle(input);
    }
});