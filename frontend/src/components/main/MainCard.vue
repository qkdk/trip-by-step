<template>
  <div class="card">
    <div class="card-image">
      <img :src="imageUrl" alt="Card Image" class="image">
    </div>
    <div class="card-content">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: "MainCard",
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  }
};
</script>

<style>
.card {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover{
  transform: scale(1.05);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

