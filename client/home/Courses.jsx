Courses = React.createClass({
  getInitialState() {
    return {
      courses: [
        {
          "id": "1",
          "cover": "/images/courses/github.jpg",
          "title": "版本控制入门 – 搬进 Github",
          "link": "http://www.imooc.com/learn/390"
        },
        {
          "id": "2",
          "cover": "/images/courses/subl.jpg",
          "title": "快乐的 Sublime 编辑器",
          "link": "http://www.imooc.com/learn/333"
        },
        {
          "id": "3",
          "cover": "/images/courses/rails-tricks.jpg",
          "title": "Web App---Rails 技巧库",
          "link": "http://www.imooc.com/learn/291"
        },
        {
          "id": "4",
          "cover": "/images/courses/rails10.jpg",
          "title": "Web App---Rails 10日谈",
          "link": "http://www.imooc.com/learn/230"
        },
        {
          "id": "5",
          "cover": "/images/courses/linux.jpg",
          "title": "Linux Guide for Developers",
          "link": "http://www.imooc.com/learn/181"
        },
        {
          "id": "6",
          "cover": "/images/courses/zhifu.jpg",
          "title": "支付宝收款集成",
          "link": "http://haoqicat.com/happypeter/zhi-fu-bao-shou-kuan-ji-cheng"
        },
        {
          "id": "7",
          "cover": "/images/courses/html7.jpg",
          "title": "HTML7",
          "link": "http://haoqicat.com/happypeter/html7"
        },
      ]
    };
  },

  render() {
    let courseList = _.map(this.state.courses, function(c, index) {
      return (
        <div className='card' key={index}>
          <a href={c.link}>
            <img src={c.cover} />
          </a>
          <div className='details'>
            <div className='title'>{c.title}</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1 className="big-title">成套课程</h1>
        <div className="courses">
          { courseList }
        </div>
      </div>
    );
  }
})
