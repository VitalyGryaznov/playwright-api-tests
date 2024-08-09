import { test, expect } from "@playwright/test";
import { createProduct, getProductById } from "../api/productEndpoint";
import { getProduct, getRandomString, getValidProduct } from "../helpers/testDataHelpers";

// check-list:
// - when I create a product I can get it by id
// - when I delete a product I can't get it by id
// - when I update a product I can get it by id and it's payload is updated
// - when I create a product with a name length 256 I should get an error response
// - when I create a product with a name length 255 I can get it by id
// - when I update a product with a name length 256 I should get an error response
// - when I update a product with a name length 255 I can get it by id
// - when I create a product with a name length 254 I can get it by id
// - when I update a product with a name length 254 I can get it by id
// - when I delete a product with invalid id I should get an error response

const MAX_ALLOWED_NAME_LENGTH = 255;

test.skip("when I create a product I can get it by id", async ({ request }) => {
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

test("when I create a product with a name length 256 I should get an error response", async ({ request }) => {
  test.setTimeout(60000);
  const productPayload = getProduct(MAX_ALLOWED_NAME_LENGTH + 1);
  const response = await createProduct(request, productPayload);

  expect(response.ok()).toBeFalsy();
});

test("when I create a product with a name length 255 I can get it by id", async ({ request }) => {
  test.setTimeout(60000);
  const productPayload = getProduct(MAX_ALLOWED_NAME_LENGTH);
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

test("when I delete a product with invalid id I should get an error response", async ({ request }) => {
  const productResponse = await getProductById(request, getRandomString(50, '!@#$%^&*()_+'));
  expect(productResponse.ok()).toBeFalsy();
});
