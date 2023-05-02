import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { Table } from '../components/Table';

export default function Home({ users }) {
  const router = useRouter();
  const [ form, setForm ] = useState({
    username: ''
  });

  const handleChange = useCallback((key) => (e) => {
    setForm({
      ...form,
      [key]: e.target.value
    });
  }, [setForm, form])

  const handleSubmit = useCallback(async () => {
    const req = await fetch('https://lending-api.azurewebsites.net/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    });
    if (req.status === 200) {
      router.reload();
    }
  }, [form]);


  return (
    <Layout title='Greystone'>
      <h1>Users</h1>

      <div className='container border rounded-2 mb-4 p-4'>
        <h2>Create a User</h2>
        <form className='row'>
          <div className='col-auto'>
            <input type='text' className='form-control' onChange={handleChange('username')} />
          </div>
          <div className='col-xs-4 col-md-2'>
            <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>

      <Table
        columns={[
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'username',
            label: 'Username',
            format: ({ id, username }) => <Link href={`/user/${id}`}>{username}</Link>
          },
        ]}
        rows={users}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx){
  const req = await fetch('https://lending-api.azurewebsites.net/users');
  const res = await req.json();
  return {
    props:{
      users: res
    }
  }
}