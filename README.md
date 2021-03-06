# Vision Client
[![Netlify Status](https://api.netlify.com/api/v1/badges/6a0ee1c2-4fb7-4595-a78a-361fc16bf604/deploy-status)](https://app.netlify.com/sites/vision-i40/deploys) [![CircleCI](https://circleci.com/gh/vision-i40/web_app.svg?style=svg)](https://circleci.com/gh/vision-i40/web_app)

[Access the site](https://vision-i40.netlify.com).

### Stack
- Typescript
- React
- SASS

### External Dependencies
- [Vision API](https://github.com/vision-i40/company_service)

### Architecture
Our architecture aims to be modular and not coupled to frameworks. To achieve this goal, we are creating independent modules where the dependencies are injected trough the container. The container is resposinble to create and instantiate all the modules.

#### Types and Interfaces
Types and interfaces are greate to abstract the implementation making the code more "pluggable" and not coupled to libraries or frameworks. Usually, you should define types and interfaces inside of the module scope but for core components (mostly use cases and infra), you should define these in `src/types` since they should be visible in the entire architecture.

#### Use Cases
The use cases are responsible to handle the business logic. Many times front-end developers are tempted to do many of those things inside of views because it is faster and easier but it is not scalable and hightly couple to external dependecies like frameworks and third party libs.

#### Dependencies
Our dependency flow should follow:
```
View -> Container -> Use Cases -> Core(Entities and Infra)
```
It means the view only should access the use cases trough the container. It also means the core never should access the use cases.

##### Container
The container is responsible to instantiate the modules and inject the dependencies. It is also used as an interface between the views and the business logic. The container help us to avoid coupling making easier to change any pieces in the future if we want to.

### Design
Our current desing implementation is partially following the [Material Design](https://material.io).

### Code Guidlines
Just a few guidlines to maintain the code style concise.

- No commas
- Single quotes
- camelCase to filenames and variable definitions. Is ok to use snack_case when the attribute is coming from an external response
- For types you should use camelCase with the first letter capitalized
- [Use Prettier](https://prettier.io). We recommend you to install the extension in your editor
- If you need to create a module which has depencies create a factory.

## Development
Before you start we recomend to use VSCode as your default JS code editor because it has a great compatibility with Typescript and many great plugins for front-end development, but of course feel free to use another editor if you want to.

### Running
```bash
yarn install
yarn start
```

### Test
Todo






