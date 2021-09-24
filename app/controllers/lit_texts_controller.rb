class LitTextsController < ApplicationController

	# GET /lit_texts
	def index
		lit_texts = LitText.all
		render json: lit_texts, status: :ok
	end

	def show
		lit_text = find_lit_text
		render json: lit_text, status: :ok
	end

	def create
		lit_text = LitText.create!(lit_text_params)
		render json: lit_text, status: :created
	end

	def update
		lit_text = find_lit_text
		lit_text.update!(lit_text_params)
		render json: lit_text, status: :accepted
	end

	# def destroy
	# 	lit_text = find_lit_text
	# 	lit_text.destroy
	# 	head :no_content
	# end

	private

	def find_lit_text
		LitText.find(params[:id])
	end

	def lit_text_params
		params.permit(:title, :author, :pubdate, :content, :overflow, :rating, :description)
	end



end
