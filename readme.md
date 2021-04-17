# React Utility

## React utility contains helper packages, which will help to speed up your react front-end developement process.

### List of helper utilities included:

- React front End Validator: [validator](#validator)

## validator

### validator is a helper utility to easily scope your form fields and validate them inrespect to the state (of form filed) mutation

#### Supported validation rules: [email, required, containsSpecialChars, containsUpperCaseChars, containsLowerCaseChars, containsNumbers, any, string, uppercaseString, lowercaseString, numbers, specialChars, number, char, upperCaseChar, lowerCaseChar]

#### NOTE: date, min, and max are also supported but the way they are used is different from those mentioned above:

- "date:" -> ```data-validation-rules={["date:mm/dd/yyyy"]}
- "min:" -> ```data-validation-rules={["min:4"]}
- "min:" -> ```data-validation-rules={["max:8"]}

#### DEMO

```javascript
import React, {useState} from 'react';

const SomeComponent = () =>{
    const {validate, getValidationScopeResult} = createValidationScopes(["LoginForm", "RegistrationForm", "SurveyForm"])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = () =>{
        const registrationFormValidationResult = getValidationScopeResult("RegistrationForm") // gets the validation result for all the fields in the RegistrationForm scope
        if(!registrationFormValidationResult) alert("Please review the form for errors")
        else{
            // Perform submit
        }
    }
    return(
        <div>
            <form id="registrationForm">
                <input
                    type="text"
                    placeholder="Name"
                    data-validation-scope="RegistrationForm"
                    data-validation-name="nameField"
                    data-validation-rules={["required","string"]}
                    data-validation-message="Validation failed for Name field"
                    onChange={(e)=>{validate(e); setName(e.target.value)}}
                >
                <input
                    type="email"
                    placeholder="Email"
                    data-validation-scope="RegistrationForm"
                    data-validation-name="emailField"
                    data-validation-rules={["required","email"]}
                    data-validation-message="Validation failed for Email field"
                    onChange={(e)=>{validate(e); setEmail(e.target.value)}}
                >
                <input
                    type="password"
                    placeholder="Password"
                    data-validation-scope="RegistrationForm"
                    data-validation-name="passwordField"
                    data-validation-rules={["required","min:6", "containsSpecialChars"]}
                    data-validation-message="Validation failed for Password field"
                    onChange={(e)=>{validate(e); setPassword(e.target.value)}}
                >
                <button onClick={()=>{submitForm()}}>SUBMIT FORM</button>
            </form>

        </div>
    )
}
```
