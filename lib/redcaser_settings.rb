class RedcaserSettings
  def self.tracker_id
    setting = settings['tracker']
    setting.blank? ? nil : setting.to_i
  end

  def self.tracker_name
    tracker = Tracker.where(id: tracker_id).first
    tracker ? tracker.name : nil
  end

  def self.status_new_id
    setting = settings['status_new']
    setting.blank? ? nil : setting.to_i
  end

  def self.status_new_name
    status = IssueStatus.where(id: status_new_id).first
    status ? status.name : nil
  end

  def self.status_active_id
    setting = settings['status_active']
    setting.blank? ? nil : setting.to_i
  end

  def self.status_active_name
    status = IssueStatus.where(id: status_active_id).first
    status ? status.name : nil
  end

  def self.status_obsolete_id
    setting = settings['status_obsolete']
    setting.blank? ? nil : setting.to_i
  end

  def self.status_obsolete_name
    status = IssueStatus.where(id: status_obsolete_id).first
    status ? status.name : nil
  end

  private

  def self.settings
    @settings = Setting.plugin_redmine_redcaser
    @settings.blank? ? {} : @settings
  end
end
