class LitTextsController < ApplicationController

	# GET /lit_texts
	def index
		lit_texts = LitText.all
		render json: lit_texts, include: ['comments.com_types'], status: :ok
	end

	# GET /lit_texts/:id
	def show
		lit_text = find_lit_text
		render json: lit_text, include: ['comments.user', 'comments.com_types'], status: :ok
	end

	# POST /lit_texts
	def create
		lit_text = LitText.create!(lit_text_params)
		render json: lit_text, status: :created
	end

	# PATCH /lit_texts/:id
	def update
		lit_text = find_lit_text
		lit_text.update!(lit_text_params)
		render json: lit_text, status: :accepted
	end

	# DELETE /lit_texts/:id
	# def destroy
	# 	lit_text = find_lit_text
	# 	lit_text.destroy
	# 	head :no_content
	# end

	private

	def find_lit_text
		LitText.find(params[:id])
	end

  def sanitizer
    Rails::Html::SafeListSanitizer.new
  end

	def lit_text_params
		permitted = params.permit(:title, :first_name, :last_name, :pubdate, :content, :prose)
    sanitized = permitted.to_h
    if sanitized.key?(:content)
      sanitized[:content] = sanitizer.sanitize(sanitized[:content])
    end
    sanitized
	end

end