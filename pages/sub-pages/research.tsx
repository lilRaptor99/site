import OpenInNewLink from '@/components/OpenInNewLink';

export default function ResearchPage() {
  return (
    <div>
      <div className='w-fit mb-6'>
        <h2 className='mb-1 text-2xl tracking-widest'>RESEARCH</h2>
        <div role='separator' className='border-b border-white w-full' />
      </div>

      <div className='mb-12'>
        <div className='relative w-full'>
          <div className='absolute top-0 left-0 h-full w-0.5 bg-white' />

          <div className='flex flex-col pl-[30px] py-6'>
            <div className='relative flex flex-col mb-8 bg-gray-400/20 p-4 rounded-xl'>
              <div className='absolute top-[10px] left-[-45px] bg-white h-8 w-8 rounded-full' />
              <h4 className='text-lg font-medium'>
                Optimum Virtual Machine Allocation in Cloud Datacenters
              </h4>
              <p className='text-sm text-gray-400 mb-3'>June 2024 - Present</p>
              <p className='text-gray-300'>
                Finding suitable destination hosts for Virtual Machines in Cloud Datacenters (an
                NP-Hard problem) by utilizing an Ant colony optimization algorithm.
              </p>
            </div>

            <div className='relative flex flex-col mb-8 bg-gray-400/20 p-4 rounded-xl'>
              <div className='absolute top-[10px] left-[-45px] bg-white h-8 w-8 rounded-full' />
              <h4 className='text-lg font-medium'>
                Virtual Machine Proactive Fault Tolerance using Log-based Anomaly Detection
              </h4>
              <p className='text-sm text-gray-400 mb-3'>March 2023 - April 2024</p>
              <p className='text-gray-300'>
                Identify potential Virtual Machine failures due to hardware/software faults in
                real-time using an anomaly detection approach based on our improved Matrix Profile
                algorithm.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-12'>
        <h3 className='mb-6 text-xl tracking-widest'>PUBLICATIONS</h3>

        <div className='relative w-full'>
          <div className='flex flex-col'>
            <div className='relative flex flex-col mb-6 bg-gray-400/20 p-4 rounded-xl'>
              <h4 className='text-lg font-medium'>
                Virtual Machine Proactive Fault Tolerance using Log-based Anomaly Detection
              </h4>
              <p className='text-gray-300 mt-2'>
                <b>Pratheek Senevirathne</b>, Samindu Cooray, Jerome Dinal Herath, and Dinuni K.
                Fernando
              </p>
              <p className='text-sm text-gray-400 mt-1'>In: IEEE Access (2024)</p>
              <OpenInNewLink
                href='https://ieeexplore.ieee.org/document/10767421'
                className='text-gray-300 mt-3'
              >
                View Publication
              </OpenInNewLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
