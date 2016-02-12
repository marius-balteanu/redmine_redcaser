require 'spec_helper'

describe User, type: :model do
  it 'is patched with RedmineRedcaser::Patches::UserPatch' do
    patch = RedmineRedcaser::Patches::UserPatch
    expect(User.included_modules).to include(patch)
  end
end
