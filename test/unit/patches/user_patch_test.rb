require_relative '../../test_helper.rb'

class UserPatchTest < ActiveSupport::TestCase
  def test_patch_is_included
    patch = RedmineRedcaser::Patches::UserPatch

    assert_includes User.included_modules, patch
  end
end
