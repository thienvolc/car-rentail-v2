import CarDetail from '@/features/cars/car-details/car-details';

interface CarDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: CarDetailsPageProps) {
  const { id } = await params;

  return <CarDetail id={id} />;
}
