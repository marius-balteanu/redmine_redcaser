var Redcaser = Redcaser || {}

Redcaser.TestCasePreviewBuilder = (function () {
  var self = {}

  // build :: Object -> DOM
  self.build = function (element, statuses) {
    return DOMBuilder.div({
      classes:  ['case-preview'],
      children: [
        this.buildHeader(element),
        this.buildBody(element),
        this.buildFooter(element, statuses)
      ]
    })
  }

  // buildHeader :: Object -> DOM
  self.buildHeader = function (element) {
    return DOMBuilder.div({
      classes:  ['case-header'],
      children: [this.buildHeaderTitle(element)]
    })
  }

  // buildHeaderTitle :: Object -> DOM
  self.buildHeaderTitle = function (element) {
    return document.createTextNode(element.name)
  }

  // buildBody :: Object -> DOM
  self.buildBody = function (element) {
    return DOMBuilder.div({
      classes:  ['case-body'],
      children: [
        this.buildBodyPreconditions(element),
        this.buildBodySteps(element),
        this.buildBodyExpected(element)
      ]
    })
  }

  // buildBodyPreconditions :: Object -> DOM
  self.buildBodyPreconditions = function (element) {
    return DOMBuilder.div({
      classes:  ['case-preconditions'],
      children: [
        document.createTextNode('Preconditions: ' + element.preconditions)
      ]
    })
  }

  // buildBodySteps :: Object -> DOM
  self.buildBodySteps = function (element) {
    return DOMBuilder.div({
      classes:  ['case-steps'],
      children: [
        document.createTextNode('Steps: ' + element.steps)
      ]
    })
  }

  // buildBodyExpected :: Object -> DOM
  self.buildBodyExpected = function (element) {
    return DOMBuilder.div({
      classes:  ['case-expected'],
      children: [
        document.createTextNode('Expected results: ' + element.expected_results)
      ]
    })
  };

  // buildFooter :: Object -> DOM
  self.buildFooter = function (element, statuses) {
    return DOMBuilder.div({
      classes:  ['case-footer'],
      children: [
        this.buildFooterComment(element),
        this.buildFooterSelect(element, statuses),
        this.buildFooterSubmit(element)
      ]
    })
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

      if (element.status && status.id === element.status.id) {
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
    node.dataset.test_case_status_id = element.status.test_case_status_id

    return node;
  };

  return self;
})();
