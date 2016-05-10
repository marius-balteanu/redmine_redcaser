class Redcaser::TestcasestatusesController < RedcaserBaseController
  before_action :find_test_case_status, only: :update

  def create
    @test_case_status = TestCaseStatus.new(test_case_status_params)

    if @test_case_status.save
      render json: {success: 'Test Case Status created'}
    else
      render json: {errors: @test_case_status.error_messages}, status: 400
    end
  end

  def update
    @test_case_status.assign_attributes(test_case_status_params)

    if @test_case_status.save
      render json: {success: 'Test Case Status updated'}
    else
      render json: {errors: @test_case_status.error_messages}, status: 400
    end
  end

  private

  def test_case_status_params
    params.require(:test_case_status).permit(
      :execution_result_id, :execution_suite_id, :test_case_id
    )
  end

  def find_test_case_status
    @test_case_status = TestCaseStatus.where(id: params[:id]).first
    return if @test_case_status

    render json: {errors: ['Test Case Status not found']}, status: 404
  end
end
