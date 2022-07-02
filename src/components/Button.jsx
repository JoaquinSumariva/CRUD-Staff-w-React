import { Link } from "react-router-dom";
import '../styles/Button.scss';

export default function Button(props) {
  return (
    <Link to={props.url} className={`button ${props.className}`} onClick={props.onClick}>{props.text}</Link>
  );
}