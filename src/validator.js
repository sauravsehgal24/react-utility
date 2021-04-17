const validationRules = [
  "email",
  "date:",
  "required",
  "containsSpecialChars",
  "containsUpperCaseChars",
  "containsLowerCaseChars",
  "containsNumbers",
  "any",
  "max:",
  "min:",
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

function createValidationScopes(_vScopes) {
  let vScopes = {};
  _vScopes.map((scope) => {
    vScopes[scope] = undefined;
  });
  return {
    validate: _v.bind(vScopes),
    getValidationScopeResult: _vsr.bind(vScopes),
  };
}

function _v(e) {
  const validationRules = e.target.getAttribute("data-validation-rules");
  const validationMessage = e.target.getAttribute("data-validation-message");
  const scope = e.target.getAttribute("data-validation-scope");
  const name = e.target.getAttribute("data-validation-name");
  const val = e.target.value || e.target.getAttribute("value");
  const validationResult = _validate(val, validationRules);
  if (!this[scope]) this[scope] = {};
  this[scope] = { ...this[scope], [name]: validationResult };
  return {
    message: validationMessage,
    result: validationResult,
  };
}

function _vsr(scope) {
  if (!this[scope]) return false;
  Object.keys(this[scope]).map((nameKey) => {
    if (!this[scope][nameKey]) return false;
  });
  return true;
}

function _validate(val, _rules) {
  const rules = _rules.split(",");
  rules.map((rule) => {
    if (
      rule.toString().includes("min:") ||
      rule.toString().includes("date:") ||
      rule.toString().includes("max:")
    ) {
      const patternType = rule.substr(rule.indexOf(":") + 1);
      const ruleType = rule.substr(0, rule.indexOf(":"));
      if (!_validateObj[ruleType](val, patternType)) return false;
    } else {
      if (!_validateObj[rule](val)) return false;
    }
  });
  return true;
}

// -------------------------------------------------------------------

const _validateObj = {
  email: _validateEmailType,
  phone: "",
  date: _validateDateType,
  required: _validateRequiredType,
  containsSpecialChars: _validateContainSpecialCharsType,
  containsUpperCaseChars: _validateContainUpperCaseCharsType,
  containsLowerCaseChars: _validateContainLowerCaseType,
  containsNumbers: _validateContainNumbersType,
  any: _validateAnyType,
  max: _validateWordMaxType,
  min: _validateWordMinType,
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
  let datePattern = dateFormat;
  const regDateMM = /dd|mm/g;
  const regSpecialCharSlash = /\//g;
  const regSpecialCharHighpen = /-/g;
  const regSpecialCharDot = /\./g;
  datePattern = datePattern.replace(/yyyy/g, `\\d{4}`);
  datePattern = datePattern.replaceAll(regDateMM, `\\d{1,2}`);
  if (datePattern.includes(`.`)) {
    datePattern = datePattern.replaceAll(regSpecialCharDot, `\\.`);
  } else if (datePattern.includes(`-`)) {
    datePattern = datePattern.replaceAll(regSpecialCharHighpen, `\\-`);
  }
  if (datePattern.includes(`/`)) {
    datePattern = datePattern.replaceAll(regSpecialCharSlash, `\\/`);
  }
  const regExp = new RegExp(datePattern);
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

function _validateWordMaxType(val, wordLimit) {
  const pattern = `.{0,${wordLimit}}`;
  const regExp = new RegExp(pattern);
  return regExp.test(val);
}

function _validateWordMinType(val, wordLimit) {
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
