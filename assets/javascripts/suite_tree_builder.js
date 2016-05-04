var Redcaser = Redcaser || {};

Redcaser.SuiteTreeBuilder = (function () {
  'use strict';

  // self :: DOM
  var self = {};

  // build :: Object -> DOM
  self.build = function (elements) {
    var nodes = [];

    elements.forEach(function (element) {
      nodes.push(this.buildNode(element));
    }.bind(this));

    return nodes;
  };

  self.buildNode = function (element) {
    var type = element.type;
    var node, suiteCases, suiteChildren;

    if (type === 'suite') {
      node = Redcaser.TestSuiteBuilder.build(element);

      suiteCases    = node.getElementsByClassName('suite-cases')[0];
      suiteChildren = node.getElementsByClassName('suite-children')[0];

      element.children.forEach(function (child) {
        var childNode = this.buildNode(child);

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
      node = Redcaser.TestCaseBuilder.build(element);
    }
    else {
      console.log('Bad Node data:');
      console.log(element);
    }

    return node;
  };

  return self;
})();
