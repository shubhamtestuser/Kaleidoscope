import { Page, expect } from '@playwright/test';
import { CommonData } from '../data/commonData';

export class CommonPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Method to locate an input field based on the field name
    async inputFieldByFieldName(fieldName : string) {
        return await this.page.locator(`//*[text()="${fieldName}"]//input`);
    }

    // Method to locate an input element based on the value attribute
    async getByValue(value : string) {
        return await this.page.locator(`//input[@value="${value}"]`);
    }

    // Method to locate a span element containing specific text
    async getBySpanText(value : string) {
        return await this.page.locator(`//span[text()='${value}']`);
    }

    // Method to locate an element containing a specific class name
    async getByContainsClass(value : string) {
        return await this.page.locator(`//*[contains(@class,'${value}')]`);
    }

    // Method to locate a textarea input field based on label text
    async inputField(value : string) {
        return await this.page.locator(`//label[contains(text(),'${value}')]//following-sibling::div//textarea[@placeholder="${CommonData.elements.longInput}"]`);
    }

    // Method to locate the 'Edit' button for a specific page
    async editButton(page : string) {
        return await this.page.locator(`//*[text()="${page}"]//ancestor::button//descendant::span[text()="Edit"]`);
    }

    // Method to locate the submitted answers based on field and value
    async submittedAnswers(field : string, value : string) {
        return await this.page.locator(`//p[text()="${field}"]//following-sibling::p//span[text()="${value}"]`);
    }

    // Another method to locate the submitted answers, with slightly different locator
    async submittedAnswers2(field : string, value : string) {
        return await this.page.locator(`//p[text()="${field}"]//following-sibling::p[text()="${value}"]`);
    }

    // Method to locate a specific extracurricular activity based on its name
    async extracurricularActivity(value : string) {
        return await this.page.locator(`//*[@data-testid="repeating-entry"]//button//span[text()="${value}"]`);
    }
    
    // Method to locate submit button
    async submitButton(){
        return await this.page.locator(`//button//p[text()='Submit']`)
    }



    
    // Method to log in and apply for a scholarship using email
    async loginToApplyScholarship(email : string) {
        // click on login and apply button
        await this.page.getByText(CommonData.elements.loginToApply).click();
        // wait for page load
        await this.page.waitForTimeout(10000);
        // enter the email
        await this.page.getByPlaceholder(CommonData.elements.emailAddress).fill(email);
        // click next button
        await this.page.locator(`//button[@id="${CommonData.elements.loginPageCta}"]`).click({ force: true });
    }

    // Method to sign up using email and other personal details
    async signUpUsingEmail(email : string, firstName : string, lastName: string, country : string, mobile : string, password :string) {
        await this.loginToApplyScholarship(email);
        // enter first name
        await (await this.inputFieldByFieldName(CommonData.elements.firstName)).fill(firstName);
        // enter Last name
        await (await this.inputFieldByFieldName(CommonData.elements.lastName)).fill(lastName);
        // select country code
        await (await this.getByContainsClass(CommonData.elements.flagDropdown)).click();
        await this.page.locator(`//*[@class="${CommonData.elements.countryName}" and text()='${country}']`).click();
        // enter mobile number
        await (await this.inputFieldByFieldName(CommonData.elements.mobilePhone)).fill(mobile);
        // enter password
        await (await this.inputFieldByFieldName(CommonData.elements.createPassword)).fill(password);
        // check the checkbox "I confirm that I am at least 13 years old"
        await this.page.locator(`//input[@aria-label="${CommonData.elements.ageConfirmation}"]`).click();
        await this.page.waitForTimeout(5000)
        // click submit button
        await this.page.getByText(CommonData.elements.submit).click();
    }

    // Method to fill the 'Let's Get To Know You' form with provided details
    async fillLetsGetToKnowYouForm(state : string, city : string, address : string, zipcode : string, country : string) {
        // enter street address
        await this.page.getByPlaceholder(CommonData.elements.enterYourStreetAddress).scrollIntoViewIfNeeded();
        await this.page.getByPlaceholder(CommonData.elements.enterYourStreetAddress).fill(address);
        // enter state name
        await this.page.getByPlaceholder(CommonData.elements.enterYourState).fill(state);
        // select state name
        await (await this.getBySpanText(state)).click();
        // enter city
        await this.page.getByPlaceholder(CommonData.elements.enterYourCity).fill(city);
        // enter zip code
        await this.page.getByPlaceholder(CommonData.elements.enterYourZipCode).fill(zipcode);
        // enter country
        await this.page.getByPlaceholder(CommonData.elements.enterYourCountry).fill(country);
        // click the country option
        await (await this.getBySpanText(country)).click();
    }

    // Method to add an extracurricular activity entry
    async addExtracurricularEntry(name : string, year : string, leadershipRole : string, description : string) {
        await this.page.getByText(CommonData.elements.addEntry).scrollIntoViewIfNeeded();
        // click add entry button
        await this.page.getByText(CommonData.elements.addEntry).click();
        // verify the add entry header in the wizard
        await expect(await this.page.locator(`//h2[text()='${CommonData.elements.addEntry}']`)).toBeVisible();
        // enter the activity name
        await this.page.getByPlaceholder(CommonData.elements.shortInput).fill(name);
        // enter the number of years
        await this.page.getByPlaceholder(CommonData.elements.noOfYear).fill(year);
        // enter any leadership roles
        await (await this.inputField(CommonData.elements.listAnyLeadershipRoles)).fill(leadershipRole);
        // enter the description of involvement
        await (await this.inputField(CommonData.elements.descriptionOfInvolvement)).fill(description);
        // click on the add button
        await (await this.getBySpanText(CommonData.elements.add)).click();
        // wait for page load
        await this.page.waitForTimeout(5000);
    }

    // Method to fill high school information
    async fillHighSchoolInformation(name : string, address : string, addAddress: string, city : string, state : string, zipcode : string, gpa : string, year : string, file: any) {
        // enter the high school name
        await this.page.getByPlaceholder(CommonData.elements.highSchoolName).fill(name);
        // enter the high school address
        await this.page.getByPlaceholder(CommonData.elements.highSchoolStreetAddress).fill(address);
        // Additional High School Street Address
        await this.page.getByPlaceholder(CommonData.elements.additionalHighSchoolAddress).fill(addAddress);
        // High School City
        await this.page.getByPlaceholder(CommonData.elements.highSchoolCity).fill(city);
        // High School State (Full)
        await this.page.getByPlaceholder(CommonData.elements.highSchoolState).fill(state);
        // select state name
        await (await this.getBySpanText(state)).click();
        // High School Zip Code
        await this.page.getByPlaceholder(CommonData.elements.zipcode).fill(zipcode);
        // GPA
        await this.page.getByPlaceholder(CommonData.elements.GPAField).fill(gpa);
        // Year of High School Graduation
        await this.page.getByPlaceholder(CommonData.elements.enterADate).fill(year);
        // upload transcript
        await this.page.locator(`//input[@type="file"]`).setInputFiles(file);
        // wait for the file to be uploaded
        await this.page.waitForTimeout(20000);
    }

    // Method to check the essay checkbox for a specific value
    async checkEassyCheckBox(value : string) {
        // click to check the essay check box
        await (await this.getByValue(value)).click();
        // verify the checkbox is checked
        await expect(await this.getByValue(value)).toBeChecked();
    }

    // Method to uncheck the essay checkbox for a specific value
    async uncheckEassyCheckBox(value : string) {
        // click to uncheck the essay checkbox
        await (await this.getByValue(value)).click();
        // verify the checkbox is unchecked
        await expect(await this.getByValue(value)).not.toBeChecked();
    }

    // Method to verify if the essay box for a specific name is visible
    async verifyEassyBoxIsVisible(name : string) {
        // verify the selected essay box is visible
        await expect(await this.inputField(name)).toBeVisible();
    }

    // Method to input data in the essay box
    async inputDataInEassyBox(name : string, data : string) {
        // enter data in the essay box input field
        await (await this.inputField(name)).fill(data);
    }

    // Method to verify the page title in the review page
    async verifyPageTitleInReviewPage(value : string) {
        // verify the page title is visible
        await expect(await this.getBySpanText(value)).toBeVisible();
    }

    // Method to verify that editing is not allowed
    async verifyEditingIsNotAllowed(page : string) {
        // verify the edit button does not exist
        await expect(await this.editButton(page)).toHaveCount(0);
    }

    // Method to toggle (expand or collapse) a page section
    async togglePageSection(page : string) {
        // click to expand/collapse the page section
        await (await this.getBySpanText(page)).click();
    }

    // Method to verify the submitted answers are visible for a specific field and value
    async verifySubmittedAnswers(field : string, value : string) {
        // verify the answers shown as answered
        await expect(await this.submittedAnswers(field, value)).toBeVisible();
    }

    // Another method to verify the submitted answers are visible with different locator
    async verifySubmittedAnswers2(field : string, value : string) {
        // verify the answers shown as answered
        await expect(await this.submittedAnswers2(field, value)).toBeVisible();
    }

    // Method to verify if a specific extracurricular activity is visible
    async verifyExtracurricularActivity(value : string) {
        // verify the extracurricular activity is visible
        await expect(await this.extracurricularActivity(value)).toBeVisible();
    }
}
