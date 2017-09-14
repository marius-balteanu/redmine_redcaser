# Code coverage setup.
require 'simplecov'

plugin_name      = 'redmine_redcaser'
plugin_directory = File.expand_path('../../', __FILE__)

SimpleCov.start 'rails' do
  add_group    'Libraries', 'lib'
  add_group    'Hooks', "lib/#{ plugin_name }/hooks"
  add_group    'Patches', "lib/#{ plugin_name }/patches"
  add_filter   '/spec/'
  add_filter   '/test/'
  add_filter   'init.rb'
  coverage_dir File.join(plugin_directory, 'tmp', 'coverage')
  root         plugin_directory
end

# Run coveralls only on travis.
if ENV.fetch('TRAVIS', false)
  require 'coveralls'

  Coveralls.wear!
end

# Redmine test helper.
require_relative '../../../test/test_helper.rb'

# Show the entire stack trace on error (a real life saver!).
Rails.backtrace_cleaner.remove_silencers!
