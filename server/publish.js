Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});
