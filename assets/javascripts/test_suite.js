var TestSuite = (function () {
  var self = {};

  // build :: Object -> DOM
  self.build = function (element) {
    var node = document.createElement('div');
    node.classList.add('tree-suite');

    node.appendChild(this.buildSuiteTitle(element));
    node.appendChild(this.buildSuiteTable(element));
    node.appendChild(this.buildSuiteFooter(element));
    node.appendChild(this.buildSuiteChildren(element));

    return node;
  };

  // buildSuiteTitle :: Object -> DOM
  self.buildSuiteTitle = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-title');

    var text = document.createTextNode(element.text);
    node.appendChild(text);

    return node;
  };


  // buildSuiteTable :: Object -> DOM
  self.buildSuiteTable = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-table');

    node.appendChild(this.buildSuiteHeader(element));
    node.appendChild(this.buildSuiteCases(element));

    return node;
  };


  // buildSuiteHeader :: Object -> DOM
  self.buildSuiteHeader = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-header');

    node.appendChild(this.buildSuiteHeaderDrag(element));
    node.appendChild(this.buildSuiteHeaderCheck(element));
    node.appendChild(this.buildSuiteHeaderId(element));
    node.appendChild(this.buildSuiteHeaderLink(element));
    node.appendChild(this.buildSuiteHeaderActions(element));

    return node;
  };

  // buildSuiteHeaderDrag :: Object -> DOM
  self.buildSuiteHeaderDrag = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-drag');

    var text = document.createTextNode('D');
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeaderCheck :: Object -> DOM
  self.buildSuiteHeaderCheck = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-check');

    var check  = document.createElement('input');
    check.type = 'checkbox';
    node.appendChild(check);

    return node;
  };

  // buildSuiteHeaderId :: Object -> DOM
  self.buildSuiteHeaderId = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-id');

    var text = document.createTextNode('ID');
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeaderLink :: Object -> DOM
  self.buildSuiteHeaderLink = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-link');

    var text = document.createTextNode('Title');
    node.appendChild(text);

    return node;
  };

  // buildSuiteHeaderActions :: Object -> DOM
  self.buildSuiteHeaderActions = function (element) {
    var node = document.createElement('span');
    node.classList.add('suite-actions');

    var text = document.createTextNode('A');
    node.appendChild(text);

    return node;
  };

  // buildSuiteCases :: Object -> DOM
  self.buildSuiteCases = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-cases');

    return node;
  };

  // buildSuiteFooter :: Object -> DOM
  self.buildSuiteFooter = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-footer');

    var link    = document.createElement('a');
    link.href   = '/issues/new';
    link.target = '_blank';

    var text = document.createTextNode('Add test case');

    link.appendChild(text);
    node.appendChild(link);

    return node;
  };

  // buildSuiteChildren :: Object -> DOM
  self.buildSuiteChildren = function (element) {
    var node = document.createElement('div');
    node.classList.add('suite-children');

    return node;
  };

  return self;
})();
