var Redcaser = Redcaser || {};

Redcaser.TestCasePreviewBuilder = (function () {
  var self = {};

  // build :: Object -> DOM
  self.build = function (element, statuses) {
    var node = document.createElement('div');
    node.classList.add('case-preview');

    node.appendChild(this.buildHeader(element));
    node.appendChild(this.buildBody(element));
    node.appendChild(this.buildFooter(element, statuses));

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

  // buildFooter :: Object -> DOM
  self.buildFooter = function (element, statuses) {
    var node = document.createElement('div');
    node.classList.add('case-footer');

    node.appendChild(this.buildFooterComment(element));
    node.appendChild(this.buildFooterSelect(element, statuses));
    node.appendChild(this.buildFooterSubmit(element));

    return node;
  };

  self.buildFooterComment = function (element) {
    var node = document.createElement('input');
    node.classList.add('case-footer-comment');
    node.type = 'text';

    return node;
  };

  self.buildFooterSelect = function (element, statuses) {
    var node = document.createElement('select');
    node.classList.add('case-footer-select');

    statuses.forEach(function (status) {
      var option = document.createElement('option');
      option.value = status.id;

      if (status.id === element.status.id) {
        option.selected = true;
      }

      var text = document.createTextNode(status.name);

      option.appendChild(text);
      node.appendChild(option);
    });

    return node;
  };

  self.buildFooterSubmit = function (element) {
    var node = document.createElement('input');
    node.classList.add('case-footer-submit');
    node.type = 'submit';
    node.dataset.id = element.id;

    return node;
  };

  return self;
})();
