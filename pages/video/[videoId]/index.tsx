import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
  const { videoId } = router.query

  return <p>Video: {videoId} heheh</p>
}

export default Index