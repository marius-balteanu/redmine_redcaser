# frozen_string_literal: true

class Redcaser::QuerytestcasesController < RedcaserBaseController
  before_action :find_query

  def show
    render json: {success: true}
  end

  private

  def find_query
    @query = Query.where(id: params[:id]).first

    return if @query
    render json: {errors: ['Query not found']}, status: 404
  end
end
