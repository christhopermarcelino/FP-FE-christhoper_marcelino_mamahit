import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="row">
      <div className="col-4 col-sm-4 col-md-4 col-lg-3 m-auto mb-4">
        <img src="/assets/images/error.png" alt="Error" className="img-fluid" />
      </div>
      <p className="text-center fs-5 mb-2">
        The page you are looking for does not exist
      </p>
      <Link to="/" className="btn btn-dark text-center w-auto m-auto">
        Go back to home
      </Link>
    </div>
  );
}
