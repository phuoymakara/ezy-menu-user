import { useRouter } from "next/router"

export const LogoTop = () =>{
  const router = useRouter()
  const handleBackHome= (e:any) =>{
    e.preventDefault()
    router.reload();
    window.scrollTo(0,0);
  }
  return(
    <>
      <div className="container-fluid mx-0 p-0 mb-4" id="center">
          <div className="cover_logotop" onClick={handleBackHome}>
            <img src="../logo_top.png" width={180} alt="" />
          </div>
      </div>
    </>
  )
}