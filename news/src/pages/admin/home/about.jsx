export default function About() {
  return ( 
   <section className="bg-gradient-to-r  from-blue-500 via-purple-500 to-pink-500 ... py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
       
        <h2 className="text-4xl font-extrabold text-red-700 mb-8 text-center uppercase tracking-wide">
          About Us
        </h2>

        
        <p className="text-gray-800 leading-relaxed mb-8 text-lg">
          In the highly competitive news broadcasting space,{" "}
          <span className="font-semibold text-black">Derana</span> has built
          one of the most unbiased and comprehensive news properties{" "}
          <span className="font-semibold">"Ada Derana"</span> – with a team of
          100 journalists delivering the most accurate and timely information.
        </p>

        
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">
            Key Highlights
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Partnership with Dialog Telekom in 2007 to deliver SMS news alerts.
            </li>
            <li>
              Available across TV, Radio, Web, SMS, IVR, Video Alerts, and Social
              Media.
            </li>
            <li>Tri-lingual availability: Sinhala, Tamil, and English.</li>
            <li>
              Interactive portal for commenting and submitting viewer reports.
            </li>
          </ul>
        </div>

       
        <div className="bg-gray-100 border-l-4 border-red-600 p-6 rounded-xl mb-10">
          <h3 className="text-2xl font-semibold text-black mb-3">
            Our Digital Presence
          </h3>
          <p className="text-gray-700 leading-relaxed">
            The showpiece of Ada Derana is{" "}
            <a
              href="https://www.adaderana.lk"
              className="text-red-600 font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.adaderana.lk
            </a>
            , Sri Lanka’s #1 news portal. Available in Sinhala, Tamil, and
            English, the platform enables viewer interaction through comments and
            even news submissions.
          </p>
        </div>

       
        <div className="bg-gradient-to-r from-red-700 to-black text-white p-8 rounded-2xl shadow-lg mb-10">
          <h3 className="text-2xl font-bold mb-4">Awards & Recognition</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              SLIM Brand Excellence Silver Award – Most Innovative Brand of the
              Year.
            </li>
            <li>
              Recognized by ICTA as the Best e-Content Application among e-News
              providers.
            </li>
            <li>Silver Award at “The Most Popular Web Competition 2010”.</li>
            <li>Manthan Award South Asia 2010 in the e-News & Media category.</li>
            <li>
              Global Understanding for Sustainable Development Award – 2016.
            </li>
          </ul>
        </div>

       
        <p className="text-gray-800 leading-relaxed text-lg text-center font-medium">
          Ada Derana continues to be Sri Lanka’s most comprehensive and
          innovative news provider, driven by a mission to deliver accurate,
          timely, and engaging content across multiple platforms.
        </p>
      </div>
    </section>
  );
}