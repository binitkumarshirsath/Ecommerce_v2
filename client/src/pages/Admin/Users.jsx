import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
export default function Users() {
  return (
    <Layout>
    <div className="m-3 p-3">
      <div className="row">
        <div className="col-md-3"><AdminMenu/></div>
        <div className="col-md-9">Users</div>
      </div>
    </div>
   </Layout>
  )
}
