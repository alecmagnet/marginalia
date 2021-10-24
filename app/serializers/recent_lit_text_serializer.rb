class RecentLitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_name, :translator, :pubdate, :prose, :content, :created_at, :updated_at, :uploader_id

  def author_name
    object.fam_name_first ? "#{object.last_name} #{object.first_name}" : "#{object.first_name} #{object.last_name}"
  end

	def content
		object.content[0..150]
	end

end