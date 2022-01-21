import { useRouter } from 'next/router'

const Video = () => {
  const router = useRouter()
  const { videoId } = router.query

  return <p>Video: {videoId}</p>
}

export default Video