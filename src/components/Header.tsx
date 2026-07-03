
import { FiMenu } from 'react-icons/fi'


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Header = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <nav className='flex fixed left-0 w-full items-center justify-between bg-[#0E2E2E] p-4 shadow-md transition-all duration-300'>
        <div className='flex items-center justify-between gap-x-3'>
            <button 
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="p-2 rounded-lg hover:bg-[#44E5E7]/10 text-gray-300 sm:hidden block"
                    >
                      <FiMenu className='text-xl' />
                    </button>
        <h6 className="flex items-center gap-3">
            <img src="/Logo.svg" alt="logo" />
            <span className="text-[20px] font-bold font-poppins text-white">Summerizer</span>
        </h6>
        </div>
    </nav>
  )
}

export default Header