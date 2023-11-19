import { useRouter } from "next/router"

export const FooterScreen = () =>{
  const router = useRouter()
  return(
    <>
      <footer className="m-0 p-0 footer mt-4">
        <div className="cover-logofooter p-3 bg-white">
          <div id="center">
            <img 
            src="../logo_footer.png" 
            width={180} 
            onClick={()=>router.reload()} 
            style={{cursor:"pointer"}}
            alt="" />
          </div>
          <p className="text-center text-dark p-3 text-footer">© 2023 Ezy Menu. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}