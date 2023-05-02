import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout } from '../../../components/Layout';
import { Table } from '../../../components/Table';


export default function User({ user, loans }) {
  const router = useRouter();

  return (
    <Layout title={`${user.username}'s Loans`}>
      <h1>{user.username}'s Loans</h1>

      <Table
        columns={[
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'owner_username',
            label: 'Owner',
          },
          {
            key: 'amount',
            label: 'Amount',
            format: ({ amount }) => `$${amount.toFixed(2)}`
          },
          {
            key: 'apr',
            label: 'Apr',
          },
          {
            key: 'term',
            label: 'Term',
          },
          {
            key: 'status',
            label: 'Status',
          },
          {
            label: 'Plan',
            format: ({ id }) => <Link href={`/user/${user.id}/loans/${id}`}>See Payment Plan</Link>
          }
        ]}
        rows={loans}
      />
    </Layout>
  )
}

export async function getServerSideProps({ query }){
  const [ users, loans ] = await Promise.all([
    fetch(`https://lending-api.azurewebsites.net/users`).then((req) => req.json()),
    fetch(`https://lending-api.azurewebsites.net/users/${query.user_id}/loans`).then((req) => req.json())
  ]);

  const findUser = (userid) => users.find(({ id }) => id === userid)

  return {
    props:{
      user: findUser(parseInt(query.user_id)),
      loans: loans.map((loan) => ({ ...loan, owner_username: findUser(loan.owner_id).username }))
    }
  }
}