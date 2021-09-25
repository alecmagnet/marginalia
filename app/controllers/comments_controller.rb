class CommentsController < ApplicationController

	# GET /comments
	def index
		comments = Comment.all 
		render json: comments, status: :ok
	end

	# GET /comments/:id
	def show 
		comment = find_comment
		render json: comment, status: :ok
	end

	# POST /comments
	def create
		comment = Comment.create!(comment_params)
		render json: comment, status: :created
	end

	# PATCH /comments/:id
	def update
		comment = find_comment
		comment.update!(comment_params)
		render json: comment, status: :accepted
	end

	# DELETE /comments/:id
	def destroy
		comment = find_comment
		comment.destroy
		session.delete :comment_id
		head :no_content
	end

	private

	def comment_params
		params.permit(:user_id, :lit_text_id, :parent_comment_id, :content, :rating ).with_defaults(rating: 0)
	end

	def find_comment
		Comment.find(params[:id])
	end


end
