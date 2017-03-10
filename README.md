# Redmine Redcaser

[![Build Status](https://travis-ci.org/sdwolf/redmine_redcaser.svg?branch=master)](https://travis-ci.org/sdwolf/redmine_redcaser)

A fork of [Redcase](https://bitbucket.org/bugzinga/redcase).

Redcase is a Redmine plugin whose sole purpose is to organize testcases. When this plugin is correctly configured to your Redmine instance and project, he should be displayed as tab next to the others.

Redcase has two parts:
- the Test cases tab, that is about creating the Suites in which the testcase will be organized to cover your projects’ features, 
- and the Test Execution & Results in which, as the name suggested, we create the Executions Suites and then we ran the test cases.

A test case, in this plugin, is a new type of tracker, called Test Case, that has 3 new fields, type textarea : Preconditions, Steps, Expected Results. The approach is minimalistic, and each field should be filled with relevant content.
A test case needs to belong to a Suite, so the first thing you should add, is a at least one Suite, in the Test Cases tab.
sda
