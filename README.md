# Starting the app in develop

First run the following command to generate the API type definitions:

```bash
yarn openapi:generate
```

Then you can start the mock server with:

```bash
yarn server
```

Finally, the frontend in dev mode:

```bash
yarn dev
```

Enjoy!

# Answers to part #3 of the assignment:

> Imagine we are working on SDK for our customers.

- **What should you do when the version of the backend service you were talking to from SDK is no longer supported?**

  First of all I would work (if possible) with the backend team to plan a deprecation and migration strategy. This would
  then mean to gradually update the SDK to the new version either by endpoint, or in any way following the deprecation
  plan.

- **How can you ensure that the API of the newer version of SDK is fully compatible with the previous one? What should
  you do in case you can’t maintain compatibility?**

  In order to ensure compatibility, I would first write an API contract defining the expected behavior of the SDK. By
  adhering to this contract while developing the SDK, we are minimizing the risk of breaking changes, or unexpected
  behaviour when updating.  
  Secondly, I would write integration/e2e tests (e.g. following a BDD approach) to ensure that the SDK is behaving as
  expected, and at any major incident or bug, I would ensure to write a regression test to cover the issue.

- **How do you see organizing the process of communicating with technical writers?**

  I would support maintaining a clear and up-to-date API documentation, and would work closely with the technical
  writers at any occasion where the API needs to be reviewed or updated.  
  I would also consider having a regular meeting with the technical writers to discuss the current state of the SDK, and
  to keep up-do-date with new initiatives which could impact their work in the near future.  
  Finally, depending on the level of technical knowledge of the technical writers, and their availability, I would also
  consider to make it possible for them to write part of the e2e/behavioural tests on the SDK.

- **What are some ways to implement a cross-platform React codebase?**

  Mainly I would consider the following approaches:

  1. **React Native**: This is a great way to share code between web and mobile. By using React Native, we can share
     components, hooks, and logic between the two platforms, while at the same time having the flexibility to write
     platform-specific code. The main downside is that the UI components are not always 100% compatible or performant on
     all platforms.
  2. **Backend Driven UI**: Albeit more complex, this approach allows to share the business logic between the platforms,
     while having the flexibility to write a bespoke platform-specific UI components library, at the cost of requiring
     more knowledge on the specific platform supported.
