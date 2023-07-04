import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/authContext'

export default function AdminDashboard() {
  const[auth,setAuth] = useAuth();

  return (
   <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
          NAME   : {auth?.user?.name.toUpperCase()}
          </div>
          <div className="card w-75 p-3">
          E-MAIL : {auth?.user?.email.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
   </Layout>
  )
}
