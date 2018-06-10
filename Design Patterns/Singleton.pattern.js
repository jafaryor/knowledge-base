// SINGLETON PATTERN
/*
    The singleton pattern is thus known because traditionally, it restricts instantiation of
        a class to a single object.
*/
var Singleton = (function () {
    var instantiated;

    function init() {
        // singleton here
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();