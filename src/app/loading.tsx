import Spinner from "@/components/ui/spinner/spinner";
import React from "react";

const Loading = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Spinner inline={true} />;
    </div>
  );
};

export default Loading;
