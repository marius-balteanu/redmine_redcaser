require 'spec_helper'

RSpec.describe 'routes for Redcaser Export', type: :routing do
  it 'routes GET /projects/1/redcaser/export to index' do
    response = get('/projects/1/redcaser/export')

    expect(response).to route_to(
      controller: 'redcaser/export',
      action:     'index',
      project_id: '1'
    )
  end
end
