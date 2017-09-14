require_relative '../../test_helper.rb'

class ProjectPatchTest < ActiveSupport::TestCase
  def test_patch_is_included
    patch = RedmineRedcaser::Patches::ProjectPatch

    assert_includes Project.included_modules, patch
  end
end
