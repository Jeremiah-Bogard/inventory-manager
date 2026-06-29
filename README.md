# Inventory Manager

A mobile-first web app for tracking job site materials on your work van. Quickly see what you need to grab, mark items as used during a work order, and manage your full inventory — all stored locally in your browser with no backend required.

---

## Features

- **Shopping view** — shows only items below their minimum threshold, grouped by category, with an at-a-glance count of how many you need to grab
- **Work Order view** — lists all items so you can quickly decrement stock as you use materials on a job
- **Configuration view** — add, edit, or modify any item or group
- **Persistent storage** — all data is saved to `localStorage`, so your inventory survives page refreshes and browser restarts
- **Mobile-optimized** — sticky nav, bottom-sheet modals, and a compact layout designed for one-handed use on a phone

---

## Getting Started

This is a static site with no build step or dependencies. Just open the [GitHub](https://jeremiah-bogard.github.io/inventory-manager) Pages link in browser.

---

## How It Works

### Data Model

Each inventory item has the following shape:

```js
{
  id: "2024-01-01T00:00:00.000Z", // ISO timestamp used as unique ID
  name: "XB8",                    // display name
  min: 4,                         // minimum quantity threshold
  onHand: 2,                      // current quantity on hand
  group: "Modems"                 // category group
}
```

Items and groups are stored separately in `localStorage`:

| Key                       | Contents                         |
| ------------------------- | -------------------------------- |
| `inventoryManager`        | JSON array of all items          |
| `inventoryManager-groups` | JSON array of group name strings |

### Pages

| Tab           | Purpose                                                         |
| ------------- | --------------------------------------------------------------- |
| Shopping      | Items where `onHand < min`. Shows how many you need to pick up. |
| Work Order    | All items. Use this during a job to mark items as consumed.     |
| Configuration | All items. Add new items or modify existing ones.               |

### Modal Actions

| Action      | Triggered from      | What it does                                                |
| ----------- | ------------------- | ----------------------------------------------------------- |
| New Item    | Any page (+ button) | Creates a new item with name, min, on-hand count, and group |
| Modify Item | Configuration       | Edits an existing item's fields                             |
| Grab Item   | Shopping            | Increments `onHand` by the entered amount                   |
| Use Item    | Work Order          | Decrements `onHand` by the entered amount                   |

Groups can be selected from existing ones or created on the fly by typing in the custom group field.

---

## Clearing Your Data

To reset the app to a clean state, open your browser's developer tools and run:

```js
localStorage.removeItem("inventoryManager")
localStorage.removeItem("inventoryManager-groups")
location.reload()
```

---

## Browser Support

Works in any modern browser that supports `localStorage`, CSS custom properties, and `position: sticky`. No polyfills needed.
