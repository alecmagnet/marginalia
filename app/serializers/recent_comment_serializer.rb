class RecentCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at, :user_id, :user_fullname, :user_username, :user_image, :lit_text_id, :lit_text_title, :lit_text_author, :lit_text_translator, :lit_text_date, :lit_text_preview, :lit_text_prose

	def user_fullname 
		object.user.fam_name_first ? "#{object.user.last_name} #{object.user.first_name}" : "#{object.user.first_name} #{object.user.last_name}"
	end

	def user_username
		object.user.username
	end

	def user_image
		object.user.image
	end

	def lit_text_title
		object.lit_text.title
	end

	def lit_text_author
		object.lit_text.fam_name_first ? "#{object.lit_text.last_name} #{object.lit_text.first_name}" : "#{object.lit_text.first_name} #{object.lit_text.last_name}"
	end

	def lit_text_translator
		object.lit_text.translator
	end

	def lit_text_date
		object.lit_text.pubdate
	end

	def lit_text_preview
		object.lit_text.content[0..150]
	end

	def lit_text_prose
		object.lit_text.prose
	end

end