# frozen_string_literal: true

require 'rake/testtask'

Rake::TestTask.new('test') do |t|
  t.pattern = "test/**/*_test.rb"
end

Rake::TestTask.new('test:unit') do |t|
  t.pattern = "test/unit/**/*_test.rb"
end

Rake::TestTask.new('test:functional') do |t|
  t.pattern = "test/functional/**/*_test.rb"
end

Rake::TestTask.new('test:integration') do |t|
  t.pattern = "test/integration/**/*_test.rb"
end
