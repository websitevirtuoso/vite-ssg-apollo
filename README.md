# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Graphql Generator

When server change schema we have to use command

```
yarn generate
```

To regenerate local types. Because we use many of types and value in code

### Project organization

/Project root
|-components (global UI components)
|-plugins (global registered plugins)
|-[...] (other directories)
|-modules
|-ExampleModule
|-components (UI components related only to the module)
|-constants
|-graphql (place for fragments, queries and mutations)
|-store (place for data management tools)
|-helpers (place for minor, reusable functions)
|-types (module’s type declarations)
|-tests -> e2e, unit (tests)
|-pages

https://github.com/rollup/plugins/tree/master/packages/graphql
npm outdated
