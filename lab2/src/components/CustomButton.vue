<script setup lang='ts'>

enum ButtonSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
}

const props = defineProps({
    label: String,
    color: {
        type: String,
        default: 'blue'
    },
    size: {
        type: String as () => ButtonSize,
        default: ButtonSize.Medium
    },
    prependIcon: {
        type: Object,
        default: false
    },
    appendIcon: {
        type: Object,
        default: false
    },
    prependIconClass: {
        type: String,
        default: 'w-6 h-6'
    },
    appendIconClass: {
        type: String,
        default: 'w-6 h-6'
    }
});

const emit = defineEmits(['click']);

const sizeClasses = {
    [ButtonSize.Small]: 'button--small',
    [ButtonSize.Medium]: 'button--medium',
    [ButtonSize.Large]: 'button--large'
};
</script>

<template>
  <button
    :class='`button ${sizeClasses[size]} button--${color}`'
    @click="emit('click')"
  >
    <div class='button__inner'>
      <div v-if='prependIcon' class='mr-2' :class='prependIconClass'>
        <component :is='prependIcon' />
      </div>
      {{ label }}
      <div v-if='appendIcon' class='ml-2' :class='appendIconClass'>
        <component :is='appendIcon' />
      </div>
    </div>
  </button>
</template>

<style scoped lang='scss'>
.button {
  @apply rounded text-white;
}

.button__inner {
  @apply flex items-center justify-center;
}

.button--small {
  @apply px-2 py-1 text-sm;
}

.button--medium {
  @apply px-4 py-2 text-base;
}

.button--large {
  @apply px-6 py-3 text-lg;
}

.button--blue {
  @apply bg-blue-500;
}

.button--red {
  @apply bg-red-500;
}

.button--green {
  @apply bg-green-500;
}
</style>