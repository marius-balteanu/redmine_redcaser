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
    return this.node('div', options)
  }

  // label :: Object -> DOM
  self.label = function (options) {
    return this.node('label', options)
  }

  self.textInput = function (options) {
    var node  = this.node('input', options)
    node.type = 'text'

    return node;
  }

  return self
})()
