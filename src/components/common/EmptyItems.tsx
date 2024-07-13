import { t } from 'i18next';
import { MdHourglassEmpty } from 'react-icons/md';

const EmptyItems = ({ message }: { message?: string }) => {
  return (
    <div className='w-full h-full flex items-center justify-center gap-2 bg-transparent py-4'>
      <MdHourglassEmpty />
      <p className='text-xs md:text-sm lg:text-base font-semibold text-center'>
        {message ?? t('course.you_have_not_created_any_course_yet')}
      </p>
    </div>
  );
};

export default EmptyItems;
