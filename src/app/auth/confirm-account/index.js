import ConfirmForm from '@/components/forms/auth/confirmAccount'
import Layout from '@/layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const index = (props) => {
  return (
    <Layout>

      <Head>
        <title>{"Confirm Your Account"}</title>
        <meta name="description" content="Your eCommerce Website Description" />
        <meta name="keywords" content="ecommerce, online shopping" />
        <meta name="author" content="Kishor Sarkar" />
      </Head>

      <div className="flex w-full flex-col justify-center px-5">
        <div className="mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2">
          <div className="flex flex-col items-center">
            <Link className="mb-7 inline-block max-w-[64px] lg:mb-9" href="/">
              <Image
                alt="Isomorphic"
                loading="lazy"
                width={61}
                height={38}
                decoding="async"
                data-nimg="1"
                src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo-short.18ca02a8.svg"
              />
            </Link>
            {/* <h2 className="rizzui-title-h2 mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl">
            Having trouble to sign in? <br />
            Reset your password.
          </h2> */}
          </div>

          <ConfirmForm />
          <p className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
            Please
            <Link
              className="font-semibold text-gray-700 transition-colors hover:text-primary ml-1 mr-1"
              href="/auth/signin"
            >
              Sign in
            </Link> to the account
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default index