# Water Cycle Diagram

Interactive educational tool for learning the water cycle. Built with Astro, p5.js, and TailwindCSS.

## Features

- Interactive p5.js animation showing the complete water cycle
- 4 stages explained: Evaporation, Condensation, Precipitation, Collection
- Click on stages to highlight and see detailed animations
- Toggle labels and flow paths
- Download diagram as PNG
- Knowledge quiz to test understanding
- Fully responsive design

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Animation**: [p5.js](https://p5js.org/) v2
- **Styling**: [TailwindCSS](https://tailwindcss.com/) v4
- **Icons**: Iconify

## Project Structure

```
src/
├── components/
│   └── water-cycle/          # Water cycle specific components
│       ├── WaterCycleCanvas.astro
│       ├── StepCards.astro
│       ├── DisplayOptions.astro
│       ├── Quiz.astro
│       └── SEOContent.astro
├── lib/
│   └── water-cycle/          # p5.js animation modules
│       ├── config.ts         # Configuration constants
│       ├── types.ts          # TypeScript types
│       ├── state.ts          # State management
│       ├── particles.ts      # Particle system
│       ├── drawing.ts        # Drawing functions
│       ├── effects.ts        # Stage effects
│       └── index.ts          # Main exports
├── layouts/
│   └── Layout.astro
└── pages/
    └── index.astro
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## License

MIT
