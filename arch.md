# Architecture Overview

This project utilizes a micro-frontend architecture powered by Single-SPA framework to manage and orchestrate multiple applications. The architecture is designed to provide a seamless user experience while maintaining modularity and scalability.

## Routing System

Single-SPA handles the routing mechanism, determining which application should be rendered based on the current URL path. This allows for:

- Dynamic loading of applications
- Independent deployment of each micro-frontend
- Smooth transitions between different applications
- Shared state and resources when needed

## Loading State Management

The architecture implements a global loading modal component that appears during 3D model rendering operations. This modal:

- Provides visual feedback during heavy computational tasks
- Overlays on top of the current experience
- Ensures users are aware of ongoing rendering processes
- Prevents interaction with the underlying application until rendering is complete

## Application Structure
