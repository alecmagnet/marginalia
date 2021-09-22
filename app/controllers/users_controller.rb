class UsersController < ApplicationController
	skip_before_action :authorize, only: [:create, :auth_show]

	# POST /signup
	def create
		user = User.create!(user_params)
		session[:user_id] = user.id
		render json: user, status: :created 
	end

	# GET /auth
	def auth_show
		user = User.find_by(id: session[:user_id])
		if user
			render json: user, status: :created
		else
			render json: { errors: ["Not authorized"] }, status: :unauthorized
		end
	end

	# GET /users
	def index
		users = User.all 
		render json: users, status: :ok
	end

	# GET /users/:id
	def show 
		user = find_user
		render json: user, status: :ok
	end

	# PATCH /users/:id
	def update
		user = find_user
		user.update!(user_params)
		render json: user, status: :accepted
	end

	# DELETE /users/:id
	def destroy
		user = find_user
		if user.id == session[:user_id]
			user.destroy
			session.delete :user_id
			head :no_content
		else
			render json: { errors: ["Not authorized: You can only delete your own account"] }, status: :unauthorized
		end
	end

	private

	def user_params
		params.permit(:username, :password, :fullname, :image, :birthdate, :bio)
		.with_defaults(image: "../../img/owl-wizard-avatar.jpeg")
		
	end

	def find_user
		User.find(params[:id])
	end

	def find_session_user
		User.find_by(id: session[:user_id])
	end

end
