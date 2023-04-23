import { Page, test, expect, BrowserContext } from "@playwright/test";
test.describe("Automation Script Solution for Cymulate QA Engineer Assignment Task", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("https://app.cymulate.com/login");
  });
  test.afterAll(async () => {
    await page.close();
  });
  test("First part-Automation script to validate entire login page", async () => {
    await test.step("Verify User is on Login Page of Cymulate Website", async () => {
      const heading = page.locator("h2:has-text('Log in to your account')");
      await heading.waitFor({ state: "visible" });
      await expect(heading).toContainText("Log in to your account");
    });
    await test.step("Verify Login fails and Alert displayed for Email filled with invalid format", async () => {
      const email = page.locator("#email");
      const password = page.locator("#password");
      const signInButton = page.locator('button[test-id="sign-in"]');
      const alert = page.locator(
        "[class='Text__StyledSpan-sc-a1dltl-1 bPZEG']"
      );

      await email.fill("abcdefg");
      await password.fill("Anil@123");
      await signInButton.click();

      await expect(alert).toHaveText(
        "Enter a valid email address such as - example@mail.com"
      );
    });
    await test.step("Verify Password Error if passowrd length is less than 5", async () => {
      const email = page.locator("#email");
      const password = page.locator("#password");
      const signInButton = page.locator('button[test-id="sign-in"]');
      const alert = page.locator(
        "[class='Text__StyledSpan-sc-a1dltl-1 bPZEG']"
      );

      await email.fill("abcdefg@gmail.com");
      await password.fill("Anil");
      await signInButton.click();

      await expect(alert).toHaveText("Password must be 5 characters");
    });
    await test.step("Verify Login Fails for Valid but Unauthorized Credentials", async () => {
      const email = page.locator("#email");
      const password = page.locator("#password");
      const signInButton = page.locator('button[test-id="sign-in"]');
      const alert = page.locator(
        "[class='Text__StyledSpan-sc-a1dltl-1 bPZEG']"
      );

      await email.fill("anilbade98@gmail.com");
      await password.fill("Anil@123");
      await signInButton.click();

      await expect(alert).toHaveText("Wrong email address or password");
    });
    await test.step("Verify All Buttons and Links present on the Login Page other than Email, Password and Sign In", async () => {
      const logo = page.locator(".img-responsive");
      await expect(logo).toBeVisible();

      const backToLoginButton = page.locator(
        "button:has-text('Sign in with SSO')"
      );
      await expect(backToLoginButton).toBeVisible();
      const forgetPassowrdLink = page.locator(
        'a:has-text("Forgot my password")'
      );
      await expect(forgetPassowrdLink).toBeVisible();
      const signUpLink = page.locator(
        '[href="https://www.cymulate.com/free-trial"]'
      );
      await expect(signUpLink).toBeVisible();

      const CymulatewebsiteLink = page.locator(
        '[href="https://www.cymulate.com"]'
      );
      await expect(CymulatewebsiteLink).toBeVisible();
    });
    await test.step("Verify User able to logged in using Valid Authorized Credentials", async () => {
      const email = page.locator("#email");
      const password = page.locator("#password");
      const signInButton = page.locator('button[test-id="sign-in"]');

      await email.fill("candidate_user@cymulate.com");
      await password.fill("Aa123456");
      await signInButton.click();
    });
    await test.step("Verify User is Logged In Successfully and On Dashboard Page", async () => {
      const dashboard = page.locator('a[test-label="Dashboard"]');
      await dashboard.waitFor({ state: "visible" });
    });
  });
  test("Second Part – Validate the WAF attack: ", async () => {
    await test.step("Validate Reports Link is present and on clicking assesment report page is opened", async () => {
      const reports = page.locator('a[href="/global_report"]');
      await reports.click();
    });
    await test.step("In the WAF section check History Button and click on History Button", async () => {
      const WAF = page.locator(".waf-title");
      await expect(WAF).toHaveText("Web Application Firewall");

      const historyButton = page.locator(
        'a[href="/waf_reports/?client=candidate_user"]'
      );
      await historyButton.click();
    });
    await test.step("Click on the first Row", async () => {
      const row = page.locator('div[class="table-row attack-item-container"]');
      await row.click();
    });
    await test.step("Validate the WAF URL in Assessment Summary", async () => {
      const WAFURL = page.locator(
        ".report-summary-data:has-text('https://ekslabs.cymulatedev.com')"
      );
      await expect(WAFURL).toHaveText("https://ekslabs.cymulatedev.com");
    });
    await test.step("validate the overall score: 29.", async () => {
      const score = page.locator(".pieChartInfoText");
      await expect(score).toHaveText("29");
    });
    await test.step("Validate the Assessment Status", async () => {
      const status = page.locator('[class="cymulate-tag-design green"]');
      await expect(status).toHaveText("Completed");
    });

    await test.step("To Generate CSV Report", async () => {
      const generateReport = page.locator(
        '[class="btn btn-cymulate report-pop-up undefined"]'
      );
      await generateReport.click();
      const csvOption = page.getByRole("button", { name: "CSV" }).nth(1);
      await csvOption.click();
      console.log("CSV Report Generated Successfully");
    });
  });
});
