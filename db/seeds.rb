# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'bcrypt'

puts 'Seeding...'

LitText.create(title: 'Marginalia', author: 'Billy Collins', pubdate: 1996, prose: false, content: '<p>Sometimes the notes are ferocious,<br/>skirmishes against the author<br/>raging along the borders of every page<br/>in tiny black script.<br/>If I could just get my hands on you,<br/>Kierkegaard, or Conor Cruise O’Brien,<br/>they seem to say,<br/>I would bolt the door and beat some logic into your head.<br/><br/>Other comments are more offhand, dismissive –<br/>“Nonsense.” “Please!” “HA!!” –<br/>that kind of thing.<br/>I remember once looking up from my reading,<br/>my thumb as a bookmark,<br/>trying to imagine what the person must look like<br/>who wrote “Don’t be a ninny”<br/>alongside a paragraph in <em>The Life of Emily Dickinson.</em><br/><br/>Students are more modest<br/>needing to leave only their splayed footprints<br/>along the shore of the page.<br/>One scrawls “Metaphor” next to a stanza of Eliot’s.<br/>Another notes the presence of “Irony”<br/>fifty times outside the paragraphs of <em>A Modest Proposal.</em><br/><br/>Or they are fans who cheer from the empty bleachers,<br/>hands cupped around their mouths.<br/>“Absolutely,” they shout<br/>to Duns Scotus and James Baldwin.<br/>“Yes.” “Bull’s-eye.” “My man!”<br/>Check marks, asterisks, and exclamation points<br/>rain down along the sidelines.<br/><br/>And if you have managed to graduate from college<br/>without ever having written “Man vs. Nature”<br/>in a margin, perhaps now<br/>is the time to take one step forward.<br/><br/>We have all seized the white perimeter as our own<br/>and reached for a pen if only to show<br/>we did not just laze in an armchair turning pages;<br/>we pressed a thought into the wayside,<br/>planted an impression along the verge.<br/><br/>Even Irish monks in their cold scriptoria<br/>jotted along the borders of the Gospels<br/>brief asides about the pains of copying,<br/>a bird singing near their window,<br/>or the sunlight that illuminated their page–<br/>anonymous men catching a ride into the future<br/>on a vessel more lasting than themselves.<br/><br/>And you have not read Joshua Reynolds,<br/>they say, until you have read him<br/>enwreathed with Blake’s furious scribbling.<br/><br/>Yet the one I think of most often,<br/>the one that dangles from me like a locket,<br/>was written in the copy of<em> Catcher in the Rye</em><br/>I borrowed from the local library<br/>one slow, hot summer.<br/>I was just beginning high school then,<br/>reading books on a davenport in my parents’ living room,<br/>and I cannot tell you<br/>how vastly my loneliness was deepened,<br/>how poignant and amplified the world before me seemed,<br/>when I found on one page<br/><br/>a few greasy looking smears<br/>and next to them, written in soft pencil–<br/>by a beautiful girl, I could tell,<br/>whom I would never meet–<br/>“Pardon the egg salad stains, but I’m in love.”</p>')
LitText.create(title: 'Lana Turner has collapsed', author: 'Frank O\'Hara', pubdate: 1964, prose: false, content: '<p>Lana Turner has collapsed!<br/>I was trotting along and suddenly<br/>it started raining and snowing<br/>and you said it was hailing<br/>but hailing hits you on the head<br/>hard so it was really snowing and<br/>raining and I was in such a hurry<br/>to meet you but the traffic<br/>was acting exactly like the sky<br/>and suddenly I see a headline<br/>LANA TURNER HAS COLLAPSED!<br/>there is no snow in Hollywood<br/>there is no rain in California<br/>I have been to lots of parties<br/>and acted perfectly disgraceful<br/>but I never actually collapsed<br/>oh Lana Turner we love you get up</p>')
LitText.create(title: 'Bee! I’m expecting you!', author: 'Emily Dickinson', pubdate: 1886, prose: false, content:'<p>Bee! I’m expecting you!<br/>Was saying Yesterday<br/>To Somebody you know<br/>That you were due—</p><p>The Frogs got Home last Week—<br/>Are settled, and at work—<br/>Birds, mostly back—<br/>The Clover warm and thick—</p><p>You’ll get my Letter by<br/>The seventeenth; Reply<br/>Or better, be with me—<br/>Yours, Fly.</p>')
puts 'Seeded lit_texts...'

User.create(username: 'Alec', fullname: 'Alec Magnet', password: '123', bio: 'I made this site!')

# Create other users
4.times do
	fullname=Faker::FunnyName.unique.name
	# username=[giant_squid, book_wyrm, mega_flora, reading_rainbow]
	username=Faker::Twitter.unique.screen_name
	image=Faker::Avatar.image
	bio=Faker::Lorem.paragraph(sentence_count: 2..6)
	User.create(username: username, password: '123', fullname: fullname, image: image, bio: bio)
end

# Update usernames
User.find(2).update(username: "giant_squid")
User.find(3).update(username: "book_wyrm")
User.find(4).update(username: "wyverary")
User.find(5).update(username: "reading_rainbow")
puts 'Seeded Users...'

# Create parent_comments
9.times do
	user_id=User.ids.sample
	lit_text_id=LitText.ids.sample
	content=Faker::Lorem.paragraph(sentence_count: 2..6)
	Comment.create(user_id: user_id, lit_text_id: lit_text_id, content: content, deleted:false)
end

# Create replies
12.times do
	user_id=User.ids.sample
	parent_comment=Comment.all.sample
	lit_text_id=parent_comment.lit_text_id
	content=Faker::Lorem.paragraph(sentence_count: 2..6)
	Comment.create(user_id: user_id, lit_text_id: lit_text_id, parent_comment: parent_comment, content: content, deleted:false)
end
puts 'Seeded comments...'

# Create com_types
ComType.create(name: "Reading")
ComType.create(name: "Question")
ComType.create(name: "Footnote")
puts 'Seeded com_types...'

Comment.find_each do |comment|
	com_type_id=ComType.ids.sample
	CommentComType.create(comment_id: comment.id, com_type_id: com_type_id)
end
puts 'Seeded unique comment_com_types...'

#Create some multiple associations
5.times do
	comment_id=Comment.ids.sample
	comment = Comment.find(comment_id)
	typesArr=[1, 2, 3].select {|num| num != comment.com_types.first.id}
	com_type_id=typesArr.sample	
	CommentComType.create(comment_id: comment_id, com_type_id: com_type_id)
end
puts 'Seeded multiple comment_com_types...'

puts 'Finished seeding'