import { FC } from 'react';

export const Ads: FC = () => (
  <>
    <hr />
    <div className="flex flex-col my-4 items-center overflow-x-auto">
      <h2 className="text-3xl mt-12 mb-12 font-bold">[We are Hiring](https://volcengine.github.io/veScaleWeb/misc/join-us.html)</h2>
      {/* <div className="flex justify-center items-center flex-wrap">
        {logos.map((logo, index) => (
          <a key={index} href={logo.href} target="_blank" rel="noopener noreferrer" className="m-4">
            <img src={logo.src} alt={`Vendor ${index + 1}`} style={{ width: '150px', height: 'auto' }} />
          </a>
        ))}
      </div> */}
    </div>
    {/* <div className="flex flex-col my-4 items-center overflow-x-auto">
      <h2 className="text-3xl mt-12 mb-12 font-bold">Ads</h2>
      <object data="https://github.com/volcengine/veScale/graphs/contributors" />
    </div> */}
  </>
);
