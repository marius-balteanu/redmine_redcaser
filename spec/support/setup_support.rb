module SetupSupport
  private

  def create_base_setup
  end

  def create_base_setup_without_settings
    create_base_setup
    Setting.plugin_redmine_redcaser = nil
  end

  def create_base_setup_with_settings
    create_base_setup
    Setting.plugin_redmine_redcaser = {}
  end
end
