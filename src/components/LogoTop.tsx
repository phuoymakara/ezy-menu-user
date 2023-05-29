import { useRouter } from "next/router"

export const LogoTop = () =>{
  const router = useRouter()
  return(
    <>
      <div className="container-fluid" id="center">
          <div className="cover_logotop" onClick={()=>router.reload()}>
            <img src="../logo_top.png" width={180} alt="" />
          </div>
      </div>
    </>
  )
}