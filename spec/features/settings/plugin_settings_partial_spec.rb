require 'spec_helper'

describe 'plugin settings page', type: :feature do
  include LoginSupport
  include SetupSupport

  let(:admin) { create :user, :admin }

  context 'without trackers and statuses' do
    it 'displays without error' do
      ui_login_user(admin.login, 'admin')

      visit '/settings/plugin/redmine_redcaser'

      expect(page)
        .to have_select('settings_tracker', options: [''])
      expect(page)
        .to have_select('settings_status_new', options: [''])
      expect(page)
        .to have_select('settings_status_active', options: [''])
      expect(page)
        .to have_select('settings_status_obsolete', options: [''])
    end
  end

  context 'with trackers and statuses' do
    it 'displays without error' do
      create_base_setup_with_settings

      ui_login_user(admin.login, 'admin')

      visit '/settings/plugin/redmine_redcaser'

      expect(page).to have_select('settings_tracker', selected: @tracker.name)
      expect(page).to have_select(
          'settings_status_new',
          selected: @status_new.name
        )
      expect(page).to have_select(
          'settings_status_active',
          selected: @status_active.name
        )
      expect(page).to have_select(
          'settings_status_obsolete',
          selected: @status_obsolete.name
        )
    end
  end
end
