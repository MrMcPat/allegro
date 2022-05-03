class CreateTimeChanges < ActiveRecord::Migration[6.1]
  def change
    create_table :time_changes do |t|
      t.integer :alarm_id
      t.string :alarm_time
      t.string :alarm_date

      t.timestamps
    end
  end
end
