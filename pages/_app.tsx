import type { AppProps } from 'next/app'
import '@/styles/homePage.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/Card.scss'
import MainLayout from './Layout/MainLayout';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const queryClient = new QueryClient()

export const PageContext = createContext({ 
  page: false, 
  setPage: (menu: boolean) => { } 
})

//Filter Categories
export const CategoryContext = createContext({ 
  category: 0, 
  setCategory: (category: number) => { } 
})
//Dismissal price
export const DismissalPriceContext = createContext({ 
  dismissal_price: 0, 
  setDismissal_price: (dismissal_price: number) => { } 
})
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const[page, setPage]= useState(false)
  const[category, setCategory] = useState(0)
  const[dismissal_price, setDismissal_price] = useState(0)
  useEffect(()=>{
    router.push('/')
  },[])
  return(
    <>
      <QueryClientProvider client={queryClient}>
         <PageContext.Provider value={{page, setPage}}>
          <DismissalPriceContext.Provider value={{dismissal_price,setDismissal_price}}>
            <CategoryContext.Provider value={{category, setCategory}}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </CategoryContext.Provider>
          </DismissalPriceContext.Provider>
         </PageContext.Provider>
      </QueryClientProvider>
    </>
  )
}




/*


*/