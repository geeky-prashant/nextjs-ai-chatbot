import Navbar from './_components/navbar';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='m-auto max-w-7xl p-4 mt-4 lg:mt-6'>
        {children}
      </main>
    </>
  )
}

export default NotesLayout