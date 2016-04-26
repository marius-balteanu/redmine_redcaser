class Redcaser::TestsuitesController < RedcaserBaseController
  def index
    testsuites = TestSuite.for_project(@project).to_json

    render json: testsuites
  end

  def create
    created = TestSuite.create(
      name: params[:name],
      parent_id: params[:parent_id]
    )
    render json: created.to_json(view_context)
  end

  def update
    testSuite = TestSuite.find(params[:id])
    testSuite.parent = TestSuite.find(
      params[:parent_id]
    ) unless params[:parent_id].nil?
    testSuite.name = params[:new_name] unless (params[:new_name].nil?)
    testSuite.save
    # TODO: Properly handle if failed.
    render json: { success: true }
  end

  def destroy
    TestSuite.destroy(params[:id])
    # TODO: Properly handle if failed.
    render json: { success: true }
  end
end
