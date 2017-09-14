# Redmine Redcaser

[![Build Status](https://travis-ci.org/marius-balteanu/redmine_redcaser.svg?branch=master)](https://travis-ci.org/marius-balteanu/redmine_redcaser)
[![Coverage Status](https://coveralls.io/repos/github/marius-balteanu/redmine_redcaser/badge.svg?branch=master)](https://coveralls.io/github/marius-balteanu/redmine_redcaser?branch=master)

A fork of [Redcase](https://bitbucket.org/bugzinga/redcase).

***

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Redmine Redcaser](#redmine-redcaser)
    - [Description](#description)
    - [Test](#test)
    - [Guard](#guard)

<!-- markdown-toc end -->

## Description

Redcaser is a Redmine plugin whose sole purpose is to organize testcases. When this plugin is correctly configured to your Redmine instance and project, he should be displayed as tab next to the others.

Redcaser has two parts:
- the Test cases tab, that is about creating the Suites in which the testcase will be organized to cover your projects’ features, 
- and the Test Execution & Results in which, as the name suggested, we create the Executions Suites and then we ran the test cases.

A test case, in this plugin, is a new type of tracker -> **Test Case**, that has 3 new fields of type textarea : Preconditions, Steps, Expected Results. This approach is minimalistic, and each field should be filled with relevant content.
A test case needs to belong to a Suite, so the first thing you should add, is a at least one Suite, in the Test Cases tab.

1. Test cases tab
- in this page you are able to to create the Suites that in whish you will organize / structure your testcases. A suite can have an unlimited number of suites as children, so you can recreate your projects feature as you want.
 - Testcases can be moved between suites by drag n dropping, using the green double arrow.
 
2. Test Execution & Results tab
The following options are available when creating an execution suite: 
 - choosing a version, from all the available (not closed) ones.
 - choosing an environment, or creating a new one; this could be anything from environments, browsers, operating systems, mobile, tablet, etc. you decide.
 - choosing a query, from the public ones associated to the project,  or from custom queries, then selecting the desired testcases from that query.
 
After a Suite Execution is created, when it's selected in the dropdown, all the included testcases will be displayed in the left side of the screen. When a testcase is clicked, it will be opened in the right side of the screen.
The status of a testcase can be modified (to Failed, Passed, Blocked) either from the left side, or from the right side, and you can also add a comment

## Test

First create the test database:
```bash
bundle exec rake db:create db:migrate RAILS_ENV=test
```

Run tests for the current plugin:

```bash
bundle exec rake redmine:plugins:test NAME=redmine_redcaser
```

## Guard

Make sure to have the test database set up:
```bash
bundle exec rake db:create db:migrate RAILS_ENV=test
```

Start guard from the plugin directory:
```bash
cd plusing/redmine_redcaser

guard
```

> **NOTE:** If you intrerupt guard and the database is no longer present just
> execute the command to create it again.
