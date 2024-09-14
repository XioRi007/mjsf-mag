<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import CustomButton from './CustomButton.vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const isOpen = ref(false);
const highlightedIndex = ref(-1);
const inputRef = ref(null);

const filteredItems = computed(() => {
  return props.items.filter(item =>
    !searchQuery.value || item.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectItem = (item) => {
  let localSelectedItems;
  if (props.multiple) {
    if (props.modelValue.includes(item)) {
      localSelectedItems = props.modelValue.filter(i => i !== item);
    } else {
      localSelectedItems = [...props.modelValue, item];
    }
  } else {
    localSelectedItems = [item];
  }
  emit('update:modelValue', localSelectedItems);
  searchQuery.value = '';
  isOpen.value = false;
  inputRef.value.blur();
};

const clearSelection = () => {
  emit('update:modelValue', []);
};

const handleKeydown = (event) => {
  if (event.key === 'ArrowDown') {
    highlightedIndex.value = (highlightedIndex.value + 1) % filteredItems.value.length;
  } else if (event.key === 'ArrowUp') {
    highlightedIndex.value = (highlightedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length;
  } else if (event.key === 'Enter' && highlightedIndex.value >= 0) {
    selectItem(filteredItems.value[highlightedIndex.value]);
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown-container')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class='dropdown-container'>
    <div class='dropdown__input-container'>
      <input
        ref='inputRef'
        type='text'
        v-model='searchQuery'
        @focus='isOpen = true'
        @keydown='handleKeydown'
        class='dropdown__input'
        placeholder='Search...'
      />
      <custom-button size='small' label='Очистити' @click='clearSelection' class='dropdown__clear-button' />
    </div>
    <ul v-if='isOpen' class='dropdown__list'>
      <li
        v-for='(item, index) in filteredItems'
        :key='item'
        @click='selectItem(item)'
        :class='["dropdown__item", modelValue.includes(item) ? "dropdown__item--selected" : "", highlightedIndex === index ? "dropdown__item--highlighted" : ""]'
      >
        <slot name="item" :item="item" :index='index'>
          {{ item }}
        </slot>
      </li>
      <li v-if='filteredItems.length === 0' class='dropdown__no-results'>
        Нічого не знайдено
      </li>
    </ul>
    <div v-if='modelValue.length' class='dropdown__selected-items'>
      <span v-for='item in modelValue' :key='item' class='dropdown__selected-item'>
        {{ item }}
      </span>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.dropdown-container {
  @apply relative;
}

.dropdown__input-container {
  @apply flex items-center;
}

.dropdown__input {
  @apply border p-2 w-full;
}

.dropdown__clear-button {
  @apply ml-2;
}

.dropdown__list {
  @apply absolute border bg-white w-full mt-1 max-h-60 overflow-auto;
}

.dropdown__item {
  @apply p-2 cursor-pointer hover:bg-gray-200;
}

.dropdown__item--selected {
  @apply bg-blue-200;
}

.dropdown__item--highlighted {
  @apply bg-gray-300;
}

.dropdown__no-results {
  @apply p-2 text-gray-500;
}

.dropdown__selected-items {
  @apply mt-2;
}

.dropdown__selected-item {
  @apply inline-block bg-gray-200 p-1 m-1 rounded;
}
</style>