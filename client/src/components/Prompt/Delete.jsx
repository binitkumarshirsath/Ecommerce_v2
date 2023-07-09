import React from "react";

export default function Delete({handleDelete}) {
  return (
    <>
      <form onSubmit={handleDelete}>
        <h3>Are you sure you want to delete this category ?</h3>
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
    </>
  );
}
