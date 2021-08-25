import { useState } from "react";

const ShowViewportWidth = () => {

  const [viewportWidth, setviewportWidth] = useState("Resize window");

  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768)
      setviewportWidth("mobile" + " (" + window.innerWidth + "px)");
    if (window.innerWidth >= 769 && window.innerWidth < 1024)
      setviewportWidth("tablet" + " (" + window.innerWidth + "px)");
    if (window.innerWidth >= 1024 && window.innerWidth < 1216)
      setviewportWidth("desktop" + " (" + window.innerWidth + "px)");
    if (window.innerWidth >= 1216 && window.innerWidth < 1408)
      setviewportWidth("widescreen" + " (" + window.innerWidth + "px)");
    if (window.innerWidth >= 1408)
      setviewportWidth("fullhd" + " (" + window.innerWidth + "px)");
  });

  return (
    <div className="columns">
      <div className="column is-full has-text-centered is-size-4">
        {viewportWidth}
      </div>
    </div>
  );
};

export default ShowViewportWidth;
