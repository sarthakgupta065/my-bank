import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  });

  const accountsData = accounts?.data || [];

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accountsData.length > 0 ? (
              accountsData.map((a: Account) => (
                <BankCard 
                  key={a.id || a.appwriteItemId}
                  account={a}
                  userName={loggedIn?.firstName || 'User'}
                />
              ))
            ) : (
              <p className="text-16 text-gray-500">You haven&apos;t linked any bank accounts yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks