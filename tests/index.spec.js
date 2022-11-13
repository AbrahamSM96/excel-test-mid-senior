// @ts-check
import { test, expect } from '@playwright/test'

test('excel should work as expected', async ({ page }) => {
  // compruebas que levanta
  await page.goto('http://localhost:5173/')
// compruebas que renderiza
  const cellA0 = page.getByTestId('span-0-0')
  await cellA0.click()
  // compruebas que al hacer click se convierte en input
  const inputA0 = page.getByTestId('input-0-0')
  // compruebas que es editable
  await inputA0.fill('2')

  const cellB0 = page.getByTestId('span-0-1')
  await cellB0.click()

  const inputB0 = page.getByTestId('input-0-1')
  // comprobando las evaluaciones y las referencias
  await inputB0.fill('=A0+2')

  // comprobando que se recomputan los valores de otras celdas
  const inputA0again = page.getByTestId('input-0-0')
  await inputA0again.fill('4')

  const cellC0 = page.getByTestId('span-0-2')
  await cellC0.click()
  // compruebas que el resultado es esperado
  const result = await cellB0.innerText()
  expect(result).toBe('4')
})
