class AlarmSerializer < ActiveModel::Serializer
  attributes :id, :alarm_before, :alarm_after, :increment, :alarm_name
end
