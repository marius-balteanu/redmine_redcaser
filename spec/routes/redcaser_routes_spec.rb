require 'spec_helper'

RSpec.describe 'routes for Redcaser', type: :routing do
  it 'routes /projects/1/redcaser to the redcase controller' do
    response = get('/projects/1/redcaser')

    expect(response).to route_to(
      controller: 'redcase',
      action:     'index',
      id:         '1'
    )
  end

  it 'routes /projects/1/redcaser/get_attachment_urls to the redcase controller' do
    response = get('/projects/1/redcaser/get_attachment_urls')

    expect(response).to route_to(
      controller: 'redcase',
      action:     'get_attachment_urls',
      id:         '1'
    )
  end
end
