<template>
<b-container fluid class="height100p">
  <b-row class="d-flex" style="height: 100%">
    <b-col class="d-flex map-container animated fadeIn" style="flex-direction: column; height: 100%">
      <googlemaps-map
      style="position: static;  flex-grow: 5"
        :center.sync="center"
        :zoom.sync="zoom"
        :options="{styles: styles}"
        :heading="heading">

        <!-- User Position -->
        <googlemaps-circle
          :center="center"
          :clickable="hideAccuracy"
          :radius="radius"
        />
        <googlemaps-user-position
          :hideAccuracy="hideAccuracy"
          :accuracyStyle="{
          	strokeColor: '#4285F4',
          	strokeOpacity: 0.25,
          	fillColor: '#4285F4',
          	fillOpacity: 0.2,
          	strokeWeight: 1,
            background: 'red'
          }"
          @update:position="setUserPosition"
        />

        <googlemaps-marker v-if="markers.length > 0 && userPosition && calcDist(userPosition, {lat: marker.lat, lng: marker.lng}) < radius"
          v-for="(marker, index) of markers"
          :key="'marker_' + index"
          :title="marker.name + ', ' + marker.street + ', ' + marker.postal"
          v-b-tooltip.hover
          :animation="currentMarker === marker ? 1 : 3"
          icon="/static/img/parcel.png"
          :label="{
            color: currentMarker === marker ? '#02B875' : '#fdd835',
            fontSize: '20px',
            fontWeight: '800',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            position: 'absolute',
            top: 0,
            text: marker.number,
          }"
          :position="{lat: marker.lat, lng: marker.lng}"
          @click="setCurrentMarker(marker)"
        />
      </googlemaps-map>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import markers from '@/data/markers.json'
export default {
  name: 'tracker',
  props: ['marker'],
  data () {
    return {
      radius: 2000,
      heading: 0,
      animation: 1,
      center: {
        lat: 52.4664886,
        lng: 16.9243717
      },
      zoom: 14,
      markers: markers,
      hideAccuracy: false,
      currentMarker: this.marker,
      userPosition: null,
      /* eslint-disable */
      styles:
      [
          {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 40
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          }
      ]

       /* eslint-enable */
    }
  },
  methods: {
    setUserPosition (position) {
      this.userPosition = position
      this.center = position
      let copyM = this.markers
      this.$emit('markersList', copyM.filter(marker => this.calcDist(marker, position) < this.radius))
      this.$emit('userPosition', position)
    },
    toRadians (degrees) {
      return degrees * (Math.PI / 180)
    },
    setCurrentMarker (marker) {
      this.currentMarker = marker
      this.zoom = 16
      this.center = {lat: marker.lat, lng: marker.lng}
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
    }
  },
  watch: {
    marker: function (next, prev) {
      this.setCurrentMarker(next)
    }
  }
}
</script>

<style lang="css">
</style>
