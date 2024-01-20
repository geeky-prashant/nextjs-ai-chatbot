import Navbar from './_components/navbar';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='m-auto max-w-7xl p-4 md:p-4 lg:p-0 mt-2 md:mt-0 lg:mt-4'>
        {children}
      </main>
    </>
  )
}

export default NotesLayout