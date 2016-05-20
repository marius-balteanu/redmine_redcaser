var Redcaser = Redcaser || {};

Redcaser.SuiteTreeBuilder = (function () {
  'use strict';

  // self :: DOM
  var self = {};

  // build :: Object -> DOM
  self.build = function (data) {
    var nodes = [];

    var elements = data.test_suites;

    elements.forEach(function (element) {
      nodes.push(this.buildNode(element, data));
    }.bind(this));

    return nodes;
  };

  self.buildNode = function (element, data) {
    var type = element.type;
    var node, suiteCases, suiteChildren;

    if (type === 'suite') {
      node = Redcaser.TestSuiteBuilder.build(element, data);

      suiteCases    = node.getElementsByClassName('suite-cases')[0];
      suiteChildren = node.getElementsByClassName('suite-children')[0];

      element.children.forEach(function (child) {
        var childNode = this.buildNode(child, data);

        if (child.type === 'suite') {
          suiteChildren.appendChild(childNode);
        }
        else if (child.type === 'case') {
          suiteCases.appendChild(childNode);
        }
        else {
          console.log('Bad Child data:');
          console.log(child);
        }
      }.bind(this));
    }
    else if (type === 'case') {
      node = Redcaser.TestCase.build(element);
    }
    else {
      console.log('Bad Node data:');
      console.log(element);
    }

    return node;
  };

  return self;
})();
