module SetupSupport
  private

  def create_base_setup
    @status_new      = create :issue_status
    @status_active   = create :issue_status
    @status_obsolete = create :issue_status
    @tracker         = create :tracker, default_status: @status_new
  end

  def create_project_setup
    @author        = create :user
    @role          = create :role, :manager
    @priority      = create :issue_priority
    @status_open   = create :issue_status
    @status_closed = create :issue_status, is_closed: true
    @other_tracker = create :tracker, default_status_id: @status_open.id
    @project       = create :project

    @project.trackers = [@other_tracker]
    @project.save!

    member = create(
      :member,
      project_id: @project.id,
      role_ids:   [@role.id],
      user_id:    @author.id
    )
    create :member_role, member_id: member.id, role_id: @role.id
  end

  def create_base_setup_without_settings
    create_base_setup
    clear_plugin_settings
  end

  def create_base_setup_with_settings
    create_base_setup
    use_default_settings
  end

  def create_project_setup_without_settings
    create_project_setup
    clear_plugin_settings
  end

  def create_project_setup_with_settings
    create_base_setup
    create_project_setup

    @project.trackers << [@tracker]
    @project.save!

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
