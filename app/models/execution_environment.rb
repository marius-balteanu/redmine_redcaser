class ExecutionEnvironment < ActiveRecord::Base
  belongs_to :project

  validates :name, length: { minimum: 3, maximum: 128 }

  def self.get_default_for_project(project)
    env = ExecutionEnvironment.where({ project_id: project.id }).first
    if env.nil?
      env = ExecutionEnvironment.create(
        name: 'Default',
        description: 'Default environment',
        project: project
      )
    end
    env
  end
end
