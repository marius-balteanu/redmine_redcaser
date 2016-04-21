var RedcaserAPI = (function () {
  'use strict';

  var self = {};

  self.testSuites = new function () {
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

    this.create = function () {
      var request = null;
    };

    this.update = function () {
      var request = null;
    };

    this.destroy = function () {
      var request = null;
    }
  };

  return self;
})();


/*
var RedcaserAPI = function () {
  this.context = 'redcaser/';

  this.core = new function () {
    this.controller = '';

    this.getAttachmentURLs = function () {
      return {
        method: (this.controller + '/attachment_urls'),
        httpMethod: 'GET'
      };
    }.bind(this);
  };

  this.testSuite = new function () {
    this.controller = 'testsuites';

    this.index = function () {
      return {
        method: this.controller,
        httpMethod: 'GET'
      };
    }.bind(this);

    this.destroy = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'DELETE'
      };
    }.bind(this);

    this.update = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'PUT'
      };
    }.bind(this);

    this.create = function () {
      return {
        method: this.controller,
        httpMethod: 'POST'
      };
    }.bind(this);
  };

  this.executionSuite = new function () {
    this.controller = 'executionsuites';

    this.create = function () {
      return {
        method: this.controller,
        httpMethod: 'POST'
      };
    }.bind(this);

    this.update = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'PUT'
      };
    }.bind(this);

    this.destroy = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'DELETE'
      };
    }.bind(this);

    this.show = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'GET'
      };
    }.bind(this);

    this.index = function () {
      return {
        method: this.controller,
        httpMethod: 'GET'
      };
    }.bind(this);
  };

  this.executionJournal = new function () {
    this.controller = 'executionjournals';

    this.index = function () {
      return {
        method: this.controller,
        httpMethod: 'GET'
      };
    }.bind(this);
  };

  this.environments = new function () {
    this.controller = 'environments';

    this.show = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'GET'
      };
    }.bind(this);

    this.update = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'PUT'
      };
    }.bind(this);

    this.create = function () {
      return {
        method: this.controller,
        httpMethod: 'POST'
      };
    }.bind(this);

    this.destroy = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'DELETE'
      };
    }.bind(this);
  };

  this.testCase = new function () {
    this.controller = 'testcases';

    this.index = function () {
      return {
        method: this.controller,
        httpMethod: 'GET'
      };
    }.bind(this);

    this.update = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'PUT',
      };
    }.bind(this);

    this.copy = function (id) {
      return {
        method: (this.controller + '/' + id + '/copy'),
        httpMethod: 'POST',
      };
    }.bind(this);
  };

  this.combos = new function () {
    this.controller = 'combos';

    this.index = function () {
      return {
        method: this.controller,
        httpMethod: 'GET'
      };
    }.bind(this);
  };

  this.graph = new function () {
    this.controller = 'graph';

    this.show = function (id) {
      return {
        method: (this.controller + '/' + id),
        httpMethod: 'GET'
      };
    }.bind(this);
  };

  this.apiCall = function (parameters) {
    var url = (this.context + parameters.method);
    var token = $("meta[name='csrf-token']").attr('content');
    var params = $.extend({},
      parameters.params, {
        authenticity_token: token
      }
    );
    $('#ajax-indicator').fadeIn(100);
    $.ajax(url, {
      type: (parameters.httpMethod ? parameters.httpMethod : 'GET'),
      data: params,
      success: function (data, textStatus, jqXHR) {
        if (parameters.success) {
          parameters.success(data, textStatus, jqXHR);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (parameters.error) {
          parameters.error(errorThrown, textStatus, jqXHR);
        }
        Redcaser.errorBox(parameters.errorMessage);
      },
      complete: function () {
        if (parameters.complete) {
          parameters.complete();
        }
        $('#ajax-indicator').fadeOut(100);
      }
    });
  };
};

$(function () {
  Redcaser.api = new RedcaserAPI();
});
*/
