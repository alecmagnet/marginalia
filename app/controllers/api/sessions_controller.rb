class Api::SessionsController < ApplicationController
	skip_before_action :authorize, only: [:create]

	# POST /login
	def create
		user = User.find_by(username: params[:username])
		if user&.authenticate(params[:password])
			session[:user_id] = user.id 
			render json: user, status: :created
		else
			render json: { errors: ["Invalid username or password"] }, status: :unauthorized
		end
	end

	# DELETE /logout
	def destroy
		if session[:user_id]
			session.delete :user_id
			head :no_content
		else
			render json: { errors: ["You must be logged in to log out"] }
		end
	end
end
