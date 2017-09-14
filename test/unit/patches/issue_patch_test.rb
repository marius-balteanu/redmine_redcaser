require_relative '../../test_helper.rb'

class IssuePatchTest < ActiveSupport::TestCase
  def test_patch_is_included
    patch = RedmineRedcaser::Patches::IssuePatch

    assert_includes Issue.included_modules, patch
  end
end
