require 'spec_helper'

RSpec.describe 'routes for Redcaser Executionsuites', type: :routing do
  it 'routes GET /projects/1/redcaser/executionsuites to index' do
    response = get('/projects/1/redcaser/executionsuites')

    expect(response).to route_to(
      controller: 'redcaser/executionsuites',
      action:     'index',
      project_id: '1'
    )
  end

  it 'routes GET /projects/1/redcaser/executionsuites/1 to show' do
    response = get('/projects/1/redcaser/executionsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/executionsuites',
      action:     'show',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes POST /projects/1/redcaser/executionsuites to create' do
    response = post('/projects/1/redcaser/executionsuites')

    expect(response).to route_to(
      controller: 'redcaser/executionsuites',
      action:     'create',
      project_id: '1'
    )
  end

  it 'routes PATCH /projects/1/redcaser/executionsuites to update' do
    response = patch('/projects/1/redcaser/executionsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/executionsuites',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes PUT /projects/1/redcaser/executionsuites to update' do
    response = put('/projects/1/redcaser/executionsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/executionsuites',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes DELETE /projects/1/redcaser/executionsuites/1 to destroy' do
    response = delete('/projects/1/redcaser/executionsuites/1')

    expect(response).to route_to(
      controller: 'redcaser/executionsuites',
      action:     'destroy',
      project_id: '1',
      id:         '1'
    )
  end
end
