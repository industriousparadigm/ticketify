import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => (
  <>
    <Header currentUser={currentUser} />
    <Component {...pageProps} />
  </>
)
/**
 * In the top level NEXT component, context looks different.
 * Instead of context = { req, res, (...) },
 * we have context = { (...), ctx: { req, res } }
 */
AppComponent.getInitialProps = async (context) => {
  const client = buildClient(context.ctx)
  const { data } = await client.get('/api/users/currentuser')

  const pageProps =
    (await context.Component.getInitialProps?.(context.ctx)) || {}

  return {
    pageProps,
    currentUser: data.currentUser,
  }
}

export default AppComponent
