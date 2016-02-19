require 'application_helper'

module RedcaserHelper
  def get_id_or_default(obj, default_value)
    if obj.respond_to?(:id)
      return obj.id
    else
      return default_value
    end
  end

  module_function :get_id_or_default

  def get_plugin_tabs(project)
    unless Version.where({ project_id: project.id }).exists?
      [{
        name: 'Management',
        partial: 'redcaser/management',
        label: :label_test_case_management
      }]
    else
      can_edit = User.current.allowed_to?(:edit_test_cases, project)
      can_execute = User.current.allowed_to?(:execute_test_cases, project)
      can_view = User.current.allowed_to?(:view_test_cases, project)

      tabs = []

      if can_edit
        tabs << {
          name:    'Management',
          partial: 'redcaser/management',
          label:   :label_test_case_management
        }
      end

      if can_execute
        tabs << {
          name:    'Execution',
          partial: 'redcaser/execution',
          label:   :label_test_case_execution
        }
      end

      if can_edit || can_execute || can_view
        tabs << {
          name:    'Report',
          partial: 'redcaser/report',
          label:   :label_test_case_report
        }
      end

      tabs
    end
  end
end
