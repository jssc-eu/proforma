
import { useFetchUser } from 'lib/user'
import Login from 'components/login'
import auth0 from 'lib/auth0'
import Grid from '@mui/material/Grid'

const Item = ( { children }) => (<div>{children}</div>)


function HomePage({user}) {
    const { loading } = useFetchUser()
console.log(user)
    return (
        <>
        {!user && (
          <Login />
        )}
        {user && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Item><img src={user.picture} alt="user picture" />
            <p>nickname: {user.nickname}</p>
            <p>name: {user.name}</p></Item>
          </Grid>
          <Grid item xs={12} md={9}>
            <Item>
            <h4>Rendered user info on the client</h4>

            </Item>
          </Grid>
          </Grid>


        )}
      </>
    )
}

export default HomePage

export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req, res)

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/auth/login',
    })
    res.end()
    return
  }

  return { props: { user: session.user } }
}
