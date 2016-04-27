var RedcaserAPI = (function () {
  'use strict';

  var self = {};

  self.testSuites = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/testsuites'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var data = params.data;
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        data:     data,
        dataType: 'json',
        method:   'POST',
        url:      'redcaser/testsuites'
      });

      request.done(done);
      request.fail(fail);
    };

    // update :: Object
    this.update = function (params) {
      var data = params.data;
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        data:     data,
        dataType: 'json',
        method:   'PATCH',
        url:      'redcaser/testsuites/' + params.id
      });

      request.done(done);
      request.fail(fail);
    };

    // destroy :: Object
    this.destroy = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'DELETE',
        url:      'redcaser/testsuites/' + params.id
      });

      request.done(done);
      request.fail(fail);
    }
  };

  self.executionSuite = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/executionsuites'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var request = null;
    };

    // update :: Object
    this.update = function (params) {
      var request = null;
    };

    // destroy :: Object
    this.destroy = function (params) {
      var request = null;
    }
  };

  self.executionJournal = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/executionjournals'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var request = null;
    };

    // update :: Object
    this.update = function (params) {
      var request = null;
    };

    // destroy :: Object
    this.destroy = function (params) {
      var request = null;
    }
  };

  self.environments = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/environments'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var request = null;
    };

    // update :: Object
    this.update = function (params) {
      var request = null;
    };

    // destroy :: Object
    this.destroy = function (params) {
      var request = null;
    }
  };

  self.testCases = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/testcases'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var data = params.data;
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        data:     data,
        dataType: 'json',
        method:   'POST',
        url:      'redcaser/testcases'
      });

      request.done(done);
      request.fail(fail);
    };

    // update :: Object
    this.update = function (params) {
      var data = params.data;
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        data:     data,
        dataType: 'json',
        method:   'PATCH',
        url:      'redcaser/testcases/' + params.id
      });

      request.done(done);
      request.fail(fail);
    };

    // destroy :: Object
    this.destroy = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'DELETE',
        url:      'redcaser/testcases/' + params.id
      });

      request.done(done);
      request.fail(fail);
    }
  };

  self.combos = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/combos'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var request = null;
    };

    // update :: Object
    this.update = function (params) {
      var request = null;
    };

    // destroy :: Object
    this.destroy = function (params) {
      var request = null;
    }
  };

  self.graph = new function () {
    // index :: Object
    this.index = function (params) {
      var done = params.done;
      var fail = params.fail;

      var request = $.ajax({
        dataType: 'json',
        method:   'GET',
        url:      'redcaser/graph'
      });

      request.done(done);
      request.fail(fail);
    };

    // show :: Object
    this.show = function (params) {
      var request = null;
    };

    // create :: Object
    this.create = function (params) {
      var request = null;
    };

    // update :: Object
    this.update = function (params) {
      var request = null;
    };

    // destroy :: Object
    this.destroy = function (params) {
      var request = null;
    }
  };

  return self;
})();
