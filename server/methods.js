Meteor.methods({
  '/video/getPost': function(postId) {
    var posts = Assets.getText('posts.json');
    if ( postId == "posts" ) {
      return posts;
    } else {
      var postId = parseInt(postId);
      var metaData = JSON.parse(posts)[postId - 1];
      var postContent = Assets.getText('posts/' + postId + '.md');
      return {
        metaData: metaData,
        postContent: postContent
      };
    }
  }
});
