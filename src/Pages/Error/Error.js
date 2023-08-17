import { Fragment } from "react";

const Error = (props) => {
  return (
    <Fragment>
      <main>
        <h1>Error</h1>
        <p>Could not find this page!</p>
        <p>{props.err}</p>
      </main>
    </Fragment>
  );
};

export default Error;
