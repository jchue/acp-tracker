<script setup lang="ts">
const route = useRoute()

const abbr = route.params.state as string
const name = State[abbr as keyof typeof State]
const representatives = ref<any>([])
const senators = ref<any>([])
const households = ref(0)

useSeoMeta({
  title: `${name} At-Risk Households`
})

function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

interface Metrics {
  state: string
  district: number
  enrolledHouseholds: number
  percentHouseholds: number
  funding: number
}

onMounted(async () => {
  try {
    const metricsDistricts: Metrics[] = (await import(`~/data/${route.params.state}.json`)).default
    const legislators = (await import('~/data/legislators.json')).default

    households.value = metricsDistricts.reduce(
      (total: number, district: Metrics): number => total + district.enrolledHouseholds,
      0
    )

    representatives.value = legislators.filter(
      (legislator) =>
        legislator.terms[legislator.terms.length - 1].state === abbr.toUpperCase() &&
        legislator.terms[legislator.terms.length - 1].type === 'rep'
    )

    representatives.value.forEach(
      (representative: any) =>
        (representative.metrics = metricsDistricts.find((metricsDistrict) => {
          return (
            metricsDistrict.district ===
            representative.terms[representative.terms.length - 1].district
          )
        }))
    )

    representatives.value.sort((a: any, b: any) => {
      return a.terms[a.terms.length - 1].district - b.terms[b.terms.length - 1].district
    })

    senators.value = legislators.filter(
      (legislator) =>
        legislator.terms[legislator.terms.length - 1].state === abbr.toUpperCase() &&
        legislator.terms[legislator.terms.length - 1].type === 'sen'
    )
  } catch (error) {
    /* empty */
  }
})
</script>

<template>
  <header class="bg-primary -mt-8 py-8 text-white">
    <div class="wrapper flex flex-wrap items-center">
      <img
        v-bind:src="`https://flags.ox3.in/svg/us/${abbr}.svg`"
        v-bind:alt="`${name} flag`"
        class="mr-4 shadow-sm w-12"
      />

      <h1 class="font-mono font-normal mb-0 text-base uppercase">{{ name }}</h1>

      <span v-if="households > 0" class="font-bold mt-4 text-xl sm:text-2xl md:text-4xl w-full"
        >{{ numberWithCommas(households) }} households will lose internet affordability in May
        2024</span
      >
    </div>
  </header>

  <section class="wrapper py-8">
    <div v-if="households > 0">
      <section v-if="senators.length > 0">
        <h2>Senators</h2>
        <ul class="mb-4 pl-2">
          <li
            v-for="senator in senators"
            v-bind:key="senator.id.govtrack"
            class="hover:bg-primary relative hover:text-white w-max"
          >
            {{ senator.name.official_full }}

            <ContactModal v-bind:id="senator.id.govtrack"
              ><button
                class="absolute inset-0 w-full"
                v-bind:aria-label="`Contact ${senator.name.official_full}`"
              ></button
            ></ContactModal>
          </li>
        </ul>
      </section>

      <section>
        <h2>Representatives</h2>
        <table class="text-sm sm:text-base">
          <thead>
            <th class="border-b border-gray-400 font-bold pl-2 pr-4 py-2 text-left">District</th>
            <th class="border-b border-gray-400 font-bold px-4 py-2 text-left">Representative</th>
            <th class="border-b border-gray-400 font-bold pl-4 pr-2 py-2 text-right">
              Households At Risk
            </th>
          </thead>
          <tbody>
            <tr
              v-for="representative in representatives"
              v-bind:key="representative.id.govtrack"
              class="hover:bg-primary relative hover:text-white transition-colors"
            >
              <td class="border-b border-gray-300 pl-2 pr-4 py-2">
                {{
                  representative.terms[representative.terms.length - 1].district === 0
                    ? 'At-Large'
                    : representative.terms[representative.terms.length - 1].district
                }}
              </td>
              <td class="border-b border-gray-300 px-4 py-2">
                {{ representative.name.official_full }}
              </td>
              <td class="border-b border-gray-300 pl-4 pr-2 py-2 text-right">
                {{ numberWithCommas(representative.metrics.enrolledHouseholds) }}

                <ContactModal v-bind:id="representative.id.govtrack"
                  ><button
                    class="absolute inset-0 w-full"
                    v-bind:aria-label="`Contact ${representative.name.official_full}`"
                  ></button
                ></ContactModal>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <div v-else>Data coming soon</div>
  </section>
</template>
