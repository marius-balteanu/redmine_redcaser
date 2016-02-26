require 'spec_helper'

RSpec.describe 'routes for Redcaser', type: :routing do
  it 'routes /projects/1/redcaser to the redcase controller' do
    response = get('/projects/1/redcaser')

    expect(response).to route_to(
      controller: 'redcaser',
      action:     'index',
      id:         '1'
    )
  end

  it 'routes /projects/1/redcaser/attachment_urls to the redcase controller' do
    response = get('/projects/1/redcaser/attachment_urls')

    expect(response).to route_to(
      controller: 'redcaser',
      action:     'attachment_urls',
      id:         '1'
    )
  end
end
