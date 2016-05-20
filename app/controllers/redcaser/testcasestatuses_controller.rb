class Redcaser::TestcasestatusesController < RedcaserBaseController
  before_action :find_test_case_status, only: :update

  def create
    @test_case_status = TestCaseStatus.new(test_case_status_params)

    if @test_case_status.save
      comment = params[:comment] || ''
      issue   = @test_case_status.test_case.issue
      journal = issue.init_journal(User.current, comment)

      execution_suite = ExecutionSuite.where(
          id: test_case_status_params[:execution_suite_id]
        ).first

      value = @test_case_status.execution_result.name +
        ' (Execution suite: ' +
        execution_suite.name +
        ')'

      journal.details << JournalDetail.new(
        prop_key:  'test_case_status_name',
        property:  'attr',
        value:     value
      )

      if journal.save
        render json: {success: 'Test Case Status created'}
      else
        render json: {errors: journal.errors.full_messages}, status: 400
      end
    else
      render json: {errors: @test_case_status.errors.full_messages}, status: 400
    end
  end

  def update
    old_result = @test_case_status.execution_result

    @test_case_status.assign_attributes(test_case_status_params)

    if @test_case_status.save
      comment = params[:comment] || ''
      issue   = @test_case_status.test_case.issue
      journal = issue.init_journal(User.current, comment)

      execution_suite = ExecutionSuite.where(
          id: test_case_status_params[:execution_suite_id]
        ).first

      value = @test_case_status.execution_result.name +
        ' (Execution suite: ' + execution_suite.name + ')'

      if old_result.id != @test_case_status.execution_result_id
        journal.details << JournalDetail.new(
          old_value: old_result.name,
          prop_key:  'test_case_status_name',
          property:  'attr',
          value:     value
        )
      end

      if journal.save
        render json: {success: 'Test Case Status updated'}
      else
        render json: {errors: journal.errors.full_messages, entity: 'Journal'}, status: 400
      end
    else
      render json: {errors: @test_case_status.errors.full_messages, entity: 'TestCaseStatus'}, status: 400
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

    render json: {errors: ['Test Case Status not found'], entity: 'TestCaseStatus'}, status: 404
  end
end
