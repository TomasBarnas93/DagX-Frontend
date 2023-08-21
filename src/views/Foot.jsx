import React from "react";

function Foot() {

  let date = new Date();
  let year = date.getFullYear();

  return (
    <footer>
      &copy; {year} DagiX | All rights reserved.
    </footer>
  );
}

export default Foot;
