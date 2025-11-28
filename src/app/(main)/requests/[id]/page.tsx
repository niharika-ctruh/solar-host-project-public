'use client';
import DividerText from '@/components/ui/DividerText';
import RequestDetailCard from './components/RequestDetailCard';
import HostItemCard from './components/HostItemCard';
import { useParams } from 'next/navigation';
import { TRequestStatus } from '@/lib/types';

const RequestDetail = () => {
  const { id } = useParams();

  console.log(id);

  const data = {
    customerData: { name: 'John Doe', id: 'L123918237' },
    requestData: {
      date: '18 Nov, 2025',
      time: '3 PM',
      status: 'waiting' as TRequestStatus,
      expiryDate: new Date(Date.now() + 30 * 30 * 60 * 1000).toISOString(),
    },
    hostData: {
      name: 'Kumar',
      id: 'K12333333',
      totalVisits: 15,
      address: 'Chiman Bagh, Indore, Madhya Pradesh, India',
    },
  };

  return (
    <div className="flex flex-col gap-3 px-3">
      <RequestDetailCard
        data={{
          ...data.customerData,
          ...data.requestData,
        }}
      />
      {data.requestData.status === 'confirmed' && (
        <>
          <DividerText
            text="Confirmed Host"
            className="font-medium whitespace-nowrap uppercase **:tracking-[1.2px]"
          />
          <HostItemCard data={data.hostData} />
        </>
      )}
    </div>
  );
};

export default RequestDetail;
