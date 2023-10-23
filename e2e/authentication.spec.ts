import { test, expect } from "@playwright/test";

test("should navigate to the users page and redirect to sign-in", async ({
  page,
}) => {
  await page.goto("http://localhost:3001/projects");

  // The new URL should be "/users/sign-in" (baseURL is used there)
  await expect(page).toHaveURL(
    "http://localhost:3001/users/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3001%2Fprojects"
  );
});
