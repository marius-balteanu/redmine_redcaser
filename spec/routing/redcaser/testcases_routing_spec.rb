require 'spec_helper'

RSpec.describe 'routes for Redcaser Testcases', type: :routing do
  it 'routes GET /projects/1/redcaser/testcases to index' do
    response = get('/projects/1/redcaser/testcases')

    expect(response).to route_to(
      controller: 'redcaser/testcases',
      action:     'index',
      project_id: '1'
    )
  end

  it 'routes PATCH /projects/1/redcaser/testcases to update' do
    response = patch('/projects/1/redcaser/testcases/1')

    expect(response).to route_to(
      controller: 'redcaser/testcases',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes PUT /projects/1/redcaser/testcases to update' do
    response = put('/projects/1/redcaser/testcases/1')

    expect(response).to route_to(
      controller: 'redcaser/testcases',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes POST /projects/1/redcaser/testcases/1/copy to copy' do
    response = post('/projects/1/redcaser/testcases/1/copy')

    expect(response).to route_to(
      controller: 'redcaser/testcases',
      action:     'copy',
      project_id: '1',
      id:         '1'
    )
  end
end
