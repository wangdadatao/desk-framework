<template>
  <div class="border rounded-lg shadow-sm bg-card text-card-foreground">
    <div v-if="$slots.header" class="p-4 border-b border-border/50">
      <slot name="header"></slot>
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="p-4 border-t border-border/50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
