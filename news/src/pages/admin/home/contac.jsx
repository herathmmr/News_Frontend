import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ... py-16 px-6 lg:px-20 ">
      <div className=" max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        
        <h2 className="text-3xl font-extrabold text-red-700 mb-8 text-center tracking-wider uppercase">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div>
            
            <div className="flex items-start space-x-4 mb-6">
              <FaMapMarkerAlt className="text-red-600 mt-1" />
              <div className="text-gray-800 leading-relaxed">
                <strong>Derana Macro Entertainment (Pvt) Ltd</strong>
                <br />
                No. 320, T.B. Jayah Mawatha, Colombo 10
                <br />
                Sri Lanka
              </div>
            </div>

          
            <div className="flex flex-col space-y-4 mb-6">
              <div className="flex items-start space-x-4">
                <FaPhone className="text-red-600 mt-1" />
                <span className="text-gray-800">Tel: +94 11 5300 700</span>
              </div>
              <div className="flex items-start space-x-4">
                <FaFax className="text-red-600 mt-1" />
                <span className="text-gray-800">Fax: +94 11 2680 417</span>
              </div>
            </div>

           
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Web Editors
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-red-600 mt-1" />
                  <span className="text-gray-800">
                    <strong>English:</strong> yusuf@derana.lk
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-red-600 mt-1" />
                  <span className="text-gray-800">
                    <strong>Sinhala:</strong> poornima@derana.lk
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-red-600 mt-1" />
                  <span className="text-gray-800">
                    <strong>Tamil:</strong> bavan@derana.lk
                  </span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Derana Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63319.29720763122!2d79.82920787910154!3d6.927078842648729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259604efb1d4f%3A0x1f4a5ef84fa64a4b!2sAda%20Derana!5e0!3m2!1sen!2slk!4v1704023429374!5m2!1sen!2slk"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px]"
            ></iframe>
          </div>
        </div>

       
       
      </div>
    </section>
  );
}
