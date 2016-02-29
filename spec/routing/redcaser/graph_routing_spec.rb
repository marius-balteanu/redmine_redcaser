require 'spec_helper'

RSpec.describe 'routes for Redcaser Graph', type: :routing do
  it 'routes GET /projects/1/redcaser/graph/1 to show' do
    response = get('/projects/1/redcaser/graph/1')

    expect(response).to route_to(
      controller: 'redcaser/graph',
      action:     'show',
      project_id: '1',
      id:         '1'
    )
  end
end
