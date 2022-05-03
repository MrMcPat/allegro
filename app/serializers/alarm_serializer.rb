class AlarmSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :alarm_before, :alarm_after, :increment, :alarm_name, :updated_at
end
