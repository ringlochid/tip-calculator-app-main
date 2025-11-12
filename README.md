# Tip Calculator App

Solution for the [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). The goal is to recreate the provided design, keep the layout responsive, and implement the bill/tip/people calculations with custom validation states.

## Overview

### The challenge

Users should be able to:

- Enter a bill amount, select or type a custom tip, and provide the number of people.
- See validation warnings when any value is missing, zero, or out of range.
- View the tip amount per person and total per person update instantly once all inputs are valid.
- Reset the calculator back to its initial state.

### Screenshot

Add your final UI capture to `./screenshot.jpg` (or replace the file path below) so reviewers can preview the result.

![Tip calculator UI](./preview.jpg)

### Links

- Solution URL: _add your Frontend Mentor solution link_
- Live Site URL: _add your deployed site link_

## Features & Implementation Notes

- Accessible form structure with inline error messaging, `aria-live` regions, and focus-visible treatments.
- Tip selection supports both preset radio buttons and a custom input, with automatic clearing of the opposite choice.
- Responsive layout built with CSS Grid/Flexbox, custom properties, and the Space Mono typeface.
- JavaScript guards calculations until all three inputs have values; reusable helpers handle validation and formatting.

## Built with

- Semantic HTML5
- Modern CSS (custom properties, grid, flexbox)
- Vanilla JavaScript (ES modules not required)
- Mobile-first workflow

## Getting started

1. Clone this repo and install dependencies if you add any tooling (this vanilla version requires none).
2. Open `index.html` directly in the browser or serve locally (e.g., `npx serve`).
3. Update `script.js` if you want to extend the logic (additional tip presets, currency switching, etc.).

## What I learned

Summaries you might include:

- Coordinating multiple dependent inputs by checking that “the other two” fields already have data before running calculations.
- Creating reusable validation helpers that return user-friendly strings and keep CSS error states in sync.
- Balancing grid and flexbox to align form controls vs. result rows without extra markup.
