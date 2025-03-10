import { useState } from "react";

function NewQuackForm(props) {
  const [quackDraft, setQuackDraft] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addQuack({
      author: "Anonymous Quack",
      content: quackDraft,
    });
    setQuackDraft("");
    // props.quacks.push({}) **NOT THE WAY
    console.log("done");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={quackDraft}
        onChange={(e) => setQuackDraft(e.target.value)}
        type="text"
        name="quackText"
      />
      <button type="submit">Submit Quack</button>
    </form>
  );
}

export default NewQuackForm;
