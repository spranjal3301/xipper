import { SignUp } from '@clerk/nextjs'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
      <div className="grid place-content-center h-screen w-full">
        <SignUp />
      </div>
    );
}

export default Page