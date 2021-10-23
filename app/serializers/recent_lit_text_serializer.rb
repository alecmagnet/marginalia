class RecentLitTextSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_name, :pubdate, :prose, :preview, :created_at, :updated_at, :uploader_id

  def author_name
    object.fam_name_first ? "#{object.last_name} #{object.first_name}" : "#{object.first_name} #{object.last_name}"
  end

	def preview
		object.content[0..120]
	end

end