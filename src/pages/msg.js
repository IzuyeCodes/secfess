import { useRouter } from 'next/router'

const SecretMessage = () => {
    const router = useRouter()
    const { SecretCode } = router.query

    // You can use the SecretCode parameter to fetch or display a secret message
    return <div>Secret message for {SecretCode}</div>
}

export default SecretMessage
