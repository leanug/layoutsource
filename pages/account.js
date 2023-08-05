import { useRouter } from "next/router";
import { useState, useCallback } from 'react'; // Import useCallback
import { Tab, Button } from "semantic-ui-react";
import { Info, Settings, Layout } from "@/components/account";
import { useAuth } from "@/hooks";
import { ListUserLayouts, AddLayoutForm } from "@/components/account/layout";

function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  if (!user) {
    return null;
  }
  console.log('layout', Layout);

  const onLogout = () => {
    logout();
    router.push('/');
  };

  const TabPane = ({ attached = false, children }) => (
    <Tab.Pane attached={attached}>{children}</Tab.Pane>
  );

  const panes = [
    {
      menuItem: { key: 'user-layouts', content: 'My layouts' },
      render: () => (
        <Tab.Pane attached={ false }>
          <ListUserLayouts />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'favoritos', content: 'Favoritos' },
      render: () => (
        <Tab.Pane attached={ false }>
          <p>Favoritos...</p>
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'addLayout', content: 'Add layout' },
      render: () => (
        <Tab.Pane attached={ false }>
          <AddLayoutForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'ajustes', content: 'Ajustes' },
      render: () => (
        <Tab.Pane attached={ false }>
          <Settings.ChangeNameForm />
          <Settings.ChangeEmailForm />
          <Settings.ChangePasswordForm />
        </Tab.Pane>
      )
    },
  ]

  return (
    <div className="p-14">
      <Info />
      
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      <Button content="Logout" onClick={ onLogout } />
    </div>
  );
}

export default AccountPage;
