import './loading.css';
import loading from '../../assets/loading.gif';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loadingContainer">
              <img src={loading} alt="Loading...." />
              <h1>Loading...</h1>
      </div>
    </div>
  );
}

export default Loading