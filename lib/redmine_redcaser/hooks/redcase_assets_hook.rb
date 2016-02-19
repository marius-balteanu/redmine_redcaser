module RedmineRedcaser
  module Hooks
    class RedcaseAssetsHook < Redmine::Hook::ViewListener
      def view_layouts_base_html_head(context)
        controller = context[:controller]
        return '' unless controller.is_a?(RedcaserController)

        project = Project.find(controller.params[:id])
        return '' unless project.trackers.where(id: RedcaserSettings.tracker_id).first

        controller.render_to_string(partial: 'redmine_redcaser/header_assets', locals: { project: project })
      end
    end
  end
end
