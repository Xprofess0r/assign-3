import React from "react";

const ImageList = ({ resources }) => {
  return (
    <div className="image-list">
      {resources.map((resource) => (
        <img
          key={resource.asset_id}
          src={resource.url} // You can also use resource.secure_url for HTTPS
          alt={resource.public_id}
          width={resource.width}
          height={resource.height}
        />
      ))}
    </div>
  );
};

export default ImageList;
