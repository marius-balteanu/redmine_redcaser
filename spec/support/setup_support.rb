module SetupSupport
  private

  def create_base_setup
    @status_new      = create :issue_status
    @status_active   = create :issue_status
    @status_obsolete = create :issue_status
    @tracker         = create :tracker, default_status: @status_new
  end

  def create_base_setup_without_settings
    create_base_setup
    clear_plugin_settings
  end

  def create_base_setup_with_settings
    create_base_setup
    use_default_settings
  end

  def clear_plugin_settings
    Setting.plugin_redmine_redcaser = nil
  end

  def use_default_settings
    Setting.plugin_redmine_redcaser = ActionController::Parameters.new(
      status_new:      @status_new.id.to_s,
      status_active:   @status_active.id.to_s,
      status_obsolete: @status_obsolete.id.to_s,
      tracker:         @tracker.id.to_s
    )
  end
end
