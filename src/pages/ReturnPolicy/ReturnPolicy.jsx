import './return.css'

const ReturnPolicy = () => {
  return (
    <div className="returnPage">
      <h1>Return Policy</h1>
      <h3>
        We want you to be completely satisfied with your purchase from
        ScholarHomes. If for any reason you are not, we offer a hassle-free
        return and exchange policy.
      </h3>

      <div className="retSec">
        <h2>Returns:</h2>
        <ul>
          <li>
            You may return any furniture or housing item within 7 days of
            delivery for a full refund.
          </li>
          <li>
            To initiate a return, simply contact our customer service team at
            ScholarHomes and provide your order details.
          </li>
          <li>
            Once your return is approved, we will provide you with a return
            shipping label for easy and free return shipping.
          </li>
          <li>
            Returns must be in their original packaging and condition to qualify
            for a refund.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReturnPolicy