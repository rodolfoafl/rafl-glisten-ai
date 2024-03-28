'use client'

import { Content } from '@prismicio/client'

import { Fragment, useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import StylizedLogoMark from './stylized-logo-mark'
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from 'react-icons/fa6'

export default function AnimatedContent({
  slice,
}: {
  slice: Content.IntegrationsSlice
}) {
  const container = useRef(null)

  const icons = {
    digitalocean: <FaDigitalOcean />,
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  }

  gsap.registerPlugin(useGSAP)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power2.inOut' },
      })

      tl.to('.pulsing-logo', {
        keyframes: [
          {
            filter: 'brightness(2)',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
          },
          {
            filter: 'brightness(1)',
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      })

      tl.to(
        '.signal-line',
        {
          keyframes: [
            {
              backgroundPosition: '0% 0%',
            },
            {
              backgroundPosition: '100% 100%',
              stagger: {
                from: 'center',
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        '-=1.4',
      )

      tl.to(
        '.pulsing-icon',
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: 'center',
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              stagger: {
                from: 'center',
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        '-=2',
      )
    },
    { scope: container },
  )

  return (
    <div
      ref={container}
      className="mt-20 flex flex-col items-center justify-center md:flex-row"
    >
      {slice.items.map((item, index) => {
        return (
          <Fragment key={index}>
            {index === Math.floor(slice.items.length / 2) && (
              <>
                <StylizedLogoMark />
                <div className="signal-line bg-gradint-to-t rotate-180" />
              </>
            )}
            <div
              className="pulsing-icon flex aspect-square shrink-0 items-center justify-center 
          rounded-full border border-teal-50/30 bg-teal-50/25 p-3 text-3xl text-teal-100 
          opacity-40 md:text-4xl lg:text-5xl"
            >
              {item.icon && icons[item.icon]}
            </div>
            {index !== slice.items.length - 1 && (
              <div
                className={clsx(
                  'signal-line',
                  index >= Math.floor(slice.items.length / 2)
                    ? 'rotate-180'
                    : 'rotate-0',
                )}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
