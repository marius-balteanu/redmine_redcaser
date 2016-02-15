desc 'Populates the redcaser tables with default data'
task 'redmine_redcaser:default_data' => :environment do
  ExecutionResult.create!(name: 'Passed', order: 1)
  ExecutionResult.create!(name: 'Failed', order: 2)
  ExecutionResult.create!(name: 'Blocked', order: 3)
  ExecutionResult.create!(name: 'Not Available', order:4)

  new_status = IssueStatus.where(
    name:      'New',
    is_closed: false
  ).first_or_create!

  active_status = IssueStatus.where(
    name:      'In Progress',
    is_closed: false
  ).first_or_create!

  obsolete_status = IssueStatus.where(
    name:      'Obsolete',
    is_closed: false
  ).first_or_create!

  tracker = Tracker.where(
    name:           'Test case',
    default_status: new_status
  ).first_or_create!

  Role.all.each do |role|
    WorkflowTransition.create!(
      tracker:    tracker,
      role:       role,
      old_status: new_status,
      new_status: active_status
    )
    WorkflowTransition.create!(
      tracker:    tracker,
      role:       role,
      old_status: active_status,
      new_status: new_status
    )
    WorkflowTransition.create!(
      tracker:    tracker,
      role:       role,
      old_status: active_status,
      new_status: obsolete_status
    )
    WorkflowTransition.create!(
      tracker:    tracker,
      role:       role,
      old_status: obsolete_status,
      new_status: new_status
    )
  end
end
