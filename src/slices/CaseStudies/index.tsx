import Bounded from '@/components/bounded'
import { createClient } from '@/prismicio'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react'
import clsx from 'clsx'

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient()
  const caseStudies = await Promise.all(
    slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id,
        )
      }
    }),
  )

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.richText(slice.primary.heading) && (
        <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
      )}

      {isFilled.richText(slice.primary.body) && (
        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}

      <div className="mt-20 grid gap-16">
        {caseStudies.map((caseStudy, index) => {
          return (
            caseStudy && (
              <div
                className="relative grid gap-4 opacity-85 transition-opacity duration-300
                hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
                key={caseStudy.id}
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h3 className="text-4xl">
                    <PrismicText field={caseStudy.data.company} />
                  </h3>

                  <div className="max-w-md">
                    <PrismicRichText field={caseStudy.data.description} />
                  </div>

                  <PrismicNextLink
                    className="after:absolute after:inset-0 hover:underline"
                    document={caseStudy}
                  >
                    Read <PrismicText field={caseStudy.data.company} /> case
                    study
                  </PrismicNextLink>
                </div>

                <PrismicNextImage
                  className={clsx(
                    'rounded-xl lg:col-span-2',
                    index % 2 && 'md:-order-1',
                  )}
                  field={caseStudy.data.logo_image}
                  quality={100}
                />
              </div>
            )
          )
        })}
      </div>
    </Bounded>
  )
}

export default CaseStudies