class ApplicationController < ActionController::API

	include ActionController::Cookies

	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

	before_action :authorize

	wrap_parameters format: []

	
	private

	def render_not_found_response(exception)
		render json: { errors: ["#{exception.model} not found"] }, status: :not_found 
	end

	def render_unprocessable_entity_response(invalid)
		render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity 
	end

	def authorize
    return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id		
	end

end
