import { useRouter } from 'next/router'
import {BiArrowBack} from 'react-icons/bi'

export const Back= ()=>{
  
  const router = useRouter()
  const handleClickBack=(e:any)=>{
    router.push(`/`)
  }
  
  return(
    <>
      <div className="container-fluid mt-3 mb-0">
        <div className="d-flex " >
          <span className='bg-back' onClick={handleClickBack}>
            <BiArrowBack color='red' fontSize={28} cursor={'pointer'} />
          </span>
        </div>
      </div>
    </>
  )
}