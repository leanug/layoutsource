import { useRouter } from "next/router";
import { Tab, Button } from "semantic-ui-react"
import { AccountInfo } from "@/components/account/info";
import { useAuth } from "@/hooks";
import ChangeNameForm from "@/components/account/settings/change-name-form/change-name-form";

function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (! user) {
    return null
  }

  const onLogout = () => {
    logout()
    router.push('/')
  }

  const TabPane = ({ attached = false, children }) => (
    <Tab.Pane attached={attached}>{children}</Tab.Pane>
  );

  const panes = [
    {
      menuItem: { key: 'mis-pedidos', content: 'Mis pedidos' },
      render: () => (
        <Tab.Pane attached={ false }>
          <p>Mis pedidos...</p>
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
      menuItem: { key: 'ajustes', content: 'Ajustes' },
      render: () => (
        <Tab.Pane attached={ false }>
          <ChangeNameForm />
        </Tab.Pane>
      )
    },
  ]

  return (
    <div className="p-14">
      <h1 className="text-xl">Account page</h1>
      <AccountInfo />
      
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      <Button content="Logout" onClick={ onLogout } />
    </div>
  );
}

export default AccountPage;
