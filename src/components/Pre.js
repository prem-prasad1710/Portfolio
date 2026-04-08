import React from "react";

function Pre(props) {
  return (
    <div
      id={props.load ? "preloader" : "preloader-none"}
      className={props.load ? "dev-preloader-root" : ""}
    >
      {props.load ? (
        <div className="dev-preloader">
          <p className="dev-preloader__line">
            <span className="dev-preloader__prompt">boot&gt;</span> mounting
            portfolio…
          </p>
          <p className="dev-preloader__line dev-preloader__line--ok">
            ✓ kernel OK
          </p>
          <p className="dev-preloader__line dev-preloader__line--ok">
            ✓ loading modules
          </p>
          <p className="dev-preloader__line">
            <span className="dev-preloader__prompt">&gt;</span> ready.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default Pre;
