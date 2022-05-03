class TimeChangesController < ApplicationController
    def index
        render json: TimeChange.all
    end

    def show
        render json: TimeChange.find(params[:id])
    end

    def create
        render json: TimeChange.create!(time_change_params), status: :created
    end

    def update
        time_change = TimeChange.find(params[:id])
        time_change.update!(time_change_params)
        render json: alarm
    end

    def destroy
        TimeChange.find(params[:id]).destroy
        head :no_content
    end

    private

    def time_change_params
        params.permit(:alarm_id, :alarm_time, :alarm_date)
    end
end
