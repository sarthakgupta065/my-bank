import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return null;

  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  const accountsData = accounts?.data || [];
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = appwriteItemId ? await getAccount({ appwriteItemId }) : null;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks || 0}
            totalCurrentBalance={accounts?.totalCurrentBalance || 0}
          />
        </header>

        {accountsData.length > 0 ? (
          <RecentTransactions 
            accounts={accountsData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        ) : (
          <div className="flex flex-col gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <h3 className="text-18 font-semibold text-gray-900">No bank accounts linked</h3>
            <p className="text-14 text-gray-500">
              Connect your first bank account using the sidebar or the button below to view transactions and balances.
            </p>
          </div>
        )}
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions || []}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home