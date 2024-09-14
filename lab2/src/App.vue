<script setup>
import Button from './components/CustomButton.vue';
import SearchableDropdown from './components/SearchableDropdown.vue';
import { ref } from 'vue';
import { BeakerIcon, ForwardIcon, PhotoIcon } from '@heroicons/vue/24/outline/index.js';
import { HomeIcon, PhoneIcon } from '@heroicons/vue/24/solid/index.js';

const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const selectedItems = ref([]);
const selectedItems2 = ref([]);

const alert = (message) => {
  window.alert(message);
};

const icons = {
  0: BeakerIcon,
  1: PhoneIcon,
  2: PhotoIcon,
  3: HomeIcon,
  4: ForwardIcon
};

</script>

<template>
  <div class='app'>
    <h2 class='app__title'>Button Component</h2>
    <div class='app__button-group'>
      <Button label='Primary' color='blue' size='medium'
              @click="alert('Primary Button Clicked')" />
      <Button label='Danger' color='red' size='large' icon='fas fa-exclamation'
              @click="alert('Danger Button Clicked')" />
      <Button label='Success' color='green' size='small'
              @click="alert('Success Button Clicked')" />
      <Button label='With prepend icon' color='blue' size='medium'
              :prepend-icon='BeakerIcon'
              @click="alert('Button With Icon Clicked')" />
      <Button label='With append icon' color='green' size='small'
              :append-icon='BeakerIcon' append-icon-class='h-4 w-4'
              @click="alert('Button With Icon Clicked')" />
    </div>
    <div class='app__searchable-dropdown'>
      <h2 class='app__title'>SearchableDropdown Component</h2>
      <SearchableDropdown v-model='selectedItems' :items='items' />
      <p class='app__selected-items'>Selected Items: {{ selectedItems }}</p>
    </div>
    <div class='app__searchable-dropdown'>
      <h2 class='app__title'>Multiple SearchableDropdown Component</h2>
      <SearchableDropdown v-model='selectedItems2' :items='items' multiple>
        <template #item='{ item, index }'>
          <div class='custom-item flex items-center'>
            <component :is='icons[index]' class='w-5 h-5 mr-2' />
            {{ item }}
          </div>
        </template>
      </SearchableDropdown>
      <p class='app__selected-items'>Selected Items: {{ selectedItems2 }}</p>
    </div>

  </div>
</template>

<style scoped lang='scss'>
.app {
  @apply p-4;
}

.app__title {
  @apply text-xl;
}

.app__searchable-dropdown {
  @apply my-24;
}

.app__button-group {
  @apply space-x-2;
  @apply flex;
  @apply items-center;
}

.app__selected-items {
  @apply mt-2;
}
</style>