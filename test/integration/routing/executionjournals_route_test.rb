require_relative '../../test_helper.rb'

class ExecutionjournalsRouteTest < ActionDispatch::IntegrationTest
  def test_index
    assert_routing('/projects/1/redcaser/executionjournals',
      controller: 'redcaser/executionjournals',
      action:     'index',
      project_id: '1'
    )
  end
end
