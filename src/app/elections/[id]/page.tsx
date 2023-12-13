import ClientElectionPage from '@/components/pages/ClientElectionPage'

export function generateStaticParams() {
  return [{ id: '0' }]
}

export default function ElectionPage({ params }: { params: { id: number } }) {
  return <ClientElectionPage params={params} />
}
