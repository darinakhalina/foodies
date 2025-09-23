import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="align-block">
      <p className="text-md">Sorry, this page doesn&apos;t exist.</p>
      <p className="text-md">
        <Link className="link" to="/">
          Go back to the homepage.
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
