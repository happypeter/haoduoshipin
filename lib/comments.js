Comments = new Mongo.Collection('comments');

Meteor.methods({
  '/comments/add': function(name, email, message, postId) {
    var comment = {
      postId: postId,
      commenter: name,
      email: email,
      content: message,
      createdAt: new Date()
    };
    Comments.insert(comment);
  }
});
