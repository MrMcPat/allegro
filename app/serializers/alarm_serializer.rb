class AlarmSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :alarm_before, :alarm_after, :alarm_increment, :alarm_name, :is_disabled, :updated_at
end
