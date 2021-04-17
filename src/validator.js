const validationRules = [
  "email",
  "phone",
  "date:",
  "required",
  "containsSpecialChars",
  "containsUpperCaseChars",
  "containsLowerCaseChars",
  "containsNumbers",
  "any",
  "limit:",
  "string",
  "uppercaseString",
  "lowercaseString",
  "numbers",
  "specialChars",
  "number",
  "char",
  "upperCaseChar",
  "lowerCaseChar",
];

function createValidationScopes(vScopes) {
  return {
    validate: _v.bind(vScopes),
    getValidationScopeResult: _vsr.bind(vScopes),
  };
}

function _v(e) {
  const validationRules = e.target.getAttribute("data-validation-rules");
  const validationMessage = e.target.getAttribute("data-validation-message");
  const scope = e.target.getAttribute("data-validation-scope");
  const val = e.target.value || e.target.getAttribute("value");
  const validationResult = _validate(val, validationRules);
  this[scope] = this[scope] && validationResult;
  return {
    message: validationMessage,
    result: validationResult,
  };
}

function _vsr(scope) {
  return this[scope];
}

function _validate(val, rules) {
  rules.map((rule) => {
    if (
      rule.toString().includes("limit:") ||
      rule.toString().includes("date:")
    ) {
      const patternType = rule.substr(rule.indexOf(":") + 1);
    }
    if (!_validate[rule](val)) return false;
  });
  return true;
}

// -------------------------------------------------------------------

const _validate = {
  email: _validateEmailType,
  phone: "",
  date: _validateDateType,
  required: _validateRequiredType,
  "containsSpecialChars:": _validateContainSpecialCharsType,
  "containsUpperCaseChars:": _validateContainUpperCaseCharsType,
  containsLowerCaseChars: _validateContainLowerCaseType,
  containsNumbers: _validateContainNumbersType,
  any: _validateAnyType,
  limit: _validateWordLimitType,
  string: _validateOnlyStringType,
  uppercaseString: _validateOnlyUpperCaseStringType,
  lowercaseString: _validateOnlyLowerCaseStringType,
  numbers: _validateOnlyNumbersType,
  specialChars: _validateOnlySpecialCharsType,
  number: _validateOnlyNumberType,
  char: _validateOnlyCharType,
  upperCaseChar: _validateOnlyUcCharType,
  lowerCaseChar: _validateOnlyLcCharType,
};

function _validateEmailType(val) {
  const regExp = new RegExp(/^(\w*)\@(\w*)\.([a-z])*$/g);
  return regExp.test(val);
}

function _validateDateType(val, dateFormat) {
  const pattern = `^\d{1,2}\/\d{1,2}\/\d{4}`;
  pattern.concat(`^\d`);
  switch (dateFormat) {
    case "mm/dd/yyyy":
    case "mm/dd/yyyy":
    case "mm/dd/yyyy":
    case "mm/dd/yyyy":
    case "mm/dd/yyyy":
  }

  const regExp = new RegExp(/^(\w*)\@(\w*)\.([a-z])*$/g);
  return regExp.test(val);
}

function _validateRequiredType(val) {
  return val.toString().trim() === "" ? false : true;
}

function _validateContainSpecialCharsType(val) {
  const regExp = new RegExp(/\W/g);
  return regExp.test(val);
}

function _validateContainUpperCaseCharsType(val) {
  const regExp = new RegExp(/[A-Z]/g);
  return regExp.test(val);
}

function _validateContainLowerCaseType(val) {
  const regExp = new RegExp(/[a-z]/g);
  return regExp.test(val);
}

function _validateContainNumbersType(val) {
  const regExp = new RegExp(/\d/g);
  return regExp.test(val);
}

function _validateAnyType(val) {
  const regExp = new RegExp(/.*/g);
  return regExp.test(val);
}

function _validateWordLimitType(val, wordLimit) {
  const pattern = `.{${wordLimit},}`;
  const regExp = new RegExp(pattern);
  return regExp.test(val);
}

function _validateOnlyStringType(val) {
  const regExp = new RegExp(/^[A-Za-z]*$/g);
  return regExp.test(val);
}

function _validateOnlyNumbersType(val) {
  const regExp = new RegExp(/^\d*$/g);
  return regExp.test(val);
}

function _validateOnlyUpperCaseStringType(val) {
  const regExp = new RegExp(/^[A-Z]*$/g);
  return regExp.test(val);
}

function _validateOnlyLowerCaseStringType(val) {
  const regExp = new RegExp(/^[a-z]*$/g);
  return regExp.test(val);
}

function _validateOnlySpecialCharsType(val) {
  const regExp = new RegExp(/^(\W)*$/g);
  return regExp.test(val);
}

function _validateOnlyNumberType(val) {
  const regExp = new RegExp(/^\d$/g);
  return regExp.test(val);
}

function _validateOnlyCharType(val) {
  const regExp = new RegExp(/^[a-zA-Z]$/g);
  return regExp.test(val);
}

function _validateOnlyUcCharType(val) {
  const regExp = new RegExp(/^[A-Z]$/g);
  return regExp.test(val);
}

function _validateOnlyLcCharType(val) {
  const regExp = new RegExp(/^[a-z]$/g);
  return regExp.test(val);
}

export default createValidationScopes;
