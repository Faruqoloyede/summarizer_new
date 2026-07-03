import { FiHome, FiBook, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';
import { NavLink } from 'react-router-dom';

interface SidebarProps {

  sidebarOpen: boolean;
  
}

const nav_links = [
  { name: 'Home', icon: <FiHome />, tab: 'dashboard' },
  { name: 'Library', icon: <FiBook />, tab: 'library' },
];



const Sidebar = ({ sidebarOpen }: SidebarProps) => {
    const {logout} = useAuth()
const handleLogout = async ()=>{
    await logout()
}
  return (
    <>
    <div className='bg-[#0E2E2E] text-white shadow-md transition-all duration-300 fixed top-10 h-screen w-72 sm:block hidden'>
     <nav className="mt-6">
  {nav_links.map((link) => (
    <NavLink
      key={link.tab}
      to={`/${link.tab}`}
      className={({ isActive }) =>
        `flex items-center w-full p-4 transition-colors ${
          isActive
            ? 'bg-[#44E5E7]/20 text-[#44E5E7]'
            : 'text-gray-300 hover:bg-[#44E5E7]/10'
        }`
      }
    >
      <span className="text-lg">{link.icon}</span>
      <span className="ml-3">{link.name}</span>
    </NavLink>
  ))}

  <button
    onClick={handleLogout}
    className="flex items-center w-full p-4 text-gray-300 hover:bg-[#44E5E7]/10"
  >
    <FiLogOut className="text-lg" />
    <span className="ml-3">Logout</span>
  </button>
</nav>

      <div className='absolute bottom-10 left-0 border-t border-[#44E5E7]/20'>
          <UserProfile/>
      </div>
    </div>

      {sidebarOpen && (
         <div className='bg-[#0E2E2E] text-white shadow-md transition-all duration-300 relative w-64 z-40 sm:hidden block'>
      
    {nav_links.map((link) => (
   <NavLink
      key={link.tab}
      to={`/${link.tab}`} 
      className={({ isActive }) =>
        `flex items-center w-full p-4 transition-colors ${
          isActive
            ? 'bg-[#44E5E7]/20 text-[#44E5E7]'
            : 'text-gray-300 hover:bg-[#44E5E7]/10'
        }`
      }
    >
      <span className="text-lg">{link.icon}</span>
      <span className="ml-3">{link.name}</span>
    </NavLink>
))}
<button
    onClick={handleLogout}
    className="flex items-center w-full p-4 text-gray-300 hover:bg-[#44E5E7]/10"
  >
    <FiLogOut className="text-lg" />
    <span className="ml-3">Logout</span>
  </button>

      <div className='absolute bottom-10 left-0 border-t border-[#44E5E7]/20'>
          <UserProfile />
      </div>
    </div>
      )}
    </>
  );
};

export default Sidebar;