import React from "react";

export default function CategoryForm({value,setValue,handleSubmit,placeholder,buttonText}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control m-2 w-50"
            id="exampleInputEmail1"
            
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            placeholder={placeholder || "Enter Category to add"}
          />
        </div>

        <button type="submit" className="btn btn-success m-2">
        {buttonText || "Add Category"}
        </button>
      </form>
    </div>
  );
}
