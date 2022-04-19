import s from "./Button.module.scss";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <>
      <button className={s.Button} type={type} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

export default Button;
