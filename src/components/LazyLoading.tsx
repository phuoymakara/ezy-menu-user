export const LazyLoading = () => {
  return(
    <>
    <div className="card card-custom rounded-3 px-0 shadow-sm">
        <img
        src='../img_loading.jpeg'
        className="card-img-top img-card object-fit-cover"
        height={200}
        alt="My Image"
      />
        <div className="card-body px-2 pb-0 mb-0 mt-0">
          <div className="d-flex justify-content-between px-1 m-0 btn-main">
            <button className="btn-menu">{'code'}</button>
            add
            <button className="btn-menu">sum</button>
          </div>
          <div className="mt-3 mb-0 py-0">
            <h5 className="text-kh">title_kh</h5>
            <h5 className="text-en">title_en</h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default LazyLoading