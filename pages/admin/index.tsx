import { Page } from '../../layout'
import { adminLayout } from '../../components/Layouts/Admin'
import { requireAdmin } from '../../utils/auth'

const Admin: Page = () => {
  return <div>admin main</div>
}

Admin.getLayout = adminLayout

export const getServerSideProps = requireAdmin(async (ctx) => {
  return {
    props: {}
  }
})

export default Admin
