# MARGINALIA

Marginalia is a social reading and annotation app, where users can have conversations with one another about literary works they upload, comment on, and read.  

The word *marginalia* refers to the notes and markings that readers make in the margins of page. Back when books were too expensive not to share – or even when more people borrowed physical books from the library – these notes provides a way for readers to communicate with one another, sometimes from across centuries.  

This app seeks to restore the social dimension of reading by providing a venue for readers to speak with one another through the comments and replies they leave on literary texts.  

![Homepage with recent comments](/readme_images/recent.png)

## Links
- [Repo](https://github.com/alecmagnet/marginalia)
- [Live](https://magnets-marginalia.herokuapp.com/about)

## Made With  

- [Ruby on Rails](https://rubyonrails.org/) 
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) & [Redux Toolkit](https://redux-toolkit.js.org/)
- [MUI](https://mui.com/) (Material UI)
- [Quill](https://quilljs.com/)

## Getting Started  

To run this project locally, run the following commands:
<br />

```javascript
bundle install
npm install --prefix client
rails db:create db:migrate db:seed
rails s
npm start --prefix client
```

## User Story  

A user of Marginalia can:

* Securely sign up, log in, log out, and remain authorized on refresh
* See a preview on the homepage of most recently posted comments and most recently uploaded texts 
* Browse, search, filter, and read uploaded literary texts

![library gif](/readme_images/library.gif)

* Upload poems, stories, and other literary texts
* Edit a text if they uploaded it have the user-type librarian
* Post comments on texts and replies to other comments
* Edit and delete their own comments
  * If a comment has replies or is a reply to another comment, deleting it will leave a ghost that says “comment was deleted.” Otherwise, It will simply vanish

![Posting, editing and deleted a reply](/readme_images/comment.gif)
* Assign their comments multiple comment types, such “question” or “critique”

* Add and remove comment types from their comments
* Browse, search, and filter all comments on a particular text
* Browse, search, and filter other users’ profiles
* Edit their own profile
* Delete their account

## Author

**Alec Magnet** | [GitHub](https://github.com/alecmagnet) | [LinkedIn](https://www.linkedin.com/in/alec-magnet/) | [Medium](https://medium.com/@alecmagnet) 

## 🤝 Support  

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
