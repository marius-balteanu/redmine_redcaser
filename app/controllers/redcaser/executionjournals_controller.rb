# frozen_string_literal: true

class Redcaser::ExecutionjournalsController < RedcaserBaseController
  def index
    journals =
      if !params[:issue_id].nil?
        ExecutionJournal.where(issue_id: params[:issue_id])
      else
        ExecutionJournal.order('created_on desc')
      end
    render json: journals.map(&:to_json)
  end
end
