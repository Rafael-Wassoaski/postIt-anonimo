const hader = {
    paddingTop: 0
}

function PostItHeader(props) {
  return (
    <div style={hader}>
      <p>De: {props.from}</p>
      <p>Para: {props.to}</p>
    </div>
  );
}

export default PostItHeader;