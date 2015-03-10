'use strict';

var https = require('https');
var urljoin = require('url-join');

var basePath = '/rest/api/2';

module.exports = function (host, login, password) {

  /**
   * Makes GET requests to JIRA API and parses to JSON calling
   * callback with an error if the resquest failed or could not
   * be parsed
   * @param  {String}   path API endpoint path
   * @param  {Function} done Called with (err, data) where err is null if no error occurred
   */
  function makeRequest(path, done) {
    var options = {
      auth: login + ':' + password,
      hostname: host,
      path: path
    };
    var req = https.request(options, function (res) {
      if (res.statusCode === 200) {
        var data = '';

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          try {
            var worklog = JSON.parse(data);
            done(null, worklog);
          } catch (err) {
            done(err);
          }
        });
      } else if (res.statusCode === 404) {
        //Object not found - most likely deleted
        done(null, null);
      } else {
        done(new Error('JIRA GET failed - ' + res.statusCode));
      }
    });

    req.end();

    req.on('error', function (e) {
      done(e);
    });
  }

  return {
    /**
     * Gets a JSON Worklog object
     * @param  {String}   issueId   JIRA ID of Issue that Worklog was logged against
     * @param  {String}   worklogId JIRA ID of Worklog
     * @param  {Function} done      Called with (err, data) where data is the worklog json object
     */
    getWorklog: function (issueId, worklogId, done) {
      var path = urljoin(basePath, 'issue', issueId, 'worklog', worklogId);

      makeRequest(path, done);
    },

    /**
     * Gets a JSON Issue object
     * @param  {String}   issueId JIRA ID of Issue to fetch
     * @param  {Function} done    Called with (err, data) where data is the issue json object
     */
    getIssue: function (issueId, done) {
      var path = urljoin(basePath, 'issue', issueId);

      makeRequest(path, done);
    }
  };
};
