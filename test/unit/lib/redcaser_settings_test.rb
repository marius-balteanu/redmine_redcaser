require_relative '../../test_helper.rb'

class RedcaserSettingsTest < ActiveSupport::TestCase
  def test_inital_settings_are_nil
    assert_nil RedcaserSettings.tracker_id
    assert_nil RedcaserSettings.tracker_name
    assert_nil RedcaserSettings.status_new_id
    assert_nil RedcaserSettings.status_new_name
    assert_nil RedcaserSettings.status_active_id
    assert_nil RedcaserSettings.status_active_name
    assert_nil RedcaserSettings.status_obsolete_id
    assert_nil RedcaserSettings.status_obsolete_name
    assert_nil RedcaserSettings.tracker_id
    assert_nil RedcaserSettings.tracker_name
    assert_nil RedcaserSettings.status_new_id
    assert_nil RedcaserSettings.status_new_name
    assert_nil RedcaserSettings.status_active_id
    assert_nil RedcaserSettings.status_active_name
    assert_nil RedcaserSettings.status_obsolete_id
    assert_nil RedcaserSettings.status_obsolete_name
  end
end
