require 'spec_helper'

RSpec.describe 'routes for Redcaser Combos', type: :routing do
  it 'routes GET /projects/1/redcaser/combos to index' do
    response = get('/projects/1/redcaser/combos')

    expect(response).to route_to(
      controller: 'redcaser/combos',
      action:     'index',
      project_id: '1'
    )
  end
end
