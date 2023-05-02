import Head from 'next/head'
import { Header } from './Header';

export const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <main className='App'>
      <Header />
      <div className='container-xl my-5'>
        {children}
      </div>
    </main>
  </>
)