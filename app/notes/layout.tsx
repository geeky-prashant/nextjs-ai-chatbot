import Navbar from './_components/navbar';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='h-screen m-auto max-w-7xl p-4'>
        {children}
      </main>
    </>
  )
}

export default NotesLayout