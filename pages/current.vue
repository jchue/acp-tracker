<template>
  <div class="max-w-screen-lg mx-auto px-4">
    <h1>Where are we now?</h1>

    <p>
      The
      <NuxtLink to="/about"><abbr title="Affordable Connectivity Program">ACP</abbr></NuxtLink> will
      expire at the end of April 2024 unless a bill to extend it is passed. Here is its current
      state in the legislative process:
    </p>

    <ol class="mt-8 relative z-0">
      <LegislationStep title="Introduction" complete>
        <ul>
          <li>
            House: Introduced and referred
            <a href="https://www.congress.gov/bill/118th-congress/house-bill/6929" target="_blank">
              H.R.6929
            </a>
            to committee on January 10, 2024
          </li>
          <li>
            Senate: Read and referred
            <a href="https://www.congress.gov/bill/118th-congress/senate-bill/3565" target="_blank">
              S.3565
            </a>
            to committee on January 10, 2024
          </li>
        </ul>
      </LegislationStep>
      <LegislationStep title="Committee consideration" current
        ><ul>
          <li>
            House: Pending agenda by Committee on Appropriations Chair
            <ContactModal id="400157">
              <button
                aria-label="Contact Kay Granger"
                class="hover:bg-primary cursor-pointer text-primary hover:text-white"
              >
                Kay Granger (TX-12)
              </button>
            </ContactModal>
          </li>
          <li>
            Senate: Pending agenda by Committee on Appropriations Chair
            <ContactModal id="300076">
              <button
                aria-label="Contact Patty Murray"
                class="hover:bg-primary cursor-pointer text-primary hover:text-white"
              >
                Patty Murray (WA)
              </button>
            </ContactModal>
          </li>
        </ul></LegislationStep
      >
      <LegislationStep title="Pass by House">218/435 simple majority</LegislationStep>
      <LegislationStep title="Pass by Senate">51/100 simple majority</LegislationStep>
      <LegislationStep title="Sign by President" last></LegislationStep>
    </ol>

    <p>
      To learn more about the legislative process, visit
      <a href="https://www.usa.gov/how-laws-are-made" target="_blank">USAGov</a>.
    </p>
  </div>
</template>
