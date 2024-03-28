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

  <section class="flex gap-8 mb-4">
    <div>
      <span class="block font-bold font-mono mb-4 text-sm uppercase">DC Office</span>
      <address class="not-italic text-sm">
        {{ dcOffice }}<br />
        {{ dcPhone }}
      </address>
    </div>

    <div>
      <span class="block font-bold font-mono mb-4 text-sm uppercase">District Offices</span>
      <ul class="flex flex-col gap-4">
        <li v-for="districtOffice in districtOffices" v-bind:key="districtOffice.id">
          <address class="not-italic text-sm">
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

  <section>
    <span class="block font-bold font-mono mb-4 text-sm uppercase">Online</span>
    <ul class="flex gap-4">
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
