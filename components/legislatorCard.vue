<script setup>
import districtOfficesPersons from '~/data/legislators-district-offices.json'
import socialPersons from '~/data/legislators-social-media.json'

const props = defineProps({
  name: String,
  id: [Number, String],
  term: Object
})

const facebook = ref('')
const twitter = ref('')
const instagram = ref('')

const districtOfficesPerson = districtOfficesPersons.find((districtOfficesPerson) => {
  return districtOfficesPerson.id.govtrack?.toString() === props.id.toString()
})

const socialPerson = socialPersons.find((socialPerson) => {
  return socialPerson.id.govtrack?.toString() === props.id.toString()
})

const districtOffices = districtOfficesPerson?.offices

const dcOffice = props.term.office
const dcPhone = props.term.phone

const website = props.term.url

facebook.value = socialPerson?.social.facebook
twitter.value = socialPerson?.social.twitter
instagram.value = socialPerson?.social.instagram
</script>

<template>
  <h1>{{ name }}</h1>

  <section class="offices">
    <div>
      <span class="label">DC Office</span>
      <address>
        {{ dcOffice }}<br />
        {{ dcPhone }}
      </address>
    </div>

    <div>
      <span class="label">District Offices</span>
      <ul>
        <li v-for="districtOffice in districtOffices" v-bind:key="districtOffice.id">
          <address>
            {{ districtOffice.address
            }}<span v-if="districtOffice.suite">, {{ districtOffice.suite }}</span
            ><br />
            {{ districtOffice.city }}, {{ districtOffice.state }} {{ districtOffice.zip }}<br />
            {{ districtOffice.phone }}
          </address>
        </li>
      </ul>
    </div>
  </section>

  <section class="online">
    <span class="label">Online</span>
    <ul>
      <li><a v-bind:href="website" target="_blank">Website</a></li>
      <li v-if="facebook">
        <a v-bind:href="`https://facebook.com/${facebook}`" target="_blank">Facebook</a>
      </li>
      <li v-if="twitter">
        <a v-bind:href="`https://twitter.com/${twitter}`" target="_blank">Twitter</a>
      </li>
      <li v-if="instagram">
        <a v-bind:href="`https://instagram.com/${instagram}`" target="_blank">Instagram</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
address {
  font-size: 0.875rem;
  font-style: normal;
}

.label {
  display: block;
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.offices {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.offices li,
.online li {
  list-style-type: none;
}

.offices ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 0;
}

.online ul {
  display: flex;
  gap: 1rem;
  padding-left: 0;
}
</style>
