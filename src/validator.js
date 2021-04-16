function createValidationScopes(vScopes) {
  return {
    validate: _v.bind(vScopes),
    getValidationScopeResult: _vsr.bind(vScopes),
  };
}

function _v(e) {
  const validationRules = e.target.getAttribute("data-validation-rules");
  const validationMessage = e.target.getAttribute("data-validation-message");
  const valType = e.target.getAttribute("data-type");
  const scope = e.target.getAttribute("data-validation-scope");
  const val = e.target.value || e.target.getAttribute("value");
  const validationResult = _validateByType(val, valType);
  this[scope] = this[scope] && validationResult;
  return {
    message: validationMessage,
    result: validationResult,
  };
}

function _vsr(scope) {
  return this[scope];
}

function _validateByType(val, type) {
  switch (type) {
    case "email":
      break;
    case "phone":
      break;
    case "date":
      break;
    case "required":
      break;
  }
}

export default createValidationScopes;
