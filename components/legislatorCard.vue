<script setup>
import districtOfficesPersons from '~/data/legislators-district-offices.json'
import socialPersons from '~/data/legislators-social-media.json'

const props = defineProps({
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
  <section class="flex flex-col sm:flex-row gap-8 mb-4">
    <div>
      <span class="block font-bold font-mono mb-4 text-sm uppercase">DC Office</span>
      <address class="not-italic text-sm">
        {{ dcOffice }}<br />
        {{ dcPhone }}
      </address>
    </div>

    <div v-if="districtOffices && districtOffices.length > 0">
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
    <ul class="flex flex-wrap gap-4 text-sm">
      <li v-if="website" class="flex items-center">
        <a v-bind:href="website" target="_blank"
          ><img src="~/assets/globe.svg" alt="Globe icon" class="inline-block mr-1 w-4" />
          Website</a
        >
      </li>
      <li v-if="facebook" class="flex items-center">
        <a v-bind:href="`https://facebook.com/${facebook}`" target="_blank"
          ><img src="~/assets/facebook.svg" alt="Facebook icon" class="inline-block mr-1 w-4" />
          Facebook</a
        >
      </li>
      <li v-if="twitter" class="flex items-center">
        <a v-bind:href="`https://twitter.com/${twitter}`" target="_blank"
          ><img src="~/assets/twitter.svg" alt="Twitter icon" class="inline-block mr-1 w-4" />
          Twitter</a
        >
      </li>
      <li v-if="instagram" class="flex items-center">
        <a v-bind:href="`https://instagram.com/${instagram}`" target="_blank"
          ><img src="~/assets/instagram.svg" alt="Instagram icon" class="inline-block mr-1 w-4" />
          Instagram</a
        >
      </li>
    </ul>
  </section>
</template>
