import "../style.css";

export const Notification = ({ isVisible }) =>
  isVisible ? (
    <div className="success">Successfully performed changes</div>
  ) : null;
