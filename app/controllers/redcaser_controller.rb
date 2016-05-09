# frozen_string_literal: true

class RedcaserController < RedcaserBaseController
  helper RedcaserHelper

  def index
    @version = Version
      .order('created_on desc')
      .find_by_project_id(@project.id)
  end

  def attachment_urls
    issue = Issue.find(params[:issue_id])
    result =  issue.attachments.collect { |a| {
      url: url_for(
        # TODO: This probably will fail if Redmine is running not in the
        #       root context. Shouldn't we remove '/'?
        controller: '/attachments',
        action: :show,
        id: a.id
      ),
      name: a.filename
    } }
    render json: result
  end
end
