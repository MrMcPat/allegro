class TimeChangeSerializer < ActiveModel::Serializer
  attributes :id, :alarm_id, :alarm_time, :alarm_date
end
