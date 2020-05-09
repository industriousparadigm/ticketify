import axios from 'axios'

/**
 * Requests to our API have different baseURLs when made from the browser
 * vs made server-side. Because we use Kubernetes, we need to find out what
 * baseURL to use each time, and pass on the request headers
 */

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    })
  }

  return axios.create({
    baseURL: '/',
  })
}

export default buildClient
