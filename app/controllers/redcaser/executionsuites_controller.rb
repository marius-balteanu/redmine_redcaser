# frozen_string_literal: true

class Redcaser::ExecutionsuitesController < RedcaserBaseController
  def index
    @execution_suites = ExecutionSuite.all

    render json: @execution_suites
  end
end
