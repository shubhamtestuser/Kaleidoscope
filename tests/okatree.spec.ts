import { test, expect } from '@playwright/test';
import { CommonPage } from '../src/pageObjects/commonPage';
import { CommonData } from '../src/data/commonData';

const timestamp = new Date().toISOString().replace(/[-:.]/g, "").toLowerCase()
let email = `shubham94243+${timestamp}@gmail.com`

test.describe("Sign Up, Fill Scholar Application Form, and Verify Details on Review Page", () => {

  test.beforeEach("visit URL and signup to the application", async ({ page }) => {
    const commonPage = new CommonPage(page)
    // visit url
    await page.goto('/program/sdet-test-scholarship')
    // Register a user with the given input details
    await commonPage.signUpUsingEmail(email, 'Shubham', 'Panday', 'India', '913625417896', 'StrongPss#0$&1')
    // verify that you are sucessfully logged in
    await commonPage.verifyTheUserIsLoggedIn()
  })


  test("Submit Scholar Application and Confirm Data on Review Page", async ({ page }) => {
    const commonPage = new CommonPage(page)

    // page 1
    // Fill out all Required Fields
    await commonPage.fillLetsGetToKnowYouForm(CommonData.data.alaska, 'Indore', 'Sector A 123 Address', '456986', 'India')
    // click to go to next page
    await page.getByText(CommonData.elements.nextPage).click()

    // page 2
    // add first Extracurricular Entry
    await commonPage.addExtracurricularEntry(
      "Debate Club",
      "5",
      "President",
      "Led weekly meetings, organized interschool debates, and mentored junior members."
    );

    //click on the next button to validate the minimum 2 req.
    await page.getByText(CommonData.elements.nextPage).click()
    // verify the validation message
    await expect(await page.getByText(CommonData.elements.entriesValidationMessage)).toBeVisible()

    // add second Extracurricular Entry
    await commonPage.addExtracurricularEntry(
      "Robotics Team",
      "2022",
      "Team Leader",
      "Coordinated the design and programming of robots for national competitions."
    );

    // verify the validation message is removed
    await expect(await page.getByText(CommonData.elements.entriesValidationMessage)).not.toBeVisible()

    // add third Extracurricular Entry
    await commonPage.addExtracurricularEntry(
      "Environmental Club",
      "2021",
      "Volunteer",
      "Organized tree-planting drives and awareness campaigns on waste management."
    );

    // add forth Extracurricular Entry
    await commonPage.addExtracurricularEntry(
      "Drama Club",
      "2020",
      "Actor",
      "Performed in school plays, participated in drama workshops, and assisted in backstage production."
    );

    //click on the next button Finish page after providing 4 Activities
    await page.getByText(CommonData.elements.nextPage).click()

    //page 3

    // enter the high school information
    await commonPage.fillHighSchoolInformation(
      "Mountain View High",
      "789 Oak Ave",
      "Suite 12",
      "Denver",
      "Alaska",
      "80203",
      "3.7",
      "2021",
      "My School Transcript.pdf"
    );

    // click the next button to go to next page
    await page.getByText(CommonData.elements.nextPage).click()

    // page 4 

    //click the car checkbox to show car eassy box
    await commonPage.checkEassyCheckBox(CommonData.elements.cars)
    // verify the eassy box is visible
    await commonPage.verifyEassyBoxIsVisible(CommonData.elements.essayAboutCars)

    //click the animal checkbox to show animal eassy box
    await commonPage.checkEassyCheckBox(CommonData.elements.animals)
    // verify the eassy box is visible
    await commonPage.verifyEassyBoxIsVisible(CommonData.elements.essayAboutAnimals)

    //click the school checkbox to show school eassy box
    await commonPage.checkEassyCheckBox(CommonData.elements.school)
    // verify the eassy box is visible
    await commonPage.verifyEassyBoxIsVisible(CommonData.elements.essayAboutSchool)

    //click the other checkbox to show other eassy box
    await commonPage.checkEassyCheckBox(CommonData.elements.other)
    // verify the eassy box is visible
    await commonPage.verifyEassyBoxIsVisible(CommonData.elements.essayAboutAnyTopic)

    //uncheck car and other option
    await commonPage.uncheckEassyCheckBox(CommonData.elements.cars)
    await commonPage.uncheckEassyCheckBox(CommonData.elements.other)

    // enter data in the eassy box
    await commonPage.inputDataInEassyBox(CommonData.elements.essayAboutSchool, 'This is the eassy about school')
    await commonPage.inputDataInEassyBox(CommonData.elements.essayAboutAnimals, 'This is the eassy about Animals')

    // wait for the unchecked checkbox to be removed
    // wait for data processing
    await page.waitForResponse(response => response.status() === 200);
    // click the next button to go to next page
    await page.getByText(CommonData.elements.nextPage).click()

    // Review page

    // verify the Lets get to know you in review page
    await commonPage.verifyPageTitleInReviewPage(CommonData.elements.letsGetToKnowYouTitle)
    // expand Lets get to know you section
    await commonPage.togglePageSection(CommonData.elements.letsGetToKnowYouTitle)
    // verify the first name
    await commonPage.verifySubmittedAnswers(CommonData.elements.firstName, 'Shubham')
    // verify the last name
    await commonPage.verifySubmittedAnswers(CommonData.elements.lastName, 'Panday')
    // verify the email
    await commonPage.verifySubmittedAnswers2(CommonData.elements.emailAddress, email)
    // verify street address
    await commonPage.verifySubmittedAnswers(CommonData.elements.streetAddress, 'Sector A 123 Address')
    // verify the state
    await commonPage.verifySubmittedAnswers2(CommonData.elements.stateFull, CommonData.data.alaska)
    // verify the zip code 
    await commonPage.verifySubmittedAnswers(CommonData.elements.zipCode, '456986')
    // verify the country
    await commonPage.verifySubmittedAnswers2(CommonData.elements.country, 'India')
    // verify the city
    await commonPage.verifySubmittedAnswers(CommonData.elements.city, 'Indore')

    // verify the Lets get to know you in review page
    await commonPage.verifyPageTitleInReviewPage(CommonData.elements.extracurricularActivities)
    // expand Extracurricular Activities
    await commonPage.togglePageSection(CommonData.elements.extracurricularActivities)
    // verify first Extracurricular Activity
    await commonPage.verifyExtracurricularActivity('Debate Club')
    // verify second Extracurricular Activity
    await commonPage.verifyExtracurricularActivity('Robotics Team')
    // verify third Extracurricular Activity
    await commonPage.verifyExtracurricularActivity('Environmental Club')
    // verify forth Extracurricular Activity
    await commonPage.verifyExtracurricularActivity('Drama Club')

    // verify the Lets get to know you in review page
    await commonPage.verifyPageTitleInReviewPage(CommonData.elements.highSchoolInformation)
    // expand the eassy section to view details
    await commonPage.togglePageSection(CommonData.elements.highSchoolInformation)
    // verify the High School name
    await commonPage.verifySubmittedAnswers(CommonData.elements.HighSchoolName, 'Mountain View High')
    // verify High School Street Address
    await commonPage.verifySubmittedAnswers(CommonData.elements.HighSchoolStreetAddress, '789 Oak Ave')
    // verify Additional High School Street Address
    await commonPage.verifySubmittedAnswers(CommonData.elements.addHighSchoolStreetAddress, 'Suite 12')
    // verify High School City
    await commonPage.verifySubmittedAnswers(CommonData.elements.HighSchoolCity, 'Denver')
    // verify High School State
    await commonPage.verifySubmittedAnswers2(CommonData.elements.HighSchoolState, CommonData.data.alaska)
    // verify High School Zip Code
    await commonPage.verifySubmittedAnswers2(CommonData.elements.highSchoolZipCode, '80203')
    // verify GPA
    await commonPage.verifySubmittedAnswers2(CommonData.elements.gpa, '3') // issue - it should show 3.7
    // verify Year of High School Graduation
    await commonPage.verifySubmittedAnswers2(CommonData.elements.yearOfHighSchoolGraduation, '01/01/2021') //issue - it should show only the year

    // verify the essay page
    await commonPage.verifyPageTitleInReviewPage(CommonData.elements.essay)
    // expand the eassy section to view details
    await commonPage.togglePageSection(CommonData.elements.essay)
    // verify the eassy about school
    await commonPage.verifySubmittedAnswers(CommonData.elements.essayAboutSchool, 'This is the eassy about school')
    // verify the eassy about animal
    await commonPage.verifySubmittedAnswers(CommonData.elements.essayAboutAnimals, 'This is the eassy about Animals')

    // capture page URL
    const reviewPage = await page.url()

    // submit application
    await (await commonPage.submitButton()).click()

    // wait for the application to be submitted sucessfully 
    // wait for data processing
    await page.waitForResponse(response => response.status() === 200);
    await page.waitForTimeout(5000)
    
    // get back to review page
    await page.goto(reviewPage)

    // Validate Editing is not allowed after Application has been submitted
    await commonPage.verifyEditingIsNotAllowed(CommonData.elements.letsGetToKnowYouTitle)

  })
})