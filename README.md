JIRAClient
==========

Connects to the JIRA REST API as specified in https://developer.atlassian.com/jiradev/api-reference

Usage
-----

```js
//Create a new Client
var host     = 'mediasuite.atlassian.net';
var username = 'myUsername';
var password = 'myPassword';
var jira = require('JIRAClient')(host, username, password);

//Fetch an Issue
jira.getIssue('100101', function (err, issue) {
  if (err) {
    //An error occurred communicating with the JIRA API
    return console.error(err);
  }
  console.log(issue);
  //Prints
  //{ expand: 'renderedFields,names,schema,transitions,operations,editmeta,changelog',
  //id: '100101',
  //etc..
});

```

API
===

The final argument of all methods is a function that will be called back with
(err, data) where err is null where no error occurred and data is the response
from the API

getWorklog(issueId, worklogId, done)
------------------------------------

- __issueId__   _string_   JIRA Issue ID or Key
- __worklogId__ _string_   JIRA Worklog ID
- __done__      _Function_ Callback function

getIssue(issueId, done)
-----------------------

- __issueId__ _string_   JIRA Issue ID or Key
- __done__    _Function_ Callback function
