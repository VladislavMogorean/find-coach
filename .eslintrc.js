module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    parser: "@babel/eslint-parser",
  },

  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/no-multiple-template-root": "off",
  },
};
