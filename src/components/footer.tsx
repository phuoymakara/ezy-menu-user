import { useRouter } from "next/router"

export const FooterScreen = () =>{
  const router = useRouter()
  const handleBackHome= (e:any) =>{
    //e.preventDefault()
    router.reload();
    window.screenY=0;
    //return window.scrollTo(0,-50);
  }
  return(
    <>
      <footer className="m-0 p-0 footer mt-4">
        <div className="cover-logofooter bg-white py-3">
          <div id="center">
            <img 
            src="../logo_footer.png" 
            width={180} 
            onClick={handleBackHome} 
            style={{cursor:"pointer"}}
            alt="ezy-menu" />
          </div>
          <p className="text-center text-dark text-footer ">© 2023 Ezy Menu. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}