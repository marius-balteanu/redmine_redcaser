var TestSuiteTreeWidget = (function () {
  'use strict';

  // self :: DOM
  var self = function (root) {
    this.root   = root;
    this.header = null;
    this.body   = null;

    this.caseEditDialog   = null;
    this.suiteEditDialog  = null;

    this.initialize();
  };

  var def = self.prototype;

  def.initialize = function () {
    this.createTestSuiteHeader();
    this.createDialogs();
    this.getTestSuiteData();
    this.addEventHandlers();
  };

  def.createTestSuiteHeader = function () {
    this.resetHeader();

    var header = TestSuiteHeader.build();

    this.root.appendChild(header);
  };

  def.resetHeader = function () {
    if (this.header) {
      this.root.removeChild(this.header);
    }
  };

  def.createDialogs = function () {
    this.createCaseEditDialog();
    this.createSuiteEditDialog();
  };

  def.createCaseEditDialog = function () {
    this.caseEditDialog = CaseDialog.build();
    CaseDialog.initialize(this.caseEditDialog);
  };

  def.createSuiteEditDialog = function () {
    this.suiteEditDialog = SuiteDialog.build();
    SuiteDialog.initialize(this.suiteEditDialog);
  };

  def.getTestSuiteData = function () {
    var params = {
      done: this.createTestSuiteTree.bind(this),
      fail: this.handleTestSuiteError.bind(this)
    }

    Redcaser.api.testSuites.index(params);
  };

  // createTestSuiteTree :: Object
  def.createTestSuiteTree = function (response) {
    this.initializeBody();

    var tree = TestSuiteTree.build(response);

    this.body.appendChild(tree);
    this.root.appendChild(this.body);

    this.makeSuiteCasesSortable();
  };

  def.initializeBody = function () {
    if (this.body) {
      $('.suite-cases').sortable('destroy');
      this.root.removeChild(this.body);
    }

    this.body = document.createElement('div');
    this.body.classList.add('tree-body');
  };

  def.makeSuiteCasesSortable = function () {
    var cases = $('.suite-cases');

    cases.sortable({
      connectWith: '.suite-cases',
      handle:      '.case-drag',
      placeholder: 'suite-case-placeholder'
    });
  };

  // buildTestSuiteTree :: Object
  def.handleTestSuiteError = function (response) {
    console.log('Error!');
  };

  def.addEventHandlers = function () {
    var handlers = this.eventHandlers();

    handlers.forEach(this.addEventHandler.bind(this));
  };

  // eventHandlers :: -> [[String, String, (Event -> *)]]
  def.eventHandlers = function () {
    return [
      ['click', 'suite-title',         this.handleSuiteEdit    ],
      ['click', 'suite-checkbox',      this.handleSuiteCheckbox],
      ['click', 'suite-case',          this.handleCaseClick    ],
      ['click', 'case-link-edit',      this.handleCaseEdit     ],
      ['click', 'case-actions-edit',   this.handleCaseEdit     ],
      ['click', 'case-actions-delete', this.handleCaseDelete   ],
      ['click', 'case-actions-view',   this.handleCaseView     ]
    ];
  }

  // addEventHandler :: [String, String, (Event -> *)]
  def.addEventHandler = function (config) {
    this.root.addEventListener(config[0], function (event) {
      if (event.target.classList.contains(config[1])) {
        config[2].bind(this)(event);
      }
    }.bind(this))
  }

  // handleSuiteEdit :: Event
  def.handleSuiteEdit = function (event) {
    SuiteDialog.forCreate(this.suiteEditDialog);
  };

  // handleSuiteCheckbox :: Event
  def.handleSuiteCheckbox = function (event) {

  };

  // handleCaseClick :: Event
  def.handleCaseClick = function () {

  };

  // handleCaseEdit :: Event
  def.handleCaseEdit = function (event) {
    CaseDialog.forCreate(this.caseEditDialog);
  };

  // handleCaseDelete :: Event
  def.handleCaseDelete = function (event) {

  };

  // handleCaseView :: Event
  def.handleCaseView = function (event) {

  };

  return self;
})();
