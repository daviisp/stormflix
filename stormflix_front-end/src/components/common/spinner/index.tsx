import { Spinner } from "reactstrap";

const PageSpinner = () => {
  return (
    <>
      <div className="vh-100 bg-dark d-flex align-items-center justify-content-center">
        <Spinner animation="border" color="light" />
      </div>
    </>
  );
};
export default PageSpinner;
