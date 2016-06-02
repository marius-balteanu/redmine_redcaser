namespace :redmine_redcaser do
  desc 'Creates default statuses'
  task statuses: :environment do
    ExecutionResult.create!(name: 'Passed', order_number: 1)
    ExecutionResult.create!(name: 'Failed', order_number: 2)
    ExecutionResult.create!(name: 'Blocked', order_number: 3)
  end

  desc 'Populates the redcaser tables with default data'
  task default_data: :environment do
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

  task rename_root: :environment do
    TestSuite.includes(:project).where(name: 'Root').find_each do |test_suite|
      project = test_suite.project

      test_suite.name = project.name if project
      test_suite.save!
    end
  end

  desc 'Adds project ids to test cases'
  task project_ids: :environment do
    TestCase.includes(:test_suite).find_each do |test_case|
      test_case.project_id = test_case.test_suite.project_id

      test_case.save!
    end
  end
end
