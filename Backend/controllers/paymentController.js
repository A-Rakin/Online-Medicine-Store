const SSLCommerzPayment = require('sslcommerz-lts');

const store_id = 'devas682b426168bfa';
const store_passwd = 'devas682b426168bfa@ssl';
const is_live = false; // true for production

const initiatePayment = async (req, res) => {
  const { amount, name, email, phone } = req.body;

  console.log("Initiate payment request received:", req.body);

  const transactionId = 'TXN_' + Date.now();

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: 'http://localhost:5000/api/payment/success',
    fail_url: 'http://localhost:5000/api/payment/fail',
    cancel_url: 'http://localhost:5000/api/payment/cancel',
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    cus_add1: 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    shipping_method: 'NO',
    product_name: 'Test Product',
    product_category: 'Electronic',
    product_profile: 'general',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    const apiResponse = await sslcz.init(data);
    console.log("SSLCommerz API response:", apiResponse);

    if (apiResponse.GatewayPageURL) {
      return res.status(200).json({ url: apiResponse.GatewayPageURL });
    } else {
      return res.status(500).json({ error: 'Failed to get payment URL' });
    }
  } catch (error) {
    console.error("SSLCommerz Init Error:", error);
    return res.status(500).json({ error: 'Payment initiation failed' });
  }
};

module.exports = { initiatePayment };
