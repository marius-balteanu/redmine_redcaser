# frozen_string_literal: true

class Redcaser::TestcasesController < RedcaserBaseController
  before_action :find_test_case, only: [:show, :update, :destroy]

  def show
    test_case = @test_case.to_json

    status = TestCaseStatus.includes(:execution_result)
      .find_by(test_case_id: @test_case.id, execution_suite: params[:execution_suite_id])

    if status
      name = status.execution_result_id ? status.execution_result.name : ''
      test_case['status'] = {id: status.execution_result_id, test_case_status_id: status.id, name: name}
    end

    render json: {
      test_case: test_case,
      journals:  @test_case.journals(params[:execution_suite_id])
    }
  end

  def update
    @test_case.assign_attributes(test_case_params)

    if @test_case.save
      render json: {success: 'Test Case updated'}
    else
      render json: {errors: @test_case.errors.full_messages}, status: 400
    end
  end

  def destroy
    if @test_case.destroy
      render json: {success: 'Test Case deleted'}
    else
      render json: {errors: @test_case.errors.full_messages}, status: 400
    end
  end

  private

  def test_case_params
    params.require(:test_case).permit(:test_suite_id)
  end

  def find_test_case
    @test_case = TestCase.where(id: params[:id]).first

    unless @test_case
      render json: {error: 'Test Case not found'}, status: 404
    end
  end
end
