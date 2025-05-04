import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const BaseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout