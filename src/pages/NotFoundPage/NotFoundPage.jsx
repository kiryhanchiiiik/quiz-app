import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <div>
      <h3>Page was not found</h3>
      <Link className={css.link} to="/quiz">
        Go to the Quiz
      </Link>
    </div>
  );
};

export default NotFoundPage;
