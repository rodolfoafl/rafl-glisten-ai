import Bounded from '@/components/bounded'
import { Content, isFilled } from '@prismicio/client'
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react'
import StarBackground from './star-background'
import Image from 'next/image'

import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from 'react-icons/fa6'
import StylizedLogoMark from './stylized-logo-mark'
import background from './background.jpg'
import { Fragment } from 'react'
import clsx from 'clsx'

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  const icons = {
    digitalocean: <FaDigitalOcean />,
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />

      <div className="relative">
        {isFilled.richText(slice.primary.heading) && (
          <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
            <PrismicText field={slice.primary.heading} />
          </h2>
        )}

        {isFilled.richText(slice.primary.body) && (
          <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}

        <div className="mt-20 flex flex-col items-center justify-center md:flex-row">
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
      </div>
    </Bounded>
  )
}

export default Integrations
