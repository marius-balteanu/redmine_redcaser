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

    var nodeFields = ['href', 'selected', 'value']

    nodeFields.forEach(function (field) {
      if (options[field]) node[field] = options[field]
    })

    if (options.children) options.children.forEach(node.appendChild.bind(node))
  }

  // buildNode :: Function, DOM, Object -> DOM
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

  // div :: Object -> DOM
  self.div = function (options) {
    return self.node('div', options)
  }

  // label :: Object -> DOM
  self.label = function (options) {
    return self.node('label', options)
  }

  self.link = function (options) {
    return self.node('a', options)
  }

  self.option = function (options) {
    return self.node('option', options)
  }

  self.options = function (options) {
    var valueField = options.valueField || 'value';
    var textField  = options.textField || 'text';

    return options.data.map(function (element) {
      return self.option({
        classes:  options.classes,
        value:    element[valueField],
        selected: element[valueField] == options.selected,
        children: [self.text(element[textField])]
      })
    })
  }

  self.select = function (options) {
    return self.node('select', options)
  }

  self.textInput = function (options) {
    var node  = self.node('input', options)
    node.type = 'text'

    return node;
  }

  return self
})()
