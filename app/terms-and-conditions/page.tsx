import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions - TalkwithSmile",
  description:
    "Read our terms and conditions for visiting TalkwithSmile.com to understand our rules and guidelines.",
};

export default function TermsAndConditions() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 px-4 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2 max-w-4xl'>
            <h1 className='font-bold text-2xl md:text-3xl text-white text-center'>
              Terms and Conditions
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2 text-sm'>
              <Link href='/'>
                <span className='hover:underline'>Home</span>
              </Link>
              <span>/</span>
              <span>Terms and Conditions</span>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='prose prose-gray dark:prose-invert max-w-none'>
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
              Last revised on May 14, 2025
            </p>

            <div className='space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Introduction
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  Thank you for visiting TalkwithSmile.com. These Terms and Conditions of Use are published by TalkwithSmile.com and updated from time to time.
                </p>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  In the event that the terms "TalkwithSmile.com" or "Us," "We," or "Our" are mentioned in this document, they specifically refer to the creators, moderators, and administrators responsible for the development, operation, and ongoing management of this website.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Acceptance of Terms
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  By using this website, you consent to be legally bound by these Terms and Conditions of Use. If you do not agree with these Terms and Conditions of Use or any part of these Terms and Conditions of Use, you are not authorized to use this website.
                </p>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  You must be at least 18 years of age to use our website. By using our website and by agreeing to these Terms and Conditions of Use, you represent that you are at least 18 years of age or you are an emancipated minor or have legal parental or guardian consent.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  License to Use This Website
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  This website is owned, maintained, controlled, and operated by TalkwithSmile.com for social responses, wishes, funny things, thank you wishes, and things to avoid. All materials on this website are the sole property of TalkwithSmile.com, its subsidiaries, affiliated companies, and/or its licensors.
                </p>
                <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                    You must not:
                  </h3>
                  <ul className='space-y-2 text-gray-700 dark:text-gray-300'>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Republish, upload, or repost material from this website</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Show, display, or perform any material from the website in public without prior written authorization</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Redistribute, reproduce, duplicate, copy, or otherwise exploit material for commercial purposes</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-[#FE4F70] mr-2'>•</span>
                      <span>Edit or otherwise modify or change the substance of any material on the website</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Acceptable Use
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  You must not use this website for any purpose or in any manner that violates these Terms and Conditions of Use and any local, state, or international law. You must not use this website in any way that causes or may cause damage to the website or impairment of its functioning, availability, or accessibility.
                </p>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  You must not conduct any systematic or automated data collection activities (including but not limited to robot, bot, spider, scraping, crawler, data mining, data extraction, and data harvesting) on or in relation to this website without TalkwithSmile.com's prior express and written consent.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  User Submissions
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  Any material you send to us on or via the TalkwithSmile.com website shall be deemed to be non-confidential and non-proprietary. You hereby grant TalkwithSmile.com a worldwide, irrevocable, non-exclusive license to use, reproduce, adapt, copy, sell, publish, disclose, display, exhibit, translate, transmit, perform, create derivative works, and distribute user content for any purpose in any existing or future media without any compensation.
                </p>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  You are solely responsible for your user content and hereby undertake that your submission is your original work and does not infringe any personal or proprietary legal right of any third party.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Intellectual Property
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  The materials and contents you see or read on our website, including but not limited to all editorial materials, information, photographs, illustrations, artwork, other graphic materials, names, logos, and trademarks, are the property of TalkwithSmile.com or third parties and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Limitations of Liability
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                  You expressly understand and agree that TalkwithSmile.com, any of its affiliates, directors, officers, and employees, or any other party involved in creating, producing, developing, or delivering this website will not be liable to you for any direct, indirect, incidental, special, consequential, punitive, or exemplary damages.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Indemnity
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  You hereby agree to defend, indemnify, and hold harmless TalkwithSmile.com, its officers, directors, employees, and agents from and against any and all claims, obligations, losses, damages, costs or debt, liabilities, and expenses arising out of your use of and access to this site or your violation of any term of these Terms & Conditions of Use.
                </p>
              </section>

              <section>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                  Contact Information
                </h2>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  If you have any questions or concerns about these terms and conditions, please contact us at{" "}
                  <a href='mailto:talkwithsmile@gmail.com' className='text-[#FE4F70] hover:underline font-medium'>
                    talkwithsmile@gmail.com
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