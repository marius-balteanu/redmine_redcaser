var Redcaser = Redcaser || {}

Redcaser.API = (function () {
  'use strict'

  var self = {}

  var apiCall = function (params) {
    var request = $.ajax({
      data:     params.config.data,
      dataType: 'json',
      method:   params.method,
      url:      params.url
    })

    request.done(params.config.done)
    request.fail(params.config.fail)
  }

  var restAPI = function (path) {
    return new function () {
      // index :: Object
      this.index = function (params) {
        apiCall({
          config: params,
          method: 'GET',
          url:    'redcaser/' + path
        })
      }

      // show :: Object
      this.show = function (params) {
        apiCall({
          config: params,
          method: 'GET',
          url:    'redcaser/' + path + '/' + params.id
        })
      }

      // new :: Object
      this.new = function (params) {
        apiCall({
          config: params,
          method: 'GET',
          url:    'redcaser/' + path + '/new'
        })
      }

      // edit :: Object
      this.edit = function (params) {
        apiCall({
          config: params,
          method: 'GET',
          url:    'redcaser/' + path + '/' + params.id + '/edit'
        })
      }

      // create :: Object
      this.create = function (params) {
        apiCall({
          config: params,
          method: 'POST',
          url:    'redcaser/' + path
        })
      }

      // update :: Object
      this.update = function (params) {
        apiCall({
          config: params,
          method: 'PATCH',
          url:    'redcaser/' + path + '/' + params.id
        })
      }

      // destroy :: Object
      this.destroy = function (params) {
        apiCall({
          config: params,
          method: 'DELETE',
          url:    'redcaser/' + path + '/' + params.id
        })
      }
    }
  }

  self.testSuites        = restAPI('testsuites')
  self.testSuiteStatuses = restAPI('testcasestatuses')
  self.executionSuites   = restAPI('executionsuites')
  self.executionJournals = restAPI('executionjournals')
  self.environments      = restAPI('environments')
  self.testCases         = restAPI('testcases')
  self.combos            = restAPI('combos')
  self.graph             = restAPI('graph')
  self.queryTestCases    = restAPI('querytestcases')

  return self
})()
