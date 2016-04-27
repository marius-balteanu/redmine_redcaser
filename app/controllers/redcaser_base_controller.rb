# frozen_string_literal: true

class RedcaserBaseController < ApplicationController
  before_action :find_project, :authorize, :check_project_tracker

  private

  def find_project
    project_id = params[:project_id] || params[:id]
    @project = Project.find(project_id)
  end

  def check_project_tracker
    @tracker = @project.trackers.where(id: RedcaserSettings.tracker_id).first
    can_view = User.current.allowed_to?(:view_test_cases, @project)
    can_edit = User.current.allowed_to?(:edit_test_cases, @project)
    render_403 unless @tracker && (can_view || can_edit)
  end
end
