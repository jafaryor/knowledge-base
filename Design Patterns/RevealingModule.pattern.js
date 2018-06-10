/*
    The Revealing Module Pattern - a slightly improved version of module pattern.
    Advantage:
        Allows the syntax of your script to be fairly consistent - it also makes
            it very clear at the end which of your functions and variables may be
            accessed publicly, something that is quite useful. In addition, you are
            also able to reveal private functions with more specific names if you wish.
    Disadvantage:
        If a private function refers to a public function, that public function can't
            be overridden if a patch if necessary. This is because the private function
            will continue to refer to the private implementation and the pattern doesn't
            apply to public members, only to functions.
*/

var myRevealingModule = (function() {
    var name = 'John Smith';
    var age = 40;

    function updatePerson() {
        name = 'John Smith Updated';
    }

    function setPerson() {
        name = 'John Smith Set';
    }

    function getPerson() {
        return name;
    }

    return {
        set: setPerson,
        get: getPerson
    };
})();