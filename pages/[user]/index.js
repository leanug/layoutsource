import { useRouter } from "next/router";
import { useState } from 'react'; // Import useCallback
import { Info, Collections, LikedDesigns } from "@/components";
import { useAuth } from "@/hooks";
import { UserDesigns } from "@/components/account/user-designs";
import { sanitizeQueryString } from '@/utils'

function AccountPage() {
  const [activeTab, setActiveTab] = useState('user-designs');
  const { user } = useAuth();
  const router = useRouter();
  const { user: username } = router.query;
  const safeUsername = sanitizeQueryString(username)

  if(! user) {
    return null;
  }
  
  if(safeUsername !== user.username) {
    router.push('/')
  }

  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <section className="section-full">
      <Info user={ user } />
      <div className="h-4 w-full"></div>
      <div className="py-10">
        <div className="space-x-4 flex flex-row justify-center">
          <button
            onClick={() => changeTab('user-designs')}
            className={`px-4 py-2 ${activeTab === 'user-designs' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
          >
            My layouts
          </button>
          <button
            onClick={() => changeTab('favoritos')}
            className={`px-4 py-2 ${activeTab === 'favoritos' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
          >
            Favoritos
          </button>
          <button
            onClick={() => changeTab('collections')}
            className={`px-4 py-2 ${activeTab === 'collections' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
          >
            Collections
          </button>
        </div>
        <div className="mt-10">
          {activeTab === 'user-designs' && <UserDesigns userId={ user.id } />}
          {activeTab === 'favoritos' && <LikedDesigns userId={ user.id } />}
          {activeTab === 'collections' && <Collections />}
        </div>
      </div>
    </section>
  );
}


export default AccountPage;