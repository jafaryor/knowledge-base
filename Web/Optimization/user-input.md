## User Input
Best practices:
* #### Minimize repeated actions and fields
* #### Show users how far along they are
* #### Provide visual calendars when selecting dates
* #### Choose the most appropriate input type for your data to simplify input.

    Set appropriate keyboard type with the `type` attribute of the `<input>` element.

* #### Offer suggestions during input with datalist

    The `datalist` element isn't an input type, but a list of suggested input values to associated with a form field. It lets the browser suggest autocomplete options as the user types. Unlike select elements where users must scan long lists to find the value they're looking for, and limiting them only to those lists, `datalist` element provides hints as the user types.
    ```html
    <label for="frmFavChocolate">Favorite Type of Chocolate</label>
    <input type="text" name="fav-choc" id="frmFavChocolate" list="chocType">
    <datalist id="chocType">
      <option value="white">
      <option value="milk">
      <option value="dark">
    </datalist>
    ```

* #### Always use labels on form inputs, and ensure they're visible when the field is in focus.

    Applying labels to form elements helps to improve the touch target size: the user can touch either the label or the input in order to place focus on the input element.

* #### Use placeholders to provide guidance about what you expect.

    ```html
    <input type="text" placeholder="MM-YYYY">
    ```

* #### Use metadata to enable auto-complete

    Browsers use many heuristics to determine which fields they can auto-populate based on previously specified data by the user, and you can give hints to the browser by providing both the `name` attribute and the `autocomplete` attribute on each input element.

    ```html
    <label for="frmNameA">Name</label>
    <input type="text" name="name" id="frmNameA"
      placeholder="Full name" required autocomplete="name">
    ```

    > Chrome requires `input` elements to be wrapped in a `<form>` tag to enable auto-complete. If they're not wrapped in a `form` tag, Chrome will offer suggestions, but __will not__ complete the form.

    The best practice for these attributes is to use this format: `autocomplete="<section> <fieldtype>"`, for example: `autocomplete="shipping address-line1"`. For a complete list of all the accepted values, please see the [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).

* #### Use `autofocus`
* #### Use standard input fields
* #### Leverage the browser's built-in validation attributes like `pattern`, `required`, `min`, `max`, `maxlength`, `minlength`, `novalidate`.
    ```html
    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$">
    ```

    In some cases, you may want to allow the user to submit the form even if it contains invalid input. To do this, add the `novalidate` attribute to the form element, or individual input fields.

    > Even with client-side input validation, it is always important to validate data on the server to ensure consistency and security in your data.

* #### Use JavaScript and the [_Constraints Validation API_](https://w3c.github.io/html/sec-forms.html#constraints) for more complex validation requirements.
* #### Show validation errors in real time, and if the user tries to submit an invalid form, show all fields they need to fix.

    HTML5 also introduces a number of new pseudo-classes that can be used to style inputs based on their value or attributes.

    Validation happens immediately which means that when the page is loaded, fields may be marked as invalid, even though the user hasn't had a chance to fill them in yet. It also means that as the user types, and it's possible they'll see the invalid style while typing. To prevent this, you can combine the CSS with JavaScript to only show invalid styling when the user has visited the field.

    ```css
    input.dirty:not(:focus):invalid {
      background-color: #FFD9D9;
    }
    input.dirty:not(:focus):valid {
      background-color: #D9FFD9;
    }
    ```
    ```javascript
    var inputs = document.getElementsByTagName("input");
    var inputs_len = inputs.length;
    var addDirtyClass = function(evt) {
      sampleCompleted("Forms-order-dirty");
      evt.srcElement.classList.toggle("dirty", true);
    };
    for (var i = 0; i < inputs_len; i++) {
      var input = inputs[i];
      input.addEventListener("blur", addDirtyClass);
      input.addEventListener("invalid", addDirtyClass);
      input.addEventListener("valid", addDirtyClass);
    }
    ```

* #### Prevent form submission on invalid forms

    Because not all browsers will prevent the user from submitting the form if there is invalid data, you should catch the submit event, and use the `checkValidity()` on the form element to determine if the form is valid.

__[Ream More](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/)__
