import { useCancelRequest } from '@/services/requests-service';
import { handleApiError, handleApiSuccess } from '@/lib/utils';

export const useCancelVisitRequest = () => {
  const cancelRequestQuery = useCancelRequest();

  const handleCancelRequest = ({
    message = 'Request cancelled successfully!',
    onSuccess,
  }: {
    message?: string;
    onSuccess: () => void;
  }) => {
    cancelRequestQuery.mutate(undefined, {
      onSuccess: () => {
        handleApiSuccess({ message });
        onSuccess();
      },
      onError: (error) => {
        handleApiError({ error });
      },
    });
  };

  return { handleCancelRequest, cancelRequestQuery };
};
