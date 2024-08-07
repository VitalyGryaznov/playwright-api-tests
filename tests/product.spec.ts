import { test, expect } from "@playwright/test";
import { createProduct, getProductById } from "../api/productEndpoint";
import { getValidProduct } from "../helpers/testDataHelpers";

test("when I create a product I can get it by id", async ({ request }) => {
  const productPayload = getValidProduct();
  const response = await createProduct(request, productPayload);

  expect(response.ok()).toBeTruthy();
  const productId = await response.json().then((body) => body.id);

  const productResponse = await getProductById(request, productId);
  expect(productResponse.ok()).toBeTruthy();

  expect(await productResponse.json()).toEqual({
    ...productPayload,
    id: productId,
  });
});
