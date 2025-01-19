# Components Directory

This directory contains reusable React components for the TAQA-Mate application.

## Directory Structure

```
components/
├── ui/            # Basic UI components (buttons, inputs, etc.)
│   ├── Button/
│   ├── Input/
│   └── Card/
├── layout/        # Layout components (header, footer, navigation)
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
├── features/      # Feature-specific components
│   ├── Auth/
│   └── Dashboard/
└── shared/        # Shared components used across features
    ├── Loading/
    └── Error/
```

## Component Guidelines

1. Server vs Client Components:
   - Components are Server Components by default
   - Add 'use client' directive only when needed
   - Keep client-side components minimal

2. File Structure:
   ```
   ComponentName/
   ├── index.tsx          # Main component file
   ├── ComponentName.tsx  # Component implementation (if complex)
   └── styles.ts         # Styles (if using CSS-in-JS)
   ```

3. Best Practices:
   - Use TypeScript for all components
   - Export components as named exports
   - Include proper type definitions
   - Document complex components
   - Keep components focused and single-responsibility
   - Use composition over inheritance 