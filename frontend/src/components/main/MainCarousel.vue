<template>
  <div class="carousel">
    <div ref="carouselWrapper" class="carousel-wrapper" :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }">
      <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
        <img :src="slide.image" alt="Slide Image" style="height: 90vh; width: 100vw">
      </div>
    </div>
    <button class="carousel-prev" @click="prevSlide">&#8249;</button>
    <button class="carousel-next" @click="nextSlide">&#8250;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slideWidth: 0,
      slides: [
        { image: 'https://picsum.photos/id/109/1920/1080', title: 'Slide 1', description: 'Description 1' },
        { image: 'https://picsum.photos/id/84/1920/1080', title: 'Slide 2', description: 'Description 2' },
        { image: 'https://picsum.photos/id/49/1920/1080', title: 'Slide 3', description: 'Description 3' },
      ],
    };
  },
  mounted() {
    this.slideWidth = this.$refs.carouselWrapper.offsetWidth;
  },
  methods: {
    prevSlide() {
      if (this.currentSlide === 0) {
        this.currentSlide = this.slides.length - 1;
      } else {
        this.currentSlide--;
      }
    },
    nextSlide() {
      if (this.currentSlide === this.slides.length - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
    },
  },
};
</script>

<style>
.carousel {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.3s;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-slide img {
  max-width: 100%;
  height: auto;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  border: none;
  cursor: pointer;
}

.carousel-prev {
  left: 10px;
  z-index: 3;
}

.carousel-next {
  right: 10px;
  z-index: 3;
}
</style>
