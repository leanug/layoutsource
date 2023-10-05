import { useRouter } from "next/router";
import { useState, useCallback } from 'react'; // Import useCallback
import { Info, Settings, Layout, LikedLayoutList } from "@/components/account";
import { useAuth } from "@/hooks";
import { ListUserLayouts, AddLayoutForm } from "@/components/account/user-websites";

function AccountPage() {
  const [activeTab, setActiveTab] = useState('user-layouts');
  const { user, logout } = useAuth();
  const router = useRouter();

  console.log('user', user);
  if (!user) {
    return null;
  }

  const onLogout = () => {
    logout();
    router.push('/');
  };


  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="w-full px-3 md:px-16">
      <Info />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            <button
              onClick={() => changeTab('user-layouts')}
              className={`px-4 py-2 ${activeTab === 'user-layouts' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
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
              onClick={() => changeTab('addLayout')}
              className={`px-4 py-2 ${activeTab === 'addLayout' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
            >
              Add layout
            </button>
            <button
              onClick={() => changeTab('ajustes')}
              className={`px-4 py-2 ${activeTab === 'ajustes' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} rounded`}
            >
              Ajustes
            </button>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          {activeTab === 'user-layouts' && <ListUserLayouts />}
          {activeTab === 'favoritos' && <LikedLayoutList />}
          {activeTab === 'addLayout' && <AddLayoutForm />}
          {activeTab === 'ajustes' && (
            <div>
              <Settings.ChangeNameForm />
              <Settings.ChangeEmailForm />
              <Settings.ChangePasswordForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


export default AccountPage;