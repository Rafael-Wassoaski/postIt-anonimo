import PostItHeader from "./PostItHeader";

const postItLayout = {
  width: 225,
  height: 225,
  borderStyle: "solid",
  borderColor: "#000000",
  borderWidth: 8,
  margin: 5,
};

const textLayout = {
  borderTopStyle: "solid",
  borderTopColor: "#000000",
  overflowWrap: "break-word",
  paddingLeft: 2,
  paddingRight: 2,
};

function getPostItColor() {
  const colors = ["#75B9BE", "#A8CCC9", "#D6B8B4", "#FFC94A", "#DCEAB2"];
  const colorIndex = Math.floor(Math.random() * (5 - 0) + 0);

  return colors[colorIndex];
}

function PostItTemplate(props) {
  const backgroundColor = getPostItColor();

  return (
    <div style={{ ...postItLayout, background: backgroundColor }}>
      <PostItHeader from={props.from} to={props.to} />
      <div style={textLayout}>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default PostItTemplate;
