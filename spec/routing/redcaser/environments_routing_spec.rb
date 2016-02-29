require 'spec_helper'

RSpec.describe 'routes for Redcaser Executionjournals', type: :routing do
  it 'routes GET /projects/1/redcaser/executionjournals to index' do
    response = get('/projects/1/redcaser/executionjournals')

    expect(response).to route_to(
      controller: 'redcaser/executionjournals',
      action:     'index',
      project_id: '1'
    )
  end
end
