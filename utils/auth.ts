import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export function requireAdmin<PropsType>(
  get: GetServerSideProps<PropsType>
): GetServerSideProps<PropsType> {
  return async (context) => {
    const session = await getSession(context)

    const redirect = {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }

    if (!session?.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/api/auth/signin'
        }
      }
    }

    if (!session.user.admin) {
      return redirect
    }

    return get(context)
  }
}
