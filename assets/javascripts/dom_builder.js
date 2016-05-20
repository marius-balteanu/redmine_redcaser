var DOMBuilder = (function () {
  'use strict'

  var self = {}

  // div :: Object -> DOM
  self.div = function (options) {
    var node = document.createElement('div')

    if (options.classes) node.classList.add(options.classes)

    if (options.dataset) {
      for (prop in options.dataset) {
        node.dataset[prop] = options.dataset.prop
      }
    }

    if (options.children) options.children.forEach(node.appendChild.bind(node))

    return node
  }

  return self
})()
