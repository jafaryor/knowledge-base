// MODULE PATTERN
/*
    Modules are an integral piece of any robust application's architecture and typically help
        in keeping the code for a project organized
    Advantages:
        Incapsulation
        Private Data
    Disadvantages:
        You access both public and private members differently, when you wish to change visibility
            you actually have to make changes to each place the member was used.
        You also can't access private members in methods that are added to the object at a later point.
        The inability to create automated unit tests for private members and additional
            complexity when bugs require hot fixes.
*/
var someModule = (function() {
    // private attributes
    var privateVar = 5;
    // private methods
    var privateMethod = function() {
        return 'Private Test';
    };

    return {
        // public attributes
        publicVar: 10,
        // public methods
        publicMethod: function() {
            return ' Followed By Public Test ';
        },
        // let's access the private members
        getData: function() {
            return privateMethod() + this.publicMethod() + privateVar;
        }
    };
})(); // the parens here cause the anonymous function to execute and return

// ================================================================================================

// jQuery
/*
    Module Pattern allows us to encapsulate logic for a unit of code such that we can
        have both private and public methods and variables.
*/
!(function(exports, $, undefined) {
    var Plugin = function() {
        // Our private API
        var priv = {},
            // Our public API
            Plugin = {},
            // Plugin defaults
            defaults = {};
        // Private options and methods
        priv.options = {};
        priv.method1 = function() {};
        priv.method2 = function() {};
        // Public methods
        Plugin.method1 = function() {
            /*...*/
        };
        Plugin.method2 = function() {
            /*...*/
        };
        // Public initialization
        Plugin.init = function(options) {
            $.extend(priv.options, defaults, options);
            priv.method1();
            return Plugin;
        };
        // Return the Public API (Plugin) we want to expose
        return Plugin;
    };
    exports.Plugin = Plugin;
})(this, jQuery);

var myPlugin = new Plugin();
myPlugin.init(/* custom options */);
myPlugin.method1();
