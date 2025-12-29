import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - TalkwithSmile",
  description:
    "TalkwithSmile is committed to protecting your privacy and handling your information. Explore our privacy policies here.",
};

export default function PrivacyPolicy() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 px-4 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2 max-w-4xl'>
            <h1 className='font-bold text-2xl md:text-3xl text-white text-center'>
              Privacy Policy
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2 text-sm'>
              <Link href='/'>
                <span className='hover:underline'>Home</span>
              </Link>
              <span>/</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='prose prose-gray dark:prose-invert max-w-none'>
            <div className='space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Introduction
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  Our privacy policy page informs you about our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with the data.
                </p>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  TalkwithSmile.com is committed to respecting the privacy rights of its visitors and users of this website. We created this Privacy Policy to give our readers confidence as they visit and use the site, and to demonstrate a commitment to fair information practices and the protection of privacy.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Acceptance of Terms
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  By using this website, you consent to the collection and use of your personally identifiable information and non-personal information as described in this Online Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Information We Collect
                </h2>
                
                <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    Non-Personal Information
                  </h3>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                    TalkwithSmile.com automatically collects information about your Internet connection, including but not limited to the Internet Protocol (IP) address, the name of the Internet domain you used to access the Internet, the date and time you accessed TalkwithSmile.com, the pages you visited, and the web browser or operating system used.
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    Personally Identifiable Information
                  </h3>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-3'>
                    We collect personally identifiable information from you only if you sign up for a newsletter or contact us including:
                  </p>
                  <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Your name</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Your email address</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Message details you send with inquiries</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Use of Cookies
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  We may use "cookies" to store a small piece of data on your computer during your visit to collect information. The cookies are used to gain information on how you use the web, which we try to incorporate into the Site to improve your experience.
                </p>
                <div className='bg-gradient-to-r from-[#FE4F70]/10 to-[#FFA387]/10 dark:from-gray-800 dark:to-gray-800 rounded-lg p-6 border-l-4 border-[#FE4F70]'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    We use cookies to:
                  </h3>
                  <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Identify you as a returning user and count your visits</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Remember your custom display preferences</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Suggest any recent searches you've made on our site</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Track whether you've already given your consent to cookies</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Third-Party Tracking
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  Google and other sites can track you through this site as we use their services for social media, infrastructure, and analytical purposes. You can visit the following sites to read their privacy policies:
                </p>
                <div className='grid grid-cols-2 gap-3 mb-4'>
                  <div className='bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                    <span className='text-gray-700 dark:text-gray-300'>Facebook</span>
                  </div>
                  <div className='bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                    <span className='text-gray-700 dark:text-gray-300'>LinkedIn</span>
                  </div>
                  <div className='bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                    <span className='text-gray-700 dark:text-gray-300'>Twitter</span>
                  </div>
                  <div className='bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                    <span className='text-gray-700 dark:text-gray-300'>YouTube</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  What We Do With Information
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  We will not share your personal information with any third parties without your consent, except as necessary to provide you with the services offered by us or to comply with the law.
                </p>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  We use anonymous information to analyze our website's traffic. Traffic and transaction information may also be shared with business partners and advertisers on an aggregate and anonymous basis.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Your Rights
                </h2>
                <div className='space-y-4'>
                  <div className='border-l-4 border-[#FE4F70] pl-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>Opt-out</h3>
                    <p className='text-gray-700 dark:text-gray-300'>
                      You may opt out of future email communications by following the unsubscribe links in our emails or by contacting us at{" "}
                      <a href='mailto:sysfoc@gmail.com' className='text-[#FE4F70] hover:underline'>sysfoc@gmail.com</a>
                    </p>
                  </div>
                  <div className='border-l-4 border-[#FE4F70] pl-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>Access</h3>
                    <p className='text-gray-700 dark:text-gray-300'>
                      You may access the personal information we have about you by submitting a request to{" "}
                      <a href='mailto:sysfoc@gmail.com' className='text-[#FE4F70] hover:underline'>sysfoc@gmail.com</a>
                    </p>
                  </div>
                  <div className='border-l-4 border-[#FE4F70] pl-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>Amend</h3>
                    <p className='text-gray-700 dark:text-gray-300'>
                      You may contact us to amend or update your personal information
                    </p>
                  </div>
                  <div className='border-l-4 border-[#FE4F70] pl-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>Forget</h3>
                    <p className='text-gray-700 dark:text-gray-300'>
                      In certain situations, you may request that we erase or forget your data
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Children's Information
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  The Website does not knowingly collect any personally identifiable information from children under the age of 16. If a parent or guardian believes that the Website has personally identifiable information about a child under the age of 16, please contact us immediately at{" "}
                  <a href='mailto:sysfoc@gmail.com' className='text-[#FE4F70] hover:underline'>sysfoc@gmail.com</a>
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Security
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  TalkwithSmile.com has reasonable security measures in place such as Secure Sockets Layer protocols to prevent the loss, misuse, and alteration of the information that we obtain from you.
                </p>
              </section>

              <section className='bg-gradient-to-r from-[#FE4F70]/10 to-[#FFA387]/10 dark:from-gray-800 dark:to-gray-800 rounded-lg p-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Contact Information
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  If you have any questions about this policy or our practices related to this website, please email us at{" "}
                  <a href='mailto:sysfoc@gmail.com' className='text-[#FE4F70] hover:underline font-medium'>
                    sysfoc@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}