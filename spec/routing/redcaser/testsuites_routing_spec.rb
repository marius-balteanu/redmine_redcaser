require 'spec_helper'

RSpec.describe 'routes for Redcaser Testsuites', type: :routing do
  it 'routes GET /projects/1/redcaser/testsuites to index' do
    response = get('/projects/1/redcaser/testsuites')

    expect(response).to route_to(
      controller: 'redcaser/testsuites',
      action:     'index',
      project_id: '1'
    )
  end

  it 'routes POST /projects/1/redcaser/testsuites to create' do
    response = post('/projects/1/redcaser/testsuites')

    expect(response).to route_to(
      controller: 'redcaser/testsuites',
      action:     'create',
      project_id: '1'
    )
  end

  it 'routes PATCH /projects/1/redcaser/testsuites to update' do
    response = patch('/projects/1/redcaser/testsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/testsuites',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes PUT /projects/1/redcaser/testsuites to update' do
    response = put('/projects/1/redcaser/testsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/testsuites',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes DELETE /projects/1/redcaser/testsuites/1 to destroy' do
    response = delete('/projects/1/redcaser/testsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/testsuites',
      action:     'destroy',
      project_id: '1',
      id:         '1'
    )
  end
end
