class CreateAlarms < ActiveRecord::Migration[6.1]
  def change
    create_table :alarms do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.string :alarm_before
      t.string :alarm_after
      t.integer :alarm_increment
      t.string :alarm_name
      t.boolean :is_disabled

      t.timestamps
    end
  end
end
