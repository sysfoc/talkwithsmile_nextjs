import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - TalkwithSmile",
  description:
    "TalkwithSmile is your premier source for memes, funny content, thank you messages, helpful responses, and inspiring quotes. We help you communicate meaningfully and bring a smile to every conversation.",
};

export default function AboutUs() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-3xl text-white text-center capitalize'>
              About Us
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2'>
              <Link href='/'>
                <span>Home / </span>
              </Link>
              <span className='capitalize'>about-us</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className='bg-white dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
            {/* Main Content */}
            <div className='lg:col-span-8'>
              <div className='space-y-6'>
                <div>
                  <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                    Welcome to TalkwithSmile!
                  </h2>
                  <div className='w-20 h-1 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] rounded-full'></div>
                </div>

                <p className='text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                  We know that the internet offers a large amount of content, and finding the perfect social response, heartfelt thank you, or engaging information can sometimes feel overwhelming. That is why we have built TalkwithSmile– your go-to platform for all things fun and communicative.
                </p>

                <div className='bg-gradient-to-r from-[#FE4F70]/10 to-[#FFA387]/10 dark:from-gray-800 dark:to-gray-800 rounded-lg p-6 md:p-8 border-l-4 border-[#FE4F70]'>
                  <h3 className='text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                    Your Premier Source for Connection
                  </h3>
                  <p className='text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                    We are your premier source for memes, funny things, thank you messages, helpful responses, and inspiring quotes. Our goal is to provide you with a curated collection of engaging content and appropriate social responses tailored to different relationships and situations.
                  </p>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-xl md:text-2xl font-semibold text-gray-900 dark:text-white'>
                    Our Mission
                  </h3>
                  <p className='text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
                    At TalkwithSmile, we believe that effective communication builds strong connections and bridges the gaps between people. We strive to offer comprehensive information that empowers you to communicate meaningfully and bring a smile to every conversation.
                  </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8'>
                  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow'>
                    <div className='w-12 h-12 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] rounded-full flex items-center justify-center mb-4'>
                      <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      Engaging Content
                    </h4>
                    <p className='text-gray-600 dark:text-gray-400'>
                      Curated memes and funny content to brighten your day
                    </p>
                  </div>

                  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow'>
                    <div className='w-12 h-12 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] rounded-full flex items-center justify-center mb-4'>
                      <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      Social Responses
                    </h4>
                    <p className='text-gray-600 dark:text-gray-400'>
                      Perfect responses for every relationship and situation
                    </p>
                  </div>

                  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow'>
                    <div className='w-12 h-12 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] rounded-full flex items-center justify-center mb-4'>
                      <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      Thank You Messages
                    </h4>
                    <p className='text-gray-600 dark:text-gray-400'>
                      Heartfelt messages to express your gratitude
                    </p>
                  </div>

                  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow'>
                    <div className='w-12 h-12 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] rounded-full flex items-center justify-center mb-4'>
                      <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      Inspiring Quotes
                    </h4>
                    <p className='text-gray-600 dark:text-gray-400'>
                      Motivational quotes to inspire and uplift
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className='lg:col-span-4'>
              <div className='sticky top-8 space-y-6'>
                <div className='bg-gradient-to-br from-[#FE4F70] to-[#FFA387] rounded-lg shadow-lg p-6 md:p-8 text-white'>
                  <h3 className='text-2xl font-bold mb-4'>
                    Join Our Community
                  </h3>
                  <p className='mb-6 text-white/90'>
                    Be part of a community that values meaningful communication and genuine connections.
                  </p>
                  <Link 
                    href='/contact-us'
                    className='block w-full text-center bg-white text-[#FE4F70] font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors'
                  >
                    Get in Touch
                  </Link>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                    What We Offer
                  </h3>
                  <ul className='space-y-3'>
                    <li className='flex items-start'>
                      <svg className='w-5 h-5 text-[#FE4F70] mt-1 mr-3 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span className='text-gray-700 dark:text-gray-300'>Curated memes and humor</span>
                    </li>
                    <li className='flex items-start'>
                      <svg className='w-5 h-5 text-[#FE4F70] mt-1 mr-3 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span className='text-gray-700 dark:text-gray-300'>Thoughtful responses</span>
                    </li>
                    <li className='flex items-start'>
                      <svg className='w-5 h-5 text-[#FE4F70] mt-1 mr-3 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span className='text-gray-700 dark:text-gray-300'>Inspiring quotes</span>
                    </li>
                    <li className='flex items-start'>
                      <svg className='w-5 h-5 text-[#FE4F70] mt-1 mr-3 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                      </svg>
                      <span className='text-gray-700 dark:text-gray-300'>Relationship guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}