import DividerText from '@/components/ui/DividerText';
import { ICON_COLORS } from '@/data';
import { CalendarTick } from 'iconsax-reactjs';

const NotificationCard = ({
  className,
  isUnread,
}: {
  isUnread?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`flex min-h-30 flex-1 items-center justify-center gap-3 self-stretch p-3 ${isUnread ? 'bg-primary-50 rounded-xl border border-gray-200' : 'bg-background-50 rounded-none border-b border-b-gray-200'} ${className}`}
    >
      <div
        className={`h-16 w-16 rounded-lg p-5 ${isUnread ? 'bg-primary-200' : 'bg-purple-25'}`}
      >
        {/* Lib Icon */}
        <CalendarTick
          className={isUnread ? '' : 'stroke-neutral-50'}
          variant="Bold"
          color={ICON_COLORS['primary-400']}
        />
      </div>
      <div className="font-roboto flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-text-primary line-clamp-2 text-base font-medium tracking-[0.15px]">
            Visit confirmed for Kumar
          </p>
          <div className="text-text-primary text-xs tracking-[-0.2px]">
            09.10
          </div>
        </div>
        <div className="text-xs tracking-[-0.2px] text-gray-500">
          3PM, 18 Nov
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="flex h-full w-full flex-col gap-3 p-3">
      <DividerText text="Unread" />
      <NotificationCard isUnread />
      <DividerText text="Today" />
      <div className="flex flex-col">
        {Array.from({ length: 2 }).map((_, index) => (
          <NotificationCard key={index} />
        ))}
      </div>
      <DividerText text="Yesterday" />
      <div className="flex flex-col">
        {Array.from({ length: 3 }).map((_, index) => (
          <NotificationCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
