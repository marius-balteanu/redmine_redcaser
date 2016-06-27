# frozen_string_literal: true

ActionDispatch::Callbacks.to_prepare do
  paths = '/lib/redmine_redcaser/{patches/*_patch,hooks/*_hook}.rb'
  Dir.glob(File.dirname(__FILE__) + paths).each do |file|
    require_dependency file
  end
end

Redmine::Plugin.register :redmine_redcaser do
  name        'Redmine Redcaser'
  description 'Test cases management plugin for Redmine'
  author      'Zitec'
  version     '0.0.1'

  requires_redmine version_or_higher: '3.0.0'

  settings partial: 'redmine_redcaser/plugin_settings'

  permission :view_test_cases, {
    redcaser:                       [:index, :attachment_urls],
    'redcaser/environments'      => [:show],
    'redcaser/testsuites'        => [:index],
    'redcaser/testcases'         => [:show],
    'redcaser/executionjournals' => [:index],
    'redcaser/export'            => [:index],
    'redcaser/executionsuites'   => [:index, :show],
    'redcaser/graph'             => [:show],
    'redcaser/combos'            => [:index]
  }

  permission :edit_test_cases, {
    redcaser:                       [:index, :attachment_urls],
    'redcaser/environments'      => [:index, :show, :new, :edit, :update, :destroy, :create],
    'redcaser/testsuites'        => [:index, :new, :edit, :update, :destroy, :create],
    'redcaser/testcases'         => [:show, :update, :destroy],
    'redcaser/testcasestatuses'  => [:create, :update],
    'redcaser/querytestcases'    => [:show],
    'redcaser/executionjournals' => [:index],
    'redcaser/export'            => [:index],
    'redcaser/executionsuites'   => [:index, :new, :edit, :update, :destroy, :create, :show],
    'redcaser/graph'             => [:show],
    'redcaser/combos'            => [:index]
  }

  permission :execute_test_cases, {
    redcaser:                       [:index, :attachment_urls],
    'redcaser/environments'      => [:show],
    'redcaser/testsuites'        => [:index],
    'redcaser/testcases'         => [:index, :update],
    'redcaser/executionjournals' => [:index],
    'redcaser/export'            => [:index],
    'redcaser/executionsuites'   => [:index]
  }

  menu :project_menu,
    :redcaser,
    {
      controller: 'redcaser',
      action:     'index'
    },
    {
      if: proc { |project|
        can_view = User.current.allowed_to?(:view_test_cases, project)
        can_edit = User.current.allowed_to?(:edit_test_cases, project)

        tracker_exists = project.trackers.where(id: RedcaserSettings.tracker_id).exists?

        (can_view || can_edit) && tracker_exists
      },
      caption: proc { RedcaserSettings.tracker_name.pluralize },
      after: :new_issue
    }
end

Rails.application.config.after_initialize do
  test_dependencies = {redmine_testing_gems: '1.3.2'}
  current_plugin = Redmine::Plugin.find(:redmine_redcaser)
  check_dependencies = proc do |plugin, version|
    begin
      current_plugin.requires_redmine_plugin(plugin, version)
    rescue Redmine::PluginNotFound
      raise Redmine::PluginNotFound,
        "Redmine Redcaser depends on plugin: #{plugin} version: #{version}"
    end
  end
  test_dependencies.each(&check_dependencies) if Rails.env.test?
end
