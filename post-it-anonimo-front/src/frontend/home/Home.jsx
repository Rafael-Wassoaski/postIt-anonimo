import { useEffect, useState } from "react";
import PostItTemplate from "../postits/PostItTemplate";

async function getPosts() {
  const response = await fetch("/api/v1/postit");

  return await response.json();
}

export default function Home(props) {
  const { postIts, updateMyArray } = useState({});

  console.log('aaa', postIts)
  useEffect(async () => {
    const postItsResponse = await getPosts();
    const newPostIts = [];
    console.log(postItsResponse);
    for (const postIt of postItsResponse) {
      const { from, to, text } = postIt;
      console.log(from);
      newPostIts.push(<PostItTemplate from={from} to={to} text={text} />);
    }
    updateMyArray(newPostIts)

    console.log(postIts);
  }, []);

  return (
    <main>
      <div style={{ padding: 10, display: "flex", flexWrap: "wrap" }}>
        {postIts}
      </div>
    </main>
  );
}