FactoryGirl.define do
  factory :workflow_permission do
    type "WorkflowPermission"
    assignee false
    author false
    new_status_id 0
  end
end
