import PostItTemplate from "../postits/PostItTemplate";

function Home(props) {
  const postIts = [];

  for (let i = 0; i < 100; i++) {
    postIts.push(
      <PostItTemplate
        from="Rafael"
        to="Rafa"
        text="TEste de qualidade do texto rafael"
      />
    );
  }

  return (
    <main >

      <div style={{ padding: 10, display: "flex", flexWrap: "wrap" }}>
        {postIts}
      </div>
    </main >
  );
}

export default Home;
