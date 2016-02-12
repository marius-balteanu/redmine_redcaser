
require 'redmine'
require 'issue_patch'
require 'project_patch'
require 'version_patch'
require 'user_patch'
require 'redcase_override'

Redmine::Plugin.register :redmine_redcaser do
  name 'Redcaser'
  description 'Test cases management plugin for Redmine'
  author 'Zitec'
  version '0.0.1'

  permission :view_test_cases, {
    redcase: [
      :index,
      :get_attachment_urls
    ],
    'redcase/environments' => [
      :index
    ],
    'redcase/testsuites' => [
      :index
    ],
    'redcase/testcases' => [
      :index
    ],
    'redcase/executionjournals' => [
      :index
    ],
    'redcase/export' => [
      :index
    ],
    'redcase/executionsuites' => [
      :index,
      :show
    ],
    'redcase/graph' => [
      :show
    ],
    'redcase/combos' => [
      :index
    ]
  }

  permission :edit_test_cases, {
    redcase: [
      :index,
      :get_attachment_urls
    ],
    'redcase/environments' => [
      :index,
      :update,
      :destroy,
      :create
    ],
    'redcase/testsuites' => [
      :index,
      :update,
      :destroy,
      :create
    ],
    'redcase/testcases' => [
      :index,
      :update,
      :destroy,
      :copy
    ],
    'redcase/executionjournals' => [
      :index
    ],
    'redcase/export' => [
      :index
    ],
    'redcase/executionsuites' => [
      :index,
      :update,
      :destroy,
      :create,
      :show
    ],
    'redcase/graph' => [
      :show
    ],
    'redcase/combos' => [
      :index
    ]
  }

  permission :execute_test_cases, {
    redcase: [
      :index,
      :get_attachment_urls
    ],
    'redcase/environments' => [
      :index
    ],
    'redcase/testsuites' => [
      :index
    ],
    'redcase/testcases' => [
      :index,
      :update
    ],
    'redcase/executionjournals' => [
      :index
    ],
    'redcase/export' => [
      :index
    ],
    'redcase/executionsuites' => [
      :index
    ]
  }

  menu :project_menu,
    :redcase, {
      controller: 'redcase',
      action: 'index'
    }, {
      if: proc { |p|
        can_view = User.current.allowed_to?(:view_test_cases, p)
        can_edit = User.current.allowed_to?(:edit_test_cases, p)
        tracker_exists = p.trackers.any? { |t| (t.name == 'Test case') }
        (can_view || can_edit) && tracker_exists
      },
      caption: 'Test cases',
      after: :new_issue
    }

  Rails.configuration.to_prepare do
    Issue.send :include, IssuePatch
    Project.send :include, ProjectPatch
    Version.send :include, VersionPatch
    User.send :include, UserPatch
  end
end

Rails.application.config.after_initialize do
  test_dependencies = { redmine_testing_gems: '1.1.1' }
  current_plugin = Redmine::Plugin.find(:redmine_redcaser)
  check_dependencies = proc do |plugin, version|
    begin
      current_plugin.requires_redmine_plugin(plugin, version)
    rescue Redmine::PluginNotFound => error
      raise Redmine::PluginNotFound,
        "Restrict Tracker depends on plugin: " \
          "#{ plugin } version: #{ version }"
    end
  end
  test_dependencies.each &check_dependencies if Rails.env.test?
end
