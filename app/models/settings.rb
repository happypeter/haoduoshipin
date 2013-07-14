# encoding: utf-8

class Settings < Settingslogic
  source "#{Rails.root}/config/settings.yml"
  namespace Rails.env
end

