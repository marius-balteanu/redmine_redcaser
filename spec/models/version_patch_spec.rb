require 'spec_helper'

describe Version, type: :model do
  it 'is patched with RedmineRedcaser::Patches::VersionPatch' do
    patch = RedmineRedcaser::Patches::VersionPatch
    expect(Version.included_modules).to include(patch)
  end
end
