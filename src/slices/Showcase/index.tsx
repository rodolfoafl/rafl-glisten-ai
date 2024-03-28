import Bounded from '@/components/bounded'
import ButtonLink from '@/components/button-link'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import clsx from 'clsx'

import { PiArrowsClockwise, PiGear } from 'react-icons/pi'

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
}

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      className="relative"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full 
        bg-teal-400/20 blur-3xl filter"
      />

      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
                {children}
              </h2>
            ),
          }}
        />
      )}

      <div
        className="mt-16 grid items-center gap-8 rounded-xl border border-teal-50/20 
       bg-gradient-to-b from-slate-50/15 to-slate-50/5 p-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12"
      >
        <div>
          <div className="w-fit rounded-lg bg-teal-500/35 p-4 text-3xl">
            {slice.primary.icon && icons[slice.primary.icon]}
          </div>

          <div className="mt-6 text-2xl font-normal">
            {isFilled.richText(slice.primary.subheading) && (
              <PrismicRichText field={slice.primary.subheading} />
            )}
          </div>

          <div className="prose prose-invert mt-4 max-w-xl">
            {isFilled.richText(slice.primary.body) && (
              <PrismicRichText field={slice.primary.body} />
            )}
          </div>

          {isFilled.link(slice.primary.button_link) && (
            <ButtonLink className="mt-6" field={slice.primary.button_link}>
              {slice.primary.button_text || 'Learn More'}
            </ButtonLink>
          )}
        </div>

        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            className={clsx(
              'rounded opacity-90 shadow-2xl lg:col-span-2 lg:pt-0',
              slice.variation === 'reverse'
                ? 'lg:order-1 lg:translate-x-[15%]'
                : 'lg:-order-1 lg:translate-x-[-15%]',
            )}
            field={slice.primary.image}
          />
        )}
      </div>
    </Bounded>
  )
}

export default Showcase
