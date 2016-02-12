require 'spec_helper'

describe Project, type: :model do
  it 'is patched with RedmineRedcaser::Patches::ProjectPatch' do
    patch = RedmineRedcaser::Patches::ProjectPatch
    expect(Project.included_modules).to include(patch)
  end
end
