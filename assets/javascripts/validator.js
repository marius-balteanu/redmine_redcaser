var Redcaser = Redcaser || {}

Redcaser.Validator = (function () {
  'use strict'

  var self = function () {
    this.errors = {}
  }

  var def = self.prototype

  // initialize :: -> Validator
  def.initialize = function () {
    this.errors = {}

    return this
  }

  // messages :: -> String
  def.messages = function () {
    var messages = []

    for (var key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        messages.push(this.errors[key])
      }
    }

    return [].concat.apply([], messages).join(', ')
  }

  // validateBlank :: String, String -> Validator
  def.validateBlank = function (value, fieldName) {
    if (value.length === 0) {
      if (!this.errors[fieldName]) this.errors[fieldName] = []

      this.errors[fieldName].push(fieldName + ' can not be blank')
    }

    return this
  }

  // validateLength :: String, String, Object -> Validator
  def.validateLength = function (value, fieldName, options) {
    if (options.min && value.length < options.min) {
      if (!this.errors[fieldName]) this.errors[fieldName] = []

      this.errors[fieldName].push(
        'The field ' + fieldName + ' is mandatory and should contain at least ' + options.min + ' characters'
      )
    }

    return this
  }

  return self
})()
