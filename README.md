This is a repo for listing users, posts, and tasks

## What I Have Done

1. **Set up Android Studio and React Native CLI** to run the project.
2. **Configured Redux** store, slices, and reducers using Redux Toolkit for state management.
3. **Implemented React Navigation** for screen navigation.
4. **Fetched and normalized data** from the API, optimizing array responses as discussed - Data **normalisation**.
5. **Set up a simple theme** to maintain UI consistency.
6. **Declared interfaces and types** for almost every part of the project, ensuring type safety.
7. **Extracted reusable utility functions** to minimize code repetition.
8. **Created Axios client/adapter** to handle API requests.
9. **Built reusable ControlledTextField** component integrated with React Hook Form.
10. **Defined validation schema** for user edit functionality.
11. **Handled form submission and resetting** using React Hook Form, though `reset()` has known issues.
12. **Established a clean folder structure** to maintain organization and scalability.
13. **Fetched, filtered, and manipulated tasks** according to requirements while maintaining state integrity.
14. **Implemented editable User Details** with proper error handling.
15. **Set up an editable Users List** with action buttons (Cancel/Submit), ensuring buttons are only clickable when changes are made.
16. **Fetched and displayed user posts**, allowing post deletions and see the changes persist after navigating back to users and the select the same user you have just manipulated his posts.
17. **Added error handling**, with meaningful messages and status codes based on API responses.

## What Is Left and Can Be Optimized

1. **Reusable Components**:
   - Reusable components for forms, buttons, and expandable sections should be extracted to avoid redundancy.

2. **Styling**:
   - Refactor inline styles into a separate style sheet for easier reuse and maintenance.

3. **Memoization**:
   - Functions should be memoized using `useCallback` to improve performance when passing functions as props.

4. **Environment Variables**:
   - The API endpoint should be moved to an `.env` file for easier configuration and environment management.

5. **Component Separation**:
   - Components could be broken down further into smaller, encapsulated components.

6. **Enums**:
   - Implementing enums for constants instead of hardcoded values will improve maintainability.

7. **Reusable Utility Functions in Reducers**:
   - Extract common logic from reducers into utility functions to reduce code duplication.

8. **Extract Interfaces and Types**:
   - Some interfaces and types should be extracted for better organization and reusability.

9. **Custom Hooks**:
   - Refactor Redux selectors and dispatch logic into custom hooks for better modularity and reusability.
   - 

## Problems Encountered

1. **React Hook Form - Reset Bug**:
   - Encountered an issue with `reset()` in React Hook Form version 7.53.0. The behavior is inconsistent, and this is a known issue. [GitHub issue](https://github.com/react-hook-form/react-hook-form/issues/12315).

2. **React Hook Form Caching**:
   - There's an internal caching mechanism in React Hook Form that causes unexpected behavior when working with forms. The form sometimes retains cached values unexpectedly.

3. **FlatList Re-render Issue**:
   - I couldn't trigger a re-render of `FlatList` when data is fetched on mount, causing tasks not to appear until filters are applied.


# FOLLOW INSTRUCTIONS TO START THE APP

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
