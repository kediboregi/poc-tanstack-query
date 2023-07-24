import "./App.css";
import { useState } from "react";
import { useCreatePost, usePosts } from "./query-hooks/usePosts";

function App() {
  const { mutate, reset, status, error, cancel } = useCreatePost();

  const { data, isLoading, isFetching, refetch } = usePosts();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    mutate({ title: "asdf", body: "fsadsa" });
    event.preventDefault();
  };

  const handleReset = (event) => {
    reset();
    cancel();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          body:
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" style={{ marginRight: 5 }} />
        <input type="reset" value="Reset" />

        <div>
          {status}
          {status === "error" ? error : ""}
        </div>
      </form>
      {isLoading ? (
        <div className="loading">Loading</div>
      ) : (
        <>
          <div className="updating">{isFetching ? "Updating" : " "}</div>
          <h3>Posts</h3>
          {data?.map((post) => (
            <div className="post" key={post.id}>
              {post.title}
            </div>
          ))}
          <input type="submit" value="Refetch" onClick={() => refetch()} />
        </>
      )}
    </div>
  );
}

export default App;
