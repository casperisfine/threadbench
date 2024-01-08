import http from 'k6/http';

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 4,
      iterations: 1000,
      maxDuration: '1m30s',
    },
  },
};

export default function() {
  http.get('http://localhost:9292');
}
