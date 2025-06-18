import styles from './styles/PaymentMethod.module.css';

const PaymentMethodSelect = ({ paymentMethod, setPaymentMethod }) => {
    const methods = [
        { value: 'paypal', label: 'Оплатити через PayPal' },
        { value: 'cod', label: 'Оплата при отриманні' }
    ];

    return (
        <div className={styles.paymentContainer}>
            {methods.map((method) => (
                <label
                    key={method.value}
                    className={`${styles.option} ${paymentMethod === method.value ? styles.selected : ''}`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className={styles.hiddenRadio}
                    />
                    {method.label}
                </label>
            ))}
        </div>
    );
};

export default PaymentMethodSelect;
