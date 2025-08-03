import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/authOptions'
import { redirect } from 'next/navigation'
import CreateProject from '../components/pages/CreateProject'

export default async function CreateProjectPage () {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/') 
  }
  return <CreateProject />
}
