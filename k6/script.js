import http from 'k6/http';

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',

      // Start iterations per `timeUnit`
      startRate: 2,

      // Start `startRate` iterations per timeUnit
      timeUnit: '1s',

      // Pre-allocate necessary VUs.
      preAllocatedVUs: 20,

      stages: [
        // k6 will linearly ramp up from startRate/timeUnit to this target of iterations per timeunit over the duration.
          {
            // Using base 12 as it's easily divisible (2 * 6, 3 * 4, 4 * 3, 6 * 2)
            // Endpoint returns in ~200ms, and we target ~80% capacity, so 4 request per second per user
            target: 12 * 4,
            duration: '1m'
        },
      ],
    },
  },
  thresholds: {
    http_req_waiting: [
      // {
      //   threshold: 'avg<375', // response time must be less than 375 ms (50% degraded or 125ms slower)
      //   abortOnFail: true,
      // },
      // {
      //   threshold: 'p(99)<1000', // p99 must be less than 1000 ms (~4x slower)
      //   abortOnFail: true,
      // },
    ]
  },
};

export default function() {
  http.get('http://localhost:9292');
}
