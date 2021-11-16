class Api::CommentsController < ApplicationController
	skip_before_action :authorize, only: [:recent, :index, :show]

	# GET /recent-comments
	def recent
		last_coms = Comment.last(12)
		comments = last_coms.filter{|com| com.deleted == false}
		# comments = Comment.last(9)
		render json: comments, each_serializer: RecentCommentSerializer, status: :ok
	end

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
		if params["com_type_ids"].length > 0
			params["com_type_ids"].each {|c| CommentComType.create!(comment_id: comment.id, com_type_id: c)}
		end
		render json: comment, status: :created
	end

	# PATCH /comments/:id
	def update
		comment = find_comment
		comment.update!(comment_params)
		ids_arr = comment.com_types.map {|t| t.id}
		params["com_type_ids"].each do |c|
			if !ids_arr.include?(c)
				CommentComType.create!(comment_id: comment.id, com_type_id: c)
			end
		end
		ids_arr.each do |id|
			if !params["com_type_ids"].include?(id)
				CommentComType.find_by!(comment_id: comment.id, com_type_id: id).destroy
			end
		end
		renderComment = find_comment
		render json: renderComment, status: :ok
	end

	# DELETE /comments/:id
	def destroy
		comment = find_comment
		if comment.replies.length > 0 || comment.parent_comment_id
			comment.update!(deleted: true)
			render json: comment, status: :ok
		else
			comment.destroy
			head :no_content
		end
	end

	private

	def comment_params
		params.permit(:user_id, :lit_text_id, :parent_comment_id, :content, :rating, :deleted, :com_type_ids ).with_defaults(rating: 0, deleted: false)
	end

	def find_comment
		Comment.find(params[:id])
	end
end
