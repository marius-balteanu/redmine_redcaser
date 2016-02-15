class RedcaserSettings
  def self.tracker_id
    setting = settings['tracker']
    setting.blank? ? nil : setting.to_i
  end

  def self.status_new_id
    setting = settings['status_new']
    setting.blank? ? nil : setting.to_i
  end

  def self.status_active_id
    setting = settings['status_active']
    setting.blank? ? nil : setting.to_i
  end

  def self.status_obsolete_id
    setting = settings['status_obsolete']
    setting.blank? ? nil : setting.to_i
  end

  private

  def self.settings
    @settings = Setting.plugin_redmine_redcaser
    @settings.blank? ? {} : @settings
  end
end
