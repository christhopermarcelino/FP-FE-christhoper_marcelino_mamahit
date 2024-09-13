export default function Error({ text }) {
  return (
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-3 m-auto mb-4">
        <img src="/assets/images/error.png" alt="Error" className="img-fluid" />
      </div>
      <p className="text-center fs-5 mb-0">{text}</p>
      <p className="text-center">Please try again your search</p>
    </div>
  );
}
