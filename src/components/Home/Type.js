import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer @ Paytm",
          "TypeScript · React · Node · Cloud",
          "Shipping products, not just tickets",
          "LeetCode · OSS · side projects",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
      }}
    />
  );
}

export default Type;
