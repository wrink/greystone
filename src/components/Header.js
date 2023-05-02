import Link from 'next/link'

export const Header = () => (
  <header>
    <nav className='navbar navbar-expand-lg bg-white border'>
      <div className='container-fluid py-2'>
        <Link href='/'>
          <img
            src='/logo_grey.svg'
            alt='Greystone Logo'
            width={256}
          />
        </Link>
      </div>
    </nav>
  </header>
)