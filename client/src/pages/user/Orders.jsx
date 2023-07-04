import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/UserMenu'

export default function Orders() {
  return (
    <Layout>
        <div className="m-3 p-3">
            <div className="row">
                <div className="col-md-3"><UserMenu/></div>
                <div className="col-md-9">My orders</div>
            </div>
        </div>
    </Layout>
  )
}