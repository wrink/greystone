import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../../../components/Layout';
import { Table } from '../../../../components/Table';


export default function User({ users, user_id, loan_schedule, loan_id }) {
  const router = useRouter();
  const [ form, setForm ] = useState({
    user_id: ''
  });

  const handleChange = useCallback((key) => (e) => {
    setForm({
      ...form,
      [key]: e.target.value
    });
  }, [setForm, form])

  const handleSubmit = useCallback(async () => {
    const req = await fetch(`https://lending-api.azurewebsites.net/loans/${loan_id}/share?owner_id=${user_id}&user_id=${form.user_id}`, {
      method: 'POST',
      body: ''
    });
    if (req.status === 200) {
      router.push(`/user/${form.user_id}`);
    }
  }, [form]);

  return (
    <Layout title={`Loans #${loan_id}`}>
      <h1>Loans #{loan_id}</h1>

      <div className='container border rounded-2 mb-4 p-4'>
        <h2>Share with a User</h2>
        <form className='row'>
          <div className='col-auto'>
            <select className='form-select' onChange={handleChange('user_id')}>
              <option value='' disabled />
              {users.filter((user) => user.id !== parseInt(user_id)).map((user, i) => (
                <option value={user.id} key={i}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className='col-xs-4 col-md-2'>
            <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>

      <Table
        columns={[
          {
            key: 'month',
            label: 'Month',
            format: ({ month }) => {
              const date = new Date();
              date.setMonth(month % 12);
              return date.toLocaleString('en-us', { month: 'long' });
            }
          },
          {
            key: 'open_balance',
            label: 'Open Balance',
            format: ({ open_balance }) => `$${open_balance.toFixed(2)}`
          },
          {
            key: 'total_payment',
            label: 'Total Payment',
            format: ({ total_payment }) => `$${total_payment.toFixed(2)}`
          },
          {
            key: 'principal_payment',
            label: 'Principal Payment',
            format: ({ principal_payment }) => `$${principal_payment.toFixed(2)}`
          },
          {
            key: 'interest_payment',
            label: 'Interest Payment',
            format: ({ interest_payment }) => `$${interest_payment.toFixed(2)}`
          },
          {
            key: 'close_balance',
            label: 'Close Balance',
            format: ({ close_balance }) => `$${close_balance.toFixed(2)}`
          },
        ]}
        rows={loan_schedule}
      />
    </Layout>
  )
}

export async function getServerSideProps({ query }){
  const { user_id, loan_id } = query;
  const [ users, loan_schedule ] = await Promise.all([
    fetch(`https://lending-api.azurewebsites.net/users`).then((req) => req.json()),
    fetch(`https://lending-api.azurewebsites.net/loans/${loan_id}?user_id=${user_id}`).then((req) => req.json())
  ]);

  return {
    props:{
      users,
      user_id,
      loan_schedule,
      loan_id
    }
  }
}