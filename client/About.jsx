const { RaisedButton } = mui;

About = React.createClass({
  render() {
    let styles = {
      label: {
        fontSize: '16px'
      }
    };
    return (
      <div className="about">
        <div className="container clearfix">
          <div className="story">
            <h3>个人信息</h3>
            <div className="desc">
              web 开发者，在线教育狂热分子，很多朋友叫他“录视频的那个 Peter ”，自封“视频死磕侠” 。
            </div>
          </div>
          <div className="paper">
            <img src="/images/peter.png" />
          </div>
          <div className="info">
            <h3>联系方式</h3>
            <ul>
              <li>
                <span>姓名：</span> Peter Wang
              </li>
              <li>
                <span>邮箱：</span> happypeter1983@gmail.com
              </li>
              <li>
                <span>微信：</span> happypeter1983
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
