# 002 — Fotos de productos y logo

- **Estado:** borrador (esperando archivos)

## Contexto
La página ya detecta imágenes por convención de nombre. Faltan los archivos.

## Requisitos
- R1: `public/logo.png` (cuadrado, ≥ 256px, fondo negro) se muestra en el header y se usa como ícono.
- R2: `public/menu/<id>.jpg` (≥ 800px de ancho, 4:3 o cuadrada) se muestra en la lista y en la hoja del producto.

## Archivos esperados
| Producto | Archivo |
|---|---|
| Caja de papas | `public/menu/caja-papas.jpg` |
| Pizza Chancha | `public/menu/pizza-chancha.jpg` |
| Jamón y morrón | `public/menu/jamon-morron.jpg` |
| Napolitana | `public/menu/napolitana.jpg` |
| Muzza | `public/menu/muzza.jpg` |
| Sándwich de lomito | `public/menu/lomito.jpg` |
| Sándwich de milanesa simple | `public/menu/mila-simple.jpg` |
| Sándwich de milanesa completo | `public/menu/mila-completo.jpg` |
| Caja de nuggets + papas | `public/menu/nuggets-papas.jpg` |
| Big Beicon 5X / Extrema | `public/menu/big-beicon.jpg`, `public/menu/extrema.jpg` |
| Burgers | `public/menu/<cheeseburger|fit|onion|chancha>.jpg` |

## Criterios de aceptación
- [ ] Con los archivos copiados, `pnpm build` y las fotos aparecen sin tocar código.
- [ ] Favicon/ícono generados desde el logo.
