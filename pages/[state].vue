<script setup lang="ts">
const route = useRoute()

const abbr = route.params.state as string
const name = State[abbr as keyof typeof State]
const representatives = ref<any>([])
const senators = ref<any>([])
const households = ref(0)

const visibleLegislatorContact = ref()

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

function openContact(id: number | string) {
  visibleLegislatorContact.value = id
}
</script>

<template>
  <header>
    <div class="wrapper">
      <img
        v-bind:src="`https://flags.ox3.in/svg/us/${abbr}.svg`"
        v-bind:alt="`${name} flag`"
        class="flag"
      />

      <h1>{{ name }}</h1>

      <span v-if="households > 0" class="count"
        >{{ numberWithCommas(households) }} households will lose internet affordability in May
        2024</span
      >
    </div>
  </header>

  <section id="content" class="wrapper">
    <div v-if="households > 0">
      <h2>Senators</h2>
      <ul class="senators">
        <li v-for="senator in senators" v-bind:key="senator.id.govtrack">
          {{ senator.name.official_full }}
          <button
            class="contact-button"
            v-bind:aria-label="`Contact ${senator.name.official_full}`"
            v-on:click="openContact(senator.id.govtrack)"
          ></button>

          <div
            v-if="visibleLegislatorContact === senator.id.govtrack"
            class="modal"
            v-on:click.self="openContact(0)"
          >
            <div class="surface">
              <button class="close-button" aria-label="Close" v-on:click.self="openContact(0)">
                x
              </button>
              <LegislatorCard
                v-bind:id="senator.id.govtrack"
                v-bind:name="senator.name.official_full"
                v-bind:term="senator.terms[senator.terms.length - 1]"
              />
            </div>
          </div>
        </li>
      </ul>

      <h2>Representatives</h2>
      <table>
        <thead>
          <th>District</th>
          <th>Representative</th>
          <th class="align-right">Households At Risk</th>
        </thead>
        <tbody>
          <tr v-for="representative in representatives" v-bind:key="representative.id.govtrack">
            <td>{{ representative.terms[representative.terms.length - 1].district }}</td>
            <td>{{ representative.name.official_full }}</td>
            <td class="align-right">
              {{ numberWithCommas(representative.metrics.enrolledHouseholds) }}

              <div
                v-if="visibleLegislatorContact === representative.id.govtrack"
                class="modal"
                v-on:click.self="openContact(0)"
              >
                <div class="surface">
                  <button class="close-button" aria-label="Close" v-on:click.self="openContact(0)">
                    x
                  </button>
                  <LegislatorCard
                    v-bind:id="representative.id.govtrack"
                    v-bind:name="representative.name.official_full"
                    v-bind:term="representative.terms[representative.terms.length - 1]"
                  />
                </div>
              </div>
              <button
                class="contact-button"
                v-bind:aria-label="`Contact ${representative.name.official_full}`"
                v-on:click="openContact(representative.id.govtrack)"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Data coming soon</div>
  </section>
</template>

<style scoped>
header {
  background-color: var(--color-accent);
  color: #fff;
  margin-top: -2rem;
  padding: 2rem 0;
}

header .wrapper {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

h1 {
  font-family: monospace;
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 0;
  text-transform: uppercase;
}

.flag {
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  margin-right: 1rem;
  width: 3rem;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  width: 100%;
}

section#content {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.senators {
  padding-left: 0.5rem;
}

.senators li {
  list-style-type: none;
  position: relative;
  width: max-content;
}

.senators li:hover {
  background-color: var(--color-accent);
  color: #fff;
}

.align-right {
  text-align: right;
}

table {
  border-collapse: collapse;
}

tr {
  position: relative;
  transition: all 0.125s;
}

tr:hover {
  background-color: var(--color-accent);
  color: #fff;
}

th,
td {
  padding: 0.5rem 1rem;
}

th:first-child,
td:first-child {
  padding-left: 0.5rem;
}

th:last-child,
td:last-child {
  padding-right: 0.5rem;
}

th {
  border-bottom: 1px solid #aaa;
  font-weight: bold;
  text-align: left;
}

td {
  border-bottom: 1px solid #ccc;
}

.contact-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  inset: 0;
  position: absolute;
  width: 100%;
}

.modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #000;
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  text-align: left;
  z-index: 1;
}

.surface {
  background-color: #fff;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.25);
  max-height: 100vh;
  overflow-y: scroll;
  padding: 2rem;
  position: relative;
  width: max-content;
}

.close-button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  font-size: 2rem;
  justify-content: center;
  height: 2rem;
  line-height: 1;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  transition: all 0.125s;
  width: 2rem;
}

.close-button:hover {
  background-color: var(--color-accent);
  color: #fff;
}
</style>
