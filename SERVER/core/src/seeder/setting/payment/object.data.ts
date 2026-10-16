const data = [
  {
    id: '23246c1a-e5ff-4160-b602-941b00e5f03d',
    title: 'زرین پال',
    alias: 'ZARIN_PAL',
    details: [
      {
        title: 'مسیر ارسال به درگاه پرداخت',
        value: 'https://payment.zarinpal.com/pg/StartPay/',
        pattern: 'url',
      },
    ],
    payment_key: '4783fe1d-18d6-4faa-9999-108f21f8be5e',
    call_back: 'http://127.0.0.1:3000/api/v1/payment/zarin-pal/verify',
    api: 'https://payment.zarinpal.com/pg/v4/payment/',
    status: true,
    media: '4783fe1d-18d6-4faa-9818-108f21f8be4e',
  },
];

export default data;
