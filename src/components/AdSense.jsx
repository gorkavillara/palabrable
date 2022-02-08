import React from "react";

const AdSense = () => {
  React.useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100vw", height: 320 }}
      data-ad-client="ca-pub-7313475970210959"
      data-ad-slot="9893978370"
      data-ad-format="auto"
      data-adtest="on"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
