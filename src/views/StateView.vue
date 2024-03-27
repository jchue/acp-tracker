<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { State } from '@/components/states'

const route = useRoute()

const abbr = route.params.state as string
const name = State[abbr as keyof typeof State]
const representatives = ref<any>([])
const senators = ref<any>([])
const households = ref(0)

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
  const metricsDistricts: Metrics[] = (await import(`../data/${route.params.state}.json`)).default
  const legislators = (await import('../data/legislators.json')).default

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
    (representative) =>
      (representative.metrics = metricsDistricts.find((metricsDistrict) => {
        return (
          metricsDistrict.district ===
          representative.terms[representative.terms.length - 1].district
        )
      }))
  )

  representatives.value.sort((a, b) => {
    return a.terms[a.terms.length - 1].district - b.terms[b.terms.length - 1].district
  })

  senators.value = legislators.filter(
    (legislator) =>
      legislator.terms[legislator.terms.length - 1].state === abbr.toUpperCase() &&
      legislator.terms[legislator.terms.length - 1].type === 'sen'
  )
})
</script>

<template>
  <div class="wrapper">
    <header>
      <img
        v-bind:src="`https://flags.ox3.in/svg/us/${abbr}.svg`"
        v-bind:alt="`${name} flag`"
        class="flag"
      />

      <h1>{{ name }}</h1>
    </header>

    <span class="count"
      >{{ numberWithCommas(households) }} households will lose internet affordability in May
      2024</span
    >

    <h2>Senators</h2>
    <ul>
      <li v-for="senator in senators" v-bind:key="senator.id.govtrack">
        {{ senator.name.official_full }}
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
header {
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
  text-transform: uppercase;
}

.flag {
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  margin-right: 1rem;
  width: 4rem;
}

.count {
  font-size: 2rem;
}

.align-right {
  text-align: right;
}

table {
  border-collapse: collapse;
}

th {
  border-bottom: 1px solid #aaa;
  font-weight: bold;
  padding: 0.5rem 0;
  text-align: left;
}

td {
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
}
</style>
