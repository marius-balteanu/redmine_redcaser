module RedmineRedcaser
  module Hooks
    class RedcaseAssetsHook < Redmine::Hook::ViewListener
      def view_layouts_base_html_head(context)
        controller = context[:controller]
        return '' unless controller.is_a?(RedcaserController)
        controller.render_to_string(partial: 'redmine_redcaser/header_assets')
      end
    end
  end
end
