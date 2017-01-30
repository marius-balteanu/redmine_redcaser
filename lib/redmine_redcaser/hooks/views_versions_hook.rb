module RedmineRedcaser
  module Hooks
    class ViewsVersionsHook < Redmine::Hook::ViewListener

      render_on :view_projects_roadmap_version_bottom, :partial => "versions/test_execution_stats"
    end
  end
end