var Redcaser = Redcaser || {};

Redcaser.TestCasePreviewBuilder = (function () {
  var self = {};

  // build :: Object -> DOM
  self.build = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-preview');

    node.appendChild(this.buildHeader(element));
    node.appendChild(this.buildBody(element));

    return node;
  };

  // buildHeader :: Object -> DOM
  self.buildHeader = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-header');

    node.appendChild(this.buildHeaderTitle(element));

    return node;
  };

  // buildHeaderTitle :: Object -> DOM
  self.buildHeaderTitle = function (element) {
    var text = document.createTextNode(element.name);

    return text;
  };

  // buildBody :: Object -> DOM
  self.buildBody = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-body');

    node.appendChild(this.buildBodyPreconditions(element));
    node.appendChild(this.buildBodySteps(element));
    node.appendChild(this.buildBodyExpected(element));

    return node;
  };

  // buildBodyPreconditions :: Object -> DOM
  self.buildBodyPreconditions = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-preconditions');

    var text = document.createTextNode('Preconditions: ' + element.preconditions);
    node.appendChild(text);

    return node;
  };

  // buildBodySteps :: Object -> DOM
  self.buildBodySteps = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-steps');

    var text = document.createTextNode('Steps: ' + element.steps);
    node.appendChild(text);

    return node;
  };

  // buildBodyExpected :: Object -> DOM
  self.buildBodyExpected = function (element) {
    var node = document.createElement('div');
    node.classList.add('case-expected');

    var text = document.createTextNode('Expected results: ' + element.expected_results);
    node.appendChild(text);

    return node;
  };

  return self;
})();
