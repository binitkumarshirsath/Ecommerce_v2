import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/UserMenu'

export default function Profile() {
  return (
    <Layout>
        <div className="m-3 p-3">
            <div className="row">
                <div className="col-md-3"><UserMenu/></div>
                <div className="col-md-9">My Profile</div>
            </div>
        </div>
    </Layout>
  )
}
