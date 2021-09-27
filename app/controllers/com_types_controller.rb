class ComTypesController < ApplicationController

	# GET /com_types
	def index
		com_types = ComType.all 
		render json: com_types, status: :ok
	end

	# GET /com_types/:id
	def show 
		com_type = find_com_type
		render json: com_type, status: :ok
	end

	# POST /com_types
	def create
		com_type = ComType.create!(com_type_params)
		render json: com_type, status: :created
	end

	# PATCH /com_types/:id
	def update
		com_type = find_com_type
		com_type.update!(com_type_params)
		render json: com_type, status: :ok
	end

	# DELETE /com_types/:id
	def destroy
		com_type = find_com_type
		com_type.destroy
		head :no_content
	end

	private

	def com_type_params
		params.permit(:name)
	end

	def find_com_type
		ComType.find(params[:id])
	end

end
