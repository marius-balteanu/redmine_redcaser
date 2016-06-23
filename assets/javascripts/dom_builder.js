var DOMBuilder = (function () {
  'use strict'

  var self = {}

  // addNodeProprieties :: DOM, Object
  var addNodeProprieties = function (node, options) {
    if (options.classes) {
      options.classes.forEach(function(className) {
        node.classList.add(className)
      })
    }

    if (options.dataset) {
      for (var prop in options.dataset) {
        node.dataset[prop] = options.dataset[prop]
      }
    }

    var nodeFields = [
      'checked', 'colSpan', 'href', 'label', 'selected', 'target', 'title', 'value'
    ]

    nodeFields.forEach(function (field) {
      if (options[field]) node[field] = options[field]
    })

    if (options.children) options.children.forEach(node.appendChild.bind(node))

    if (options.insertHTML) {
        var position, text

        node.insertAdjacentHTML(options.insertHTML[0], options.insertHTML[1])
    }
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

  // button :: Object -> DOM
  self.button = function (options) {
    return self.node('button', options)
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

  // optgroup :: Object -> DOM
  self.optgroup = function (options) {
    return self.node('optgroup', options)
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

    if (options.includeBlank) {
      if (options.blankOption) {
        result.push(options.blankOption)
      }
      else {
        result.push(self.option({value: ' '}))
      }
    }

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

  // span :: Object -> DOM
  self.span = function (options) {
    return self.node('span', options)
  }

  // textInput :: Object -> DOM
  self.textInput = function (options) {
    var node  = self.node('input', options)
    node.type = 'text'

    return node
  }

  // textarea :: Object -> DOM
  self.textarea = function (options) {
    return self.node('textarea', options)
  }

  // table :: Object -> DOM
  self.table = function (options) {
    return self.node('table', options)
  }

  // tbody :: Object -> DOM
  self.tbody = function (options) {
    return self.node('tbody', options)
  }

  // td:: Object -> DOM
  self.td = function (options) {
    return self.node('td', options)
  }

  // th:: Object -> DOM
  self.th = function (options) {
    return self.node('th', options)
  }

  // tr:: Object -> DOM
  self.tr = function (options) {
    return self.node('tr', options)
  }

  // p:: Object -> DOM
  self.p = function (options) {
    return self.node('p', options)
  }

  // p:: Object -> DOM
  self.ul = function (options) {
    return self.node('ul', options)
  }

  // p:: Object -> DOM
  self.li = function (options) {
    return self.node('li', options)
  }
  return self
})()
