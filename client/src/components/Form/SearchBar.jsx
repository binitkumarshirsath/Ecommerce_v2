import React from 'react';
import { useSearch } from '../../context/searchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const navigate = useNavigate();
    const [{ keywords, result }, setValue] = useSearch();

  function handleOnChange(e) {
    setValue({
      ...keywords,
      keywords: e.target.value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
        const {data} = await axios.post(process.env.REACT_APP_API + `api/product/search/${keywords}`,keywords);
        // console.log(data.product);
        setValue({result : data.product})
        navigate('/searchedProduct')
    }catch(error){
        console.log(error);
    }
  }
  return (
    <form className="form-inline my-2 my-lg-0 ms-auto me-4" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          className="form-control"
          value={keywords}
          onChange={handleOnChange}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-secondary" type="submit" >
          Search
        </button>
      </div>
    </form>
  );
}
