require 'spec_helper'

describe Issue, type: :model do
  it 'is patched with RedmineRedcaser::Patches::IssuePatch' do
    patch = RedmineRedcaser::Patches::IssuePatch
    expect(Issue.included_modules).to include(patch)
  end
end
