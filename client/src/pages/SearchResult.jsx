import React from 'react';
import { useSearch } from '../context/searchContext';
import Layout from '../components/Layout/Layout';

export default function SearchResult() {
  const [data, setData] = useSearch();

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center m-4">Search Result</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {data?.result?.map((item, i) => (
            <div className="col mb-4" key={i}>
              <div className="card" style={{width:"18rem"}}>
                <img
                  src={process.env.REACT_APP_API + `api/product/get-photo/${item._id}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description.substring(30)}</p>
                  <p className="card-text">$ {item.price}</p>
                  {/* <Link to={'/'} className="btn btn-secondary">
                    Go somewhere
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
