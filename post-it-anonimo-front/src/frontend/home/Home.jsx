import { useEffect, useState } from "react";
import PostItTemplate from "../postits/PostItTemplate";

const postIts = [];
let page = 0;

async function getPosts() {
  const response = await fetch("/api/v1/postit");

  return await response.json();
}

function showPostItPage(){
  const pagePostIts = [];

  for (let index = 0; index < postIts.length; index += 50) {
    const chunk = postIts.slice(index, index + 50);

    pagePostIts.push(chunk);
}

const newPage = pagePostIts[page];

page += 1;

return newPage;
}

export default function Home(props) {
  const [ redredPostIts, updateRenderedPostIts ] = useState([]);

  function scrollHandler(){
    const windowHeight =  Math.round((document.documentElement.scrollTop + window.innerHeight));
    const scrollCurentHeight = document.documentElement.scrollHeight;

    if(windowHeight === scrollCurentHeight){
      renderPage();
    }

  }

  function renderPage(){
    const postIts = showPostItPage();
    const newPostitsToRender = [];

    for(const {from, to, text, key} of postIts){  
      newPostitsToRender.push(<PostItTemplate from={from} to={to} text={text} key={key} />)
    }

    updateRenderedPostIts([...redredPostIts, ...newPostitsToRender]);
  }

  useEffect(async () => {
    const postItsResponse = await getPosts();

    for (const postIt in postItsResponse) {
      const { from, to, text } = postItsResponse[postIt];
      postIts.push({ from, to, text, key: postIt });
    }

    renderPage();

    window.addEventListener("scroll", scrollHandler);
    return ()=> window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <main>
      <div style={{ padding: 10, display: "flex", flexWrap: "wrap" }}>
        {redredPostIts}
      </div>
      {/* <button onClick={()=>{
        renderPage();
      }}>
          teste
      </button> */}
      <footer id="postIt-footer"></footer>
    </main>
  );
}