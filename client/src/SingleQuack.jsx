import { memo } from "react";


function SingleQuack(props) {
  const quackStyle = {
    backgroundColor: "yellow",
    padding: "30px",
    margin: "10px",
    flexGrow: "1",
  };
  return (
    <>
      <p style={quackStyle}>
        {props.author} says: {props.content}
      </p>
      <button onClick={() => deleteQuack(quackId)}>Delete</button>
    </>
  );
}

export default memo(SingleQuack);
