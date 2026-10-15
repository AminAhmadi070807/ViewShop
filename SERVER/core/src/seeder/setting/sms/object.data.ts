import { SmsEnum, SmsServiceEnum } from '../../../common/enums/sms/sms.enum';

const data = [
  {
    id: 'fd08afe6-994b-8ddf-be1e-ceeab4ce505a7',
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
    id: 'fd08afe6-158b-8bbf-be1e-abcab4ce999a7',
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
    id: 'fd08afe6-158b-8bbf-be1e-abcab4ce999a7',
    service: SmsServiceEnum.FARAZ_SMS,
    section: SmsEnum.OTP,
    active: false,
    details: [
      {
        id: 'fd18afe6-304b-4ddf-be3e-ceeab4ce06a7',
        title: 'api',
        value: 'https://api.iranpayamak.com/ws/v1/sms/pattern',
      },
      {
        id: 'fd18afe6-100b-4ddf-be3e-ceeab4ce98a1',
        title: 'key',
        value: '6j85sE6cpG6fjV2A4Y2oFws29NJ8G8OPCEPDSILhppHa7PYnAA',
      },
      {
        id: 'fd95afe8-999b-4ddf-be3e-ceeab4ce06a7',
        title: 'pattern_key',
        value: 'stoeBIFro1',
      },
      {
        id: 'ac95afe8-999b-4ccc-be3e-ceeab4ce06a7',
        title: 'from_number',
        value: '50002178584000',
      },
      {
        id: 'ac95aadc-999b-4ccc-be3e-abcdb4ce06a7',
        title: 'line_number',
        value: '50002178584000',
      },
      {
        id: 'ac95aadc-999b-4ccc-be3e-adcdsa4ce06a',
        title: 'attribute',
        value: 'code',
      },
    ],
  },
];

export default data;
