require 'spec_helper'

RSpec.describe 'routes for Redcaser Environments', type: :routing do
  it 'routes GET /projects/1/redcaser/environments/1 to show' do
    response = get('/projects/1/redcaser/environments/1')

    expect(response).to route_to(
      controller: 'redcaser/environments',
      action:     'show',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes POST /projects/1/redcaser/environments to create' do
    response = post('/projects/1/redcaser/environments')

    expect(response).to route_to(
      controller: 'redcaser/environments',
      action:     'create',
      project_id: '1'
    )
  end

  it 'routes PATCH /projects/1/redcaser/environments to update' do
    response = patch('/projects/1/redcaser/environments/1')

    expect(response).to route_to(
      controller: 'redcaser/environments',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes PUT /projects/1/redcaser/environments to update' do
    response = put('/projects/1/redcaser/environments/1')

    expect(response).to route_to(
      controller: 'redcaser/environments',
      action:     'update',
      project_id: '1',
      id:         '1'
    )
  end

  it 'routes DELETE /projects/1/redcaser/environments/1 to destroy' do
    response = delete('/projects/1/redcaser/environments/1')

    expect(response).to route_to(
      controller: 'redcaser/environments',
      action:     'destroy',
      project_id: '1',
      id:         '1'
    )
  end
end
