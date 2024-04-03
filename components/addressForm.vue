<script setup lang="ts">
const isError = ref(false)
const isLoading = ref(false)

const address = ref('')
const state = ref('')
const district = ref('')
const senators = ref<Legislator[]>()
const representative = ref<Legislator>()

async function findAddress() {
  isError.value = false
  isLoading.value = true

  try {
    const data = await $fetch(`/api/geodata?address=${address.value}`)

    state.value = data.state.name
    district.value = data.cd.number

    const metrics = await getStateMetrics(data.state.abbr)

    senators.value = metrics?.senators
    representative.value = metrics?.representatives.find(
      (representative) =>
        parseInt(district.value) === representative.terms[representative.terms.length - 1].district
    )
  } catch (_error) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

async function getStateMetrics(stateParam: string) {
  const state = stateParam.toLowerCase()

  try {
    const metricsDistricts: Metrics[] = (await import(`~/data/${state}.json`)).default
    const legislators = (await import('~/data/legislators.json')).default as Legislator[]

    const households = metricsDistricts.reduce(
      (total: number, district: Metrics): number => total + district.enrolledHouseholds,
      0
    )

    const representatives = legislators.filter(
      (legislator) =>
        legislator.terms[legislator.terms.length - 1].state === state.toUpperCase() &&
        legislator.terms[legislator.terms.length - 1].type === 'rep'
    )

    representatives.forEach(
      (representative) =>
        (representative.metrics = metricsDistricts.find((metricsDistrict) => {
          return (
            metricsDistrict.district ===
            representative.terms[representative.terms.length - 1].district
          )
        }))
    )

    representatives.sort((a: any, b: any) => {
      return a.terms[a.terms.length - 1].district - b.terms[b.terms.length - 1].district
    })

    const senators = legislators.filter(
      (legislator) =>
        legislator.terms[legislator.terms.length - 1].state === state.toUpperCase() &&
        legislator.terms[legislator.terms.length - 1].type === 'sen'
    )

    return {
      households,
      representatives,
      senators
    }
  } catch (error) {
    /* empty */
  }
}
</script>

<template>
  <div>
    <h2>Find your representatives</h2>

    <form v-on:submit.prevent="findAddress">
      <label for="address" class="block font-bold font-mono mb-1 text-sm uppercase">Address</label>
      <input
        id="address"
        v-model="address"
        type="text"
        class="border-2 border-gray-300 font-mono min-w-96 mr-2 px-3 py-2 rounded-lg"
      />

      <ButtonCustom type="submit">Find</ButtonCustom>
    </form>

    <div class="mt-8">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">Sorry, your address was not found.</div>
      <div
        v-else-if="district"
        class="border-2 border-dotted border-gray-300 px-6 py-4 rounded-lg w-max"
      >
        <span class="block font-bold">{{ state }} Congressional District {{ district }}</span>
        <span v-if="representative?.metrics?.enrolledHouseholds" class="block mb-4"
          >{{ numberWithCommas(representative.metrics.enrolledHouseholds) }} households at
          risk</span
        >

        <p>Your representative is:</p>
        <p v-if="representative">
          <ContactModal v-bind:id="representative.id.govtrack"
            ><button
              v-bind:aria-label="`Contact ${representative.name.official_full}`"
              class="hover:bg-primary cursor-pointer text-primary hover:text-white"
            >
              {{ representative.name.official_full }}
            </button></ContactModal
          >
        </p>

        <p>Your senators are:</p>

        <ul class="mb-4">
          <li v-for="senator in senators" v-bind:key="senator.id.govtrack">
            <ContactModal v-bind:id="senator.id.govtrack"
              ><button
                v-bind:aria-label="`Contact ${senator.name.official_full}`"
                class="hover:bg-primary cursor-pointer text-primary hover:text-white"
              >
                {{ senator.name.official_full }}
              </button></ContactModal
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
