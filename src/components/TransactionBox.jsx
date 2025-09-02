import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const TransactionBox = ({ transaction }) => {
  return (
    <>
      <div className="transaction-box">
        <div className='transaction-box-left'>
          <p className='primary-text'>BHD {transaction.price}</p>
          <p className='secondary-text'>
            {dayjs(transaction.createdAt.substring(0, 10))
              .toString()
              .substring(0, 16)}, {+ ""}
            {dayjs(transaction.createdAt.substring(0, 10)).fromNow()}{' '}
          </p>
        </div>
        <div className='transaction-box-right'>
          <p className='primary-text'>Trace: {transaction._id.substring(17, 25)}</p>
          <p className='secondary-text'>Sale (Approved)</p>
        </div>
      </div>
    </>
  )
}
export default TransactionBox
