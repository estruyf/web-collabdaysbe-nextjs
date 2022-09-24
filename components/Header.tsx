import Image from 'next/image'

export interface IHeaderProps {}

export const Header: React.FunctionComponent<IHeaderProps> = (props: React.PropsWithChildren<IHeaderProps>) => {
  return (
    <header className={`mb-4 lg:mb-0 lg:py-12`}>
      <div className={`mx-auto w-full lg:max-w-7xl flex flex-col items-center`}>
        <h1 className='sr-only'>CollabDays Belgium 2022 - Agenda</h1>
        
        <img 
          src="/assets/collabdays-belgium.png" 
          alt="CollabDays Belgium 2022"
          className={`h-[32px] lg:h-[65px] max-h-full`} />

        <div className="order-first lg:order-none border-b lg:border-0 border-gray-100 py-2 mb-2 w-full text-xs lg:text-2xl text-blue font-semibold lg:mt-8">
          <div className="w-full mx-auto flex items-center justify-center gap-4 px-4">
            <p>
              <time dateTime="2022-10-15">15th of October, 2022</time>
            </p>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>

            <p>
              BluePoint Brussels
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};