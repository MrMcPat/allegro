class CreateTimeChanges < ActiveRecord::Migration[6.1]
  def change
    create_table :time_changes do |t|
      t.integer :alarm_id
      t.text :alarm_time, array: true, default: []
      t.text :alarm_date, array: true, default: []

      t.timestamps
    end
  end
end
