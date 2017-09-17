const Player = ({name}) => (
  <div className="video">
    <video controls>
      <source src={`http://haoduo-1253322599.costj.myqcloud.com/${name}.mp4`} type="video/mp4" />
    </video>
    <style jsx>{`
      .video {
        width: 100%;
      }
      video {
        width: 100%;
      }
      `}
    </style>
  </div>
)


export default Player
