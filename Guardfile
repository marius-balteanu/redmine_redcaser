# A sample Guardfile
# More info at https://github.com/guard/guard#readme

## Uncomment and set this to only include directories you want to watch
# directories %w(app lib config test spec features) \
#  .select{|d| Dir.exists?(d) ? d : UI.warning("Directory #{d} does not exist")}

## Note: if you are using the `directories` clause above and you are not
## watching the project directory ('.'), then you will want to move
## the Guardfile to a watched dir and symlink it back, e.g.
#
#  $ mkdir config
#  $ mv Guardfile config/
#  $ ln -s config/Guardfile .
#
# and, you'll have to watch "config/Guardfile" instead of "Guardfile"

clearing :on

guard 'rake', task: 'test' do
  # Code
  watch(%r{app/controllers/.*_controller.rb})
  watch(%r{app/helpers/.*_helper.rb})
  watch(%r{app/models/.*.rb})

  watch(%r{lib/redmine_redcaser/patches/.*_patch.rb})

  # Tests
  watch(%r{test/functional/.*_test.rb})
  watch(%r{test/integration/.*_test.rb})
  watch(%r{test/unit/.*_test.rb})

  watch(%r{test/factories/.*.rb})
  watch(%r{test/support/.*_support.rb})

  # Gemfile
  watch(%r{Gemfile})

  # Guardfile
  watch(%r{Guardfile})

  # Rakefile
  watch(%r{Rakefile})
end
