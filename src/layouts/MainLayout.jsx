import { Outlet } from "react-router"
import Navbar from "../components/ui/Navbar"
import AppFooter from "../components/ui/AppFooter"

// flex-col + flex-1 di main: footer selalu nempel di bawah layar walau kontennya pendek
const MainLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col print:block print:min-h-0">
      <Navbar/>
      <main className="flex-1">
        <Outlet/>
      </main>
      <AppFooter/>
    </div>
  )
}

export default MainLayout
