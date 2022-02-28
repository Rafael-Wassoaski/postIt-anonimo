import { useState } from "react";

const formLayout = {
  display: "block",
  margin: "auto",
};

const formFieldsLayout = {
  width: "100%",
  display: "block",
  padding: 10,
};

async function getPostsCount() {}

function checkStringLength(text, limit = 1) {
  if (typeof text !== "string" || text.length > limit) {
    return false;
  }

  return true;
}

export default function NewPostItForm() {
  const postItNext = getPostsCount();
  const [postIt, setPostIt] = useState({
    from: `Anônimo ${1}`,
    to: "Ninguém",
    text: "",
  });

  return (
    <form style={formLayout} className="container" action="/api/v1/postIts/newPostIt" method="POST">
      <div className="mb-1">
        <label className="form-label">De:</label>
        <input
          type="text"
          value={postIt.from}
          className="form-control"
          onChange={(event) => {
            setPostIt({ ...postIt, from: event.target.value });
          }}
        />
      </div>

      <div className="mb-1">
        <label className="form-label">Para:</label>
        <input
          type="text"
          value={postIt.to}
          className="form-control"
          onChange={(event) => {
            setPostIt({ ...postIt, to: event.target.value });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Texto:</label>
        <textarea
          value={postIt.text}
          className="form-control"
          onChange={(event) => {
            if (!checkStringLength(event.target.value, 147)) {
              return false;
              // event.target;
            }

            setPostIt({ ...postIt, text: event.target.value });
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
}
