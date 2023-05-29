import type { AppProps } from 'next/app'
import '@/styles/homePage.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/Card.scss'
import MainLayout from './Layout/MainLayout';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const queryClient = new QueryClient()
export const PageContext = createContext({ page: false, setPage: (menu: boolean) => { } })
export const CategoryContext = createContext({ category: 0, setCategory: (category: number) => { } })
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const[page, setPage]= useState(false)
  const[category, setCategory] = useState(0)
  useEffect(()=>{
    router.push('/')
  },[])
  return(
    <>
      <QueryClientProvider client={queryClient}>
         <PageContext.Provider value={{page, setPage}}>
            <CategoryContext.Provider value={{category, setCategory}}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </CategoryContext.Provider>
         </PageContext.Provider>
      </QueryClientProvider>
    </>
  )
}




/*


*/