class CommentComTypesController < ApplicationController
		# GET /comment_com_types
	def index
		comment_com_types = CommentComType.all 
		render json: comment_com_types, status: :ok
	end

	# GET /comment_com_types/:id
	def show 
		comment_com_type = find_comment_com_type
		render json: comment_com_type, status: :ok
	end

	# POST /comment_com_types
	def create
		comment_com_type = CommentComType.create!(comment_com_type_params)
		render json: comment_com_type, status: :created
	end

	# PATCH /comment_com_types/:id
	def update
		comment_com_type = find_comment_com_type
		comment_com_type.update!(comment_com_type_params)
		render json: comment_com_type, status: :ok
	end

	# DELETE /comment_com_types/:id
	def destroy
		comment_com_type = find_comment_com_type
		comment_com_type.destroy
		head :no_content
	end

	private

	def comment_com_type_params
		params.permit(:comment_id, :com_type_id)
	end

	def find_comment_com_type
		CommentComType.find(params[:id])
	end

end
