class Redcaser::TestcasestatusesController < RedcaserBaseController
  before_action :find_test_case_status, only: :update

  def create
    @test_case_status = TestCaseStatus.new(test_case_status_params)

    if @test_case_status.save
      comment = params[:comment] || ''
      issue   = @test_case_status.test_case.issue
      journal = issue.init_journal(User.current, comment)

      journal.details << JournalDetail.new(
        prop_key:  'test_case_status_name',
        property:  'attr',
        value:     @test_case_status.execution_result.name
      )

      if journal.save
        render json: {success: 'Test Case Status created'}
      else
        render json: {errors: journal.error_messages}, status: 400
      end
    else
      render json: {errors: @test_case_status.error_messages}, status: 400
    end
  end

  def update
    old_status = @test_case_status.execution_result

    @test_case_status.assign_attributes(test_case_status_params)

    if @test_case_status.save
      comment = params[:comment] || ''
      issue   = @test_case_status.test_case.issue
      journal = issue.init_journal(User.current, comment)

      if old_status.id != @test_case_status.execution_result_id
        journal.details << JournalDetail.new(
          old_value: old_status.name,
          prop_key:  'test_case_status_name',
          property:  'attr',
          value:     @test_case_status.execution_result.name
        )
      end

      if journal.save
        render json: {success: 'Test Case Status updated'}
      else
        render json: {errors: journal.error_messages}, status: 400
      end
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
