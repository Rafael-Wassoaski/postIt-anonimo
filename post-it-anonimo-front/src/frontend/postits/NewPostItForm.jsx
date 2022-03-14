import { OK } from "http-status-codes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formLayout = {
  display: "block",
  margin: "auto",
};

const formFieldsLayout = {
  width: "100%",
  display: "block",
  padding: 10,
};

async function getPostsCount() {
  const response = await fetch("/api/v1/postit/next-number");

  return await response.json();
}

function checkStringLength(text, limit = 1) {
  if (typeof text !== "string" || text.length > limit) {
    return false;
  }

  return true;
}

async function createPostIt(postIt) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postIt),
  };
  const response = await fetch("/api/v1/postit", options);

  if (response.status !== OK) {
    const { error } = await response.json();

    alert("Erro ao criar post: ", error);
    return;
  }
  window.location = '/';
}

export default function NewPostItForm() {
  const [postIt, setPostIt] = useState({
    from: `Anônimo ${1}`,
    to: "Ninguém",
    text: "",
  });

  useEffect(async () => {
    const { next } = await getPostsCount();
    console.log(next);
    setPostIt({ ...postIt, from: `Anônimo ${next}` });
  }, []);

  return (
    <form style={formLayout} className="container">
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

      <button
        type="submit"
        className="btn btn-primary"
        onClick={async (event) => {
          event.preventDefault();
          await createPostIt(postIt);
        }}
      >
        Enviar
      </button>
    </form>
  );
}
