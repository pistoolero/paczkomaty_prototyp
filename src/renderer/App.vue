<template>
  <div id="app">
    <b-container fluid style="height: 100vh">
      <b-row class="height100p">
        <b-col cols="4" class="yellow darken-1 d-flex align-items-center justify-content-center" style="flex-direction: column">
          <b-row no-gutters class="text-center animated fadeIn">
            <b-col class="pl-3 pr-3 pt-3 pb-3">
              <h3 class="text-uppercase">
                Lokalizacja
              </h3>
              <small style="font-size: .75em;">
                Wprowadź <strong>numer przesyłki</strong>, aby zlokalizować swoją paczkę.
              </small>
            </b-col>
          </b-row>
          <b-row no-gutters class="w-100 animated fadeIn p-1">
            <b-col cols="12">
              <b-form-input v-model="parcelNumber" style="border-radius: 20px"
                :formatter="format"
              type="text"
              placeholder="Podaj numer przesyłki składający się z 9 cyfr"></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                <!-- This will only be shown if the preceeding input has an invalid state -->
                Numer musi składać się z 9 cyfr
              </b-form-invalid-feedback>
            </b-col>
            <b-col cols="12" class="mt-3">
              <b-btn block variant="dark" @click="selectMarker">
                Znajdź paczkę
              </b-btn>
            </b-col>
          </b-row>
          <b-row no-gutters v-if="tooShort" class="w-100 mt-2" style="font-size: .85em">
            <b-col>
              <b-alert show variant="danger" fade style="border-radius: 20px">
                Numer przesyłki musi składać się z 9 cyfr!
              </b-alert>
            </b-col>
          </b-row>
          <b-row v-if="selectedMarker" class="mt-5" style="font-size: .85em">
            <b-col cols="12">
              <p>Paczka o numerze <strong>{{parcelNumber}}</strong> została odnaleziona!</p>
              <p>Oczekuje na Ciebie w paczkomacie <strong>{{selectedMarker.number}}</strong></p>
              <p>Jego lokalizacja to: <small><strong>{{selectedMarker.street}}</strong>, <strong>{{selectedMarker.postal}}</strong></small></p>
              <p>Znajduje się on w odległośći <strong>{{Math.round(calcDist(position,selectedMarker))}}m</strong> od Ciebie</strong></p>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="elegant-color text-white p-0">
          <router-view @userPosition="updatePosition" @markersList="updateMarkers" :marker="selectedMarker"></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/bootstrap.css'
import '@/assets/css/main.css'
import markers from '@/data/markers.json'
export default {
  name: 'prototype',
  data () {
    return {
      markers: markers,
      selectedMarker: null,
      parcelNumber: '',
      position: null,
      tooShort: false
    }
  },
  computed: {
    numState () {
      return this.parcelNumber.length === 9
    }
  },
  methods: {
    selectMarker () {
      if (this.numState) {
        this.selectedMarker = this.markers[Math.floor(Math.random() * this.markers.length)]
        this.tooShort = false
      } else {
        this.tooShort = true
      }
    },
    updateMarkers (markers) {
      this.markers = markers
    },
    updatePosition (position) {
      this.position = position
    },
    toRadians (degrees) {
      return degrees * (Math.PI / 180)
    },
    calcDist (pos1, pos2) {
      let R = 6371e3
      let fi1 = this.toRadians(pos1.lat)
      let fi2 = this.toRadians(pos2.lat)
      let dfi = this.toRadians((pos2.lat - pos1.lat))
      let dlam = this.toRadians((pos2.lng - pos1.lng))

      let a = Math.sin(dfi / 2) * Math.sin(dfi / 2) +
              Math.cos(fi1) * Math.cos(fi2) *
              Math.sin(dlam / 2) * Math.sin(dlam / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      let d = (R * c)
      return d
    },
    format (value, event) {
      return value.replace(/[a-zA-Z]/g, '').substring(0, 9)
    }
  }
}
</script>

<style>
  /* CSS */
</style>
