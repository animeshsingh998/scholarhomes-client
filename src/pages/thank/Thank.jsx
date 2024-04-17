import './thank.css';
import thank from '../../assets/confirmed.jpg';
import {Link} from 'react-router-dom';

const Thank = () => {
  return (
      <div className="thankPage">
          <img src={thank} alt="Thank You" />
          <span>Thank you for shopping with us, we hope you will visit us again.</span>
          <Link to="/">Click to go Home</Link>
    </div>
  )
}

export default Thank