import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

const data = [
  {
    id: '02ef3ac6-cf27-4d0c-94e5-e1fffb18e1aa',
    service: SmsServiceEnum.SMS_IR,
    section: SmsEnum.OTP,
    active: true,
    details: [
      {
        id: 'fd18afe6-304b-4ddf-be3e-ceeab4ce06a7',
        title: 'api',
        value: 'https://api.sms.ir/v1/send/verify',
      },
      {
        id: 'fd18afe6-100b-4ddf-be3e-ceeab4ce98a1',
        title: 'key',
        value: 'fUq7s4bTHuN59zrhyNg0feEPoIM4vt4ypzPodlpdlglFjfYo',
      },
      {
        id: 'fd95afe8-999b-4ddf-be3e-ceeab4ce06a7',
        title: 'template_id',
        value: '439538',
      },
    ],
  },
  {
    id: 'dcde0083-666c-4585-a7d3-67a69b051060',
    service: SmsServiceEnum.MEDIANA,
    section: SmsEnum.OTP,
    active: false,
    details: [
      {
        id: 'fd18afe6-304b-4ddf-be3e-ceeab4ce06a7',
        title: 'api',
        value: 'https://api.mediana.ir/sms/v1/send/otp',
      },
      {
        id: 'fd18afe6-100b-4ddf-be3e-ceeab4ce98a1',
        title: 'key',
        value: 'KzXKFtfTRlu9AJbLmlSpHjQQXeANcm2yDpgBCBSZSuQ=',
      },
      {
        id: 'fd95afe8-999b-4ddf-be3e-ceeab4ce06a7',
        title: 'pattern_key',
        value: '810447',
      },
    ],
  },
  {
    id: 'd107c3c1-3bc9-4184-8036-4022cc74a161',
    service: SmsServiceEnum.FARAZ_SMS,
    section: SmsEnum.OTP,
    active: false,
    details: [
      {
        id: '6f73c482-50f4-4738-9f3b-73b7e0b7db5f',
        title: 'api',
        value: 'https://api.iranpayamak.com/ws/v1/sms/pattern',
      },
      {
        id: '98fda661-8e7e-4e7a-aa10-ad631b13467b',
        title: 'key',
        value: '6j85sE6cpG6fjV2A4Y2oFws29NJ8G8OPCEPDSILhppHa7PYnAA',
      },
      {
        id: '641da313-5009-4b98-b3eb-470a7acc4328',
        title: 'pattern_key',
        value: 'stoeBIFro1',
      },
      {
        id: 'df574639-8a05-46e8-a043-6337ede19026',
        title: 'from_number',
        value: '50002178584000',
      },
      {
        id: 'e2940149-45d6-490e-99e5-c3750284810b',
        title: 'line_number',
        value: '50002178584000',
      },
      {
        id: '6a4f4b3c-9828-4811-8b3b-84ad6863cb85',
        title: 'attribute',
        value: 'code',
      },
    ],
  },
];

export default data;
