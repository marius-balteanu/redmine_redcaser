var DOMBuilder = (function () {
  'use strict'

  var self = {}

  // addNodeProprieties :: DOM, Object
  var addNodeProprieties = function (node, options) {
    if (options.classes) node.classList.add(options.classes)

    if (options.dataset) {
      for (prop in options.dataset) {
        node.dataset[prop] = options.dataset.prop
      }
    }

    var nodeFields = ['checked', 'href', 'selected', 'value']

    nodeFields.forEach(function (field) {
      if (options[field]) node[field] = options[field]
    })

    if (options.children) options.children.forEach(node.appendChild.bind(node))
  }

  // buildNode :: (String -> DOM), String, Object -> DOM
  var buildNode = function (builder, nodeIdentity, options) {
    var node = builder(nodeIdentity)

    if (!options) return node

    addNodeProprieties(node, options)

    return node
  }

  // node :: String, Object -> DOM
  self.node = function (element, options) {
    return buildNode(document.createElement.bind(document), element, options)
  }

  // text :: String, Object -> DOM
  self.text = function (text, options) {
    return buildNode(document.createTextNode.bind(document), text, options)
  }

  // checkbox :: Object -> DOM
  self.checkbox = function (options) {
    var node  = self.node('input', options)
    node.type = 'checkbox'

    return node
  }

  // div :: Object -> DOM
  self.div = function (options) {
    return self.node('div', options)
  }

  // label :: Object -> DOM
  self.label = function (options) {
    return self.node('label', options)
  }

  // link :: Object -> DOM
  self.link = function (options) {
    return self.node('a', options)
  }

  // option :: Object -> DOM
  self.option = function (options) {
    return self.node('option', options)
  }

  // options :: Object -> DOM
  self.options = function (options) {
    var valueField = options.valueField || 'value'
    var textField  = options.textField || 'text'

    var result = []

    if (options.includeBlank) result.push(self.option())

    options.data.forEach(function (element) {
      var node = self.option({
        classes:  options.classes,
        value:    element[valueField],
        selected: element[valueField] == options.selected,
        children: [self.text(element[textField])]
      })

      result.push(node)
    })

    return result
  }

  // select :: Object -> DOM
  self.select = function (options) {
    return self.node('select', options)
  }

  // textInput :: Object -> DOM
  self.textInput = function (options) {
    var node  = self.node('input', options)
    node.type = 'text'

    return node
  }

  return self
})()
